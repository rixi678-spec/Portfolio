import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedContent from './components/AnimatedContent';
import FilmLibrary from './components/FilmLibrary';
import FilmPlayer from './components/FilmPlayer';
import ConceptFan from './components/ConceptFan';
import SceneCollection from './legacy/SceneCollection';
import { profile, concepts } from './content';
import films from './projects.json';
import './style.css';
gsap.registerPlugin(useGSAP, ScrollTrigger);
const Arrow=()=> <span aria-hidden="true">↗</span>;
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function VideoBackdrop({paused,onPausedChange,obscured}) {
  const video=useRef(null),shell=useRef(null);
  const [ready,setReady]=useState(false),[atEnd,setAtEnd]=useState(false);
  useEffect(()=>{const el=video.current;if(paused||obscured||reduced()){el.pause();return;}if(window.scrollY<40)el.play().catch(()=>{});},[paused,obscured,ready]);
  useGSAP(()=>{
    if(reduced())return;
    const el=video.current;let lastTime=-1;
    const trigger=ScrollTrigger.create({start:0,end:'max',onUpdate(self){
      if(!Number.isFinite(el.duration)||el.duration<=0||paused||obscured)return;
      if(window.scrollY<40){setAtEnd(false);el.play().catch(()=>{});return;}
      el.pause();const time=.25+self.progress*Math.max(0,el.duration-.9);
      if(Math.abs(time-lastTime)>.08&&!el.seeking){el.currentTime=time;lastTime=time;}
      setAtEnd(self.progress>.995);
    }});
    const mm=gsap.matchMedia();
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
      const x=gsap.quickTo(shell.current,'x',{duration:1.2,ease:'power3.out'}),y=gsap.quickTo(shell.current,'y',{duration:1.2,ease:'power3.out'});
      const move=e=>{x((e.clientX/window.innerWidth-.5)*12);y((e.clientY/window.innerHeight-.5)*8);};
      window.addEventListener('pointermove',move);return()=>window.removeEventListener('pointermove',move);
    });return()=>{trigger.kill();mm.revert();};
  },{scope:shell,dependencies:[paused,obscured],revertOnUpdate:true});
  return <><div className="backdrop" aria-hidden="true"><div className="backdrop-camera" ref={shell}><img className="background-poster" src="/assets/background-poster.jpg" alt=""/><video ref={video} className={`background-video ${ready&&!atEnd?'visible':''}`} src="/assets/portfolio-background.mp4" poster="/assets/background-poster.jpg" muted playsInline autoPlay={!paused} loop preload="auto" onLoadedData={()=>setReady(true)} onError={()=>setReady(false)}/><img className={`background-last ${atEnd?'visible':''}`} src="/assets/background-last.jpg" alt=""/></div><div className="backdrop-shade"/></div><button className="background-control" onClick={()=>onPausedChange(!paused)} aria-pressed={paused}>{paused?'▷ 播放背景':'Ⅱ 暂停背景'}</button></>;
}

function Opening({onComplete}) {
  const ref=useRef(null),done=useRef(false);
  const complete=()=>{if(!done.current){done.current=true;onComplete();}};
  useGSAP(()=>{if(reduced()){complete();return;}const tl=gsap.timeline({onComplete:complete});tl.from('.opening-word span',{yPercent:110,opacity:0,stagger:.085,duration:.8,ease:'power3.out'}).from('.opening-caption',{opacity:0,y:12,duration:.6},.35).to('.opening-line',{scaleX:1,duration:1,ease:'power2.inOut'},.4).to('.opening-content',{opacity:0,y:-30,duration:.5},1.55).to('.opening-curtain.top',{yPercent:-100,duration:1.1,ease:'power4.inOut'},1.8).to('.opening-curtain.bottom',{yPercent:100,duration:1.1,ease:'power4.inOut'},1.8);return()=>tl.kill();},{scope:ref});
  return <div className="opening" ref={ref} aria-label="SHULI 作品集开场"><div className="opening-curtain top"/><div className="opening-curtain bottom"/><div className="opening-content"><div className="opening-word" aria-label="SHULI">{'SHULI'.split('').map((c,i)=><span key={i} aria-hidden="true">{c}</span>)}</div><p className="opening-caption">A vision takes shape.</p><div className="opening-line"/></div><button className="opening-skip" onClick={complete}>跳过开场 ↗</button></div>;
}

function InteractiveTitle({started}) {
  const ref=useRef(null);
  useGSAP(()=>{
    if(!started||reduced())return;
    gsap.from('.letter',{yPercent:100,opacity:0,duration:1.15,stagger:.045,ease:'power4.out',delay:.08});
    const mm=gsap.matchMedia();mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
      const chars=gsap.utils.toArray('.letter',ref.current);
      const setters=chars.map(el=>({x:gsap.quickTo(el,'x',{duration:.55,ease:'power3.out'}),y:gsap.quickTo(el,'y',{duration:.55,ease:'power3.out'}),r:gsap.quickTo(el,'rotation',{duration:.65})}));
      const move=e=>{const rect=ref.current.getBoundingClientRect();setters.forEach((s,i)=>{const row=i<4?0:1,col=row===0?i:i-4,count=row===0?4:5;const dx=e.clientX-(rect.left+(col+.5)*rect.width/count),dy=e.clientY-(rect.top+(row+.5)*rect.height/2),force=Math.max(0,1-Math.hypot(dx,dy)/240);s.x(-dx*force*.12);s.y(-dy*force*.16);s.r(dx*force*.015);});};
      const leave=()=>setters.forEach(s=>{s.x(0);s.y(0);s.r(0);});ref.current.addEventListener('pointermove',move);ref.current.addEventListener('pointerleave',leave);return()=>{ref.current?.removeEventListener('pointermove',move);ref.current?.removeEventListener('pointerleave',leave);};
    });return()=>mm.revert();
  },{scope:ref,dependencies:[started],revertOnUpdate:true});
  return <h1 className="hero-title" ref={ref} aria-label="PORTFOLIO"><span className="title-row" aria-hidden="true">{'PORT'.split('').map((c,i)=><span className="letter" key={i}>{c}</span>)}</span><span className="title-row" aria-hidden="true">{'FOLIO'.split('').map((c,i)=><span className="letter" key={i}>{c}</span>)}</span></h1>;
}

function ResumeSection() {
  const [open,setOpen]=useState(false),[height,setHeight]=useState(null);
  const ref=useRef(null),overview=useRef(null),resume=useRef(null),entry=useRef(null),back=useRef(null),initialized=useRef(false);
  useEffect(()=>{const update=()=>{const panel=open?resume.current:overview.current;setHeight(Math.max(window.innerHeight,panel.scrollHeight));ScrollTrigger.refresh();};update();const ro=new ResizeObserver(update);ro.observe(open?resume.current:overview.current);window.addEventListener('resize',update);return()=>{ro.disconnect();window.removeEventListener('resize',update);};},[open]);
  useGSAP(()=>{if(!initialized.current){gsap.set(overview.current,{x:0,xPercent:0,opacity:1});gsap.set(resume.current,{x:0,xPercent:105,opacity:0});initialized.current=true;return;}const duration=reduced()?0:1.05;gsap.to(overview.current,{xPercent:open?-105:0,opacity:open?0:1,duration,ease:'power3.inOut'});gsap.to(resume.current,{xPercent:open?0:105,opacity:open?1:0,duration,ease:'power3.inOut',onComplete:()=>{if(open)back.current?.focus({preventScroll:true});}});if(open)gsap.fromTo('.resume-reveal',{x:reduced()?0:60,opacity:0},{x:0,opacity:1,duration:reduced()?0:.8,stagger:.1,delay:reduced()?0:.35,ease:'power3.out'});},{scope:ref,dependencies:[open]});
  const close=()=>{setOpen(false);requestAnimationFrame(()=>entry.current?.focus({preventScroll:true}));};
  return <section id="about" className={`about-scene ${open?'resume-open':''}`} ref={ref} style={height?{height}:undefined} aria-label="关于张树理"><div className="about-overview" ref={overview} inert={open} aria-hidden={open}><div className="identity"><AnimatedContent distance={30}><h2>SHULI</h2></AnimatedContent><AnimatedContent distance={25} delay={.08}><p className="chinese-name">张树理</p><p className="identity-role">AI Visual Designer / AI 视觉设计师</p></AnimatedContent><div className="identity-mark" aria-hidden="true">—</div><AnimatedContent distance={20} delay={.15}><p className="identity-description">从电影视效，到 AI 影像。<br/>在游戏世界与舞台空间之间，<br/>用视觉叙事，让想象有形。</p></AnimatedContent><button ref={entry} className="resume-entry outline-button gold" onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="resume-panel">进入简历 <Arrow/></button></div><span className="scene-caption">About the imagination behind the image.</span></div><div id="resume-panel" className="resume-panel" ref={resume} aria-hidden={!open} inert={!open}><aside className="resume-contact"><button ref={back} className="back-link" onClick={close}>← 返回介绍</button><h2>SHULI</h2><p className="resume-name">张树理</p><p className="resume-role">AI Visual Designer · 视觉设计师</p><dl><div><dt>Email</dt><dd><a href={'mailto:'+profile.email}>{profile.email}</a></dd></div><div><dt>WeChat</dt><dd>{profile.wechat}</dd></div><div><dt>Focus</dt><dd>AI 影像 / 视觉概念</dd></div></dl><a className="resume-download" href="/assets/shuli-resume.pdf" target="_blank" rel="noreferrer">Resume (PDF) <Arrow/></a></aside><div className="resume-information"><article className="resume-row resume-reveal"><div className="resume-label"><span>01</span><h3>Profile</h3></div><div><p className="serif-statement">Imagination, made visible.</p><p>{profile.introduction}</p></div></article><article className="resume-row resume-reveal"><div className="resume-label"><span>02</span><h3>Experience</h3></div><div className="experience-list">{profile.experience.map(item=><div className="experience-item" key={item.company}><p className="experience-time">{item.time}</p><div><h4>{item.company}</h4><p className="experience-role">{item.role}</p></div><p>{item.description}</p></div>)}</div></article><article className="resume-row resume-reveal"><div className="resume-label"><span>03</span><h3>Skills</h3></div><p className="resume-skills">AI Film <i>·</i> Visual Concept <i>·</i> VFX <i>·</i> Stage / AR <i>·</i> LoRA <i>·</i> Compositing</p></article><article className="resume-row resume-reveal"><div className="resume-label"><span>04</span><h3>Education</h3></div><div><p className="serif-statement small">河北大学 · 新闻学本科</p><p>2018 — 2023</p></div></article></div></div></section>;
}

function ConceptDialog({project,onClose}) {
  const dialog=useRef(null);
  useEffect(()=>{const focus=document.activeElement;dialog.current.showModal();const saved=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=saved;focus?.focus({preventScroll:true});};},[]);
  return <dialog ref={dialog} className="project-dialog migrated-concept-dialog" onCancel={onClose} aria-label={project.title}><div className="dialog-bar"><span>SHULI / {project.title}</span><button onClick={onClose}>关闭 ×</button></div><SceneCollection initialProject={project.id} close={onClose}/></dialog>;
}
function ProjectDialog({project,onClose}) {
  const ref=useRef(null),player=useRef(null);const [playRequest,setPlayRequest]=useState(0),[episode,setEpisode]=useState(0),[lightbox,setLightbox]=useState(null),[error,setError]=useState(false);
  useEffect(()=>{const focus=document.activeElement;ref.current.showModal();const saved=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=saved;focus?.focus({preventScroll:true});};},[]);
  const video=project.videos?.[episode];
  return <dialog ref={ref} className="project-dialog" onCancel={e=>{if(lightbox!==null){e.preventDefault();setLightbox(null);}else onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}} aria-labelledby="project-title"><div className="dialog-bar"><span>SHULI / Selected work</span><button onClick={onClose} aria-label="关闭作品详情">关闭 ×</button></div><div className="project-layout"><div className="project-heading"><p>{project.subtitle}</p><h2 id="project-title">{project.title}</h2></div>{video?<><div className="film-player"><FilmPlayer playRequest={playRequest} ref={player} key={video.src} src={video.src} poster={project.image} controls playsInline preload="metadata" onError={()=>setError(true)} aria-label={project.title+' '+video.title}/></div>{error&&<p role="alert">视频暂时无法播放。<a href={video.src}>打开影片流 ↗</a></p>}<div className="episode-controls">{project.videos.map((item,index)=><button key={item.src} className={index===episode?'active':''} aria-pressed={index===episode} onClick={()=>{player.current?.pause();setError(false);setEpisode(index);setPlayRequest(Date.now());}}>{item.title}<span>{Math.floor(item.duration/60)}:{String(Math.floor(item.duration%60)).padStart(2,'0')}</span></button>)}<span className="player-hint">点击播放器播放，可全屏观看</span></div></>:<img className="concept-main" src={project.image} alt={project.title+'视觉示意'}/>}<div className="project-description"><h3>创作介绍</h3><p>{project.description}</p>{project.placeholder&&<p className="placeholder-note">概念设计占位 · 等待正式作品</p>}</div>{project.gallery?.length>0&&<div className="project-stills"><h3>画面与视觉探索 <span>{project.gallery.length} frames</span></h3><div className="stills-grid">{project.gallery.map((src,index)=><button key={src} onClick={()=>setLightbox(index)} aria-label={'放大画面 '+(index+1)}><img src={src} alt={project.title+'画面 '+(index+1)} loading="lazy"/></button>)}</div></div>}</div>{lightbox!==null&&<div className="lightbox" role="group" aria-label="画面放大"><button className="lightbox-close" onClick={()=>setLightbox(null)}>返回项目 ×</button><img src={project.gallery[lightbox]} alt={project.title+'放大画面 '+(lightbox+1)}/><div className="lightbox-nav"><button onClick={()=>setLightbox((lightbox-1+project.gallery.length)%project.gallery.length)}>← 上一张</button><span>{lightbox+1} / {project.gallery.length}</span><button onClick={()=>setLightbox((lightbox+1)%project.gallery.length)}>下一张 →</button></div></div>}</dialog>;
}

function App() {
  const root=useRef(null),cursor=useRef(null);const [opening,setOpening]=useState(true),[paused,setPaused]=useState(()=>reduced()),[selected,setSelected]=useState(null),[menu,setMenu]=useState(false),[copied,setCopied]=useState(false),[filmPlaying,setFilmPlaying]=useState(false);
  useEffect(()=>{const old=document.body.style.overflow;if(opening)document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[opening]);
  useGSAP(()=>{if(opening||reduced())return;gsap.from('.hero-reveal',{y:24,opacity:0,stagger:.1,duration:1,ease:'power3.out',delay:.2});const mm=gsap.matchMedia();mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{const x=gsap.quickTo(cursor.current,'x',{duration:.3,ease:'power3.out'}),y=gsap.quickTo(cursor.current,'y',{duration:.3,ease:'power3.out'});const move=e=>{x(e.clientX);y(e.clientY);cursor.current.classList.add('visible');cursor.current.classList.toggle('interactive',!!e.target.closest('a,button'));};const leave=()=>cursor.current.classList.remove('visible');window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);};});return()=>mm.revert();},{scope:root,dependencies:[opening],revertOnUpdate:true});
  useEffect(()=>{requestAnimationFrame(()=>ScrollTrigger.refresh());},[opening]);
  async function copyWechat(){try{await navigator.clipboard.writeText(profile.wechat);setCopied(true);}catch{setCopied(false);}}
  return <div ref={root} className="portfolio"><a className="skip" href="#main">跳至内容</a><VideoBackdrop paused={paused} onPausedChange={setPaused} obscured={!!selected||filmPlaying}/><div className="cursor-ring" ref={cursor} aria-hidden="true"/><header className="header"><a className="wordmark" href="#home" aria-label="SHULI 首页">SHULI<sup>®</sup><span>AI Visual Designer</span></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu?'关闭 ×':'菜单 +'}</button><nav className={menu?'nav open':'nav'} id="navigation" aria-label="主导航">{[['home','首页'],['about','关于我'],['films','作品储备'],['contact','联系我']].map(([id,label])=><a href={'#'+id} key={id} onClick={()=>setMenu(false)}>{label}</a>)}</nav><a className="header-contact outline-button" href="#contact">聊聊新想法 <Arrow/></a></header><main id="main"><section id="home" className="hero"><div className="hero-content"><p className="hero-kicker hero-reveal">张树理 / AI 视觉设计师</p><InteractiveTitle started={!opening}/><p className="hero-statement hero-reveal">让想象，有形。让故事，发生。</p><p className="hero-summary hero-reveal">从电影视效到 AI 影像，让概念走向完整的视觉表达。</p><div className="hero-actions hero-reveal"><a className="outline-button gold" href="#films">探索作品 <Arrow/></a><a className="outline-button" href="#about">认识张树理 <span aria-hidden="true">→</span></a></div></div><p className="hero-signature hero-reveal">张树理 / SHULI</p><a className="scroll-cue" href="#about">Scroll to discover <span aria-hidden="true">↓</span></a></section><ResumeSection/><section id="films" className="works-section films-section"><div className="work-heading"><AnimatedContent distance={28}><p className="section-kicker">Selected motion</p><h2>AI FILMS</h2></AnimatedContent><AnimatedContent distance={20}><p className="section-description">从一个念头，到一个世界。<br/>AI 影像、游戏宣传与沉浸式叙事。</p></AnimatedContent></div><FilmLibrary projects={films} onDetails={setSelected} onPlayback={setFilmPlaying}/></section><section id="concepts" className="works-section concepts-section"><div className="work-heading"><AnimatedContent distance={28}><p className="section-kicker">Worlds in the making</p><h2>CONCEPTS</h2></AnimatedContent><AnimatedContent distance={20}><p className="section-description">游戏 / 舞台场景概念设计<br/>在空间与光影里，打开另一种现实。</p></AnimatedContent></div><ConceptFan projects={concepts} onSelect={setSelected}/></section><section id="contact" className="contact-section"><AnimatedContent distance={30}><p className="section-kicker">A new chapter</p><h2>LET’S CREATE.</h2><p className="contact-chinese">下一个世界，一起创造。</p></AnimatedContent><div className="contact-links"><a href={'mailto:'+profile.email}>{profile.email} <Arrow/></a><button onClick={copyWechat}>微信 / {profile.wechat} <span>{copied?'已复制':'复制 ↗'}</span></button><span role="status" className="sr-only">{copied?'微信号已复制':''}</span></div></section></main><footer><a href="#home">SHULI / 张树理</a><span>© 2026 · AI Film & Visual Concept</span><a href="#home">回到开场 ↑</a></footer>{opening&&<Opening onComplete={()=>setOpening(false)}/>} {selected&&(selected.conceptProject?<ConceptDialog project={selected} onClose={()=>setSelected(null)}/>:<ProjectDialog project={selected} onClose={()=>setSelected(null)}/>)}</div>;
}
createRoot(document.getElementById('root')).render(<App/>);





