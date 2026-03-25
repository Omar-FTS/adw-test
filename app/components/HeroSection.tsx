export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-950 py-24 px-6 sm:px-12 lg:px-24 text-white font-sans">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/20">
          Now in public beta — try it free
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
          Ship faster with{" "}
          <span className="text-indigo-200">Acme</span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-indigo-100 dark:text-indigo-200">
          The all-in-one platform that helps modern teams collaborate, deploy, and scale with confidence. From solo hackers to Fortune 500 companies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get Started Free
          </a>
          <a
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Pricing &rarr;
          </a>
        </div>
        <p className="text-sm text-indigo-200 dark:text-indigo-300">
          No credit card required &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
