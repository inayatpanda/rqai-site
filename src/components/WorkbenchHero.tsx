import { Link } from 'react-router-dom'
import { ProductLogo } from './ProductLogo'
export function WorkbenchHero() {
  return <div className="workbench-art" aria-label="An illustrated workbench of RQAI projects">
    <svg className="workbench-lines" viewBox="0 0 600 530" aria-hidden="true">
      <path className="ink-trail" d="M65 170C30 45 238 9 335 54S594 111 546 269 467 460 326 462 97 445 77 355" />
      <path d="m59 154 6 18 15-12M321 456l-12 6 15 8" />
      <path d="M399 71v23m-11-12h23M60 328v15m-7-7h15" stroke="#f4b05a" />
      <circle className="ink-dot" cx="520" cy="160" r="5" fill="#ff9d92" />
      <circle cx="121" cy="424" r="4" fill="#74dfd4" />
    </svg>
    <Link className="sketch-sheet sketch-sheet--research" to="/researchassistant" aria-label="Explore ResearchAssistant">
      <div><ProductLogo slug="researchassistant" /><span>ResearchAssistant</span></div>
      <img src="/illustrations/research.svg" alt="Line drawing of research papers and a forest plot" width="480" height="370" />
    </Link>
    <Link className="sketch-sheet sketch-sheet--shoulder" to="/universal-shoulder-model" aria-label="Explore Universal Shoulder Model">
      <img src="/illustrations/shoulder.svg" alt="Conceptual line drawing of a shoulder joint and movement arc" width="480" height="370" />
      <div><ProductLogo slug="universal-shoulder-model" /><span>Shoulder research</span></div>
    </Link>
    <Link className="sketch-sheet sketch-sheet--writing" to="/scribble" aria-label="Explore Scribble">
      <img src="/illustrations/writing.svg" alt="Line drawing of an open notebook and a quill" width="480" height="370" />
      <div><ProductLogo slug="scribble" /><span>Scribble</span></div>
    </Link>
    <img className="workbench-seal" src="/brand/rqai-mark.svg" width="112" height="88" alt="" />
    <span className="workbench-note" aria-hidden="true">research · models · writing</span>
  </div>
}
