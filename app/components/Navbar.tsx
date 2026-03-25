import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-6 sm:px-12 lg:px-24">
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-sans">
          Acme
        </span>
        <ThemeToggle />
      </div>
    </header>
  )
}
