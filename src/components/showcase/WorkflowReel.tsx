import { useEffect, useState, type ReactElement } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * WorkflowReel — auto-playing animated demonstrations of the app's core
 * workflows, shown in the hero. Each "slide" acts out a pipeline (e.g.
 * Highlight → Compile → Manuscript) with lightweight CSS-keyframe scenes —
 * no video, no screenshots. The reel auto-advances and loops.
 *
 * Motion model: every animated element's BASE style is its FINAL state, and
 * the keyframes animate it IN from hidden (with staggered delays). So with
 * `prefers-reduced-motion` we just disable the animations (`reel-static`)
 * and the composite final frame shows statically. The active scene is keyed
 * by index so its entrance animations restart on every cycle.
 */

const SLIDE_MS = 5200

interface Slide {
  id: string
  pipeline: string
  Scene: () => ReactElement
}

// ── Scene 1: Highlight → Compile → Manuscript ───────────────────────────
function SceneHighlight() {
  return (
    <div className="reel-stack">
      <div className="reel-card2" style={{ ['--d' as string]: '0ms' }}>
        <div className="reel-pane-h">Reader · source PDF</div>
        <p className="reel-txt">
          The intervention group showed a{' '}
          <span className="reel-mark" style={{ ['--d' as string]: '600ms' }}>
            shorter recovery time
          </span>{' '}
          than controls across both sites.
        </p>
      </div>
      <div className="reel-arrow reel-arrow--down" style={{ ['--d' as string]: '1400ms' }}>
        ↓ highlight lands in Compile
      </div>
      <div className="reel-card2" style={{ ['--d' as string]: '1600ms' }}>
        <div className="reel-pane-h">Compile · Results</div>
        <div className="reel-chip reel-chip--amber" style={{ ['--d' as string]: '1800ms' }}>&ldquo;shorter recovery time&rdquo;</div>
        <div className="reel-chip reel-chip--green" style={{ ['--d' as string]: '2200ms' }}>&ldquo;difference p &lt; 0.001&rdquo;</div>
      </div>
      <div className="reel-doc" style={{ ['--d' as string]: '3100ms' }}>
        <div className="reel-doc-h">Manuscript draft</div>
        <p className="reel-txt reel-txt--sm">
          The intervention shortened recovery time versus control
          <span className="reel-cite-inline" style={{ ['--d' as string]: '3600ms' }}>[1]</span>.
        </p>
      </div>
    </div>
  )
}

// ── Scene 2: CSV → test → plot → manuscript ─────────────────────────────
function SceneStats() {
  return (
    <div className="reel-stack">
      <div className="reel-row">
        <div className="reel-sheet2" style={{ ['--d' as string]: '0ms' }}>
          <span className="reel-th">group</span>
          <span className="reel-th">score</span>
          <span className="reel-td">A</span><span className="reel-td">72.4</span>
          <span className="reel-td">B</span><span className="reel-td">— 58.1</span>
          <span className="reel-td">A</span><span className="reel-td">69.0</span>
        </div>
        <div className="reel-arrow" style={{ ['--d' as string]: '900ms' }}>→</div>
        <div className="reel-pill" style={{ ['--d' as string]: '1100ms' }}>t-test ✓</div>
      </div>
      <div className="reel-chart" style={{ ['--d' as string]: '1700ms' }}>
        {[40, 68, 52, 84].map((h, i) => (
          <span key={i} className="reel-col" style={{ height: `${h}%`, ['--d' as string]: `${1900 + i * 180}ms` }} />
        ))}
      </div>
      <div className="reel-statline" style={{ ['--d' as string]: '3000ms' }}>
        <span className="reel-pill reel-pill--blue">mean diff 13.7 (95% CI 6.2–21.1), p &lt; 0.001</span>
      </div>
      <div className="reel-push" style={{ ['--d' as string]: '3500ms' }}>→ Results paragraph written &amp; pushed ✓</div>
    </div>
  )
}

// ── Scene 3: Systematic review → screen → meta-analysis ─────────────────
function SceneReview() {
  const rows = [
    { t: 'Park 2021 · RCT, n=412', ok: true, d: 200 },
    { t: 'Lee 2019 · case report', ok: false, d: 600 },
    { t: 'Singh 2022 · RCT, n=388', ok: true, d: 1000 },
  ]
  return (
    <div className="reel-stack">
      <div className="reel-pane-h">Title / abstract screening</div>
      {rows.map((r, i) => (
        <div key={i} className="reel-screenrow" style={{ ['--d' as string]: `${r.d}ms` }}>
          <span className="reel-screentxt">{r.t}</span>
          <span className={`reel-stamp ${r.ok ? 'reel-stamp--in' : 'reel-stamp--out'}`} style={{ ['--d' as string]: `${r.d + 250}ms` }}>
            {r.ok ? '✓ include' : '✕ exclude'}
          </span>
        </div>
      ))}
      <div className="reel-forest" style={{ ['--d' as string]: '1700ms' }}>
        <div className="reel-pane-h">Meta-analysis · 3 trials</div>
        {[58, 44, 66].map((x, i) => (
          <div key={i} className="reel-fline" style={{ ['--d' as string]: `${2000 + i * 220}ms` }}>
            <span className="reel-fdot" style={{ left: `${x}%` }} />
          </div>
        ))}
        <div className="reel-diamond" style={{ ['--d' as string]: '2900ms' }} />
        <div className="reel-statline reel-statline--center" style={{ ['--d' as string]: '3200ms' }}>
          <span className="reel-pill reel-pill--blue">Pooled OR 0.74 (0.61–0.90)</span>
        </div>
      </div>
    </div>
  )
}

// ── Scene 4: Import DOI/PubMed → Library → Reader ───────────────────────
function SceneImport() {
  return (
    <div className="reel-stack">
      <div className="reel-input" style={{ ['--d' as string]: '0ms' }}>
        <span className="reel-input-label">Add by DOI</span>
        <span className="reel-typed" style={{ ['--d' as string]: '300ms' }}>10.1056/NEJMoa…</span>
      </div>
      <div className="reel-arrow reel-arrow--down" style={{ ['--d' as string]: '1100ms' }}>↓</div>
      <div className="reel-libitem" style={{ ['--d' as string]: '1400ms' }}>
        <span className="reel-libtitle">Effects of early mobilisation on recovery: a randomised trial</span>
        <span className="reel-libmeta">Park J, Kim S, et al. · 2021 · dedup ✓ · PDF attached</span>
        <span className="reel-badge" style={{ ['--d' as string]: '1900ms' }}>added</span>
      </div>
      <div className="reel-arrow reel-arrow--down" style={{ ['--d' as string]: '2600ms' }}>↓ open in Reader</div>
      <div className="reel-readermini" style={{ ['--d' as string]: '2900ms' }}>
        <span className="reel-pane-h">Reader</span>
        <p className="reel-txt reel-txt--sm">
          Recovery was faster in the{' '}
          <span className="reel-mark reel-mark--green" style={{ ['--d' as string]: '3300ms' }}>
            early-mobilisation arm
          </span>
          .
        </p>
      </div>
    </div>
  )
}

// ── Scene 5: AI paraphrase, grounded ────────────────────────────────────
function SceneAI() {
  return (
    <div className="reel-stack">
      <div className="reel-card2" style={{ ['--d' as string]: '0ms' }}>
        <div className="reel-pane-h">Highlighted source</div>
        <p className="reel-txt reel-txt--sm">
          <span className="reel-mark reel-mark--purple" style={{ ['--d' as string]: '200ms' }}>
            pts had less pain at 24h, fewer needing rescue analgesia
          </span>
        </p>
      </div>
      <div className="reel-ai" style={{ ['--d' as string]: '1100ms' }}>
        <span className="reel-ai-badge">AI</span>
        <span className="reel-ai-shimmer" />
        <span className="reel-ai-label">paraphrasing…</span>
      </div>
      <div className="reel-arrow reel-arrow--down" style={{ ['--d' as string]: '2100ms' }}>↓</div>
      <div className="reel-doc" style={{ ['--d' as string]: '2400ms' }}>
        <div className="reel-doc-h">Your draft</div>
        <p className="reel-txt reel-txt--sm" style={{ ['--d' as string]: '2600ms' }}>
          Patients reported less pain at 24 hours and required less rescue
          analgesia<span className="reel-cite-inline" style={{ ['--d' as string]: '3100ms' }}>[1]</span>.
        </p>
        <span className="reel-grounded" style={{ ['--d' as string]: '3400ms' }}>grounded ✓ — no invented facts</span>
      </div>
    </div>
  )
}

const SLIDES: Slide[] = [
  { id: 'highlight', pipeline: 'Highlight → Compile → Manuscript', Scene: SceneHighlight },
  { id: 'stats', pipeline: 'Data → Test → Plot → Manuscript', Scene: SceneStats },
  { id: 'review', pipeline: 'Screen → Appraise → Meta-analysis', Scene: SceneReview },
  { id: 'import', pipeline: 'DOI / PubMed → Library → Reader', Scene: SceneImport },
  { id: 'ai', pipeline: 'Highlight → AI paraphrase → Cited draft', Scene: SceneAI },
]

export function WorkflowReel() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const t = window.setTimeout(
      () => setIdx((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    )
    return () => window.clearTimeout(t)
  }, [idx, reduce, paused])

  const active = SLIDES[idx]

  return (
    <div
      data-testid="workflow-reel"
      className={`reel-card${reduce ? ' reel-static' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{REEL_CSS}</style>

      <div className="reel-head">
        <span className="reel-eyebrow">Watch it work</span>
        <span className="reel-pipeline" data-testid="reel-pipeline">{active.pipeline}</span>
      </div>

      <div className="reel-stage" key={idx}>
        <active.Scene />
      </div>

      <div className="reel-foot">
        <div className="reel-dots" role="tablist" aria-label="Workflow demos">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={s.pipeline}
              data-testid={`reel-dot-${s.id}`}
              className={`reel-dot${i === idx ? ' reel-dot--on' : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
        {!reduce && (
          <div className="reel-progress" aria-hidden>
            <span
              key={idx + (paused ? '-p' : '')}
              className={`reel-progress-fill${paused ? ' reel-progress-fill--paused' : ''}`}
              style={{ ['--dur' as string]: `${SLIDE_MS}ms` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const REEL_CSS = `
.reel-card{position:relative;border:1px solid #e2e8f0;border-radius:16px;background:#fff;
  box-shadow:0 1px 2px rgba(15,23,42,.04),0 12px 30px -18px rgba(15,23,42,.25);
  padding:16px 16px 12px;overflow:hidden}
.reel-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}
.reel-eyebrow{font:600 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;
  text-transform:uppercase;color:#94a3b8}
.reel-pipeline{font:600 11px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  color:#1d4ed8;text-align:right}
.reel-stage{position:relative;height:268px;background:#f8fafc;border:1px solid #eef2f7;
  border-radius:10px;padding:12px;overflow:hidden}
.reel-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px}
.reel-dots{display:flex;gap:2px;margin:-8px 0}
/* The visible dot is small, but the BUTTON is a 28px touch target (the 7px
   version was untappable on a phone). Hit area via flex-centering + padding. */
.reel-dot{width:28px;height:28px;border:0;padding:0;background:transparent;cursor:pointer;
  display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}
.reel-dot::before{content:"";width:7px;height:7px;border-radius:50%;background:#cbd5e1;
  transition:background .2s,transform .2s}
.reel-dot--on::before{background:#2563eb;transform:scale(1.3)}
.reel-progress{flex:1;height:3px;background:#eef2f7;border-radius:2px;overflow:hidden;max-width:140px}
.reel-progress-fill{display:block;height:100%;width:0;background:#2563eb;border-radius:2px;
  animation:reelProg var(--dur) linear forwards}
.reel-progress-fill--paused{animation-play-state:paused}
@keyframes reelProg{from{width:0}to{width:100%}}

/* shared element vocabulary */
.reel-bar{height:8px;border-radius:4px;margin:5px 0;opacity:0;animation:reelUp .45s ease both;animation-delay:var(--d,0ms)}
.reel-pane-h,.reel-doc-h{font:600 9px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;
  text-transform:uppercase;color:#94a3b8;margin-bottom:6px}
.reel-arrow{display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:18px;font-weight:700;
  opacity:0;animation:reelPop .4s ease both;animation-delay:var(--d,0ms)}
.reel-arrow--down{font-size:10px;font-weight:600;letter-spacing:.02em;gap:5px;color:#94a3b8}

/* text-bearing scene content */
.reel-card2{background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px 11px;
  opacity:0;animation:reelUp .45s ease both;animation-delay:var(--d,0ms)}
.reel-txt{margin:0;font:500 11.5px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#334155}
.reel-txt--sm{font-size:10.5px;line-height:1.5}
.reel-mark{position:relative;white-space:nowrap;padding:0 2px;color:#3f2d00;font-weight:600}
.reel-mark::before{content:"";position:absolute;left:0;right:0;top:-1px;bottom:-1px;z-index:-1;border-radius:2px;
  background:#fde68a;transform-origin:left;transform:scaleX(1);
  animation:reelSweep .55s ease both;animation-delay:var(--d,0ms)}
.reel-mark--green{color:#0f3d22}.reel-mark--green::before{background:#bbf7d0}
.reel-mark--purple{color:#3b1d6e;white-space:normal}.reel-mark--purple::before{background:#ddd6fe}
.reel-cite-inline{vertical-align:super;font-size:8px;font-weight:700;color:#1d4ed8;margin-left:1px;
  display:inline-block;opacity:0;animation:reelPop .35s ease both;animation-delay:var(--d,0ms)}
.reel-sheet2{display:grid;grid-template-columns:auto auto;gap:2px 12px;background:#fff;border:1px solid #e9eef5;
  border-radius:7px;padding:8px 10px;opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-th{font:700 8px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8}
.reel-td{font:500 11px/1.4 ui-monospace,Menlo,monospace;color:#334155}
.reel-statline{opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-statline--center{text-align:center;margin-top:6px}
.reel-pill--blue{color:#1d4ed8;background:#dbeafe;font-weight:600}
.reel-screentxt{flex:1;font:500 10.5px/1.4 -apple-system,sans-serif;color:#334155;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.reel-libtitle{display:block;font:600 11px/1.4 -apple-system,sans-serif;color:#1e293b}
.reel-libmeta{display:block;margin-top:3px;font:500 9px/1.3 -apple-system,sans-serif;color:#94a3b8}
.reel-ai-label{font:500 10px/1 -apple-system,sans-serif;color:#7c3aed}

.reel-grid3{display:grid;grid-template-columns:1fr 18px 1fr;gap:8px;height:100%}
.reel-pane{background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px}
.reel-hl{position:relative;height:9px;border-radius:4px;background:#eef2f7;margin:5px 0;overflow:hidden;
  opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-hl-fill{position:absolute;inset:0;transform-origin:left;transform:scaleX(1);
  background:#fde68a;animation:reelSweep .5s ease both;animation-delay:var(--d,0ms)}
.reel-hl-fill--green{background:#bbf7d0}
.reel-hl-fill--purple{background:#ddd6fe}
.reel-chip{display:inline-block;font:600 10px/1 sans-serif;color:#334155;background:#fff;
  border:1px solid #e2e8f0;border-left-width:3px;border-radius:5px;padding:5px 8px;margin:4px 4px 0 0;
  opacity:0;animation:reelFly .45s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.reel-chip--amber{border-left-color:#f59e0b}
.reel-chip--blue{border-left-color:#2563eb}
.reel-chip--green{border-left-color:#16a34a}
.reel-doc{margin-top:8px;background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px;position:relative;
  opacity:0;animation:reelPop .5s ease both;animation-delay:var(--d,0ms)}
.reel-cite{position:absolute;right:8px;bottom:8px;font:700 10px/1 sans-serif;color:#1d4ed8;
  background:#dbeafe;border-radius:4px;padding:2px 5px;opacity:0;animation:reelPop .4s ease both;animation-delay:var(--d,0ms)}

.reel-stack{display:flex;flex-direction:column;gap:7px;height:100%}
.reel-row{display:grid;grid-template-columns:auto 18px 1fr;align-items:center;gap:8px}
.reel-sheet{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;width:84px}
.reel-cell{height:14px;border-radius:3px;background:#e2e8f0;opacity:0;animation:reelUp .35s ease both;animation-delay:var(--d,0ms)}
.reel-cell--hot{background:#bfdbfe}
.reel-pill{justify-self:start;font:600 11px/1 sans-serif;color:#166534;background:#dcfce7;border-radius:6px;
  padding:6px 10px;opacity:0;animation:reelPop .4s ease both;animation-delay:var(--d,0ms)}
.reel-chart{display:flex;align-items:flex-end;gap:10px;height:96px;padding:8px 10px;background:#fff;
  border:1px solid #e9eef5;border-radius:8px;opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-col{flex:1;background:linear-gradient(#3b82f6,#2563eb);border-radius:4px 4px 0 0;transform-origin:bottom;
  transform:scaleY(1);animation:reelGrow .5s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.reel-push{font:600 11px/1 sans-serif;color:#1d4ed8;opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}

.reel-screenrow{display:flex;align-items:center;gap:8px}
.reel-screenrow .reel-bar{flex:1;margin:0}
.reel-stamp{font:700 12px/1 sans-serif;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;opacity:0;animation:reelPop .35s ease both;animation-delay:var(--d,0ms)}
.reel-stamp--in{color:#166534;background:#dcfce7}
.reel-stamp--out{color:#b91c1c;background:#fee2e2}
.reel-forest{margin-top:4px;background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px;
  opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-fline{position:relative;height:9px;border-bottom:1px dashed #e2e8f0;margin:7px 0}
.reel-fdot{position:absolute;top:1px;width:8px;height:8px;border-radius:2px;background:#2563eb;
  opacity:0;animation:reelPop .35s ease both;animation-delay:var(--d,0ms)}
.reel-fline{opacity:0;animation:reelUp .35s ease both;animation-delay:var(--d,0ms)}
.reel-diamond{width:14px;height:14px;margin:6px auto 0;background:#16a34a;transform:rotate(45deg) scale(1);
  animation:reelPop .45s ease both;animation-delay:var(--d,0ms)}

.reel-input{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e9eef5;border-radius:8px;
  padding:9px 10px;opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-input-label{font:600 9px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8}
.reel-typed{font:500 12px/1 ui-monospace,Menlo,monospace;color:#334155;white-space:nowrap;overflow:hidden;
  border-right:2px solid #2563eb;width:0;animation:reelType 1s steps(14) both,reelCaret .6s step-end infinite;animation-delay:var(--d,0ms),0ms}
.reel-libitem{position:relative;background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px 10px 10px 12px;
  opacity:0;animation:reelUp .45s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.reel-badge{position:absolute;right:8px;top:8px;font:600 9px/1 sans-serif;color:#166534;background:#dcfce7;
  border-radius:4px;padding:3px 6px;opacity:0;animation:reelPop .35s ease both;animation-delay:var(--d,0ms)}
.reel-readermini{background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:10px;
  opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}

.reel-ai{display:flex;align-items:center;gap:8px;background:#faf5ff;border:1px solid #ede9fe;border-radius:8px;
  padding:8px 10px;opacity:0;animation:reelUp .4s ease both;animation-delay:var(--d,0ms)}
.reel-ai-badge{font:700 9px/1 sans-serif;color:#fff;background:#7c3aed;border-radius:4px;padding:3px 5px}
.reel-ai-shimmer{flex:1;height:8px;border-radius:4px;
  background:linear-gradient(90deg,#ede9fe 25%,#c4b5fd 50%,#ede9fe 75%);background-size:200% 100%;
  animation:reelShimmer 1.1s linear infinite}
.reel-grounded{display:inline-block;margin-top:8px;font:600 9px/1 sans-serif;color:#5b21b6;background:#ede9fe;
  border-radius:4px;padding:3px 6px;opacity:0;animation:reelPop .35s ease both;animation-delay:var(--d,0ms)}

@keyframes reelUp{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@keyframes reelPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
@keyframes reelFly{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
@keyframes reelSweep{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes reelGrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes reelType{from{width:0}to{width:108px}}
@keyframes reelCaret{50%{border-color:transparent}}
@keyframes reelShimmer{from{background-position:200% 0}to{background-position:-200% 0}}
.reel-diamond{transform:rotate(45deg)}
@keyframes reelDiamond{from{opacity:0;transform:rotate(45deg) scale(.4)}to{opacity:1;transform:rotate(45deg) scale(1)}}
.reel-diamond{animation-name:reelDiamond}

/* Reduced motion: disable all entrance animations → final composite frame */
.reel-static .reel-bar,.reel-static .reel-arrow,.reel-static .reel-hl,.reel-static .reel-hl-fill,
.reel-static .reel-chip,.reel-static .reel-doc,.reel-static .reel-cite,.reel-static .reel-cell,
.reel-static .reel-pill,.reel-static .reel-chart,.reel-static .reel-col,.reel-static .reel-push,
.reel-static .reel-stamp,.reel-static .reel-forest,.reel-static .reel-fline,.reel-static .reel-fdot,
.reel-static .reel-diamond,.reel-static .reel-input,.reel-static .reel-typed,.reel-static .reel-libitem,
.reel-static .reel-badge,.reel-static .reel-readermini,.reel-static .reel-ai,.reel-static .reel-ai-shimmer,
.reel-static .reel-grounded,.reel-static .reel-card2,.reel-static .reel-cite-inline,.reel-static .reel-sheet2,
.reel-static .reel-statline{animation:none!important;opacity:1!important;transform:none!important;width:auto;border-right:0}
.reel-static .reel-diamond{transform:rotate(45deg)!important}
.reel-static .reel-mark::before{animation:none!important;transform:scaleX(1)!important}
.reel-static .reel-typed{width:auto}
`
