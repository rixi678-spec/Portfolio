import React from 'react';

export default function ConceptFan({projects,onSelect}) {
  return <div className="concept-fan" role="group" aria-label="五个游戏与舞美概念模块">{projects.map((project,index)=>{
    const offset=index-2;
    return <button key={project.id} className="concept-tile" style={{'--fan-offset':offset,'--fan-distance':Math.abs(offset),'--fan-layer':5-Math.abs(offset)}} onClick={()=>onSelect(project)} aria-label={'打开'+project.title+'模块'}><img src={project.image} alt={project.title+'项目封面'}/><span className="concept-tile-scrim"/><span className="concept-tile-top"><span>{project.subtitle}</span><span aria-hidden="true">↗</span></span><span className="concept-tile-caption"><strong>{project.title}</strong><span>探索项目 ↗</span></span><svg className="edge-light" viewBox="0 0 280 380" preserveAspectRatio="none" aria-hidden="true"><rect className="edge-base" x="2" y="2" width="276" height="376" rx="18"/><rect className="edge-traveller" x="2" y="2" width="276" height="376" rx="18" pathLength="100"/></svg></button>;
  })}</div>;
}
