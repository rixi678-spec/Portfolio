import React,{forwardRef,useEffect,useRef} from 'react';
import Hls from 'hls.js';

export default forwardRef(function FilmPlayer({src,playRequest=0,onPlay,onPause,onEnded,onError,...props},ref){
 const media=useRef(null);
 useEffect(()=>{
  const video=media.current;let hls;
  if(src.endsWith('.m3u8')&&Hls.isSupported()){
   hls=new Hls({maxBufferLength:30,backBufferLength:20});hls.loadSource(src);hls.attachMedia(video);
   hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal)onError?.(data);});
  }else video.src=src;
  return()=>{video.pause();hls?.destroy();video.removeAttribute('src');video.load();};
 },[src]);
 useEffect(()=>{
  if(!playRequest)return;
  const video=media.current;let cancelled=false;
  const start=()=>{if(!cancelled)video.play().catch(e=>{if(!cancelled&&e.name!=='AbortError')onError?.(e);});};
  start();video.addEventListener('loadedmetadata',start,{once:true});
  return()=>{cancelled=true;video.removeEventListener('loadedmetadata',start);};
 },[src,playRequest]);
 return <div className="managed-video"><video {...props} ref={el=>{media.current=el;if(typeof ref==='function')ref(el);else if(ref)ref.current=el;}} onPlay={onPlay} onPause={onPause} onEnded={onEnded} onError={onError}/></div>;
});

