import { cp, mkdir, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
const require=createRequire(import.meta.url);
let entry;
try { entry=require.resolve('yaneuraou.wasm'); }
catch { console.error('yaneuraou.wasm is not installed. Run npm install first.'); process.exit(1); }
const source=dirname(entry),dest=join(process.cwd(),'public','engine');
await mkdir(dest,{recursive:true});
for(const file of ['yaneuraou.js','yaneuraou.wasm','yaneuraou.worker.js','yaneuraou.data']){
 const from=join(source,file);try{await access(from)}catch{console.error(`Missing engine artifact: ${from}`);process.exit(1)}
 await cp(from,join(dest,file));
}
console.log(`Copied YaneuraOu WASM runtime and bundled evaluation data to ${dest}`);
