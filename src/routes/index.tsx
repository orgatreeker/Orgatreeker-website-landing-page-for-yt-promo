import { ChevronDown, ChevronLeft, ChevronRight, Download, ExternalLink, Maximize2, Repeat2, ShieldCheck, Target, TrendingDown, WalletCards, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import cover from "@/assets/orgatreeker/1.jpg";
import included from "@/assets/orgatreeker/2.jpg";
import workflow from "@/assets/orgatreeker/3.jpg";
import transactions from "@/assets/orgatreeker/4.jpg";
import budget from "@/assets/orgatreeker/5.jpg";
import dashboard from "@/assets/orgatreeker/6.jpg";

const CHECKOUT = "https://dodo.pe/orgatreeker";
const coverImage = { src: cover, alt: "Ultimate Budget Spreadsheet cover showing annual dashboards across desktop, tablet, and phone screens" };
const dashboardAlt = "Annual finance dashboard with income, expense, savings, and debt charts";
const images = [
  coverImage,
  { src: included, alt: "Overview of the budgeting spreadsheet sections, transaction tools, monthly insights, and dashboards" },
  { src: workflow, alt: "Flow diagram showing how transactions connect to budgets, savings, debt, and financial dashboards" },
  { src: transactions, alt: "Transaction log with recurring payment schedule and variable transaction tables" },
  { src: budget, alt: "Budget tracker showing category limits, spending insights, and budgeting strategy options" },
  { src: dashboard, alt: dashboardAlt },
];

const features = [
  [WalletCards, "Annual overview", "Bring the year into one clear view, so patterns are easier to spot."],
  [Target, "Monthly budgets", "Set a practical plan for each month and compare it with what happens."],
  [Download, "Income & expenses", "Organize money in and money out without losing the bigger picture."],
  [Repeat2, "Recurring payments", "Keep regular transactions and upcoming payments visible."],
  [ShieldCheck, "Savings goals", "Give your goals a place in the plan and follow their progress."],
  [TrendingDown, "Debt tracking", "See balances and progress together as part of your annual plan."],
] as const;

const faqs = [
  ["How is the spreadsheet delivered?", "This is a digital spreadsheet, not a physical product. Purchase and download details are provided through the checkout page."],
  ["What software do I need?", "Software requirements can change, so please verify the current compatibility details at checkout before purchasing."],
  ["Where do I buy it?", "Use any “Get the Budget Spreadsheet” link on this page. You’ll be taken to Orgatreeker’s secure checkout in a new tab."],
  ["How can I get support?", "Email Support@orgatreeker.com and include a short description of what you need help with."],
];

function PurchaseLink({ compact = false }: { compact?: boolean }) {
  return (
    <a href={CHECKOUT} target="_blank" rel="noopener" className={`inline-flex items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${compact ? "h-11 px-5 text-sm" : "h-13 w-full px-6"}`}>
      Get the Budget Spreadsheet <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

type ProductReview = {
  id: string;
  rating: number;
  quote: string;
  customerName: string;
  customerPhoto?: string;
  source: string;
};

function ReviewCard({ review }: { review: ProductReview }) {
  return <article aria-label={`${review.rating} out of 5 review by ${review.customerName}`}><blockquote>{review.quote}</blockquote><cite>{review.customerName}</cite></article>;
}

function ReviewSummary({ reviews }: { reviews: ProductReview[] }) {
  if (reviews.length === 0) return null;
  const average = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  return <section aria-label="Customer reviews"><p>{average.toFixed(1)} out of 5 from {reviews.length} reviews</p>{reviews.map((review) => <ReviewCard key={review.id} review={review} />)}</section>;
}

export default function ProductPage() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = images[active] ?? coverImage;
  const previous = useCallback(() => setActive((value) => (value + images.length - 1) % images.length), []);
  const next = useCallback(() => setActive((value) => (value + 1) % images.length), []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [zoomed, next, previous]);

  return (
    <div className="min-h-screen bg-background pb-44 text-foreground md:pb-36">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-5 py-5 sm:flex sm:justify-between lg:px-8">
          <a href="#product" className="min-w-0 font-display text-3xl font-semibold leading-none">Orgatreeker</a>
          <nav aria-label="Main navigation" className="flex shrink-0 items-center gap-4 text-xs font-semibold sm:gap-7 sm:text-sm">
            <a href="#product" className="hover:text-primary">Product</a>
            <a href="#included" className="hover:text-primary">What’s included</a>
            <a href="#faqs" className="hover:text-primary">FAQs</a>
          </nav>
        </div>
      </header>

      <main id="product" className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(340px,2fr)] lg:gap-14">
          <Gallery active={active} setActive={setActive} openZoom={() => setZoomed(true)} previous={previous} next={next} />

          <aside className="lg:sticky lg:top-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">Digital budgeting spreadsheet</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.94] sm:text-6xl">Ultimate Annual Budget Spreadsheet</h1>
            <p className="mt-6 font-display text-3xl leading-tight text-ink-soft">Your money. A clearer plan.</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Organize income, expenses, savings, and debt across the year. Plan monthly budgets, keep recurring payments in view, and use clear dashboards to understand your progress.</p>
            <div className="my-7 border-y border-border py-5">
              <p className="font-semibold">See current price at checkout</p>
              <p className="mt-1 text-sm text-muted-foreground">One-time digital purchase</p>
            </div>
            <PurchaseLink />
            <div className="mt-4 flex items-start gap-3 rounded-md bg-sage-soft p-4 text-sm text-secondary-foreground">
              <Download className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p><strong>Digital spreadsheet.</strong> No physical product will be shipped. Verify software requirements at checkout.</p>
            </div>
          </aside>
        </div>

        <section className="py-24" aria-labelledby="features-title">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Built for the whole year</p>
            <h2 id="features-title" className="mt-4 font-display text-4xl font-semibold sm:text-5xl">A calmer way to see the complete picture.</h2>
          </div>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([Icon, title, text]) => <article key={title} className="border-b border-r border-border p-6 sm:p-8"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </section>

        <section id="included" className="scroll-mt-8 border-y border-border py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="bg-card p-4"><img src={dashboard} alt={dashboardAlt} className="h-auto w-full object-contain" /></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Inside the planner</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">From daily details to the annual view.</h2><p className="mt-6 text-base leading-7 text-muted-foreground">Start with the figures you already know: income, regular payments, everyday spending, savings, and debt. Monthly planning tools help you stay close to the detail, while dashboards turn those entries into a more useful overview.</p><p className="mt-4 text-base leading-7 text-muted-foreground">The result is one consistent place to check what’s planned, what changed, and where you want to go next.</p></div>
          </div>
        </section>

        <section className="py-24" aria-labelledby="setup-title">
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Simple setup</p><h2 id="setup-title" className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Three steps to a clearer year.</h2></div>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">{[["01", "Purchase & download", "Complete your purchase and follow the download details provided at checkout."], ["02", "Enter your finances", "Add your regular income, expenses, payments, goals, and balances."], ["03", "Track your progress", "Return through the year to update your plan and review the dashboards."]].map(([number, title, text]) => <li key={number} className="border-t border-border pt-5"><span className="text-xs font-bold text-primary">{number}</span><h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></li>)}</ol>
        </section>

        <section className="border-t border-border py-20" aria-labelledby="confidence-title">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A closer look</p>
              <h2 id="confidence-title" className="mt-4 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">See the planner before you purchase</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">These are original views from the spreadsheet itself, so you can inspect the planning experience before continuing to checkout.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [dashboard, "Annual dashboard", "See income, expenses, savings, and debt together."],
              [transactions, "Recurring payments", "Keep scheduled and variable transactions organized."],
              [included, "Debt tracking", "Make balances and payoff progress part of the annual plan."],
            ].map(([src, title, text]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card"><div className="grid aspect-[4/3] place-items-center border-b border-border bg-muted p-2"><img src={src} alt={`${title} view inside the Ultimate Annual Budget Spreadsheet`} className="h-full w-full object-contain" /></div><div className="p-5"><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}
          </div>
          <div className="mt-8 grid gap-3 border-y border-border py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p><strong>Delivery:</strong> Digital spreadsheet</p>
            <p><strong>Price:</strong> Current price at checkout</p>
            <p><strong>Checkout:</strong> <a href={CHECKOUT} target="_blank" rel="noopener" className="underline decoration-primary/50 underline-offset-4 hover:text-primary">dodo.pe/orgatreeker</a></p>
            <p><strong>Support:</strong> <a href="mailto:Support@orgatreeker.com" className="underline decoration-primary/50 underline-offset-4 hover:text-primary">Email Orgatreeker</a></p>
          </div>
          <ReviewSummary reviews={[]} />
        </section>

        <section id="faqs" className="scroll-mt-8 bg-blush px-5 py-16 sm:px-10 lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-20">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Questions, answered</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Before you begin.</h2></div>
          <div className="mt-10 border-t border-foreground/20 lg:mt-0">{faqs.map(([question, answer]) => <details key={question} className="group border-b border-foreground/20 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{question}<ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="max-w-xl pt-4 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div>
        </section>
      </main>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p className="font-display text-2xl font-semibold">Orgatreeker</p><div className="flex flex-wrap gap-6 text-sm"><a className="hover:text-primary" href="mailto:Support@orgatreeker.com">Support@orgatreeker.com</a><a className="inline-flex items-center gap-1 hover:text-primary" href={CHECKOUT} target="_blank" rel="noopener">Checkout <ExternalLink className="h-3.5 w-3.5" /></a></div></div></footer>

      <PurchaseDock />

      {zoomed && <div role="dialog" aria-modal="true" aria-label="Product image viewer" className="fixed inset-0 z-50 grid place-items-center bg-foreground/95 p-4"><button onClick={() => setZoomed(false)} aria-label="Close image viewer" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background text-foreground"><X /></button><button onClick={previous} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground sm:left-6"><ChevronLeft /></button><img src={activeImage.src} alt={activeImage.alt} className="max-h-[88vh] max-w-[88vw] object-contain" /><button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground sm:right-6"><ChevronRight /></button><p className="absolute bottom-4 text-sm text-background">{active + 1} / {images.length}</p></div>}
    </div>
  );
}

function PurchaseDock() {
  return (
    <aside aria-label="Purchase the Ultimate Annual Budget Spreadsheet" className="purchase-dock fixed inset-x-0 bottom-0 z-30 border-t border-sage bg-background/95 shadow-[var(--shadow-dock)] backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:grid-cols-[minmax(0,1.2fr)_auto_minmax(250px,0.7fr)] md:gap-8 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-card md:h-16 md:w-20"><img src={cover} alt="" className="h-full w-full object-contain" /></div>
          <div className="min-w-0"><p className="truncate font-display text-lg font-semibold leading-tight md:text-xl"><span className="md:hidden">Annual Budget Spreadsheet</span><span className="hidden md:inline">Ultimate Annual Budget Spreadsheet</span></p><p className="hidden text-xs text-muted-foreground md:block">Your next money reset starts here.</p></div>
        </div>
        <div className="hidden items-center gap-6 border-x border-border px-8 text-xs text-muted-foreground md:flex"><span><strong className="block text-foreground">Digital spreadsheet</strong>No physical delivery</span><span><strong className="block text-foreground">One-time purchase</strong>Current price at checkout</span></div>
        <a href={CHECKOUT} target="_blank" rel="noopener" className="purchase-sheen group col-span-2 inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:col-span-1 md:h-14 md:text-base">Start my budget <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span></a>
        <p className="col-span-2 text-center text-[11px] leading-4 text-muted-foreground md:hidden">Digital spreadsheet · One-time purchase · Current price at checkout</p>
      </div>
    </aside>
  );
}

function Gallery({ active, setActive, openZoom, previous, next }: { active: number; setActive: (index: number) => void; openZoom: () => void; previous: () => void; next: () => void }) {
  const activeImage = images[active] ?? coverImage;
  return <section aria-label="Product images"><div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-md bg-card"><img src={activeImage.src} alt={activeImage.alt} className="h-full w-full object-contain" /><button onClick={openZoom} aria-label="Zoom product image" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-sm"><Maximize2 className="h-4 w-4" /></button><button onClick={previous} aria-label="Previous product image" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-sm"><ChevronLeft className="h-5 w-5" /></button><button onClick={next} aria-label="Next product image" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-sm"><ChevronRight className="h-5 w-5" /></button></div><div className="mt-3 grid grid-cols-6 gap-2">{images.map((image, index) => <button key={image.src} onClick={() => setActive(index)} aria-label={`View image ${index + 1}`} aria-current={active === index} className={`aspect-[4/3] overflow-hidden rounded-sm border bg-card p-0.5 ${active === index ? "border-primary ring-1 ring-primary" : "border-border"}`}><img src={image.src} alt="" className="h-full w-full object-contain" /></button>)}</div><p className="mt-3 text-right text-xs text-muted-foreground">{active + 1} of {images.length}</p></section>;
}
