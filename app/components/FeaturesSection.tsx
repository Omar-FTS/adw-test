type Feature = {
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: "⚡",
    title: "Fast Deployment",
    description:
      "Deploy your application in seconds with zero-config CI/CD pipelines. Push to main and watch your changes go live instantly.",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team using real-time editing, comments, and role-based access controls built right in.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    description:
      "Get deep insights into your application's performance, user behavior, and business metrics from one unified dashboard.",
  },
  {
    icon: "🔌",
    title: "API Access",
    description:
      "Integrate with your existing tools via our comprehensive REST and GraphQL APIs. Full SDK support for all major languages.",
  },
  {
    icon: "🛡️",
    title: "99.9% Uptime",
    description:
      "Enterprise-grade infrastructure with automatic failover, global CDN, and 24/7 monitoring guarantees your SLA.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    description:
      "Our expert support team is always on standby. Get answers via live chat, email, or our community forum.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-zinc-950 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Everything you need
          </h2>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Acme gives your team all the tools to build, ship, and scale modern applications — without the operational overhead.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 transition-shadow hover:shadow-md dark:hover:shadow-zinc-800/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
