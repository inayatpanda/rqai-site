export type IllustrationKind = 'research' | 'writing' | 'shoulder' | 'podium' | 'literature' | 'signal'
const captions: Record<IllustrationKind, string> = {
  research: 'Research and analysis', writing: 'Writing and notes',
  shoulder: 'Anatomy · movement · comparison', podium: 'Presentation practice',
  literature: 'Open-access research', signal: 'Market calls and results',
}
export function IllustratedHero({ kind, caption = true }: { kind: IllustrationKind; caption?: boolean }) {
  return <figure className={`drawn-scene drawn-scene--${kind}`}>
    <div className="drawn-scene__rule" aria-hidden="true"><span /> <span /> <span /></div>
    <img src={`/illustrations/${kind}.svg`} alt="" width="480" height="370" />
    {caption && <figcaption>{captions[kind]}</figcaption>}
  </figure>
}
export function PodiumIllustration() { return <IllustratedHero kind="podium" /> }
export function LiteratureIllustration() { return <IllustratedHero kind="literature" /> }
export function SignalIllustration() { return <IllustratedHero kind="signal" /> }
export function ShoulderIllustration() { return <IllustratedHero kind="shoulder" /> }
