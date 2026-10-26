import React,{useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import './floating.css';
gsap.registerPlugin(ScrollTrigger,useGSAP);

export default function FloatingProject({image,images,back}){
 const root=useRef(null);
 useGSAP(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const scroller=root.current.closest('dialog');
   gsap.from('.floating-title>span',{yPercent:105,duration:1.2,stagger:.12,ease:'power3.out',clearProps:'transform'});
   root.current.querySelectorAll('.floating-reveal').forEach(el=>{
    gsap.fromTo(el,{y:30,autoAlpha:0},{y:0,autoAlpha:1,duration:1,clearProps:'transform,opacity,visibility',ease:'power3.out',scrollTrigger:{trigger:el,scroller,start:'top 94%',once:true}});
   });
  });return()=>mm.revert();
 },{scope:root});
 return <article className="floating-case" ref={root}>
  <section className="floating-hero">
   <img src={images[71].src} alt="圆环、齿轮与舞者构成的悬浮舞台" className="floating-hero-art"/>
   <div className="floating-hero-copy"><h2 id="project-title" className="floating-title"><span>悬浮剧场</span><span>Floating Theatre</span></h2><p>沉浸式舞台视觉概念项目</p></div>
   <p className="floating-hero-note">身体叙事 / 空间重构 / 数字影像</p>
  </section>
  <div className="floating-torn" aria-hidden="true"/>
  <section className="floating-intro">
   <div className="floating-round floating-reveal"><img src={images[66].src} alt="透明底舞者、数字光幕与舞台元素"/><span>舞蹈与数字影像</span></div>
   <div className="floating-intro-copy floating-reveal"><h3>让舞台，<br/>离开地面。</h3><p>本项目为悬浮式创新剧场视觉方案，我负责舞台概念视觉与氛围预演创作。</p><p>以悬浮舞台为核心载体，打破传统剧场的空间边界。舞蹈表演者的肢体叙事与巨型背景大屏影像联动，在虚实交织的空间里，让人文舞蹈表达和数字视觉特效共生，营造失重、空灵的沉浸观演体验，探索舞台表演与数字影像的全新融合形式。</p></div>
  </section>
  <section className="floating-mechanics">
   <header className="floating-section-title floating-reveal"><h3>机械的秩序，<br/>身体的自由。</h3><p>圆环、齿轮与垂直悬索，构成一座被光托起的剧场。</p></header>
   <div className="floating-wide floating-reveal">{image(68)}</div>
   <div className="floating-gears floating-reveal">{image(62,'floating-cutout')}<p>舞台造型、机械结构与表演者的组合设定。</p></div>
   <div className="floating-mechanical-collage"><div className="floating-reveal">{image(65,'floating-cutout')}</div><div className="floating-reveal">{image(71)}<p>机械尺度与人体尺度并置，让悬浮成为空间叙事的中心。</p></div></div>
  </section>
  <section className="floating-duet">
   <header className="floating-section-title floating-reveal"><h3>一束光，<br/>一段身体的独白。</h3><p>从线性的舞台，到彼此分离的空间，让舞者的动作连接虚实。</p></header>
   <div className="floating-duet-scenes"><div className="floating-reveal">{image(69)}</div><div className="floating-reveal">{image(70)}</div></div>
   <div className="floating-duet-assets"><div className="floating-reveal">{image(63,'floating-cutout')}</div><div className="floating-reveal">{image(64,'floating-cutout')}</div></div>
  </section>
  <section className="floating-digital">
   <div className="floating-digital-heading floating-reveal"><h3>当身体，<br/>进入数字的雨。</h3><p>让人文舞蹈表达，与数字影像共生。</p></div>
   <div className="floating-reveal">{image(72)}</div>
   <div className="floating-digital-assets floating-reveal">{image(66,'floating-cutout')}<p>表演者 / 光幕 / 舞台 / 光束<br/>独立元素，共同组成流动的观看体验。</p></div>
  </section>
  <section className="floating-ensemble">
   <header className="floating-section-title floating-reveal"><h3>空间向上，<br/>叙事展开。</h3><p>多层悬浮平台让舞蹈从平面走向立体，以光线建立人物之间的联系。</p></header>
   <div className="floating-reveal">{image(73)}</div>
   <div className="floating-ensemble-assets floating-reveal">{image(67,'floating-cutout')}</div>
   <p className="floating-closing floating-reveal">在失重的想象里，<br/>重新感知舞台。</p>
  </section>
  <footer className="floating-footer"><span>悬浮剧场<small>舞台概念视觉与氛围预演</small></span><button onClick={back}>返回项目目录 ↗</button></footer>
 </article>;
}
