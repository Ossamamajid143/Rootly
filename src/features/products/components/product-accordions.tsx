"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const staticSections = [
  { title: "Shipping & returns", content: "ROOTLY delivers worldwide. Contact the team for current delivery timing, order help, and return eligibility." },
];

export function ProductAccordions({ description }: { description?: string }) {
  const sections = [...(description ? [{ title: "Product information", content: description }] : []), ...staticSections];
  const [open, setOpen] = useState(0);

  return <div className="mt-10 border-t border-border">{sections.map((section, index) => <div key={section.title} className="border-b border-border"><h2><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-bold text-forest">{section.title}<Plus size={19} aria-hidden="true" className={`shrink-0 transition-transform ${open === index ? "rotate-45" : ""}`} /></button></h2><div className={`grid transition-[grid-template-rows] duration-300 ${open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="pb-6 text-sm leading-7 text-muted">{section.content}</p></div></div></div>)}</div>;
}
