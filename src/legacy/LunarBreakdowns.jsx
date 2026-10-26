import React from 'react';
import './lunar-breakdowns.css';

const Caption=({en,title,children})=><header className="asset-heading"><div><span>{en}</span><h4>{title}</h4></div><p>{children}</p></header>;

export function CockpitAssets({image}){
 return <div className="cockpit-assets">
  <section className="seat-board asset-paper" aria-label="驾驶舱座椅设计">
   <Caption en="COCKPIT / SEATING SYSTEM" title="驾驶座椅 · 造型设定">从正面到侧向，展开座椅、扶手控制器与支撑底座的完整造型。</Caption>
   <div className="seat-pair"><div>{image(14)}<span className="asset-view-label">01 / FRONT VIEW</span></div><div>{image(15)}<span className="asset-view-label">02 / THREE-QUARTER VIEW</span></div></div>
   <div className="asset-spec-line"><span>分区靠背 / 头枕</span><span>扶手控制器 / 操纵杆</span><span>支撑底座 / 工业结构</span></div>
  </section>
  <section className="cockpit-ui-board">
   <Caption en="COCKPIT / DISPLAY SURFACES" title="驾驶舱 · 屏幕、控制台与舱体元素拆解">展开驾驶舱的屏幕、控制台、座椅与舱体结构，呈现各元素的造型与组合关系。</Caption>
   {image(60,'cockpit-components-image')}
  </section>
 </div>;
}

export function EcologyAssets({image}){
 return <section className="ecology-assets" aria-label="悬浮生态培育舱元素拆解">
  <Caption en="CULTIVATION / COMPONENT DESIGN" title="从一个单元，到一组生态">吊挂结构、透明罩体与环形培育盘，共同构成悬浮生态舱的视觉语言。</Caption>
  <div className="ecology-assembly">{image(19,'asset-cutout')}<div className="asset-side-note"><span>ASSEMBLY / 01</span><h5>悬浮培育单元</h5><p>多组单元的组合形态与悬挂关系。</p></div></div>
  <div className="ecology-exploded">{image(18,'asset-cutout')}<div className="asset-side-note"><span>EXPLODED VIEW / 02</span><h5>环形结构拆解</h5><p>悬索、上盖、透明罩体、培育盘与机械底座，逐层展开。</p></div></div>
 </section>;
}

export function HangarAssets({image}){
 return <section className="hangar-assets asset-paper" aria-label="机库载具与引擎设定">
  <Caption en="HANGAR / VEHICLES & MACHINERY" title="工业空间中的机械尺度">球形载具与柱形引擎，以独立设定图展示外形、结构与材质关系。</Caption>
  <div className="hangar-vehicle-pair">{image(20)}{image(22)}</div>
  <div className="asset-spec-line"><span>SPHERICAL VEHICLE / 侧向形态</span><span>FRONT VIEW / 正面形态</span></div>
  <div className="hangar-engine-layout"><div className="asset-side-note"><span>MECHANICAL UNIT / 03</span><h5>柱形引擎</h5><p>金属外壳、外露管线与环形机械结构。</p></div>{image(21)}</div>
 </section>;
}

export function UndergroundAssets({image}){
 return <section className="underground-assets" aria-label="地下中庭元素拆解">
  <Caption en="UNDERGROUND / SPATIAL COMPONENTS" title="岩壁之内，系统相连">以拆解画面展示穹顶采光、缆车、轨道、平台与岩体的空间关系。</Caption>
  {image(61)}
  {image(23)}
  <div className="asset-spec-line"><span>穹顶 / 中央采光</span><span>缆车与轨道 / 交通系统</span><span>岩体与平台 / 空间边界</span></div>
 </section>;
}
