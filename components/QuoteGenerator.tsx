"use client";
import { useMemo, useState } from "react";
type QuoteItem = { id:number; description:string; quantity:string; rate:string };
const amount=(v:number,c:string)=>{try{return new Intl.NumberFormat(undefined,{style:"currency",currency:c,maximumFractionDigits:2}).format(v)}catch{return c+" "+v.toFixed(2)}};
const n=(v:string)=>{const x=Number(v);return Number.isFinite(x)?Math.max(0,x):0};
export default function QuoteGenerator(){
 const [business,setBusiness]=useState("Your Business Name"),[email,setEmail]=useState(""),[client,setClient]=useState(""),[quoteNo,setQuoteNo]=useState("QT-001"),[date,setDate]=useState(()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")}),[valid,setValid]=useState(""),[currency,setCurrency]=useState("USD"),[taxRate,setTaxRate]=useState("0"),[notes,setNotes]=useState("This estimate is valid until the date shown above. Work will begin after your approval."),[items,setItems]=useState<QuoteItem[]>([{id:1,description:"Service or project",quantity:"1",rate:"250"}]);
 const subtotal=useMemo(()=>items.reduce((s,x)=>s+n(x.quantity)*n(x.rate),0),[items]);const tax=subtotal*Math.min(100,n(taxRate))/100;const total=subtotal+tax;
 const edit=(id:number,key:"description"|"quantity"|"rate",value:string)=>setItems(xs=>xs.map(x=>x.id===id?{...x,[key]:value}:x));
 return <div className="quote-tool">
 <section className="quote-editor panel"><div className="panel-kicker"><span>✳</span> ESTIMATE DETAILS</div><h2>Prepare your quotation</h2><p className="panel-intro">Describe the work, set your rates and share a clear estimate with your customer.</p>
 <div className="invoice-field-grid">
 <label className="field"><span>Your business name</span><input value={business} onChange={e=>setBusiness(e.target.value)} /></label><label className="field"><span>Business email (optional)</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
 <label className="field"><span>Prepared for</span><input value={client} onChange={e=>setClient(e.target.value)} placeholder="Customer or company"/></label><label className="field"><span>Quote number</span><input value={quoteNo} onChange={e=>setQuoteNo(e.target.value)}/></label>
 <label className="field"><span>Quote date</span><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label className="field"><span>Valid until (optional)</span><input type="date" min={date||undefined} value={valid} onChange={e=>setValid(e.target.value)}/></label>
 <label className="field"><span>Currency</span><select value={currency} onChange={e=>setCurrency(e.target.value)}>{["USD","INR","GBP","EUR","CAD","AUD","AED"].map(x=><option key={x}>{x}</option>)}</select></label><label className="field"><span>Tax rate (%)</span><input type="number" min="0" max="100" step="0.01" value={taxRate} onChange={e=>setTaxRate(e.target.value)}/></label>
 </div>
 <div className="invoice-items-heading"><span className="field-group-title">PROPOSED WORK & COSTS</span><button type="button" className="invoice-add" onClick={()=>setItems(xs=>[...xs,{id:Math.max(0,...xs.map(x=>x.id))+1,description:"",quantity:"1",rate:"0"}])}>＋ Add item</button></div>
 {items.map((x,i)=><div className="invoice-line-editor" key={x.id}><label className="field"><span>Work / item {i+1}</span><input value={x.description} onChange={e=>edit(x.id,"description",e.target.value)} placeholder="Describe the work"/></label><label className="field"><span>Qty</span><input type="number" min="0" step="any" value={x.quantity} onChange={e=>edit(x.id,"quantity",e.target.value)}/></label><label className="field"><span>Rate ({currency})</span><input type="number" min="0" step="any" value={x.rate} onChange={e=>edit(x.id,"rate",e.target.value)}/></label><div className="invoice-line-total"><small>Line total</small><b>{amount(n(x.quantity)*n(x.rate),currency)}</b><button type="button" disabled={items.length===1} onClick={()=>setItems(xs=>xs.filter(y=>y.id!==x.id))}>Remove</button></div></div>)}
 <label className="field"><span>Scope, assumptions & notes</span><textarea rows={4} value={notes} onChange={e=>setNotes(e.target.value)}/></label>
 <div className="invoice-actions"><button type="button" className="btn-primary" onClick={()=>window.print()}>Print / Save PDF <span>↗</span></button><span>Customer approval and payment collection are handled separately.</span></div>
 </section>
 <section className="quote-preview panel" aria-live="polite"><div className="invoice-preview-label">LIVE QUOTATION PREVIEW <span>● UPDATING</span></div><div className="quote-paper">
 <div className="quote-paper-head"><div><div className="invoice-brand-mark">S</div><h2>{business||"Your Business Name"}</h2>{email&&<p>{email}</p>}</div><div><strong>QUOTATION</strong><small>ESTIMATE</small></div></div>
 <div className="invoice-paper-meta"><div><small>PREPARED FOR</small><b>{client||"Customer name"}</b></div><div><small>QUOTE DETAILS</small><b>{quoteNo||"—"}</b><span>Date: {date||"—"}</span><span>Valid until: {valid||"Not specified"}</span></div></div>
 <div className="invoice-table"><div className="invoice-table-head"><span>DESCRIPTION</span><span>QTY</span><span>RATE</span><span>AMOUNT</span></div>{items.map(x=><div className="invoice-table-row" key={x.id}><span>{x.description||"—"}</span><span>{n(x.quantity)}</span><span>{amount(n(x.rate),currency)}</span><b>{amount(n(x.quantity)*n(x.rate),currency)}</b></div>)}</div>
 <div className="invoice-totals"><div><span>Subtotal</span><b>{amount(subtotal,currency)}</b></div><div><span>Estimated tax ({Math.min(100,n(taxRate))}%)</span><b>{amount(tax,currency)}</b></div><div className="invoice-grand-total"><span>Estimated total</span><b>{amount(total,currency)}</b></div></div>
 <div className="invoice-paper-notes"><small>SCOPE & NOTES</small><p>{notes||"—"}</p></div><div className="quote-approval"><b>Customer approval</b><span>Signature: __________________________</span><span>Date: __________________</span></div>
 <div className="invoice-thanks">Thank you for considering {business||"our business"}.</div>
 </div><p className="invoice-privacy-note">This estimate is a planning document, not a contract or tax invoice. Confirm scope, taxes and terms before sending.</p></section>
 </div>;
}
