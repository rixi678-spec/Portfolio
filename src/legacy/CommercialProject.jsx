import React,{useEffect,useRef} from 'react';
import MarsProject from './MarsProject';
import CulturalKV from './CulturalKV';
import assets from './kuaishou-assets.json';
import './commercial.css';

export default function CommercialProject({image,images,back,openImage}){
 const root=useRef(null);
 useEffect(()=>{const scope=root.current;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('kv-in');observer.unobserve(e.target);}}),{root:scope.closest('dialog'),threshold:0,rootMargin:'0px 0px -35px 0px'});scope.querySelectorAll('.kv-heading,.kv-project-intro,.kv-cover-copy,.kv-asset,.kv-drinks>div').forEach(el=>{el.classList.add('kv-reveal');observer.observe(el);});return()=>observer.disconnect();},[]);
 const art=(i,caption,cls='')=><figure key={assets[i].src} className={'kv-asset '+cls}><a href={assets[i].src} target="_blank" rel="noreferrer" aria-label={'查看原图：'+caption}><img src={assets[i].preview||assets[i].src} width={assets[i].width} height={assets[i].height} alt={caption} loading="lazy"/></a><figcaption>{caption}<span>查看原图 ↗</span></figcaption></figure>;
 const title=(en,cn,text)=><header className="kv-heading"><span>{en}</span><h3>{cn}</h3><p>{text}</p></header>;
 return <article ref={root} className="kv-case">
  <section className="kv-cover"><div className="kv-cover-copy"><span>04 / COMMERCIAL KEY VISUAL</span><h2 id="project-title">让品牌的想象，<br/>成为目光的焦点。</h2><p>商业活动主视觉 · 营销 KV 设计</p><div>01 快手游戏 <i>↘</i> 02 火星演唱会 <i>↘</i> 03 美团外卖 <i>↘</i> 04 梦溯台儿庄 <i>↘</i> 05 古城星语</div></div>{image(52,'kv-cover-image')}</section>
  <section className="kv-kuaishou"><div className="kv-project-intro"><span>PROJECT 01 / KUAISHOU GAMES</span><h3>快手游戏<br/>新春玩家狂欢节</h3><p>主视觉海报 / 商业活动主 KV 视觉设计</p><div className="kv-tags"><span>新春氛围</span><span>游戏群像</span><span>活动主视觉</span></div></div>
   {title('01 / FINAL KEY VISUAL','把新春热闹，汇成玩家的狂欢。','以橙金色、游戏角色与层叠舞台，组织节庆场景中的视觉焦点。')}{image(52)}
   <section className="kv-development">{title('02 / MJ EXPLORATION','从灵感发散，寻找狂欢的舞台。','围绕城市、环形装置与新春氛围展开 Midjourney 探索，比较空间构图、视觉焦点与色彩方向。')}<div className="kv-research-grid">{[0,1,2,3,4,5].map((n,i)=>art(n,'灵感探索 / 0'+(i+1)))}</div></section>
   <section className="kv-development">{title('03 / FIRST ITERATION','第一版：在城市中心，搭建玩家舞台。','从城市街区、霓虹建筑与中心舞台出发，通过线稿与画面推敲，建立场景的空间层次。')}<div className="kv-pair">{art(9,'第一版 / 构图线稿')}{art(8,'第一版 / 场景探索')}</div><div className="kv-pair">{art(7,'第一版 / 初步画面')}{art(10,'第一版 / 城市舞台视觉')}</div></section>
   <section className="kv-development">{title('04 / FINAL DEVELOPMENT','从元素搭建，\n到完整画面。','第二版将视觉聚焦于橙金色环形装置，以黑白线稿确定结构，推进背景、人物与最终主视觉的合成。')}{art(12,'第二版 / 黑白线稿')}<div className="kv-pair">{art(11,'第二版 / 场景背景')}{art(14,'第二版 / 人物与场景合成过程')}</div>{art(13,'最终版 / 新春玩家狂欢节主视觉')}</section>
   <section className="kv-development kv-element-section">{title('05 / CHARACTERS & ELEMENTS','把画面拆开，\n看见每一个创意零件。','人物、品牌装置与金色外环组成核心视觉系统，烟花、灯笼与节庆元素补充画面的热闹层次。')}<div className="kv-elements"><div className="kv-character-cutout"><img src="/assets/concepts/kuaishou/character-cutout.webp" alt="新春主角人物透明底抠图" loading="lazy"/><span>CHARACTER / 新春主角</span></div><div className="kv-element-parts">{art(16,'品牌装置 / 快手标识')}{art(19,'环形结构 / 金色轨道')}{art(15,'装置组合 / 金色空间')}</div></div>{art(20,'节庆元素 / 烟花、灯笼与装置拆解')}</section>
   <section className="kv-development">{title('06 / STYLE EXTENSIONS','同一场狂欢，\n不同的风格世界。','围绕同一人物与核心装置，将画面延伸至冬季雪景、古代中国、未来科技与夏日海滩。')}<div className="kv-style-grid">{[21,22,23,24].map((n,i)=>art(n,['冬季雪景 / WINTER','古代中国 / ANCIENT CHINA','未来科技 / FUTURE','夏日海滩 / SUMMER'][i]))}</div></section>
  </section>
  <section className="kv-mars-chapter"><header className="kv-project-intro"><span>PROJECT 02 / MARS CONCERT</span><h3>火星演唱会</h3><p>华晨宇 · 烟台站・日出场 / 概念氛围图</p></header><MarsProject embedded image={image} images={images} back={back} openImage={openImage}/></section>
  <section className="kv-meituan"><div className="kv-project-intro"><span>PROJECT 03 / MEITUAN</span><h3>秋天第一杯奶茶</h3><p>美团「秋天第一杯奶茶」营销主视觉 KV</p><div className="kv-tags"><span>水果灵感</span><span>乐园意象</span><span>系列营销海报</span></div></div>
   {title('01 / CAMPAIGN SERIES','把一口果香，变成一座快乐乐园。','芭乐摩天轮、荔枝水上乐园、芒果旋转木马与青柠滑道，以四种水果与游乐场景，串联整组营销视觉。')}
   <div className="kv-drinks">{[56,57,58,59].map((n,i)=><div key={n}><div className="kv-drink-label"><span>0{i+1} / {['GUAVA','LYCHEE','MANGO','LIME'][i]}</span><h4>{['芭乐 · 摩天轮','荔枝 · 水上乐园','芒果 · 旋转木马','青柠 · 清凉滑道'][i]}</h4></div>{image(n)}</div>)}</div>
  </section>
  <CulturalKV/>
  <footer className="lunar-end"><span>商业主视觉 / KEY VISUAL<small>BRAND CAMPAIGNS / CULTURAL WORLDS</small></span><button onClick={back}>返回项目目录 ↗</button></footer>
 </article>;
}
