import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';

const manifest=JSON.parse(await fs.readFile(new URL('../media-manifest.json',import.meta.url),'utf8'));
const destination=path.resolve('dist/media');
const source=process.env.LOCAL_VIDEO_DIRECTORY;
const origin=new URL(process.env.VIDEO_SOURCE_ORIGIN||manifest.sourceOrigin);
if(origin.protocol!=='https:')throw Error('The video origin must use HTTPS');
const valid=/^film-0[1-8]\/episode-[12]-original\/(?:index\.m3u8|init\.mp4|part-\d{4}\.m4s)$/;
const jobs=manifest.files.filter(file=>!process.env.VIDEO_PROJECT||file.key.startsWith(process.env.VIDEO_PROJECT+'/'));
let next=0,completed=0;
async function worker(){
 while(next<jobs.length){
  const item=jobs[next++];if(!valid.test(item.key))throw Error('Invalid media path');
  const target=path.resolve(destination,item.key);
  if(!target.startsWith(destination+path.sep))throw Error('Invalid output path');
  await fs.mkdir(path.dirname(target),{recursive:true});
  let lastError;
  for(let attempt=0;attempt<4;attempt++){
   try{
    let data;
    if(source)data=await fs.readFile(path.join(source,item.key));
    else{
     const response=await fetch(new URL('/api/media/'+item.key,origin),{signal:AbortSignal.timeout(120_000)});
     if(!response.ok)throw Error('HTTP '+response.status);
     data=Buffer.from(await response.arrayBuffer());
    }
    if(data.length!==item.size||createHash('sha256').update(data).digest('hex')!==item.sha256)throw Error('Media integrity mismatch');
    await fs.writeFile(target,data);lastError=null;break;
   }catch(error){lastError=error;if(attempt<3)await delay(1000*(attempt+1));}
  }
  if(lastError)throw Error(item.key+': '+lastError.message);
  completed++;if(completed%25===0||completed===jobs.length)console.log(`Videos: ${completed}/${jobs.length}`);
 }
}
await Promise.all(Array.from({length:4},worker));
console.log('Original-quality video files verified and prepared.');
