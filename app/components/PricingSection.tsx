type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 3 projects",
      "1 GB storage",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For growing teams that need more power",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom domains",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-24 px-6 sm:px-12 lg:px-24 bg-zinc-50 dark:bg-zinc-900 font-sans"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Simple, transparent pricing
          </h2>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                "relative flex flex-col rounded-2xl p-8 gap-6 transition-shadow",
                tier.highlighted
                  ? "bg-indigo-600 dark:bg-indigo-700 text-white ring-4 ring-indigo-400 dark:ring-indigo-500 shadow-2xl scale-105"
                  : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:shadow-lg",
              ].join(" ")}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wide text-amber-900 shadow">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h3
                  className={[
                    "text-xl font-bold",
                    tier.highlighted ? "text-white" : "text-zinc-900 dark:text-zinc-50",
                  ].join(" ")}
                >
                  {tier.name}
                </h3>
                <p
                  className={[
                    "text-sm",
                    tier.highlighted ? "text-indigo-100" : "text-zinc-500 dark:text-zinc-400",
                  ].join(" ")}
                >
                  {tier.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span
                  className={[
                    "text-5xl font-extrabold tracking-tight",
                    tier.highlighted ? "text-white" : "text-zinc-900 dark:text-zinc-50",
                  ].join(" ")}
                >
                  {tier.price}
                </span>
                <span
                  className={[
                    "text-sm font-medium",
                    tier.highlighted ? "text-indigo-200" : "text-zinc-500 dark:text-zinc-400",
                  ].join(" ")}
                >
                  / {tier.period}
                </span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span
                      className={[
                        "mt-0.5 flex-shrink-0 text-base",
                        tier.highlighted ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className={
                        tier.highlighted ? "text-indigo-50" : "text-zinc-700 dark:text-zinc-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={[
                  "mt-auto inline-flex h-12 w-full items-center justify-center rounded-full text-base font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  tier.highlighted
                    ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:outline-white shadow-lg"
                    : "border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 focus-visible:outline-indigo-600",
                ].join(" ")}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
