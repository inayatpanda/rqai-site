export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-5 gap-y-2.5 px-5 py-4 text-[0.8125rem] text-muted">
        <span>&copy; {year} RQAI</span>
        <a
          href="mailto:hello@rqai.co.uk"
          className="text-accent-cyan no-underline transition-colors duration-200 hover:text-accent-teal"
        >
          hello@rqai.co.uk
        </a>
      </div>
    </footer>
  )
}
