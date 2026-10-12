import SectionHeader from "@/components/SectionHeader";

const STATS = [
  { value: 6, suffix: "+", label: "Years shipping production software" },
  { value: 2, label: "Frontier AI labs" },
  { value: 7.5, decimals: 1, suffix: "M", label: "Monthly users reached by real-time systems I worked on" },
] as const;

export default function Thesis() {
  return (
    <section id="thesis" className="relative px-gutter pb-[clamp(4rem,10vh,7rem)] pt-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader index="01" label="Thesis" />
      <p
        data-scrub-words
        className="mt-12 max-w-[24ch] text-[clamp(2rem,4.8vw,5rem)] font-medium leading-[1.02] tracking-[-0.04em] md:mt-16"
      >
        Frontier models are only as good as what their researchers can see. I build the{" "}
        <em className="serif-em text-signal">instruments</em> that make training legible, for the people running the
        experiments and, increasingly, for their <em className="serif-em text-signal">agents</em>.
      </p>
      <dl className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} data-fade className="flex flex-col-reverse">
            <dt className="mono-label mt-3 max-w-[26ch] text-dim">{s.label}</dt>
            <dd className="display text-[clamp(3.5rem,6vw,6rem)] tabular-nums">
              <span data-count={s.value} data-decimals={"decimals" in s ? s.decimals : 0}>
                {s.value}
              </span>
              {"suffix" in s ? <span className="text-signal">{s.suffix}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
