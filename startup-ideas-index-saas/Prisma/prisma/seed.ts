import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
  const adminEmails = (process.env.ADMIN_EMAILS||"").split(",").map(s=>s.trim()).filter(Boolean);
  for(const email of adminEmails){
    await prisma.user.upsert({ where:{email}, update:{}, create:{email, plan:"pro"} });
  }

  const ideas = [
    {
      title:"AI Career Copilot",
      summary:"AI roadmaps for careers; skills, courses, portfolio.",
      problem:"Nonlinear careers; no coaching at scale.",
      solution:"Quarterly plans; ATS-aware resumes; integrations.",
      marketSize:"$400B+ ed/HR",
      targetUsers:"Mid-career, HR L&D",
      industry:"HR Tech",
      timing:"Growing",
      tags:["AI","career","upskilling"],
      risks:"Incumbent moat; commoditization"
    },
    {
      title:"Local Micro-SaaS Suite",
      summary:"<$20/mo vertical tools for SMBs.",
      problem:"SMBs underserved by bloated suites.",
      solution:"Modular micro-SaaS + Zapier.",
      marketSize:"$160B by 2030",
      targetUsers:"Restaurants, salons, clinics",
      industry:"SMB SaaS",
      timing:"Mature",
      tags:["SMB","billing","booking"],
      risks:"Feature parity race"
    },
    {
      title:"EcoSteps Box",
      summary:"Monthly eco products + guided habits.",
      problem:"Want to reduce footprint; lack steps.",
      solution:"Curated kits + nudges; impact tracking.",
      marketSize:"$70B subs",
      targetUsers:"Urban millennials & Gen Z",
      industry:"Climate / Consumer",
      timing:"Emerging",
      tags:["climate","subscription"],
      risks:"Churn; supply risk"
    },
    {
      title:"PulseWell Teams",
      summary:"3-minute mental fitness for remote teams.",
      problem:"Burnout & isolation.",
      solution:"Slack/Teams app; AI check-ins; manager insights.",
      marketSize:"$90B wellness",
      targetUsers:"Remote-first HR",
      industry:"B2B SaaS / Health",
      timing:"Growing",
      tags:["B2B","health","HR"],
      risks:"Engagement; privacy"
    },
  ];

  for (const i of ideas){
    try {
      await prisma.idea.create({ data: i });
    } catch {}
  }
}

main().then(()=>prisma.$disconnect()).catch(async e=>{console.error(e); await prisma.$disconnect(); process.exit(1);});
