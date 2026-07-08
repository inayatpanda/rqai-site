import { Constellation } from '../components/Constellation'

/*
 * About — placeholder for the rich About page (Task 5 replaces this). Carries
 * the studio principles and contact so the route is meaningful in the meantime.
 */
const PRINCIPLES = [
  { title: 'One job, done well', body: 'Each project has a single clear purpose and stays out of the way.' },
  { title: 'Local-first', body: 'Your data stays on your device. Nothing is sent anywhere by default.' },
  { title: 'No accounts, no tracking', body: 'No sign-up, no analytics following you around.' },
  { title: 'One small studio', body: 'Built and maintained by one independent UK studio.' },
]

export function About() {
  return (
    <>
      <section className="container-edge pb-8 pt-16 md:pt-24">
        <h1 className="max-w-3xl text-4xl leading-[1.05] md:text-6xl">
          Small, careful software.
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink">
          RQAI builds focused tools that respect your time and your data. Here is
          what that means in practice.
        </p>
        <Constellation tone="ink" className="mt-10 h-16 md:h-20" />
      </section>

      <section className="container-edge py-8 md:py-12">
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="border-t border-hairline pt-5">
              <dt className="font-display text-xl font-semibold text-inkStrong">{p.title}</dt>
              <dd className="mt-2 max-w-prose leading-relaxed text-ink">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-edge py-12 md:py-16">
        <div className="rounded-2xl border border-hairline bg-card p-8">
          <h2 className="text-2xl md:text-3xl">Get in touch</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-ink">
            Questions, feedback or a licence query? Email the studio directly.
          </p>
          <a
            href="mailto:hello@rqai.co.uk"
            className="mt-5 inline-block font-mono text-accent transition-colors hover:text-inkStrong"
          >
            hello@rqai.co.uk
          </a>
        </div>
      </section>
    </>
  )
}
