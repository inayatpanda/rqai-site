import { projectPath } from '../data/projectPaths'
import type { ReactNode } from 'react'
import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { LEGAL_LINKS } from '../data/navigation'
import { PRODUCTS } from '../data/products'
import { PROJECT_LEGAL } from '../data/projectLegal'
import { RQAI_IDENTITY } from '../data/identity'
import '../legal.css'

const EMAIL = <a href="mailto:hello@rqai.co.uk">hello@rqai.co.uk</a>
const ICO = <a href="https://ico.org.uk/make-a-complaint/">Information Commissioner’s Office (ICO)</a>
type Section = { title: string; body: ReactNode }
const PAGES: Record<string, { title: string; intro: string; sections: Section[] }> = {
  legal: {
    title: 'Legal information',
    intro: 'Who runs RQAI, which terms apply and where to find each app’s privacy notice.',
    sections: [
      { title: 'Who runs RQAI', body: <p>RQAI is currently operated by {RQAI_IDENTITY.operator}, in England. Contact {EMAIL}. {RQAI_IDENTITY.companyStatus}</p> },
      { title: 'This website and the apps', body: <p>These website notices cover rqai.co.uk. Each app is a separate service with its own features and data handling. Read its notices before creating an account, uploading work, using AI or buying a licence. The website terms do not replace an app licence or a signed agreement.</p> },
      { title: 'Questions or complaints', body: <p>Email {EMAIL} and name the app or page concerned. Please do not include patient details, passwords, API keys or payment-card details. Privacy complaints can also be raised with the {ICO}.</p> },
    ],
  },
  terms: {
    title: 'Website terms & conditions',
    intro: 'Terms for browsing the RQAI website. App licences and purchases have separate terms.',
    sections: [
      { title: 'About these terms', body: <p>This website is operated by Inayat Panda, trading as RQAI. These terms cover information and links on rqai.co.uk. Contact {EMAIL}. They do not create a subscription or a licence to an app.</p> },
      { title: 'Using the website', body: <p>You may browse and share links for lawful purposes. Do not interfere with the site, introduce harmful code, attempt unauthorised access or use it to infringe another person’s rights. Report a suspected security problem by email without sending sensitive material.</p> },
      { title: 'Content and ownership', body: <p>Site text, artwork and software are protected by applicable intellectual property rights. RQAI or the relevant rights holder retains those rights. You may use the website for its intended purpose and as otherwise allowed by law. Other copying, distribution or commercial reuse requires permission unless an applicable licence allows it. Third-party names and marks remain their owners’ property.</p> },
      { title: 'Project information and availability', body: <p>We aim to describe projects accurately, but features, availability and prices may change. Check the app’s current access information and checkout before purchasing. Development projects are not promises of a release date. Access may be interrupted for maintenance, faults or other reasons.</p> },
      { title: 'Links, apps and purchases', body: <p>Links take you to app websites and other services with their own notices. For a purchase, the terms and information provided before ordering explain the price, renewal, cancellation and support arrangements. Your statutory consumer rights continue to apply. Nothing on this website creates a blanket “no refunds” policy.</p> },
      { title: 'Professional information', body: <p>Website descriptions are general information. They are not personalised medical, financial or legal advice. Check the <Link to="/disclaimers">research and professional use notice</Link> and the intended use of the particular app before relying on it.</p> },
      { title: 'Responsibility', body: <p>Nothing in these terms excludes liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or any liability that cannot lawfully be limited. Mandatory consumer rights are unaffected. Responsibility for any other loss is determined by applicable law, including whether the loss was caused by a breach and was reasonably foreseeable.</p> },
      { title: 'Changes and disputes', body: <p>Updates will be dated on this page and apply to future website use; they do not retrospectively change an existing purchase contract. Please contact {EMAIL} first with a concern. The law of England and Wales applies, subject to mandatory protections under the law of your country of residence. These terms do not take away a consumer’s right to bring proceedings in a court available under applicable law.</p> },
    ],
  },
  privacy: {
    title: 'Website privacy notice',
    intro: 'How personal information is handled when you visit rqai.co.uk or contact RQAI.',
    sections: [
      { title: 'Who is responsible', body: <p>Inayat Panda, trading as RQAI, is the controller for this website and enquiries sent to RQAI. Email {EMAIL} for privacy questions or rights requests. An app or clinical deployment may have a different controller; see its own notice.</p> },
      { title: 'Visits to this website', body: <p>Serving a page involves technical information such as your IP address, requested URL, browser information and request time. The web host may record this in delivery and security logs. The reviewed website code contains no account sign-up, contact form, newsletter, advertising scripts or analytics scripts. This statement covers the main website, not its subdomains.</p> },
      { title: 'Email enquiries', body: <p>If you email RQAI, we receive your email address, name if supplied, message and attachments. We use them to respond, provide requested support and maintain relevant correspondence. Please send only what is needed and avoid sensitive patient information. Email is hosted by Hostinger and forwarded to a Gmail inbox managed by the founder. Both services therefore receive email content and attachments. A mail link opens your own email service.</p> },
      { title: 'Why information is used', body: <p>Our legitimate interests are operating a reliable website, preventing abuse and responding to general enquiries. Where you ask about entering a contract, or need support under one, processing may be necessary for pre-contract steps or performance of that contract. Records needed to meet a legal obligation are kept on that basis. We do not use website enquiries to enrol you in marketing.</p> },
      { title: 'Who receives information', body: <p>Hostinger provides website hosting and domain email services; Google provides the Gmail inbox used for forwarded correspondence. Service providers may process information to deliver and secure those services. Information may also be shared with professional advisers or authorities where necessary and lawful. Following an external link sends a new request to that service; its notice explains what happens there.</p> },
      { title: 'Retention and international processing', body: <p>Enquiries are kept while needed to respond, provide ongoing support, meet legal obligations or handle a dispute. The appropriate period depends on the enquiry and whether it relates to an ongoing service or claim. Technical logs and backups are managed by the service providers for operation, security and recovery; deletion from a mailbox may not immediately remove a backup copy. Hostinger and Google may process information outside the UK. Hostinger’s <a href="https://www.hostinger.com/uk/legal/dpa">data processing terms</a> include contractual safeguards for relevant transfers, including the UK transfer addendum. Google explains its arrangements in its <a href="https://policies.google.com/privacy">privacy policy</a> and <a href="https://policies.google.com/privacy/frameworks">transfer framework information</a>. Contact us for information about safeguards relevant to your enquiry.</p> },
      { title: 'Your rights', body: <p>Depending on the circumstances, you may request access, correction, deletion, restriction or portability of your information. You can object to processing based on legitimate interests. Where processing relies on consent, you can withdraw it without affecting earlier lawful processing. Email {EMAIL}; proportionate identity checks may be needed. Requests are normally answered within one calendar month, subject to lawful extensions or other permitted adjustments.</p> },
      { title: 'Complaints and app data', body: <p>You can contact RQAI or complain to the {ICO}. Other countries may also provide a right to complain to a local authority. For account data, uploads, recordings, AI requests, patient records or payments in an app, start with the <Link to="/legal#app-notices">app’s own notice</Link>. This website notice does not describe those separate processing activities.</p> },
    ],
  },
  cookies: {
    title: 'Cookies & browser storage',
    intro: 'Storage used by the main RQAI website, and how this differs from the apps.',
    sections: [
      { title: 'The main website', body: <p>The reviewed rqai.co.uk code does not set cookies or use local storage for visitor tracking. Fonts, illustrations and app logos are served with the site. Your browser may cache these files to load pages faster; this is separate from storing an advertising profile.</p> },
      { title: 'Website delivery', body: <p>Hostinger delivers the website and may process technical request information for performance and security. Our release check on 10 October 2026 found no cookies set by the homepage response. This check covers ordinary page delivery; it does not describe cookies used by the separate apps or by your email provider.</p> },
      { title: 'Other apps and sites', body: <p>An RQAI app may use local storage for your work, cookies for sign-in or other technologies described in its own notice. ResearchAssistant’s marketing website currently includes Plausible analytics. That does not mean the main RQAI website uses it. See the <Link to="/legal#app-notices">app notice directory</Link>.</p> },
      { title: 'Your choices and future changes', body: <p>You can manage cookies and site data in your browser. Clearing app data can remove locally stored work, so export a backup first. If this website adds optional technologies that require consent, they must remain off until you choose them, with an equally accessible way to refuse or withdraw consent. Contact {EMAIL} with a question.</p> },
    ],
  },
  disclaimers: {
    title: 'Research & professional use',
    intro: 'What to check before using a project in research, clinical work, training or financial decisions.',
    sections: [
      { title: 'Research and AI', body: <p>Check source papers, calculations, citations and generated text yourself. AI output can be incomplete or incorrect. You remain responsible for research methods, approvals, confidentiality and what you publish. Do not send confidential or identifiable information to an AI provider without an appropriate, approved arrangement.</p> },
      { title: 'Clinical use', body: <p>A description on this website is not medical advice or evidence of regulatory clearance. Before a clinical deployment, establish the intended purpose, clinical governance, security arrangements and any applicable medical-device requirements. A disclaimer does not replace those obligations. Patients should seek advice from their treating clinician.</p> },
      { title: 'Universal Shoulder Model', body: <p>The Universal Shoulder Model is in development. Its simulations and illustrations are not established here as validated tools for diagnosis, treatment planning or decisions about a patient. Any future release needs its own intended-use statement and supporting validation.</p> },
      { title: 'Training and careers', body: <p>OrthoLog, OrthoConsultantPrep and OrthoPortfolio are independent tools. Their presence here does not imply endorsement by the NHS, GMC, a college, an employer or a training programme. Check local evidence requirements and interview guidance. Use non-identifying records unless an approved arrangement explicitly permits otherwise.</p> },
      { title: 'Market analysis', body: <p>Market commentary and software outputs are general information, not a personal investment recommendation or a promise of returns. Data and analysis can be delayed, incomplete or wrong. Assess information independently and obtain appropriately qualified advice where needed.</p> },
      { title: 'Rights still apply', body: <p>This notice explains intended use and limitations. It does not remove statutory rights or exclude liability that cannot lawfully be excluded. Read the relevant app’s terms and <Link to="/terms">website terms</Link> for their respective scopes.</p> },
    ],
  },
}

export function LegalPage({ page }: { page: string }) {
  const content = PAGES[page]
  return <>
    <Head>
      <title>{content.title} | RQAI</title>
      <meta name="description" content={content.intro} />
      <meta name="robots" content="noindex,follow" />
      <link rel="canonical" href={`https://rqai.co.uk/${page}/`} />
    </Head>
    <div className="container-edge legal-page py-12 md:py-20">
      <p className="font-mono text-sm uppercase tracking-label text-accent">RQAI / Legal</p>
      <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,4rem)] leading-tight">{content.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed">{content.intro}</p>
      <p className="mt-8 text-sm text-inkMuted">Last updated: 10 October 2026</p>
      <div className="legal-layout mt-10">
        <nav aria-label="Legal pages" className="legal-nav">{LEGAL_LINKS.map(link => <Link key={link.slug} to={`/${link.slug}`} aria-current={page === link.slug ? 'page' : undefined}>{link.name}</Link>)}</nav>
        <div className="legal-copy">
          {content.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.body}</section>)}
          {page === 'legal' && <section id="app-notices"><h2>App notices</h2><p>Existing public notices are linked below. A link is not a certification that an app’s legal documents are complete.</p>
            <ul className="app-notice-list">{PRODUCTS.map(product => <li key={product.slug}>
              <Link to={projectPath(product.slug)} className="font-semibold">{product.name}</Link>
              <div>{PROJECT_LEGAL[product.slug]?.map(link => <a key={link.url} href={link.url}>{link.label} ↗</a>) ?? <span className="text-sm text-inkMuted">{product.status === 'development' ? 'In development; no public release.' : 'Public notice links are being confirmed. Contact RQAI for details.'}</span>}</div>
            </li>)}</ul>
          </section>}
        </div>
      </div>
    </div>
  </>
}
