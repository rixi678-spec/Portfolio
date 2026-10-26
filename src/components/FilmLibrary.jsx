import React, {useEffect,useRef,useState} from 'react';
import FilmPlayer from './FilmPlayer';

const tones=['#34312b','#293644','#3e314a','#493827','#233c4b','#443328','#223e45','#4c293d'];

export default function FilmLibrary({projects,onDetails,onPlayback}) {
  const [playRequest,setPlayRequest]=useState(0),[active,setActive]=useState(0),[medium,setMedium]=useState({type:'video',index:0}),[started,setStarted]=useState(false),[error,setError]=useState(false);
  const player=useRef(null),tabs=useRef([]),root=useRef(null);
  useEffect(()=>{root.current?.closest('.films-section')?.style.setProperty('--project-tone',tones[active]);},[active]);
  const project=projects[active];
  const episode=project.videos[medium.type==='video'?Math.min(medium.index,project.videos.length-1):0];
  useEffect(()=>{setMedium({type:'video',index:0});setStarted(false);setError(false);onPlayback(false);},[active,onPlayback]);
  useEffect(()=>()=>onPlayback(false),[onPlayback]);
  function chooseMedia(next,autoplay=false){setPlayRequest(autoplay?Date.now():0);player.current?.pause();onPlayback(false);setStarted(false);setError(false);setMedium(next);}
  function chooseProject(index){chooseMedia({type:'video',index:0});setActive(index);}
  function keyNavigation(e,index){let next=index;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(index+1)%projects.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(index-1+projects.length)%projects.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=projects.length-1;else return;e.preventDefault();chooseProject(next);tabs.current[next]?.focus({preventScroll:true});}
  async function play(){try{await player.current.play();}catch{setError(true);}}
  const summary=project.description.split('\n').slice(1).join('\n').trim()||project.description;
  return <div ref={root} className="film-library" data-ui style={{'--project-tone':tones[active]}}>
    <aside className="film-sidebar"><div className="library-brand"><span>SHULI</span><p>影像项目 / {String(projects.length).padStart(2,'0')}</p></div><div className="film-project-tabs" role="tablist" aria-label="AI 视频项目" aria-orientation="vertical">{projects.map((p,index)=><button role="tab" id={'project-tab-'+p.id} aria-selected={active===index} aria-controls="film-project-panel" tabIndex={active===index?0:-1} key={p.id} className={active===index?'active':''} ref={el=>tabs.current[index]=el} onClick={()=>chooseProject(index)} onKeyDown={e=>keyNavigation(e,index)}><span className="project-tab-number">{String(index+1).padStart(2,'0')}</span><span><strong>{p.menuTitle||p.title}</strong><small>{p.subtitle.split('·')[0].trim()}</small></span><span className="project-tab-arrow" aria-hidden="true">↗</span></button>)}</div><p className="library-sidebar-note">想象，不止于画面。</p></aside>
    <div className="film-project-panel" data-project={project.id} id="film-project-panel" role="tabpanel" aria-labelledby={'project-tab-'+project.id}>
      <div className="library-project-heading"><div><p>{project.subtitle}</p><h3>{project.title}</h3></div><span className="library-project-count">{String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span></div>
      <div className="library-screen" key={project.id}>
        {medium.type==='video'?<><FilmPlayer playRequest={playRequest} key={project.id+episode.src} ref={player} src={episode.src} poster={project.image} controls playsInline preload="metadata" aria-label={project.title+' '+episode.title} onPlay={()=>{setStarted(true);onPlayback(true);}} onPause={()=>onPlayback(false)} onEnded={()=>onPlayback(false)} onError={()=>setError(true)}/>{!started&&<button className="library-play" onClick={play} aria-label={'播放'+project.title+' '+episode.title}><span aria-hidden="true">▷</span></button>}</>:<><img src={project.gallery[medium.index]} alt={project.title+'画面 '+(medium.index+1)}/><button className="screen-arrow previous" aria-label="上一张项目截图" onClick={()=>chooseMedia({type:'image',index:(medium.index-1+project.gallery.length)%project.gallery.length})}>‹</button><button className="screen-arrow next" aria-label="下一张项目截图" onClick={()=>chooseMedia({type:'image',index:(medium.index+1)%project.gallery.length})}>›</button></>}
      </div>
      {error&&<p className="library-error" role="alert">视频暂时无法播放，<a href={episode.src}>直接打开影片 ↗</a></p>}
      <div className="library-project-copy"><p>{summary}</p><button className="library-details" onClick={()=>{player.current?.pause();onDetails(project);}}>完整介绍与图集 <span aria-hidden="true">↗</span></button></div>
      <div className="library-episodes" role="group" aria-label="选择影片">{project.videos.map((v,index)=><button key={v.src} className={medium.type==='video'&&medium.index===index?'active':''} aria-pressed={medium.type==='video'&&medium.index===index} onClick={()=>chooseMedia({type:'video',index},true)}><span aria-hidden="true">▷</span>{project.videos.length>1?(index===0?'第一集':'第二集'):'观看影片'}</button>)}</div>
      <div className="library-strip-heading"><span>视觉分镜</span></div>
      <div className="library-marquee" role="group" aria-label={project.title+'视觉分镜'}><div className="library-marquee-track" key={project.id} style={{'--marquee-duration':Math.max(30,project.gallery.length*5)+'s'}}>{[0,1].map(copy=><div className="library-marquee-group" key={copy} aria-hidden={copy===1?true:undefined}>{project.gallery.map((src,index)=><button key={src} tabIndex={copy===1?-1:0} className={medium.type==='image'&&medium.index===index?'active':''} aria-pressed={medium.type==='image'&&medium.index===index} aria-label={'查看'+project.title+'画面 '+(index+1)} onClick={()=>chooseMedia({type:'image',index})}><img src={src} alt={project.title+'视觉分镜'} loading="lazy"/></button>)}</div>)}</div></div>
    </div>
  </div>;
}


