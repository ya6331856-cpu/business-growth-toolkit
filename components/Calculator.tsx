"use client";
import { useMemo, useState } from "react";

type Mode = "cleaning" | "margin" | "hourly";
const money = (n:number) => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number.isFinite(n)?n:0);
export default function Calculator({mode}:{mode:Mode}) {
  const [hours,setHours]=useState("3"); const [workers,setWorkers]=useState("1"); const [wage,setWage]=useState("22"); const [supplies,setSupplies]=useState("12"); const [travel,setTravel]=useState("8"); const [margin,setMargin]=useState("35");
  const [revenue,setRevenue]=useState("500"); const [cost,setCost]=useState("300"); const [income,setIncome]=useState("50000"); const [expenses,setExpenses]=useState("12000"); const [billable,setBillable]=useState("1200"); const [buffer,setBuffer]=useState("15");
  const result=useMemo(()=>{
    if(mode==="cleaning"){const labour=Math.max(0,+hours||0)*Math.max(1,+workers||1)*Math.max(0,+wage||0);const direct=labour+Math.max(0,+supplies||0)+Math.max(0,+travel||0);const m=Math.min(90,Math.max(0,+margin||0))/100;return {main:direct/(1-m),cost:direct,profit:direct/(1-m)-direct,detail:"Suggested job price"};}
    if(mode==="margin"){const r=Math.max(0,+revenue||0),c=Math.max(0,+cost||0);return {main:r?((r-c)/r)*100:0,cost:c,profit:r-c,detail:"Profit margin"};}
    const h=Math.max(1,+billable||1);const target=(Math.max(0,+income||0)+Math.max(0,+expenses||0))*(1+Math.max(0,+buffer||0)/100)/h;return {main:target,cost:h,profit:target*h,detail:"Suggested hourly rate"};
  },[mode,hours,workers,wage,supplies,travel,margin,revenue,cost,income,expenses,billable,buffer]);
  const field=(label:string,value:string,set:(v:string)=>void,hint?:string)=><label className="field"><span>{label}</span><input type="number" min="0" step="any" value={value} onChange={e=>set(e.target.value)}/>{hint&&<small>{hint}</small>}</label>;
  return <div className="calculator-layout"><section className="panel"><h2>Enter your numbers</h2>
    {mode==="cleaning"&&<>{field("Estimated job hours",hours,setHours)}{field("Number of workers",workers,setWorkers)}{field("Hourly pay per worker ($)",wage,setWage)}{field("Supplies and materials ($)",supplies,setSupplies)}{field("Travel and other costs ($)",travel,setTravel)}{field("Target profit margin (%)",margin,setMargin,"A 35% margin means profit is 35% of the final selling price.")}</>}
    {mode==="margin"&&<>{field("Customer revenue ($)",revenue,setRevenue)}{field("Total job or product cost ($)",cost,setCost)}</>}
    {mode==="hourly"&&<>{field("Desired annual owner income ($)",income,setIncome)}{field("Annual business expenses ($)",expenses,setExpenses)}{field("Annual billable hours",billable,setBillable,"Use realistic billable hours, not all working hours.")}{field("Safety buffer (%)",buffer,setBuffer)}</>}
  </section><aside className="panel result-panel"><h2>Your estimate</h2><div className="result-caption">{result.detail}</div><div className="result-value">{mode==="margin"?result.main.toFixed(1)+"%":money(result.main)}</div>
    {mode==="cleaning"?<><div className="result-line"><span>Estimated direct cost</span><strong>{money(result.cost)}</strong></div><div className="result-line"><span>Estimated gross profit</span><strong>{money(result.profit)}</strong></div></>:mode==="margin"?<><div className="result-line"><span>Revenue</span><strong>{money(+revenue||0)}</strong></div><div className="result-line"><span>Profit / loss</span><strong>{money(result.profit)}</strong></div><div className="result-line"><span>Cost</span><strong>{money(result.cost)}</strong></div></>:<><div className="result-line"><span>Annual billable hours</span><strong>{Math.max(1,+billable||1).toLocaleString("en-US")}</strong></div><div className="result-line"><span>Target annual revenue</span><strong>{money(result.profit)}</strong></div></>}
    <p className="disclaimer">Planning estimate only. Actual prices depend on local labour costs, taxes, overhead, job scope and market conditions. Review your inputs before quoting a customer.</p>
  </aside></div>;
}