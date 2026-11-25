"use client";
import { useState } from "react";
const fmt=(v:number,c:string)=>{try{return new Intl.NumberFormat(undefined,{style:"currency",currency:c,maximumFractionDigits:2}).format(v)}catch{return c+" "+v.toFixed(2)}};
const MAX_AMOUNT=1_000_000_000_000;
const num=(v:string)=>{const n=Number(v);return Number.isFinite(n)?Math.min(MAX_AMOUNT,Math.max(0,n)):0};
export default function ReceiptGenerator(){
 const [business,setBusiness]=useState("Your Business Name"),[email,setEmail]=useState(""),[customer,setCustomer]=useState(""),[receiptNo,setReceiptNo]=useState("RCPT-001"),[date,setDate]=useState(()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")}),[currency,setCurrency]=useState("USD"),[method,setMethod]=useState("Bank transfer"),[reference,setReference]=useState(""),[description,setDescription]=useState("Payment for services rendered"),[amount,setAmount]=useState("250"),[notes,setNotes]=useState("Thank you for your payment.");
 const paid=num(amount);\n const amountInvalid=amount.trim()===""||!Number.isFinite(Number(amount))||Number(amount)<0.01||Number(amount)>MAX_AMOUNT;
 return <div className="receipt-tool">
 <section className="receipt-editor panel"><div className="panel-kicker"><span>✳</span> PAYMENT DETAILS</div><h2>Create a payment receipt</h2><p className="panel-intro">Record the payment details and preview a clean receipt ready to print or save.</p>
 <div className="invoice-field-grid">
 <label className="field"><span>Business / seller name</span><input value={business} onChange={e=>setBusiness(e.target.value)}/></label>
 <label className="field"><span>Business email (optional)</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
 <label className="field"><span>Received from</span><input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="Customer name"/></label>
 <label className="field"><span>Receipt number</span><input value={receiptNo} onChange={e=>setReceiptNo(e.target.value)}/></label>
 <label className="field"><span>Payment date</span><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
 <label className="field"><span>Currency</span><select value={currency} onChange={e=>setCurrency(e.target.value)}>{["USD","INR","GBP","EUR","CAD","AUD","AED"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="field"><span>Payment method</span><select value={method} onChange={e=>setMethod(e.target.value)}>{["Cash","Bank transfer","Credit / debit card","UPI","Cheque","Digital wallet","Other"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="field"><span>Transaction reference (optional)</span><input value={reference} onChange={e=>setReference(e.target.value)} placeholder="Transaction ID / cheque no."/></label>
 </div>
 <label className="field"><span>Payment for</span><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe the product or service"/></label>
 <label className="field"><span>Amount received ({currency})</span><input type="number" min="0.01" step="0.01" required value={amount} onChange={e=>setAmount(e.target.value)}/></label>
 <label className="field"><span>Additional note</span><textarea rows={3} value={notes} onChange={e=>setNotes(e.target.value)}/></label>
 <div className="invoice-actions">{amountInvalid&&<p className="field-error" role="alert">Enter a valid amount from 0.01 up to 1,000,000,000,000.</p>}<button type="button" className="btn-primary" onClick={()=>window.print()} disabled={amountInvalid}>Print / Save PDF <span>↗</span></button><span>This creates a receipt document only; it does not process payments.</span></div>
 </section>
 <section className="receipt-preview panel" aria-live="polite"><div className="invoice-preview-label">LIVE RECEIPT PREVIEW <span>● UPDATING</span></div>
 <div className="receipt-paper"><div className="receipt-paid-stamp">PAYMENT<br/>RECEIVED</div>
 <div className="receipt-paper-head"><div className="invoice-brand-mark">S</div><h2>{business||"Your Business Name"}</h2>{email&&<p>{email}</p>}</div>
 <div className="receipt-heading"><small>PAYMENT RECEIPT</small><strong>{receiptNo||"—"}</strong></div>
 <div className="receipt-amount"><small>AMOUNT RECEIVED</small><strong>{fmt(paid,currency)}</strong></div>
 <div className="receipt-details"><div><span>Received from</span><b>{customer||"Customer name"}</b></div><div><span>Payment date</span><b>{date||"—"}</b></div><div><span>Payment method</span><b>{method}</b></div><div><span>Reference</span><b>{reference||"Not provided"}</b></div><div><span>Payment for</span><b>{description||"—"}</b></div><div><span>Status</span><b className="receipt-status">Payment received</b></div></div>
 <div className="receipt-note"><small>NOTE</small><p>{notes||"—"}</p></div><div className="receipt-thanks">Thank you for your business.</div>
 </div><p className="invoice-privacy-note">Receipt details are handled in this browser. Keep your original payment records and verify the payment before issuing a receipt.</p>
 </section></div>;
}
