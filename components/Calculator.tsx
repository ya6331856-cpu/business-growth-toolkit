"use client";
import { useMemo, useState } from "react";

type Mode = "cleaning" | "margin" | "hourly" | "breakeven" | "markup";
const currencies = [
  { code: "USD", label: "USD — US Dollar" }, { code: "INR", label: "INR — Indian Rupee" },
  { code: "GBP", label: "GBP — British Pound" }, { code: "EUR", label: "EUR — Euro" },
  { code: "CAD", label: "CAD — Canadian Dollar" }, { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "AED", label: "AED — UAE Dirham" }
];
const num = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
export default function Calculator({ mode }: { mode: Mode }) {
  const [currency, setCurrency] = useState("USD");
  const [hours, setHours] = useState("3"), [workers, setWorkers] = useState("1"), [wage, setWage] = useState("22");
  const [supplies, setSupplies] = useState("12"), [travel, setTravel] = useState("8"), [margin, setMargin] = useState("35");
  const [revenue, setRevenue] = useState("500"), [cost, setCost] = useState("300");
  const [income, setIncome] = useState("50000"), [expenses, setExpenses] = useState("12000");
  const [billable, setBillable] = useState("1200"), [buffer, setBuffer] = useState("15");
  const [fixedCosts, setFixedCosts] = useState("2000"), [unitPrice, setUnitPrice] = useState("50"), [variableCost, setVariableCost] = useState("20");
  const [unitCost, setUnitCost] = useState("40"), [markup, setMarkup] = useState("50");

  const formatMoney = (value: number) => {
    if (!Number.isFinite(value)) return "Not achievable";
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
    catch { return currency + " " + value.toFixed(2); }
  };
  const result = useMemo(() => {
    if (mode === "cleaning") {
      const labour = Math.max(0,num(hours)) * Math.max(1,Math.floor(num(workers,1))) * Math.max(0,num(wage));
      const direct = labour + Math.max(0,num(supplies)) + Math.max(0,num(travel));
      const targetMargin = Math.min(90,Math.max(0,num(margin))) / 100;
      const suggested = direct / (1-targetMargin);
      return { main:suggested, cost:direct, profit:suggested-direct, detail:"Suggested job price", percent:targetMargin*100 };
    }
    if (mode === "margin") {
      const sales=Math.max(0,num(revenue)), totalCost=Math.max(0,num(cost)), profit=sales-totalCost;
      const percentage=sales>0?(profit/sales)*100:0;
      return { main:sales>0?percentage:Number.NaN,cost:totalCost,profit,detail:"Profit margin",percent:Number.isFinite(percentage)?Math.max(0,Math.min(100,percentage)):0 };
    }
    if (mode === "hourly") {
      const billableHours=Math.max(1,num(billable,1));
      const annualTarget=(Math.max(0,num(income))+Math.max(0,num(expenses)))*(1+Math.max(0,num(buffer))/100);
      return { main:annualTarget/billableHours,cost:billableHours,profit:annualTarget,detail:"Suggested hourly rate",percent:0 };
    }
    if (mode === "breakeven") {
      const fixed=Math.max(0,num(fixedCosts)), price=Math.max(0,num(unitPrice)), variable=Math.max(0,num(variableCost));
      const contribution=price-variable;
      return { main:fixed<=0?0:contribution>0?fixed/contribution:Infinity,cost:fixed,profit:contribution,detail:"Units needed to break even",percent:0 };
    }
    const base=Math.max(0,num(unitCost)), rate=Math.max(0,num(markup))/100;
    const selling=base*(1+rate);
    return { main:selling,cost:base,profit:selling-base,detail:"Suggested selling price",percent:Math.min(100,Math.max(0,rate*100)) };
  },[mode,hours,workers,wage,supplies,travel,margin,revenue,cost,income,expenses,billable,buffer,fixedCosts,unitPrice,variableCost,unitCost,markup]);

  const field=(label:string,value:string,set:(v:string)=>void,hint?:string,suffix?:string)=>(
    <label className="field"><span>{label}</span><div className="input-wrap">
      <input type="number" min={label === "Number of workers" ? 1 : 0} step={label === "Number of workers" ? 1 : "any"} inputMode="decimal" value={value} onChange={e=>set(label === "Number of workers" ? String(Math.max(1,Math.floor(num(e.target.value,1)))) : e.target.value)}/>
      {suffix&&<i>{suffix}</i>}
    </div>{hint&&<small>{hint}</small>}</label>
  );

  const currencySelector=<label className="field currency-field"><span>Currency for all amounts</span>
    <select value={currency} onChange={e=>setCurrency(e.target.value)} aria-label="Select currency">
      {currencies.map(item=><option value={item.code} key={item.code}>{item.label}</option>)}
    </select><small>Choose the currency used for every amount. This selector does not convert currencies.</small>
  </label>;

  return <div className="calculator-layout">
    <section className="panel calculator-form">
      <div className="panel-kicker"><span>✳</span> YOUR INPUTS</div>
      <h2>{mode==="cleaning"?"Tell us about the job":mode==="margin"?"Enter your business numbers":mode==="hourly"?"Set your income target":mode==="breakeven"?"Enter your product or service costs":"Set your product price"}</h2>
      <p className="panel-intro">Change any value to see your estimate update instantly.</p>
      {currencySelector}
      {mode==="cleaning"&&<>
        <div className="field-group-title">JOB DETAILS</div><div className="field-pair">{field("Estimated job hours",hours,setHours,undefined,"hrs")}{field("Number of workers",workers,setWorkers,undefined,"people")}</div>
        <div className="field-group-title">YOUR COSTS</div><div className="field-pair">{field("Hourly pay per worker",wage,setWage,undefined,currency+"/hr")}{field("Supplies & materials",supplies,setSupplies,undefined,currency)}</div>
        {field("Travel and other costs",travel,setTravel,undefined,currency)}
        <div className="field-group-title">PROFIT GOAL</div>{field("Target profit margin",margin,setMargin,"Values above 90% are capped to keep the estimate usable.","%")}
      </>}
      {mode==="margin"&&<><div className="field-group-title">YOUR NUMBERS</div>{field("Customer revenue",revenue,setRevenue,undefined,currency)}{field("Total job or product cost",cost,setCost,undefined,currency)}</>}
      {mode==="hourly"&&<><div className="field-group-title">ANNUAL TARGETS</div>{field("Desired annual owner income",income,setIncome,undefined,currency)}{field("Annual business expenses",expenses,setExpenses,undefined,currency)}{field("Annual billable hours",billable,setBillable,"Use realistic billable hours, not all working hours.","hrs")}{field("Safety buffer",buffer,setBuffer,undefined,"%")}</>}
      {mode==="breakeven"&&<><div className="field-group-title">FIXED BUSINESS COSTS</div>{field("Total fixed costs for the period",fixedCosts,setFixedCosts,"For example, monthly rent, salaries and subscriptions.",currency)}<div className="field-group-title">PER-UNIT NUMBERS</div>{field("Selling price per unit",unitPrice,setUnitPrice,undefined,currency)}{field("Variable cost per unit",variableCost,setVariableCost,"Include costs that rise with each unit sold.",currency)}</>}
      {mode==="markup"&&<><div className="field-group-title">PRODUCT COST</div>{field("Cost per item",unitCost,setUnitCost,undefined,currency)}<div className="field-group-title">PRICING GOAL</div>{field("Markup percentage",markup,setMarkup,"Markup is calculated on cost, not on the final selling price.","%")}</>}
    </section>
    <aside className="panel result-panel" aria-live="polite">
      <div className="result-topline"><span className="result-spark">✦</span><span>YOUR LIVE ESTIMATE</span><span className="result-live"><i/> UPDATED</span></div>
      <h2>{mode==="cleaning"?"Your suggested quote":mode==="margin"?"Your profit margin":mode==="hourly"?"Your hourly target":mode==="breakeven"?"Your break-even point":"Your suggested price"}</h2>
      <div className="result-caption">{result.detail}</div>
      <div className="result-value">{mode==="margin"?(Number.isFinite(result.main)?result.main.toFixed(1)+"%":"N/A"):mode==="breakeven"?(Number.isFinite(result.main)?Math.ceil(result.main).toLocaleString()+" units":"Not achievable"):formatMoney(result.main)}</div>
      {mode!=="hourly"&&mode!=="breakeven"&&<div className="result-progress" aria-label={"Indicator "+result.percent.toFixed(0)+" percent"}><div style={{width:result.percent+"%"}}/></div>}
      {mode==="cleaning"&&<><div className="result-line"><span>Estimated direct cost</span><strong>{formatMoney(result.cost)}</strong></div><div className="result-line"><span>Estimated gross profit</span><strong>{formatMoney(result.profit)}</strong></div></>}
      {mode==="margin"&&<><div className="result-line"><span>Revenue</span><strong>{formatMoney(Math.max(0,num(revenue)))}</strong></div><div className="result-line"><span>Profit / loss</span><strong>{formatMoney(result.profit)}</strong></div><div className="result-line"><span>Total cost</span><strong>{formatMoney(result.cost)}</strong></div></>}
      {mode==="hourly"&&<><div className="result-line"><span>Annual billable hours</span><strong>{Math.max(1,num(billable,1)).toLocaleString()}</strong></div><div className="result-line"><span>Annual revenue target</span><strong>{formatMoney(result.profit)}</strong></div></>}
      {mode==="breakeven"&&<><div className="result-line"><span>Fixed costs</span><strong>{formatMoney(result.cost)}</strong></div><div className="result-line"><span>Contribution per unit</span><strong>{formatMoney(result.profit)}</strong></div><p className="result-explainer">{result.cost<=0?"No fixed costs are entered, so the calculated break-even point is 0 units. Check that you have included all costs for this period.":Number.isFinite(result.main)?"Sell at least "+Math.ceil(result.main)+" units in this period to cover the fixed costs.":"Your selling price must be higher than the variable cost per unit to reach break-even."}</p></>}
      {mode==="markup"&&<><div className="result-line"><span>Item cost</span><strong>{formatMoney(result.cost)}</strong></div><div className="result-line"><span>Gross profit per item</span><strong>{formatMoney(result.profit)}</strong></div><div className="result-line"><span>Markup</span><strong>{Math.max(0,num(markup)).toFixed(1)}%</strong></div></>}
      <div className="result-tip"><span>✧</span><p><b>Keep in mind</b> This is a planning estimate, not financial or tax advice. Check your full overhead, local rules, job scope and market rates before making a business decision.</p></div>
    </aside>
  </div>;
}
