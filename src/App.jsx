import { useState } from 'react'
export default function App(){
 const [acc,setAcc]=useState([{id:1,name:'Grameen E-Com BD',handle:'@grameen.ecom'}])
 const [posts,setPosts]=useState([{id:1,text:'Summer Drop Live!',time:'10:30 AM'}])
 const [msg,setMsg]=useState('')
 return (
  <div style={{minHeight:'100vh',background:'#0a0a0c',color:'white',padding:20,fontFamily:'sans-serif'}}>
   <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #222',paddingBottom:12,marginBottom:20}}>
    <b>BANGLAR VOICE PRO - LIVE</b>
    <span style={{background:'#d7fe63',color:'black',padding:'4px 12px',borderRadius:999,fontSize:12,fontWeight:'bold'}}>bKash 999 BDT</span>
   </div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
    <div style={{background:'#17181c',padding:16,borderRadius:16,border:'1px solid #2a2e39'}}>CONNECTED: <b>{acc.length}</b></div>
    <div style={{background:'#17181c',padding:16,borderRadius:16,border:'1px solid #2a2e39'}}>REACH: <b>48.2K</b></div>
    <div style={{background:'#17181c',padding:16,borderRadius:16,border:'1px solid #2a2e39'}}>SCHEDULED: <b>{posts.length}</b></div>
    <div style={{background:'#d7fe63',color:'black',padding:16,borderRadius:16,fontWeight:'bold'}}>PRO PLAN<br/><span style={{fontSize:12}}>SaaS Ready - Supabase Live</span></div>
   </div>
   <div style={{background:'#17181c',padding:16,borderRadius:16,border:'1px solid #2a2e39',marginBottom:20}}>
    <div style={{fontWeight:'bold',marginBottom:12}}>📅 Content Calendar - Mon to Sun</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8}}>
     {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><div key={d} style={{background:'black',border:'1px solid #222',borderRadius:12,padding:8,minHeight:80}}><div style={{fontSize:10,color:'#666'}}>{d}</div>{posts.map(p=><div key={p.id} style={{fontSize:10,background:'#222',padding:4,borderRadius:6,marginTop:4}}>{p.text.slice(0,12)}</div>)}</div>)}
    </div>
   </div>
   <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="What's happening?" style={{width:'100%',background:'black',border:'1px solid #333',borderRadius:12,padding:12,color:'white',minHeight:70}}></textarea>
   <button onClick={()=>{if(msg){setPosts([...posts,{id:Date.now(),text:msg,time:'Now'}]); setMsg('')}}} style={{marginTop:12,width:'100%',height:44,background:'white',color:'black',borderRadius:999,fontWeight:'bold',border:'none'}}>Post Now + Calendar + Analytics - UNLIMITED</button>
   <div style={{marginTop:16}}>{posts.map(p=><div key={p.id} style={{background:'#111',padding:10,borderRadius:8,marginBottom:8,fontSize:13,border:'1px solid #222'}}>{p.text} - {p.time}</div>)}</div>
  </div>
 )
}
