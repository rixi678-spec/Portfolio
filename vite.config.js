import {defineConfig} from 'vite';

const base='/' + (process.env.SITE_BASE_PATH||'').replace(/^\/+|\/+$/g,'') + '/';
const siteBase=base==='//' ? '/' : base;
export default defineConfig({
 base:siteBase,
 plugins:[{
  name:'portfolio-public-paths',enforce:'pre',
  transform(code,id){
   if(!id.replaceAll('\\','/').includes('/src/')||! /\.(?:jsx?|json)(?:\?|$)/.test(id))return;
   return code
    .replace(/(['"`])\/api\/media\//g,(_,q)=>q+siteBase+'media/')
    .replace(/(['"`])\/(assets|media)\//g,(_,q,folder)=>q+siteBase+folder+'/');
  }
 }]
});
