import React from 'react';
import assets from './cultural-kv-assets.json';
import StarWorld from './StarWorld';

export default function CulturalKV(){
 const art=(id,caption)=>{const asset=assets.find(a=>a.id===id);return <figure className="kv-asset cultural-art"><a href={asset.src} target="_blank" rel="noreferrer" aria-label={'查看大图：'+caption}><img src={asset.preview||asset.src} width={asset.width} height={asset.height} alt={caption} loading="lazy"/></a><figcaption>{caption}<span>查看大图 ↗</span></figcaption></figure>;};
 return <>
  <section className="cultural-chapter cultural-canal" aria-labelledby="canal-kv-title">
   <header className="cultural-intro kv-project-intro"><span>PROJECT 04 / TAIERZHUANG</span><h3 id="canal-kv-title">梦溯台儿庄</h3><p className="cultural-subtitle">文旅VR游戏宣传海报</p><p className="cultural-description">以台儿庄运河古城为创作基底，围绕“千年运河梦，幻境台儿庄”的核心主题展开视觉表达。提取古城飞檐斗拱、古舟水韵等标志性东方元素，用解构重组的手法打破传统古建筑的常规构图：悬浮错落的古建构件、留白水雾的水墨意境、静泊于水面的古船，营造虚实交织、如梦溯游的氛围感。</p></header>
   <div className="cultural-posters">{art('taierzhuang-1','梦溯台儿庄 / 悬浮古建')}{art('taierzhuang-2','梦溯台儿庄 / 运河幻境')}</div>
  </section>
  <StarWorld art={art}/>
 </>;
}
