import { projectPath } from '../data/projectPaths'
import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ProductLogo } from '../components/ProductLogo'
import { ORTHOPAEDIC_PROJECTS } from '../data/navigation'
import { identityStyle } from '../data/productIdentities'

const ROLES = ['Log your cases', 'Prepare for interviews', 'Build your portfolio', 'Explore shoulder mechanics']
export function Orthopaedics() {
  return <>
    <Head>
      <title>Orthopaedic tools | RQAI</title>
      <meta name="description" content="OrthoLog, OrthoConsultantPrep, OrthoPortfolio and Universal Shoulder Model: tools for training, career development and shoulder research." />
      <link rel="canonical" href="https://rqai.co.uk/orthopaedics/" />
    </Head>
    <section className="container-edge py-14 md:py-20">
      <p className="font-mono text-sm uppercase tracking-label text-accent">Training · Careers · Research</p>
      <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">Your orthopaedic toolkit.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">Tools for orthopaedic training, career development and research. Log cases, prepare for interviews, organise your portfolio and explore the shoulder model in development.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {ORTHOPAEDIC_PROJECTS.map((project, i) => <article key={project.slug} style={identityStyle(project.slug)} className="project-cross-card flex flex-col rounded-2xl border p-7">
          <Link to={projectPath(project.slug)} aria-label={`About ${project.name}`}><ProductLogo slug={project.slug} /></Link>
          <p className="mt-6 text-sm opacity-90">{ROLES[i]}</p>
          <h2 className="mt-2 break-words text-2xl">{project.name}</h2>
          <p className="mt-4 flex-1 leading-relaxed">{project.description}</p>
          <Link to={projectPath(project.slug)} className="mt-7 font-medium underline underline-offset-4">See what it does</Link>
          {project.status === 'development'
            ? <p className="mt-3 text-sm font-medium">In development · no public release yet</p>
            : <a href={project.url} className="mt-3 text-sm underline underline-offset-4">Open {project.name} ↗</a>}
        </article>)}
      </div>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-inkMuted">These are independent tools. Check the requirements of your training programme or employer, and keep patient information out of personal training records unless you have an approved arrangement.</p>
      <Link to="/" className="mt-10 inline-block text-accent">Explore the other RQAI projects →</Link>
    </section>
  </>
}
