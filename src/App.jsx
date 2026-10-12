import { useState } from 'react'
const platforms={【entity-facebook¦canonical_name=Facebook】:{c:'#1877F2',l:'FB'},instagram:{c:'#E1306C',l:'IG'},tiktok:{c:'#fff',l:'TT'},linkedin:{c:'#0A66C2',l:'LI'}}
export default function App(){
 const [acc,setAcc]=useState([{id:1,name:'Grameen E-Com BD',handle:'@grameen.ecom',platform:'facebook'}])
 const [posts,setPosts]=useState([{id:1,text:'Summer Drop Live!',time:'10:30 AM',platform:'facebook'}])
 const [msg,setMsg]=useState('')
 return (
  <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
   <div className="border-b border-zinc-800 p-4 flex justify-between"><div className="flex gap-2 items-center"><div className="h-8 w-8 bg-[#d7fe63] text-black font-black rounded grid place-items-center">BV</div><b>BANGLAR VOICE PRO</b><span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full ml-2">● LIVE • SaaS Ready</span></div><button className="bg-[#d7fe63] text-black px-4 py-1.5 rounded-full font-bold text-sm">bKash Pay 999 BDT</button></div>
   <div className="p-6 grid grid-cols-12 gap-6 max-w-7xl mx-auto">
    <div className="col-span-12 grid grid-cols-4 gap-4">
     <div className="bg-[#17181c] border border-zinc-800 p-5 rounded-2xl"><div className="text-xs text-zinc-500">CONNECTED</div><div className="text-3xl font-black mt-1">{acc.length}</div></div>
     <div className="bg-[#17181c] border border-zinc-800 p-5 rounded-2xl"><div className="text-xs text-zinc-500">REACH</div><div className="text-3xl font-black mt-1">48.2K</div></div>
     <div className="bg-[#17181c] border border-zinc-800 p-5 rounded-2xl"><div className="text-xs text-zinc-500">SCHEDULED</div><div className="text-3xl font-black mt-1">{posts.length}</div></div>
     <div className="bg-[#d7fe63] text-black p-5 rounded-2xl"><div className="text-xs font-black opacity-60">PRO PLAN</div><div className="text-xl font-black mt-1">bKash: 017XX-XXXXXX</div><div className="text-xs mt-1">999 BDT / month - Unlimited</div></div>
    </div>
    <div className="col-span-8 bg-[#17181c] border border-zinc-800 rounded-2xl p-6">
     <div className="flex justify-between mb-4"><h2 className="font-bold">📅 Content Calendar</h2><button onClick={()=>{const p=prompt('Platform? fb/ig'); if(p) setAcc([...acc,{id:Date.now(),name:'New Page',handle:'@new',platform:p}])}} className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold">+ Connect Facebook</button></div>
     <div className="grid grid-cols-7 gap-2">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><div key={d} className="bg-black border border-zinc-800 rounded-xl p-3 min-h-[120px]"><div className="text-xs text-zinc-500">{d}</div>{posts.map(po=><div key={po.id} className="mt-2 text-xs bg-zinc-900 p-2 rounded-lg border-l-2" style={{borderColor:platforms[po.platform]?.c}}>{po.text.slice(0,20)}</div>)}</div>)}</div>
     <div className="mt-6"><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="What's happening for Banglar Voice?" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm h-20"></textarea><div className="flex gap-2 mt-3"><button onClick={()=>{if(msg) setPosts([...posts,{id:Date.now(),text:msg,time:'Now',platform:'facebook'}]); setMsg('')}} className="flex-1 bg-white text-black h-10 rounded-full font-bold">Post Now via API</button><button onClick={()=>{if(msg) setPosts([...posts,{id:Date.now(),text:msg,time:'+1h',platform:'instagram'}]); setMsg('')}} className="flex-1 bg-[#d7fe63] text-black h-10 rounded-full font-bold">Schedule + bKash Invoice</button></div></div>
    </div>
    <div className="col-span-4 space-y-4">
     <div className="bg-[#17181c] border border-zinc-800 rounded-2xl p-6"><h3 className="font-bold text-sm mb-4">📊 Analytics - 7 Days</h3><div className="flex items-end gap-2 h-24">{[40,70,45,90,60,80,55].map((h,i)=><div key={i} className="flex-1 bg-[#d7fe63] rounded-t" style={{height:h+'%'}}></div>)}</div><div className="flex justify-between text-xs text-zinc-500 mt-2"><span>Mon</span><span>Sun</span></div></div>
     <div className="bg-[#17181c] border border-zinc-800 rounded-2xl p-6"><h3 className="font-bold text-sm mb-3">Queue</h3>{posts.map(p=><div key={p.id} className="text-xs bg-black border border-zinc-800 p-2 rounded-lg mb-2 flex justify-between"><span>{p.text.slice(0,25)}</span><span className="text-zinc-500">{p.time}</span></div>)}</div>
    </div>
   </div>
  </div>
 )
}
