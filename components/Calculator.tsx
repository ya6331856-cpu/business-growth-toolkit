"use client";
import { useMemo, useState } from "react";

type Mode = "cleaning" | "margin" | "hourly";
const currencies = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "AED", label: "AED — UAE Dirham" }
];
const number = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
export default function Calculator({ mode }: { mode: Mode }) {
  const [currency, setCurrency] = useState("USD");
  const [hours, setHours] = useState("3");
  const [workers, setWorkers] = useState("1");
  const [wage, setWage] = useState("22");
  const [supplies, setSupplies] = useState("12");
  const [travel, setTravel] = useState("8");
  const [margin, setMargin] = useState("35");
  const [revenue, setRevenue] = useState("500");
  const [cost, setCost] = useState("300");
  const [income, setIncome] = useState("50000");
  const [expenses, setExpenses] = useState("12000");
  const [billable, setBillable] = useState("1200");
  const [buffer, setBuffer] = useState("15");

  const formatMoney = (value: number) => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2
      }).format(Number.isFinite(value) ? value : 0);
    } catch {
      return currency + " " + (Number.isFinite(value) ? value.toFixed(2) : "0.00");
    }
  };

  const result = useMemo(() => {
    if (mode === "cleaning") {
      const labour = Math.max(0, number(hours)) * Math.max(1, number(workers, 1)) * Math.max(0, number(wage));
      const direct = labour + Math.max(0, number(supplies)) + Math.max(0, number(travel));
      const targetMargin = Math.min(90, Math.max(0, number(margin))) / 100;
      const suggested = direct / (1 - targetMargin);
      return { main: suggested, cost: direct, profit: suggested - direct, detail: "Suggested job price", percent: targetMargin * 100 };
    }
    if (mode === "margin") {
      const sales = Math.max(0, number(revenue));
      const totalCost = Math.max(0, number(cost));
      const profit = sales - totalCost;
      const percentage = sales > 0 ? (profit / sales) * 100 : 0;
      return { main: percentage, cost: totalCost, profit, detail: "Profit margin", percent: Math.max(0, Math.min(100, percentage)) };
    }
    const billableHours = Math.max(1, number(billable, 1));
    const annualTarget = (Math.max(0, number(income)) + Math.max(0, number(expenses))) * (1 + Math.max(0, number(buffer)) / 100);
    const hourlyTarget = annualTarget / billableHours;
    return { main: hourlyTarget, cost: billableHours, profit: annualTarget, detail: "Suggested hourly rate", percent: 0 };
  }, [mode, hours, workers, wage, supplies, travel, margin, revenue, cost, income, expenses, billable, buffer]);

  const field = (label: string, value: string, set: (value: string) => void, hint?: string, suffix?: string) => (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input type="number" min="0" step="any" inputMode="decimal" value={value} onChange={event => set(event.target.value)} />
        {suffix && <i>{suffix}</i>}
      </div>
      {hint && <small>{hint}</small>}
    </label>
  );

  return (
    <div className="calculator-layout">
      <section className="panel calculator-form">
        <div className="panel-kicker"><span>✳</span> YOUR INPUTS</div>
        <h2>{mode === "cleaning" ? "Tell us about the job" : mode === "margin" ? "Enter your business numbers" : "Set your income target"}</h2>
        <p className="panel-intro">Change any value to see your estimate update instantly.</p>
        <label className="field currency-field">
          <span>Currency for all amounts</span>
          <select value={currency} onChange={event => setCurrency(event.target.value)} aria-label="Select currency">
            {currencies.map(item => <option value={item.code} key={item.code}>{item.label}</option>)}
          </select>
          <small>Choose the currency you used for every amount below. No currency conversion is performed.</small>
        </label>

        {mode === "cleaning" && <>
          <div className="field-group-title">JOB DETAILS</div>
          <div className="field-pair">{field("Estimated job hours", hours, setHours, undefined, "hrs")}{field("Number of workers", workers, setWorkers, undefined, "people")}</div>
          <div className="field-group-title">YOUR COSTS</div>
          <div className="field-pair">{field("Hourly pay per worker", wage, setWage, undefined, currency)}{field("Supplies & materials", supplies, setSupplies, undefined, currency)}</div>
          {field("Travel and other costs", travel, setTravel, undefined, currency)}
          <div className="field-group-title">PROFIT GOAL</div>
          {field("Target profit margin", margin, setMargin, "A 35% margin means profit is 35% of the final selling price. Values above 90% are capped.", "%")}
        </>}
        {mode === "margin" && <>
          <div className="field-group-title">YOUR NUMBERS</div>
          {field("Customer revenue", revenue, setRevenue, undefined, currency)}
          {field("Total job or product cost", cost, setCost, undefined, currency)}
        </>}
        {mode === "hourly" && <>
          <div className="field-group-title">ANNUAL TARGETS</div>
          {field("Desired annual owner income", income, setIncome, undefined, currency)}
          {field("Annual business expenses", expenses, setExpenses, undefined, currency)}
          {field("Annual billable hours", billable, setBillable, "Use realistic billable hours, not all working hours.", "hrs")}
          {field("Safety buffer", buffer, setBuffer, undefined, "%")}
        </>}
      </section>

      <aside className="panel result-panel" aria-live="polite">
        <div className="result-topline"><span className="result-spark">✦</span><span>YOUR LIVE ESTIMATE</span><span className="result-live"><i /> UPDATED</span></div>
        <h2>{mode === "cleaning" ? "Your suggested quote" : mode === "margin" ? "Your profit margin" : "Your hourly target"}</h2>
        <div className="result-caption">{result.detail}</div>
        <div className="result-value">{mode === "margin" ? result.main.toFixed(1) + "%" : formatMoney(result.main)}</div>
        {mode !== "hourly" && <div className="result-progress" aria-label={"Margin indicator " + result.percent.toFixed(0) + " percent"}><div style={{ width: result.percent + "%" }} /></div>}
        {mode === "cleaning" ? <>
          <div className="result-line"><span>Estimated direct cost</span><strong>{formatMoney(result.cost)}</strong></div>
          <div className="result-line"><span>Estimated gross profit</span><strong>{formatMoney(result.profit)}</strong></div>
        </> : mode === "margin" ? <>
          <div className="result-line"><span>Revenue</span><strong>{formatMoney(Math.max(0, number(revenue)))}</strong></div>
          <div className="result-line"><span>Profit / loss</span><strong>{formatMoney(result.profit)}</strong></div>
          <div className="result-line"><span>Total cost</span><strong>{formatMoney(result.cost)}</strong></div>
        </> : <>
          <div className="result-line"><span>Annual billable hours</span><strong>{Math.max(1, number(billable, 1)).toLocaleString()}</strong></div>
          <div className="result-line"><span>Annual revenue target</span><strong>{formatMoney(result.profit)}</strong></div>
        </>}
        <div className="result-tip"><span>✧</span><p><b>Keep in mind</b> This is a planning estimate, not financial or tax advice. Review local labour costs, taxes, overhead, job scope and market rates before quoting.</p></div>
      </aside>
    </div>
  );
}
