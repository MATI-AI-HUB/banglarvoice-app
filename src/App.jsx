import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
const URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_DATABASE_URL || ''
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || ''
const supa = createClient(URL, KEY)
export default function App(){
 const [acc,setAcc]=useState([]); const [loading,setL]=useState(true)
 useEffect(()=>{supa.auth.signInAnonymously().then(()=>{supa.from('social_accounts').select('*').then(({data})=>{setAcc(data||[]); setL(false)})})},[])
 if(loading) return <div className="min-h-screen bg-[#0a0a0c] text-white grid place-items-center">Banglar Voice PRO Loading...</div>
 return (
  <div className="min-h-screen bg-[#0a0a0c] text-white">
   <div className="border-b border-zinc-800 bg-[#111113] sticky top-0 z-10"><div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="h-9 w-9 rounded-xl bg-[#d7fe63] text-black font-black grid place-items-center">BV</div><div><div className="font-black tracking-tight">BANGLAR VOICE</div><div className="text-[10px] text-zinc-500 -mt-1 tracking-[0.2em]">SMM MANAGER • PRODUCTION</div></div></div><div className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">● LIVE • zndbge...lyvu</div></div></div>
   <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
    <div className="col-span-12 grid grid-cols-4 gap-4">
     {[{k:'Connected',v:acc.length,d:'Active social profiles'},{k:'Reach',v:'48.2K',d:'+12% this week'},{k:'Scheduled',v:'0',d:'In queue'},{k:'Engagement',v:'7.2%',d:'Avg. rate'}].map(i=><div key={i.k} className="rounded-2xl bg-[#17181c] border border-[#24262f] p-5"><div className="text-[11px] uppercase tracking-widest text-zinc-500">{i.k}</div><div className="text-3xl font-black mt-2">{i.v}</div><div className="text-xs text-zinc-500 mt-1">{i.d}</div></div>)}
    </div>
    <div className="col-span-8 rounded-2xl bg-[#17181c] border border-[#24262f] p-6"><div className="flex justify-between items-center mb-6"><h2 className="font-bold">Connected Accounts</h2><button onClick={async()=>{const {data:{session}}=await supa.auth.getSession(); const d={user_id:session.user.id,platform:'fb',username:'@grameen.'+Math.floor(Math.random()*99),display_name:'Grameen E-Com BD',status:'active',avatar:'GE'}; const {data}=await supa.from('social_accounts').insert(d).select(); setAcc([data[0],...acc])}} className="h-9 px-5 rounded-full bg-white text-black font-bold text-sm">+ Add Account</button></div><div className="grid grid-cols-2 gap-3">{acc.map(a=><div key={a.id} className="rounded-xl bg-black border border-zinc-800 p-4 flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-zinc-800 grid place-items-center font-bold">{a.avatar}</div><div><div className="font-bold text-sm">{a.display_name}</div><div className="text-xs text-zinc-500">{a.username} • {a.followers||'Active'}</div></div><div className="ml-auto h-2 w-2 bg-green-500 rounded-full animate-pulse"></div></div>)}{acc.length===0&&<div className="col-span-2 py-12 text-center text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">No accounts connected. This is Production SaaS Mode - Data saves in Supabase project zndbgeswbcwxiznwlyvu</div>}</div></div>
    <div className="col-span-4 rounded-2xl bg-[#d7fe63] text-black p-6"><div className="text-[11px] uppercase tracking-widest font-black opacity-60">PRO PLAN</div><div className="text-2xl font-black mt-2">SaaS Ready</div><div className="text-sm mt-2 opacity-80">Supabase + Netlify Auto Integration. No manual keys. Auto-deploy on git push. Enterprise-grade.</div><div className="mt-6 space-y-2 text-sm font-bold"><div>✓ Auto Env Injection</div><div>✓ Realtime DB</div><div>✓ Serverless Functions</div><div>✓ Anonymous Auth ON</div></div></div>
   </div>
  </div>
 )
}
