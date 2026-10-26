import React from 'react';
import './desert.css';
const background='在沙特广袤无垠的荒漠之中，打造一场融合古老阿拉伯文明与未来科幻美学的夜间沉浸式视听盛宴。以无垠沙海为天然舞台，将荒漠、古老岩殿、浩瀚星河作为叙事载体，串联起文明起源、启示、远行与对未来的畅想。';
export default function DesertOracle({image,images,back}){
 const chapter=(n,en,title,text)=><header className="desert-chapter"><span>{n} / {en}</span><div><h3>{title}</h3><p>{text}</p></div></header>;
 return <article className="desert-case">
  <section className="desert-hero"><img src={images[27].preview} alt={images[27].caption}/><div className="desert-hero-shade"/><div className="desert-title"><span>IMMERSIVE EXPERIENCE / SAUDI ARABIA</span><h2 id="project-title"><span>Desert</span><span>Oracle<span className="desert-title-dot">.</span></span></h2><p>古老文明的低语，与未来星际的光芒。</p><i/></div><div className="desert-hero-bottom"><span>01 / PROLOGUE — THE FIRST LIGHT</span><span>向旷野深处 ↓</span></div></section>
  <section className="desert-opening">{chapter('01','PROLOGUE','从一束光开始。','凝望、启示、迈步。让旅人的视线，成为进入荒漠叙事的起点。')}<div className="desert-opening-pair"><div>{image(28)}<p>02 — THE GAZE / 凝望</p></div><div>{image(29)}<p>03 — INTO THE WILDERNESS / 启程</p></div></div></section>
  <section className="desert-overview"><div className="desert-overview-label">DESERT ORACLE / PROJECT STATEMENT</div><div className="desert-overview-grid"><div><span>项目类型</span><h3>沙特沙漠沉浸式实景<br/>新媒体演出场景概念</h3><span>项目背景</span><p>{background}</p></div><div><span>作品阐述</span><h4>古老沙漠是文明的摇篮，<br/>也是连接过去与未来的旷野。</h4><p>本演出以沙特荒漠为天然巨型舞台，打破传统剧场边界，将光影、粒子特效、巨型虚拟装置投射于沙丘之上。叙事从荒漠旅人、商队远行的古老传说展开，巨大的天启之书在沙地上缓缓展开，文字化作漫天星尘；来自深空的星体降临古老岩窟，在黑夜中投下穿透沙雾的光束；最终，在荒漠中浮现出一座被光罩包裹的未来绿洲之城。</p><p>作品将阿拉伯传统人文意象与超现实科幻视觉结合，营造宏大、静谧又充满震撼感的旷野体验。观众行走于沙丘之间，在古老文明的低语与未来星际的光芒里，感受文明传承、探索与希望的主题，在苍茫大漠中完成一场跨越时空的精神对话。</p></div></div></section>
  <section className="desert-journey">{chapter('02','THE JOURNEY','沙海之上，文明远行。','以旅人与商队串联人文意象，让微小的人物与无垠沙海形成尺度对话。')}<div className="desert-traveler">{image(30)}<div><span>THE WHISPER OF CIVILIZATION</span><p>风沙留下纹理，<br/>旅人留下故事。</p></div></div>{image(31,'desert-wide')}</section>
  <section className="desert-book">{chapter('03','THE REVELATION','当文字，化作星尘。','天启之书在沙地展开，蓝色星河与金色沙丘，构成启示的两种视觉语调。')}<div className="desert-book-pair">{image(7)}{image(8)}</div></section>
  <section className="desert-feathers">{chapter('04','CONSTELLATION OF LIGHT','星河之羽，漂浮的诗。','以轻盈的发光形态与深蓝空间，延续从文明意象走向超现实世界的视觉体验。')}{image(25,'desert-wide')}<div className="desert-feathers-detail"><div><span>LIGHT / PARTICLES / IMMERSION</span><h4>以光为形，<br/>以旷野为幕。</h4><p>从人的视角走向整体阵列，展开虚拟装置与观众的空间关系。</p></div>{image(24)}</div></section>
  <section className="desert-future">{chapter('05','THE OASIS','在远方，看见希望。','圆弧光幕与未来绿洲，将旷野叙事引向文明传承、探索与希望。')}{image(26,'desert-wide')}<div className="desert-oasis-future">{image(11)}<div><span>PAST / PRESENT / FUTURE</span><h4>跨越时空，<br/>回到生命的绿洲。</h4><p>从古老沙海，到未来栖居。</p></div></div></section>
  <footer className="lunar-end"><span>Desert Oracle<small>IMMERSIVE SHOW · ENVIRONMENT CONCEPT</small></span><button onClick={back}>返回场景项目目录 ↗</button></footer>
 </article>;
}
