import FloatingProject from './FloatingProject';
import floatingImages from './floating-images.json';
import lunarExtraImages from './lunar-extra-images.json';
import React,{useEffect,useRef,useState} from 'react';
import sceneImages from './scene-images.json';
import lunarAssets from './lunar-assets.json';
import {CockpitAssets,EcologyAssets,HangarAssets,UndergroundAssets} from './LunarBreakdowns';
import desertImages from './desert-images.json';
import DesertOracle from './DesertOracle';
import ewcImages from './ewc-images.json';
import EwcProject from './EwcProject';
import marsImages from './mars-images.json';
import MarsProject from './MarsProject';
import commercialImages from './commercial-images.json';
import CommercialProject from './CommercialProject';
const images=[...sceneImages,...lunarAssets,...desertImages,...ewcImages,...marsImages,...commercialImages,...lunarExtraImages,...floatingImages];
import './scene.css';
const intro='本项目为航天主题 VR 沉浸式体验游戏。围绕月球永久生存基地世界观，完成生态培育舱、飞行器机库、地下洞穴交通枢纽、载人飞船驾驶舱等多区域的视觉设定。';
const description='设计兼顾硬科幻工业质感与 VR 空间体验特性，重点推敲大尺度空间层级、叙事氛围、道具逻辑与视线构图，为 3D 美术、关卡团队提供完整前期视觉参考，让玩家在 VR 中感受人类地外定居基地的真实感与宏大感。';
export default function SceneCollection({close,initialProject=null}){
 const [project,setProject]=useState(initialProject),[active,setActive]=useState(null),[zoom,setZoom]=useState(false);
 const root=useRef(null),viewer=useRef(null),lastFocus=useRef(null),trigger=useRef(null),touch=useRef(null);
 const back=()=>{setProject(null);requestAnimationFrame(()=>trigger.current?.focus({preventScroll:true}));};
 const openProject=id=>{trigger.current=document.activeElement;setProject(id);};
 useEffect(()=>{root.current.closest('dialog').scrollTo({top:0,behavior:'instant'});},[project]);
 useEffect(()=>{const outer=root.current.closest('dialog');const cancel=e=>{if(e.target!==outer||!project)return;e.preventDefault();e.stopImmediatePropagation();back();};outer.addEventListener('cancel',cancel,true);return()=>outer.removeEventListener('cancel',cancel,true);},[project]);
 useEffect(()=>{if(active!==null){if(!viewer.current.open)viewer.current.showModal();}else if(viewer.current?.open){viewer.current.close();lastFocus.current?.focus({preventScroll:true});}},[active]);
 useEffect(()=>{
  if(!project||project==='floating')return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const scope=root.current,scrollRoot=scope.closest('dialog');
  const targets=[...scope.querySelectorAll('.lunar-section-heading,.lunar-section-label,.lunar-overview-grid>div,.lunar-keywords,.lunar-image,.asset-heading,.asset-side-note,.asset-spec-line,.lunar-habitat-intro,.lunar-offset-image>div,.lunar-hangar-banner>div,.lunar-closing-line,.desert-chapter,.desert-overview-label,.desert-overview-grid>div,.desert-traveler>div,.desert-feathers-detail>div,.desert-oasis-future>div,.ewc-heading,.ewc-intro>div,.ewc-intro>h4,.ewc-keywords,.ewc-note,.mars-heading,.mars-intro-copy,.mars-mood-strip,.mars-story,.mars-process-header,.mars-process-card,.kv-mars-chapter .lunar-image')];
  // Reveal individual text/image blocks so long sections never wait to become fully visible.
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('project-revealed');observer.unobserve(entry.target);}
  }),{root:scrollRoot,threshold:0,rootMargin:'0px 0px -35px 0px'});
  targets.forEach(el=>{el.classList.add('project-reveal');observer.observe(el);});
  const showAll=()=>{if(reduced.matches)targets.forEach(el=>el.classList.add('project-revealed'));};
  reduced.addEventListener('change',showAll);
  return()=>{observer.disconnect();reduced.removeEventListener('change',showAll);targets.forEach(el=>el.classList.remove('project-reveal','project-revealed'));};
 },[project]);
 const openImage=i=>{lastFocus.current=document.activeElement;setZoom(false);setActive(i);};
 const move=n=>{const list=project==='floating'?[71,68,62,65,69,63,70,64,72,66,73,67]:project==='lunar'?[4,5,6,14,15,60,16,0,18,19,1,2,20,21,22,3,61,23]:project==='commercial'?[52,50,49,51,56,57,58,59]:project==='mars'?[50,49,51]:project==='ewc'?[45,32,47,46,35,36,43,38,40,33,41,37,48,34,42,44,39]:[27,28,29,30,31,7,8,24,25,26,11];setZoom(false);setActive(i=>list[(list.indexOf(i)+n+list.length)%list.length]);};
 const image=(i,cls='')=><figure className={'lunar-image '+cls}><button onClick={()=>openImage(i)} aria-label={'放大：'+images[i].caption}><img src={images[i].preview} width={images[i].width} height={images[i].height} alt={images[i].caption} loading="lazy"/><span className="lunar-image-plus">＋</span></button><figcaption><span>{images[i].caption}</span><small>ENVIRONMENT CONCEPT / {images[i].id}</small></figcaption></figure>;
 const heading=(en,title,text)=><div className="lunar-section-heading"><div><span className="lunar-eyebrow">{en}</span><h3>{title}</h3></div><p>{text}</p></div>;
 return <div ref={root} className="scene-fullscreen">
 <header className={'scene-topbar'+(project?' in-project':'')}><span>SHULI <i>/</i> {project==='lunar'?'航天揽月 · VR GAME':project==='desert'?'Desert Oracle':project==='ewc'?'EWC 电竞世界杯':project==='mars'?'火星演唱会':project==='floating'?'悬浮剧场':project==='commercial'?'商业主视觉 / KEY VISUAL':'01 游戏/舞美场景概念'}</span><div>{project&&<button onClick={back}>← 项目目录</button>}<button onClick={close} autoFocus aria-label="关闭场景概念作品集">返回档案 ×</button></div></header>
 {!project?<><h2 className="scene-sr-only" id="project-title">游戏/舞美场景概念 · 项目档案</h2><div className="scene-module-grid">
 {[{id:'lunar',img:4,en:'VR GAME',name:'航天揽月',sub:'VR 游戏 · 场景概念设计'},{id:'desert',img:31,en:'IMMERSIVE SHOW',name:'Desert Oracle',sub:'沙特沙漠 · 沉浸式实景新媒体演出'},{id:'ewc',img:45,en:'ESPORTS WORLD CUP',name:'EWC 电竞世界杯',sub:'开幕式 · 舞台概念设计'},{id:'commercial',img:52,en:'COMMERCIAL KEY VISUAL',name:'商业主视觉',sub:'快手游戏 / 火星演唱会 / 美团'},{id:'floating',img:71,en:'FLOATING THEATRE',name:'悬浮剧场',sub:'沉浸式舞台视觉概念项目'}].map((p,i)=><button key={p.id} className={'scene-module scene-module-'+p.id} onClick={()=>openProject(p.id)} aria-label={i===0?'打开《航天揽月》VR 游戏':i===1?'打开 Desert Oracle':i===2?'打开 EWC 电竞世界杯':i===3?'打开商业主视觉':'打开悬浮剧场'}><img src={images[p.img].preview} alt={images[p.img].caption}/><div className="scene-module-top"><span>0{i+1} / {p.en}</span><span>SELECTED WORK</span></div><div className="scene-module-copy"><small>{i===0?'PERMANENT LUNAR HABITAT':i===1?'DESERT / CIVILIZATION / FUTURE':i===2?'GEOMETRY / NARRATIVE / SPECTACLE':i===3?'BRAND / CAMPAIGN / KEY VISUAL':'DANCE / SPACE / DIGITAL IMAGE'}</small><h3>{p.name}<span>↗</span></h3><p>{p.sub}</p></div></button>)}
 </div></>:project==='lunar'?<article className="lunar-case">
 <section className="lunar-hero"><img className="lunar-hero-art" src={images[4].preview} alt="航天揽月驾驶舱主视觉"/><div className="lunar-hero-grid"/><div className="lunar-hero-copy"><span className="lunar-eyebrow">ENVIRONMENT DESIGN / VR IMMERSIVE EXPERIENCE</span><h2 id="project-title">《航天揽月》<span>VR 游戏</span></h2><p>月球永久生存基地 · 多区域视觉设定</p></div><div className="lunar-hero-foot"><span>ZHANG SHULI / CONCEPT DESIGN</span><span>EXPLORE THE HABITAT ↓</span></div></section>
 <section className="lunar-overview lunar-paper"><div className="lunar-section-label">01 / PROJECT OVERVIEW</div><div className="lunar-overview-grid"><div><h3>在地球之外，<br/>构建栖居的可能。</h3><div className="lunar-meta"><span>项目类型<b>航天主题 VR 沉浸式体验游戏</b></span><span>设计方向<b>硬科幻 / 空间叙事 / 场景概念</b></span><span>视觉区域<b>生态培育舱 · 机库 · 枢纽 · 驾驶舱</b></span></div></div><div className="lunar-body"><p>{intro}</p><p>{description}</p></div></div><div className="lunar-keywords">{[['SPACE HIERARCHY','空间层级'],['INDUSTRIAL LOGIC','工业逻辑'],['IMMERSIVE SCALE','沉浸尺度']].map(([en,cn])=><span key={en}>{en}<small>{cn}</small></span>)}</div></section>
 <section className="lunar-cockpit">{heading('02 / SPACECRAFT COCKPIT','驶向月面的第一视角','以舷窗为视觉锚点，将操作区、舱体结构与星球远景组织成连续的空间叙事。')}{image(4,'lunar-panorama')}<div className="lunar-two-views">{image(5)}{image(6)}</div><CockpitAssets image={image}/></section>
 <section className="lunar-habitats lunar-paper">{heading('03 / PERMANENT LUNAR HABITAT','不止抵达，更是生活。','从生态培育到工业机库，从地表设施到地下交通，展开基地的多区域视觉设定。')}<div className="lunar-habitat-intro"><span>01 / ECOLOGICAL CULTIVATION</span><h4>生态培育舱</h4><p>悬浮与垂直培育结构，将植被、机械与人类尺度并置，呈现地外基地的生存系统。</p></div>{image(0,'lunar-panorama')}<EcologyAssets image={image}/><div className="lunar-offset-image">{image(1)}<div><span className="lunar-eyebrow">LIFE SUPPORT / 生态系统</span><h4>在钢铁之间，<br/>留出生命的位置。</h4><p>透明舱体、层叠植物与纵向结构，形成不同深度的视觉层级。</p></div></div></section>
 <section className="lunar-hangar"><div className="lunar-hangar-banner"><img src={images[2].preview} alt="飞行器机库全景"/><div><span className="lunar-eyebrow">02 / AIRCRAFT HANGAR</span><h3>工业秩序，<br/>与探索的尺度。</h3><p>飞行器机库 · 场景视觉设定</p><button onClick={()=>openImage(2)}>查看完整画面 ↗</button></div></div><div className="lunar-hangar-notes"><span>机体 / 工业结构</span><span>人物 / 尺度参照</span><span>光线 / 视线引导</span></div><HangarAssets image={image}/></section>
 <section className="lunar-underground">{heading('03 / UNDERGROUND TRANSIT HUB','向下，进入月球的另一面。','地下洞穴交通枢纽，以纵深通道、中央采光与层叠设施，构建基地内部的空间秩序。')}{image(3,'lunar-panorama')}<UndergroundAssets image={image}/><div className="lunar-closing-line"><span>HABITAT / SYSTEM / EXPLORATION</span><p>让想象中的世界，拥有可感知的尺度。</p></div></section>
 <footer className="lunar-end"><span>《航天揽月》VR 游戏<small>ENVIRONMENT CONCEPT · ZHANG SHULI</small></span><button onClick={back}>返回场景项目目录 ↗</button></footer>
 </article>:project==='desert'?<DesertOracle image={image} images={images} back={back}/>:project==='ewc'?<EwcProject image={image} images={images} back={back} openImage={openImage}/>:project==='floating'?<FloatingProject image={image} images={images} back={back}/>:project==='commercial'?<CommercialProject image={image} images={images} back={back} openImage={openImage}/>:<MarsProject image={image} images={images} back={back} openImage={openImage}/> }
 <dialog ref={viewer} className="scene-image-viewer" aria-label="场景原图查看" onCancel={e=>{e.preventDefault();e.stopPropagation();setActive(null);}} onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();move(e.key==='ArrowRight'?1:-1);}}}>
 {active!==null&&<><div className="scene-viewer-bar"><span>{images[active].caption}</span><div><button onClick={()=>setZoom(v=>!v)}>{zoom?'适应屏幕':'放大细节 ＋'}</button><button autoFocus aria-label="关闭场景原图" onClick={()=>setActive(null)}>关闭 ×</button></div></div><div className={'scene-viewer-art'+(zoom?' zoomed':'')} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(zoom||touch.current===null)return;const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>60)move(dx<0?1:-1);touch.current=null;}}><img src={images[active].src} alt={images[active].caption}/></div><div className="scene-viewer-bottom"><button onClick={()=>move(-1)} aria-label="上一张场景原图">← 上一张</button><span>← → 切换 / Esc 关闭</span><button onClick={()=>move(1)} aria-label="下一张场景原图">下一张 →</button></div></>}
 </dialog></div>;
}

