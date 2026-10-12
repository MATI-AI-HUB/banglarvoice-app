import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_DATABASE_URL || import.meta.env.SUPABASE_URL || ''
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || ''

const supabase = SUPA_URL && SUPA_KEY? createClient(SUPA_URL, SUPA_KEY) : null

export default function App(){
  const [accounts,setAccounts]=useState([])
  const [posts,setPosts]=useState([])
  const [message,setMessage]=useState('Banglar Voice Summer 2026 Live!')
  const [selected,setSelected]=useState([])
  const [loading,setLoading]=useState(true)
  const [err,setErr]=useState('')

  useEffect(()=>{
    if(!supabase){ setErr('Supabase Env Missing'); setLoading(false); return; }
    supabase.auth.getSession().then(({data})=>{
      if(!data.session){
        supabase.auth.signInAnonymously().then(r=>{
          if(r.error){ setErr('Enable Anonymous in Supabase > Auth > Providers'); setLoading(false); }
          else load()
        })
      } else load(data.session.user.id)
    })
  },[])

  async function load(uid){
    if(!uid){ const {data}=await supabase.auth.getSession(); uid=data.session?.user?.id }
    const {data:a}=await supabase.from('social_accounts').select('*').order('created_at',{ascending:false})
    const {data:p}=await supabase.from('scheduled_posts').select('*').order('created_at',{ascending:false}).limit(20)
    setAccounts(a||[]); setPosts(p||[]); setLoading(false)
  }

  async function addDemo(){
    const {data:{session}}=await supabase.auth.getSession()
    const demo={user_id:session.user.id,platform:'facebook',username:'@grameen.'+Math.floor(Math.random()*100),display_name:'Grameen E-Com BD',page_id:'101'+Math.floor(Math.random()*10000),access_token:'token',status:'active',followers:'48K',avatar:'GE'}
    const {data,error}=await supabase.from('social_accounts').insert(demo).select()
    if(error) alert(error.message); else setAccounts([data[0],...accounts])
  }

  if(loading) return <div className="min-h-screen grid place-items-center bg-black text-white">Loading...<br/>{SUPA_URL.slice(0,30)}</div>
  if(err) return <div className="min-h-screen grid place-items-center bg-black text-white p-6 text-center">{err}<br/><br/><span className="text-xs text-zinc-500">URL: {SUPA_URL||'Missing'}<br/>Project: zndbgeswbcwxiznwlyvu</span></div>

  return (
    <div className="min-h-screen p-4 bg-[#0a0a0c] text-white">
      <header className="flex justify-between max-w-5xl mx-auto mb-6">
        <div className="flex gap-2 items-center"><div className="h-8 w-8 bg-[#d7fe63] text-black grid place-items-center font-black rounded">BV</div><b>Banglar Voice PRO - Live</b></div>
        <button onClick={addDemo} className="px-4 h-9 bg-[#d7fe63] text-black rounded-full font-bold">+ Add ID</button>
      </header>
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#17181c] p-4 rounded-xl border border-zinc-800">Total IDs: <b>{accounts.length}</b></div>
          <div className="bg-[#17181c] p-4 rounded-xl border border-zinc-800">Queued: <b>{posts.filter(x=>x.status==='queued').length}</b></div>
          <div className="bg-[#17181c] p-4 rounded-xl border border-zinc-800">Posted: <b>{posts.filter(x=>x.status==='posted').length}</b></div>
        </div>
        <div className="bg-[#17181c] p-4 rounded-xl border border-zinc-800">
          <b>Connected IDs (Supabase: zndbgeswbcwxiznwlyvu)</b>
          <div className="mt-3 grid md:grid-cols-2 gap-2">
            {accounts.map(a=><div key={a.id} className="p-3 bg-black border border-zinc-800 rounded-xl flex gap-2 items-center"><input type="checkbox" checked={selected.includes(a.id)} onChange={e=>setSelected(e.target.checked?[...selected,a.id]:selected.filter(x=>x!==a.id))}/><div className="h-8 w-8 bg-zinc-800 rounded-full grid place-items-center">{a.avatar}</div><div><div className="text-sm font-bold">{a.display_name}</div><div className="text-xs text-zinc-500">{a.username}</div></div></div>)}
            {accounts.length===0&&<div className="text-sm text-zinc-500">No IDs. Click + Add ID</div>}
          </div>
        </div>
        <div className="bg-[#17181c] p-4 rounded-xl border border-zinc-800">
          <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full min-h-[80px] bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white"></textarea>
          <button onClick={async()=>{const {data:{session}}=await supabase.auth.getSession(); const r=await fetch('/api/post-now',{method:'POST',body:JSON.stringify({accountIds:selected,message,userId:session.user.id})}); const j=await r.json(); alert('Done: '+j.results?.length)}} className="mt-2 w-full h-11 bg-white text-black rounded-full font-bold">Post Now</button>
        </div>
      </div>
    </div>
  )
}
