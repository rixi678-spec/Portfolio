import React,{forwardRef,useEffect,useRef} from 'react';
import Hls from 'hls.js';

export default forwardRef(function FilmPlayer({src,playRequest=0,onPlay,onPause,onEnded,onError,...props},ref){
 const media=useRef(null);
 useEffect(()=>{
  const video=media.current;let hls,timer,networkRetries=0,mediaRetries=0,cancelled=false;
  if(src.endsWith('.m3u8')&&Hls.isSupported()){
   hls=new Hls({maxBufferLength:30,backBufferLength:20});
   hls.on(Hls.Events.ERROR,(_,data)=>{
    if(!data.fatal||cancelled)return;
    console.warn('Film stream error',data.type,data.details,data.response?.code);
    if(data.type===Hls.ErrorTypes.NETWORK_ERROR&&networkRetries<3){
     const position=video.currentTime;networkRetries++;
     timer=setTimeout(()=>{if(!cancelled)hls.startLoad(position);},networkRetries*1500);
    }else if(data.type===Hls.ErrorTypes.MEDIA_ERROR&&mediaRetries++<1)hls.recoverMediaError();
    else onError?.(data);
   });
   hls.loadSource(src);hls.attachMedia(video);
  }else video.src=src;
  return()=>{cancelled=true;clearTimeout(timer);video.pause();hls?.destroy();video.removeAttribute('src');video.load();};
 },[src]);
 useEffect(()=>{
  if(!playRequest)return;
  const video=media.current;let cancelled=false;
  const start=()=>{if(!cancelled)video.play().catch(e=>{if(!cancelled&&!['AbortError','NotAllowedError'].includes(e.name))onError?.(e);});};
  start();video.addEventListener('loadedmetadata',start,{once:true});
  return()=>{cancelled=true;video.removeEventListener('loadedmetadata',start);};
 },[src,playRequest]);
 return <div className="managed-video"><video {...props} ref={el=>{media.current=el;if(typeof ref==='function')ref(el);else if(ref)ref.current=el;}} onPlay={onPlay} onPause={onPause} onEnded={onEnded} onError={onError}/></div>;
});

