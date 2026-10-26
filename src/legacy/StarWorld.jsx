import React from 'react';
import './star-world.css';

const base='/assets/concepts/cultural-kv/';
const element=(name,cls,alt='')=><img className={cls} src={base+name+'.webp'} alt={alt} loading="lazy"/>;
export default function StarWorld({art}){
 return <section className="cultural-stars star-world" aria-labelledby="stars-kv-title">
  <header className="star-world-hero">
   <div className="star-world-sky" aria-hidden="true"/>
   {element('guardian-cutout','star-hero-guardian')}
   {element('city-cutout','star-hero-city')}
   {element('scroll-cutout','star-hero-scroll')}
   {element('seeker-cutout','star-hero-seeker','古城星语主角：古装寻星者')}
   <div className="star-hero-copy"><span>PROJECT 05 / 新绛文旅 VR 游戏</span><h3 id="stars-kv-title">{element('title-white','star-title','古城星语')}</h3><p className="star-hero-tagline">异象“绛”临<br/>开启一段穿越千年的寻星之旅</p><p className="star-hero-note">古城古建 · 卧牛传说 · 绛州星象</p><a href="#star-world-story" className="star-story-link">进入古城世界 <span>↓</span></a></div>
  </header>
  <section className="star-world-story" id="star-world-story">
   <div className="star-ritual-art">{element('ritual-cutout','','双手托举星核，星轨环绕的仪式瞬间')}<span>THE AWAKENING / 星核初醒</span></div>
   <div className="star-story-copy"><span>WORLD & STORY</span><h4>卧牛古城，<br/><em>星河为引。</em></h4><p className="star-story-subtitle">古城星语｜新绛文旅 VR 游戏概念 KV 海报</p><p>为新绛古城文旅 VR 沉浸式游戏创作系列概念主视觉。新绛古称卧牛城，项目以此在地符号为核心创意锚点，以“异象‘绛’临，开启一段穿越千年的寻星之旅”作为故事主线，融合绛州传统星象文化、古城古建、卧牛传说，构建国风奇幻冒险世界观。</p><p>两张海报组成成套概念稿：一张聚焦双手托举星核的仪式瞬间，盘旋星轨、古籍长卷、环列古建铺展浩瀚星河幻境，卧牛神兽化作星宿灵牛盘旋于星图之中；另一张塑造主角形象，古装寻星者、机械化星宿灵牛、星云涡洞同框，将卧牛城的本土传说与流光星术、奇幻感碰撞融合。</p><p>整套视觉用来呈现 VR 游戏世界观，服务项目提案、前期宣发与故事氛围展示。</p></div>
  </section>
  <section className="star-guardian-scene"><div className="star-guardian-copy"><span>THE CELESTIAL GUARDIAN</span><h4>卧牛为形，<br/>星宿为魂。</h4><p>让卧牛城的本土传说，<br/>成为穿行于星图中的灵牛。</p><a href={base+'character-elements.webp'} target="_blank" rel="noreferrer">查看角色元素源图 ↗</a></div>{element('guardian-cutout','star-guardian-large','机械化星宿灵牛')}{element('scroll-cutout','star-guardian-scroll')}</section>
  <section className="star-stone-band"><div><span>SEVEN STONES / 星石设计</span><p>以七色星核，点亮寻星旅程。</p></div>{art('star-stones','七色星石 / 视觉元素设计')}</section>
  <section className="star-final-posters"><header><span>CONCEPT KEY VISUALS</span><h4>两幅画面，<br/>同一个古城幻境。</h4></header><div className="cultural-posters">{art('ritual-poster','托举星核 / 仪式篇')}{art('character-poster','古城寻星者 / 角色篇')}</div></section>
  <section className="star-type-paper"><header><span>LETTERING / 字体设计</span><h4>古城之名，落笔成星。</h4><p>横式标题与竖式组合，构成海报的文字视觉系统。</p></header><div className="cultural-type-grid">{art('lettering-horizontal','横式标题设计')}{art('lettering-vertical','竖式文字组合')}</div><a href={base+'ritual-elements.webp'} target="_blank" rel="noreferrer">查看仪式篇元素源图 ↗</a></section>
 </section>;
}
