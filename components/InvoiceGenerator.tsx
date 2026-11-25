"use client";
import { useMemo, useState } from "react";

type LineItem = { id: number; description: string; quantity: string; rate: string };
const money = (value: number, currency: string) => {
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 2 }).format(value); }
  catch { return currency + " " + value.toFixed(2); }
};
const MAX_AMOUNT = 1_000_000_000_000;
const rawAmount = (value: string) => Number(value);
const safe = (value: string) => { const n = rawAmount(value); return Number.isFinite(n) ? Math.min(MAX_AMOUNT, Math.max(0, n)) : 0; };
const lineAmount = (item: LineItem) => Math.min(MAX_AMOUNT, safe(item.quantity) * safe(item.rate));

export default function InvoiceGenerator() {
  const [business, setBusiness] = useState("Your Business Name");
  const [email, setEmail] = useState("");
  const [client, setClient] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [issueDate, setIssueDate] = useState((() => { const d = new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,"0"), String(d.getDate()).padStart(2,"0")].join("-"); })());
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState("Thank you for your business.");
  const [items, setItems] = useState<LineItem[]>([{ id: 1, description: "Service or product", quantity: "1", rate: "100" }]);
  const subtotal = useMemo(() => items.reduce((sum, item) => Math.min(MAX_AMOUNT, sum + lineAmount(item)), 0), [items]);
  const tax = Math.min(MAX_AMOUNT, subtotal * Math.min(100, safe(taxRate)) / 100);
  const total = Math.min(MAX_AMOUNT, subtotal + tax);
  const taxRateInvalid = taxRate.trim() === "" || !Number.isFinite(Number(taxRate)) || Number(taxRate) < 0 || Number(taxRate) > 100;
  const amountLimitExceeded = items.some(item => {
    const qty = rawAmount(item.quantity), rate = rawAmount(item.rate);
    return (item.quantity.trim() !== "" && (!Number.isFinite(qty) || qty > MAX_AMOUNT)) || (item.rate.trim() !== "" && (!Number.isFinite(rate) || rate > MAX_AMOUNT)) || safe(item.quantity) * safe(item.rate) > MAX_AMOUNT;
  }) || subtotal + tax > MAX_AMOUNT;
  const dueDateInvalid = Boolean(dueDate && issueDate && dueDate < issueDate);
  const updateItem = (id: number, key: keyof Omit<LineItem, "id">, value: string) => setItems(current => current.map(item => item.id === id ? { ...item, [key]: value } : item));
  const addItem = () => setItems(current => [...current, { id: Math.max(0, ...current.map(item => item.id)) + 1, description: "", quantity: "1", rate: "0" }]);
  const removeItem = (id: number) => setItems(current => current.length > 1 ? current.filter(item => item.id !== id) : current);
  return <div className="invoice-tool">
    <section className="invoice-editor panel">
      <div className="panel-kicker"><span>✳</span> INVOICE DETAILS</div>
      <h2>Build your invoice</h2>
      <p className="panel-intro">Fill in the details, add your line items and preview the total instantly.</p>
      <div className="invoice-field-grid">
        <label className="field"><span>Your business name</span><input value={business} onChange={e=>setBusiness(e.target.value)} placeholder="Business name"/></label>
        <label className="field"><span>Business email (optional)</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
        <label className="field"><span>Bill to / Customer</span><input value={client} onChange={e=>setClient(e.target.value)} placeholder="Customer name or company"/></label>
        <label className="field"><span>Invoice number</span><input value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} /></label>
        <label className="field"><span>Issue date</span><input type="date" value={issueDate} onChange={e=>setIssueDate(e.target.value)}/></label>
        <label className="field"><span>Due date</span><input type="date" min={issueDate || undefined} value={dueDate} onChange={e=>setDueDate(e.target.value)}/></label>
        <label className="field"><span>Currency</span><select value={currency} onChange={e=>setCurrency(e.target.value)}>{["USD","INR","GBP","EUR","CAD","AUD","AED"].map(code=><option key={code}>{code}</option>)}</select></label>
        <label className="field"><span>Tax rate (%)</span><input type="number" min="0" max="100" step="0.01" value={taxRate} onChange={e=>setTaxRate(e.target.value)}/></label>
      </div>
      {dueDateInvalid && <p className="field-error" role="alert">Due date must be on or after the issue date.</p>}
      {taxRateInvalid && <p className="field-error" role="alert">Enter a tax rate between 0 and 100 percent.</p>}
      {amountLimitExceeded && <p className="field-error" role="alert">One or more amounts exceed the supported limit. Reduce the quantity or rate before printing.</p>}
      <div className="invoice-items-heading"><div><span className="field-group-title">ITEMS & SERVICES</span></div><button type="button" className="invoice-add" onClick={addItem}>＋ Add item</button></div>
      <div className="invoice-line-list">
        {items.map((item,index)=><div className="invoice-line-editor" key={item.id}>
          <label className="field"><span>Description</span><input value={item.description} onChange={e=>updateItem(item.id,"description",e.target.value)} placeholder="What did you provide?"/></label>
          <label className="field"><span>Qty</span><input type="number" min="0" step="any" value={item.quantity} onChange={e=>updateItem(item.id,"quantity",e.target.value)}/></label>
          <label className="field"><span>Rate ({currency})</span><input type="number" min="0" step="any" value={item.rate} onChange={e=>updateItem(item.id,"rate",e.target.value)}/></label>
          <div className="invoice-line-total"><small>Line total</small><b>{money(lineAmount(item),currency)}</b><button type="button" onClick={()=>removeItem(item.id)} disabled={items.length===1} aria-label={"Remove item "+(index+1)}>Remove</button></div>
        </div>)}
      </div>
      <label className="field"><span>Notes / payment terms</span><textarea rows={3} value={notes} onChange={e=>setNotes(e.target.value)}/></label>
      <div className="invoice-actions"><button type="button" className="btn-primary" onClick={()=>window.print()} disabled={dueDateInvalid || taxRateInvalid || amountLimitExceeded}>Print / Save PDF <span>↗</span></button><span>Use your browser’s “Save as PDF” option.</span></div>
    </section>
    <section className="invoice-preview panel" aria-live="polite">
      <div className="invoice-preview-label">LIVE PREVIEW <span>● UPDATING</span></div>
      <div className="invoice-paper">
        <div className="invoice-paper-top"><div><div className="invoice-brand-mark">S</div><h2>{business || "Your Business Name"}</h2>{email&&<p>{email}</p>}</div><div className="invoice-word">INVOICE</div></div>
        <div className="invoice-paper-meta"><div><small>BILL TO</small><b>{client || "Customer name"}</b></div><div><small>INVOICE DETAILS</small><b>{invoiceNo || "—"}</b><span>Issued: {issueDate || "—"}</span><span>Due: {dueDate || "—"}</span></div></div>
        <div className="invoice-table"><div className="invoice-table-head"><span>DESCRIPTION</span><span>QTY</span><span>RATE</span><span>AMOUNT</span></div>
          {items.map(item=><div className="invoice-table-row" key={item.id}><span>{item.description || "—"}</span><span>{safe(item.quantity)}</span><span>{money(safe(item.rate),currency)}</span><b>{money(lineAmount(item),currency)}</b></div>)}
        </div>
        <div className="invoice-totals"><div><span>Subtotal</span><b>{money(subtotal,currency)}</b></div><div><span>Tax ({Math.min(100,safe(taxRate))}%)</span><b>{money(tax,currency)}</b></div><div className="invoice-grand-total"><span>Total due</span><b>{money(total,currency)}</b></div></div>
        <div className="invoice-paper-notes"><small>NOTES</small><p>{notes || "—"}</p></div>
        <div className="invoice-thanks">Thank you for choosing {business || "our business"}.</div>
      </div>
      <p className="invoice-privacy-note">Your invoice details are calculated in this browser. They are not sent to a server by this tool.</p>
    </section>
  </div>;
}
