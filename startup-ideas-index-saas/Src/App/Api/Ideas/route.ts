import { prisma } from "@/lib/db";

export async function GET(){
  const ideas = await prisma.idea.findMany();
  return Response.json({ ideas });
}
