import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
const platforms = { facebook: { label: 'Facebook', color: '#1877F2' }, instagram: { label: 'Instagram', color: '#E1306C' }, tiktok: { label: 'TikTok', color: '#fff' }, linkedin: { label: 'LinkedIn', color: '#0A66C2' } }
export default function App(){
  const [accounts,setAccounts]=useState([])
  const [posts,setPosts]=useState([])
  const [message,setMessage]=useState('New Drop! Banglar Voice Summer 2026 is live!')
  const [selected,setSelected]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(!data.session){ supabase.auth.signInAnonymously().then(()=>loadData()) }
      else { loadData(data.session.user.id) }
    })
  },[])
  async function loadData(uid){
    if(!uid){ const {data}=await supabase.auth.getSession(); uid=data.session?.user?.id }
    if(!uid) return
    const {data:acc}=await supabase.from('social_accounts').select('*').order('created_at',{ascending:false})
    const {data:pst}=await supabase.from('scheduled_posts').select('*').order('scheduled_at',{ascending:false}).limit(20)
    setAccounts(acc||[]); setPosts(pst||[]); setLoading(false)
  }
  async function addDemo(){
    const {data:{session}}=await supabase.auth.getSession()
    const demo={ user_id: session.user.id, platform: 'facebook', username: '@grameen.ecom.'+Math.floor(Math.random()*100), display_name: 'Grameen E-Com BD', page_id: '101234'+Math.floor(Math.random()*1000), access_token: 'EAAK5b...'+Math.random().toString(36).slice(2,10), status: 'active', followers: '48.2K', avatar: 'GE' }
    const {data,error}=await supabase.from('social_accounts').insert(demo).select()
    if(!error) setAccounts([data[0],...accounts])
  }
  async function postNow(){
    if(selected.length===0) return alert('Select ID')
    const {data:{session}}=await supabase.auth.getSession()
    const res=await fetch('/api/post-now',{ method:'POST', body: JSON.stringify({ accountIds: selected, message, userId: session.user.id }) })
    const j=await res.json(); alert('Posted! '+j.results?.length); loadData()
  }
  if(loading) return <div className="min-h-screen grid place-items-center">Loading...</div>
  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between max-w-[1400px] mx-auto mb-6"><div className="flex gap-3 items-center"><div className="h-8 w-8 rounded bg-[#d7fe63] text-black grid place-items-center font-black">BV</div><div><div className="font-black">Banglar Voice App PRO</div><div className="text-[10px] text-zinc-500">{accounts.length} IDs • Supabase Live</div></div></div><button onClick={addDemo} className="h-9 px-4 rounded-full bg-[#d7fe63] text-black font-bold">+ Add ID</button></header>
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[{k:'Total IDs',v:accounts.length},{k:'Active',v:accounts.filter(a=>a.status==='active').length},{k:'Queued',v:posts.filter(p=>p.status==='queued').length},{k:'Posted',v:posts.filter(p=>p.status==='posted').length}].map(s=><div key={s.k} className="rounded-xl bg-[#17181c] border border-[#2a2e39] p-4"><div className="text-[10px] uppercase text-zinc-500">{s.k}</div><div className="text-2xl font-black mt-1">{s.v}</div></div>)}</div>
          <div className="rounded-xl bg-[#17181c] border border-[#2a2e39] p-4"><div className="font-bold mb-3">Connected IDs (Supabase)</div><div className="grid md:grid-cols-2 gap-3">{accounts.map(acc=><div key={acc.id} className="rounded-xl border p-3 flex gap-3 bg-[#0a0a0c] border-[#2a2e39]"><input type="checkbox" checked={selected.includes(acc.id)} onChange={e=>setSelected(e.target.checked?[...selected,acc.id]:selected.filter(id=>id!==acc.id))}/><div className="h-9 w-9 rounded-full grid place-items-center font-bold text-xs" style={{background: platforms[acc.platform]?.color||'#333'}}>{acc.avatar}</div><div><div className="font-bold text-sm">{acc.display_name}</div><div className="text-xs text-zinc-500">{acc.username}</div></div></div>)}{accounts.length===0&&<div className="text-sm text-zinc-500">No IDs yet. Click + Add ID</div>}</div></div>
          <div className="rounded-xl bg-[#17181c] border border-[#2a2e39] p-4 space-y-3"><div className="font-bold">Create Post</div><textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full min-h-[100px] rounded-xl bg-black border border-zinc-800 p-3 text-sm" /><div className="flex gap-2"><button onClick={postNow} className="flex-1 h-11 rounded-full bg-white text-black font-bold">Post Now via API</button><button onClick={async()=>{const {data:{session}}=await supabase.auth.getSession(); await fetch('/api/schedule-post',{method:'POST',body:JSON.stringify({accountIds:selected,message,scheduledAt:new Date(Date.now()+3600000).toISOString(),userId:session.user.id})}); alert('Scheduled!'); loadData()}} className="flex-1 h-11 rounded-full bg-[#d7fe63] text-black font-bold">Schedule +1h</button></div></div>
        </div>
        <div className="space-y-4"><div className="rounded-xl bg-[#17181c] border border-[#2a2e39] p-4"><div className="font-bold text-sm mb-3">Queue • Realtime</div><div className="space-y-2 max-h-[400px] overflow-auto">{posts.map(p=><div key={p.id} className="rounded-lg bg-black border border-zinc-800 p-3"><div className="text-xs">{p.message}</div><div className="text-[10px] text-zinc-500 mt-1">{new Date(p.scheduled_at).toLocaleString()} • {p.status}</div></div>)}</div></div></div>
      </div>
    </div>
  )
}
