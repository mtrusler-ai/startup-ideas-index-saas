'use client';
import { useEffect, useState } from "react";

type Idea = { id:string; title:string; summary:string; timing:string };

export default function Home(){
  const [ideas,setIdeas] = useState<Idea[]>([]);
  useEffect(()=>{ (async()=>{ const r=await fetch('/api/ideas'); const d=await r.json(); setIdeas(d.ideas||[]); })(); },[]);

  async function downloadPdf(i: Idea){
    const res = await fetch('/api/research', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title:i.title, timing:i.timing, summary:i.summary }) });
    const blob = await res.blob(); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${i.title.replace(/[^a-z0-9]+/gi,'_')}_research.pdf`; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Explore Ideas</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {ideas.map(i=> (
          <div key={i.id} className="card">
            <div className="text-xl font-semibold">{i.title}</div>
            <div className="text-cyan-300/80 text-sm mb-3">{i.summary}</div>
            <button className="btn text-sm" onClick={()=>downloadPdf(i)}>Download Research PDF</button>
          </div>
        ))}
      </div>
      {!ideas.length && <div className="text-sm text-cyan-300/80">No ideas yet. Ask an admin to seed the database.</div>}
    </div>
  );
}
