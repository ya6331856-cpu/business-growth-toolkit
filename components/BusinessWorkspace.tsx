"use client";

import { useEffect, useMemo, useState } from "react";

type JobStatus = "Lead" | "Quoted" | "Booked" | "In progress" | "Completed" | "Paid";
type Job = { id: string; customer: string; email?: string; phone?: string; service: string; amount: number; status: JobStatus; createdAt: string };
const STORAGE_KEY = "servicekitly-workspace-v1";
const statuses: JobStatus[] = ["Lead", "Quoted", "Booked", "In progress", "Completed", "Paid"];
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

export default function BusinessWorkspace() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [ready, setReady] = useState(false);
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((item): item is Job =>
            item && typeof item.id === "string" && typeof item.customer === "string" &&
            typeof item.service === "string" && (item.email === undefined || typeof item.email === "string") && (item.phone === undefined || typeof item.phone === "string") && Number.isFinite(item.amount) &&
            statuses.includes(item.status) && typeof item.createdAt === "string"
          );
          setJobs(valid);
        }
      }
    } catch { /* Ignore malformed browser data and start with an empty workspace. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs, ready]);

  const visibleJobs = useMemo(() => jobs.filter(job =>
    (filter === "All" || job.status === filter) &&
    (job.customer + " " + job.service).toLowerCase().includes(query.toLowerCase())
  ), [jobs, filter, query]);

  const totalQuoted = jobs.filter(job => job.status !== "Lead").reduce((sum, job) => sum + job.amount, 0);
  const completedValue = jobs.filter(job => job.status === "Completed" || job.status === "Paid").reduce((sum, job) => sum + job.amount, 0);
  const paidValue = jobs.filter(job => job.status === "Paid").reduce((sum, job) => sum + job.amount, 0);

  function addJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!customer.trim() || !service.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return;
    setJobs(current => [{ id: crypto.randomUUID(), customer: customer.trim(), email: email.trim(), phone: phone.trim(), service: service.trim(), amount: parsedAmount, status: "Lead", createdAt: new Date().toISOString() }, ...current]);
    setCustomer(""); setEmail(""); setPhone(""); setService(""); setAmount("");
  }

  function updateStatus(id: string, status: JobStatus) {
    setJobs(current => current.map(job => job.id === id ? { ...job, status } : job));
  }

  function exportJobs() {\n    const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;\n    const rows = [["Customer","Email","Phone","Service","Amount USD","Status","Created"], ...jobs.map(job => [job.customer, job.email ?? "", job.phone ?? "", job.service, String(job.amount), job.status, job.createdAt])];\n    const csv = rows.map(row => row.map(quote).join(",")).join("\\r\\n");\n    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));\n    const link = document.createElement("a"); link.href = url; link.download = "servicekitly-jobs.csv"; link.click(); URL.revokeObjectURL(url);\n  }\n\n  function removeJob(id: string) {
    if (window.confirm("Delete this job from this browser workspace?")) setJobs(current => current.filter(job => job.id !== id));
  }

  return <div className="workspace-shell">
    <section className="workspace-heading">
      <div><span className="section-kicker">YOUR BUSINESS, IN ONE PLACE</span><h1>Business workspace</h1><p>Keep an eye on customer requests, job values and progress. Start with one job and build your workflow as you go.</p></div>
      <div className="workspace-heading-actions"><button className="workspace-print" type="button" onClick={exportJobs}>Export CSV ↓</button><button className="workspace-print" type="button" onClick={() => window.print()}>Print job list ↗</button></div>
    </section>

    <div className="workspace-notice"><span>ⓘ</span><p><b>Private to this browser.</b> Your entries are saved on this device only. They are not uploaded or synced to an account or another device. Avoid entering sensitive customer information.</p></div>

    <section className="workspace-stats" aria-label="Business summary">
      <article><span>ACTIVE JOBS</span><strong>{jobs.filter(job => !["Completed", "Paid"].includes(job.status)).length}</strong><small>Leads through work in progress</small></article>
      <article><span>QUOTED VALUE</span><strong>{money(totalQuoted)}</strong><small>Jobs beyond the lead stage</small></article>
      <article><span>COMPLETED VALUE</span><strong>{money(completedValue)}</strong><small>Completed and paid jobs</small></article>
      <article><span>PAYMENTS RECORDED</span><strong>{money(paidValue)}</strong><small>Jobs marked as paid</small></article>
    </section>

    <div className="workspace-columns">
      <section className="workspace-panel workspace-form-panel">
        <div className="workspace-panel-head"><div><span className="section-kicker">ADD TO YOUR PIPELINE</span><h2>New customer job</h2></div><span className="workspace-step">01</span></div>
        <form className="workspace-form" onSubmit={addJob}>
          <label>Customer or contact name<input value={customer} onChange={event => setCustomer(event.target.value)} placeholder="e.g. Alex Morgan" required maxLength={80}/></label>
          <label>Email (optional)<input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="customer@example.com" maxLength={120}/></label>\n          <label>Phone (optional)<input type="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="+1 555 0100" maxLength={40}/></label>\n          <label>Service or job description<input value={service} onChange={event => setService(event.target.value)} placeholder="e.g. Deep house cleaning" required maxLength={100}/></label>
          <label>Estimated job value (USD)<input type="number" min="0.01" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} placeholder="150.00" required/></label>
          <button className="workspace-submit" type="submit">Add job to pipeline <span>＋</span></button>
        </form>
        <p className="workspace-form-foot">New entries start as <b>Lead</b>. Update the status as the customer journey progresses.</p>
      </section>

      <section className="workspace-panel workspace-pipeline-panel">
        <div className="workspace-panel-head"><div><span className="section-kicker">CUSTOMER JOURNEY</span><h2>Job pipeline</h2></div><span className="workspace-count">{jobs.length} {jobs.length === 1 ? "job" : "jobs"}</span></div>
        <div className="workspace-pipeline">
          {statuses.map((status, index) => <div className="workspace-pipeline-step" key={status}><span>{String(index + 1).padStart(2, "0")}</span><b>{status}</b><small>{jobs.filter(job => job.status === status).length}</small></div>)}
        </div>
        <p className="workspace-form-foot">Move each job through the stages. Mark it Paid only after payment is received.</p>
      </section>
    </div>

    <section className="workspace-panel workspace-jobs-panel">
      <div className="workspace-panel-head workspace-jobs-head"><div><span className="section-kicker">KEEP WORK MOVING</span><h2>Your jobs</h2></div><div className="workspace-filters"><input aria-label="Search jobs" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search customer or service"/><select aria-label="Filter by status" value={filter} onChange={event => setFilter(event.target.value)}><option>All</option>{statuses.map(status => <option key={status}>{status}</option>)}</select></div></div>
      {!ready ? <p className="workspace-empty">Loading your saved jobs…</p> : visibleJobs.length === 0 ? <div className="workspace-empty"><span>✳</span><h3>{jobs.length ? "No matching jobs" : "Your workspace starts here"}</h3><p>{jobs.length ? "Try another search or status filter." : "Add your first customer job above. It will appear here and stay saved in this browser."}</p></div> : <div className="workspace-job-list">
        {visibleJobs.map(job => <article className="workspace-job-row" key={job.id}><div className="workspace-job-main"><b>{job.customer}</b><span>{job.service}</span>{(job.email || job.phone) && <small>{[job.email, job.phone].filter(Boolean).join(" · ")}</small>}<small>{new Date(job.createdAt).toLocaleDateString()}</small></div><strong className="workspace-job-amount">{money(job.amount)}</strong><label className="workspace-status-label"><span>Status</span><select value={job.status} onChange={event => updateStatus(job.id, event.target.value as JobStatus)} aria-label={`Status for ${job.customer}`}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label><button type="button" className="workspace-delete" onClick={() => removeJob(job.id)} aria-label={`Delete ${job.customer} job`}>×</button></article>)}
      </div>}
    </section>
    <p className="workspace-disclaimer">Planning workspace only. Values are estimates entered by you, not accounting records. Export, cloud backup, team access and customer accounts are not included in this first version.</p>
  </div>;
}
