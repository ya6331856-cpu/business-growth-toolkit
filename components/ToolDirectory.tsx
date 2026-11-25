"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ToolItem = {
  icon: string; name: string; desc: string; href: string; tag: string;
  category: string; tone: string; num: string;
};

const toolItems: ToolItem[] = [
  {icon:"✦",name:"House Cleaning Price Calculator",desc:"Build a job price from labour, supplies, travel and your target margin.",href:"/tools/house-cleaning-price-calculator/",tag:"CLEANING",category:"Pricing",tone:"mint",num:"01"},
  {icon:"↗",name:"Profit Margin Calculator",desc:"See how much profit remains after costs and understand your margin.",href:"/tools/profit-margin-calculator/",tag:"FINANCE",category:"Finance",tone:"peach",num:"02"},
  {icon:"◷",name:"Hourly Rate Calculator",desc:"Set a sustainable hourly rate around your income goal and real capacity.",href:"/tools/hourly-rate-calculator/",tag:"PRICING",category:"Pricing",tone:"blue",num:"03"},
  {icon:"◎",name:"Break-Even Point Calculator",desc:"Find the sales volume needed to cover fixed and variable costs.",href:"/tools/break-even-calculator/",tag:"PLANNING",category:"Finance",tone:"mint",num:"04"},
  {icon:"＋",name:"Markup Calculator",desc:"Calculate a selling price and gross profit from item cost and markup.",href:"/tools/markup-calculator/",tag:"PRICING",category:"Pricing",tone:"peach",num:"05"},
  {icon:"▤",name:"Invoice Generator",desc:"Create a professional invoice with line items, tax and print-ready PDF layout.",href:"/tools/invoice-generator/",tag:"DOCUMENTS",category:"Documents",tone:"blue",num:"06"},
  {icon:"✎",name:"Quotation Generator",desc:"Prepare a customer-ready estimate with scope, costs, tax and validity date.",href:"/tools/quotation-generator/",tag:"DOCUMENTS",category:"Documents",tone:"mint",num:"07"},
  {icon:"✓",name:"Receipt Generator",desc:"Create a payment receipt with amount, date, method and transaction reference.",href:"/tools/receipt-generator/",tag:"DOCUMENTS",category:"Documents",tone:"peach",num:"08"},
  {icon:"▥",name:"Business Expense Tracker",desc:"Track monthly income, expenses and net profit, then export records to CSV.",href:"/tools/expense-tracker/",tag:"OPERATIONS",category:"Operations",tone:"blue",num:"09"},
  {icon:"▤",name:"Profit & Loss Statement",desc:"Turn tracked monthly income and expenses into a printable financial summary.",href:"/tools/profit-loss-statement/",tag:"FINANCE",category:"Finance",tone:"mint",num:"10"},
  {icon:"↔",name:"Cash Flow Calculator",desc:"Estimate cash coming in, money going out and your projected ending balance.",href:"/tools/cash-flow-calculator/",tag:"FINANCE",category:"Finance",tone:"blue",num:"11"},
  {icon:"◌",name:"Recurring Revenue Calculator",desc:"Model monthly service revenue with new clients, fees and customer churn.",href:"/tools/recurring-revenue-calculator/",tag:"GROWTH",category:"Growth",tone:"mint",num:"12"},
  {icon:"⌁",name:"Lead Conversion Calculator",desc:"Measure enquiry conversion, booked revenue and marketing cost per job.",href:"/tools/lead-conversion-calculator/",tag:"MARKETING",category:"Growth",tone:"peach",num:"13"},
  {icon:"☷",name:"Cleaning Checklist Generator",desc:"Build a room-by-room cleaning worksheet and track completed tasks.",href:"/tools/cleaning-checklist-generator/",tag:"OPERATIONS",category:"Operations",tone:"blue",num:"14"},
  {icon:"◈",name:"Job Profit Calculator",desc:"See job profit after labour, materials, travel and overhead.",href:"/tools/job-profit-calculator/",tag:"FINANCE",category:"Finance",tone:"peach",num:"15"},
  {icon:"◷",name:"Cleaning Time Estimator",desc:"Estimate cleaning hours from property size, rooms and team size.",href:"/tools/cleaning-time-estimator/",tag:"CLEANING",category:"Operations",tone:"mint",num:"16"},
  {icon:"↗",name:"Travel Fee Calculator",desc:"Build a travel charge from distance, vehicle cost and paid time.",href:"/tools/travel-fee-calculator/",tag:"PRICING",category:"Pricing",tone:"blue",num:"17"},
  {icon:"♙",name:"Staff Cost Calculator",desc:"Budget wages and employer on-costs for your service team.",href:"/tools/staff-cost-calculator/",tag:"OPERATIONS",category:"Operations",tone:"mint",num:"18"},
  {icon:"％",name:"Discount Calculator",desc:"Calculate customer savings and the final discounted price.",href:"/tools/discount-calculator/",tag:"PRICING",category:"Pricing",tone:"peach",num:"19"},
  {icon:"▤",name:"Sales Tax Calculator",desc:"Add tax to a price or extract tax already included in a total.",href:"/tools/sales-tax-calculator/",tag:"FINANCE",category:"Finance",tone:"blue",num:"20"},
  {icon:"◎",name:"Payment Fee Calculator",desc:"Estimate processing fees and the net payment you receive.",href:"/tools/payment-fee-calculator/",tag:"FINANCE",category:"Finance",tone:"mint",num:"21"},
  {icon:"◷",name:"Late Payment Fee Calculator",desc:"Estimate a simple prorated charge on an overdue invoice.",href:"/tools/late-payment-fee-calculator/",tag:"FINANCE",category:"Finance",tone:"peach",num:"22"},
  {icon:"▦",name:"Weekly Job Capacity Planner",desc:"Estimate realistic weekly jobs from team hours and utilisation.",href:"/tools/weekly-job-capacity-planner/",tag:"PLANNING",category:"Operations",tone:"blue",num:"23"},
  {icon:"✉",name:"Customer Review Request Generator",desc:"Create a polite, personalised message asking for honest feedback.",href:"/tools/review-request-generator/",tag:"MARKETING",category:"Growth",tone:"mint",num:"24"},
  {icon:"☷",name:"Service Scope Builder",desc:"Select tasks and prepare a clear work scope for customers.",href:"/tools/service-scope-builder/",tag:"DOCUMENTS",category:"Documents",tone:"peach",num:"25"},
];

const categories = ["All tools", "Pricing", "Finance", "Documents", "Operations", "Growth"];

export default function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All tools");
  const filtered = useMemo(() => toolItems.filter((tool) => {
    const matchesCategory = category === "All tools" || tool.category === category;
    const text = `${tool.name} ${tool.desc} ${tool.tag} ${tool.category}`.toLowerCase();
    return matchesCategory && text.includes(query.trim().toLowerCase());
  }), [query, category]);

  return (
    <section className="directory-shell">
      <div className="directory-toolbar">
        <div className="directory-search" role="search">
          <span aria-hidden="true">⌕</span>
          <input aria-label="Search business tools" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search calculators, invoices, expenses…" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </div>
        <span className="directory-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "tool" : "tools"}</span>
      </div>
      <div className="directory-filters" role="group" aria-label="Filter tools by category">
        {categories.map((item) => <button key={item} type="button" className={category === item ? "filter-chip active" : "filter-chip"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      {filtered.length ? (
        <div className="tool-grid directory-tool-grid">
          {filtered.map((tool) => <Link className="tool-card directory-tool-card" href={tool.href} key={tool.href}>
            <div className="tool-card-top"><span className={`tool-icon ${tool.tone}`}>{tool.icon}</span><span className="tool-number">{tool.num}</span></div>
            <span className="tool-tag">{tool.tag}</span><h3>{tool.name}</h3><p>{tool.desc}</p>
            <div className="card-bottom"><span>Open tool</span><b>↗</b></div>
          </Link>)}
        </div>
      ) : (
        <div className="directory-empty"><span>⌕</span><h3>No matching tools</h3><p>Try another keyword or choose a different category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All tools"); }}>Clear filters</button></div>
      )}
    </section>
  );
}
