import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function Admin(){
  const { userId, sessionClaims } = auth();
  if(!userId) return <div className="text-sm">Please sign in.</div>;
  const email = (sessionClaims as any)?.email || (sessionClaims as any)?.email_address as string | undefined;
  const allow = (process.env.ADMIN_EMAILS||"").split(",").map(s=>s.trim().toLowerCase());
  if(!email || !allow.includes(email.toLowerCase())){
    return <div className="text-sm">You are signed in as {email||'unknown'}, but not authorized for Admin.</div>;
  }

  async function addDemo(){
    "use server";
    const sectors = ["AI","Fintech","Health","Climate","SMB SaaS"];
    const pick = (arr: string[]) => arr[Math.floor(Math.random()*arr.length)];
    const sector = pick(sectors);
    const title = `${sector} Copilot for Ops ${Math.floor(Math.random()*1000)}`;
    try{
      await prisma.idea.create({
        data: {
          title,
          summary:`Opportunity in ${sector}.`,
          problem:`Fragmented workflows in ${sector}.`,
          solution:`AI-assisted product for ${sector}.`,
          marketSize:"Large",
          targetUsers:"SMB",
          industry:sector,
          timing:"Growing",
          tags:[sector.toLowerCase(),"ai","automation"],
          risks:"Incumbent response"
        }
      });
    }catch{}
  }

  const count = await prisma.idea.count();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Console</h1>
      <p className="text-cyan-300/80 mb-4">Ideas in DB: {count}</p>
      <form action={addDemo}>
        <button className="btn">Run Discovery (mock)</button>
      </form>
    </div>
  );
}
