import { motion, useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

const CASES = [
  { procedure: 'Total knee arthroplasty', level: 'Performed with supervision' },
  { procedure: 'Hip fracture fixation', level: 'Assisted' },
]

export function OrthoLogHero() {
  const reduce = useReducedMotion()
  return (
    <HeroFrame frame="browser" host="ortholog.rqai.co.uk" tone="ink">
      <div aria-hidden="true" className="h-[19rem] bg-[#fff8ec] p-4 md:h-[21rem] md:p-5">
        <div className="flex items-center justify-between"><div><div className="font-mono text-[.6rem] uppercase tracking-label text-[#a45632]">Personal surgical logbook</div><div className="mt-1 text-sm font-semibold text-[#40261b]">Review the extracted cases</div></div><span className="rounded-full bg-[#bf531f] px-2.5 py-1 text-[.58rem] font-semibold text-white">Encrypted</span></div>
        <div className="mt-4 grid gap-2.5">
          {CASES.map((item, index) => <motion.div key={item.procedure} className="rounded-xl border border-[#ead4bd] bg-white p-3 shadow-sm" initial={reduce ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={reduce ? undefined : { delay: index * .18 }}><div className="flex items-start justify-between gap-3"><div><strong className="block text-[.75rem] text-[#40261b]">{item.procedure}</strong><span className="mt-1 block text-[.62rem] text-[#78635a]">{item.level}</span></div><span className="rounded-full bg-[#fce6d5] px-2 py-1 text-[.55rem] font-semibold text-[#a6471d]">Review</span></div></motion.div>)}
        </div>
        <motion.div className="mt-3 rounded-xl border border-[#e7c38f] bg-[#fff0d4] p-3" initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduce ? undefined : { delay: .45 }}><div className="font-mono text-[.55rem] uppercase tracking-label text-[#9a5835]">Reflection</div><p className="mt-1 text-[.66rem] leading-relaxed text-[#6b5042]">What did I learn, what went well, and what should I change next time?</p></motion.div>
      </div>
    </HeroFrame>
  )
}
