export function FounderNote() {
  return (
    <section className="container-edge pb-20 md:pb-28" aria-labelledby="founder-heading">
      <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-card p-7 sm:flex-row sm:items-center sm:gap-8 md:p-10">
        <img
          src="/people/inayat-panda.png"
          alt="Inayat Panda, founder of RQAI"
          width="1033"
          height="1523"
          loading="lazy"
          decoding="async"
          className="h-40 w-28 shrink-0 rounded-xl object-cover object-top sm:h-48 sm:w-32"
        />
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-label text-accent">A note from the founder</p>
          <h2 id="founder-heading" className="mt-3 text-2xl">Inayat Panda</h2>
          <p className="mt-4 leading-relaxed text-ink">
            I’m an orthopaedic surgeon working in the NHS, with an interest in
            shoulder and upper limb surgery. RQAI brings together the apps and
            research projects I’m building.
          </p>
          <p className="mt-3 leading-relaxed text-ink">
            I’m interested in how AI can make everyday life and our work as
            doctors a little easier: less repetitive work, clearer ways to
            learn, and more time to think. These projects are my way of
            exploring that, with clinical judgement and care at the centre.
          </p>
        </div>
      </div>
    </section>
  )
}
