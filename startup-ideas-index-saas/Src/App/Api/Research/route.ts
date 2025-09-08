function esc(t: string){ return (t||"").replace(/\\\\/g,"\\\\\\\\").replace(/\\(/g,"\\\\(").replace(/\\)/g,"\\\\)"); }

function buildPdf(lines: string[]){
  const header = `%PDF-1.4\n`;
  const obj1 = `1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n`;
  const obj2 = `2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n`;
  const content = ["BT","/F1 12 Tf","72 720 Td"];
  lines.forEach((ln,i)=>{ if(i===0){ content.push(`(${esc(ln)}) Tj`);} else { content.push("0 -16 Td",`(${esc(ln)}) Tj`);} });
  content.push("ET");
  const stream = content.join("\n");
  const obj4 = `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj\n`;
  const obj3 = `3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n`;
  const obj5 = `5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n`;
  const xrefPos = (header+obj1+obj2+obj3+obj4+obj5).length;
  let offset=header.length; const off1=offset; offset+=obj1.length; const off2=offset; offset+=obj2.length; const off3=offset; offset+=obj3.length; const off4=offset; offset+=obj4.length; const off5=offset;
  const xref = `xref\n0 6\n0000000000 65535 f \n${off1.toString().padStart(10,'0')} 00000 n \n${off2.toString().padStart(10,'0')} 00000 n \n${off3.toString().padStart(10,'0')} 00000 n \n${off4.toString().padStart(10,'0')} 00000 n \n${off5.toString().padStart(10,'0')} 00000 n \n`;
  const trailer = `trailer << /Root 1 0 R /Size 6 >>\nstartxref\n${xrefPos}\n%%EOF`;
  return new TextEncoder().encode(header+obj1+obj2+obj3+obj4+obj5+xref+trailer);
}

export async function POST(req: Request){
  const { title = "Idea", timing = "—", summary = "" } = await req.json();
  const lines = [
    "Startup Ideas Index — Research Report",
    `Idea: ${title}`,
    `Market Timing: ${timing}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Signals, pains, edges, risks summarized…",
    summary,
  ];
  const pdfBytes = buildPdf(lines);
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${title.replace(/[^a-z0-9]+/gi,'_')}_research.pdf"`
    }
  });
}
