import { EDUCATION, PROFILE, RECOGNITION } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";
import HalftonePortrait from "@/components/HalftonePortrait";
import Magnetic from "@/components/motion/Magnetic";

export default function About() {
  return (
    <section id="about" className="px-gutter py-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader index="05" label="About" />

      <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-fade className="mx-auto max-w-md lg:sticky lg:top-28 lg:mx-0">
            <HalftonePortrait src="/images/pawan.png" width={749} height={942} alt={`Portrait of ${PROFILE.name}`} />
            <p className="mono-label mt-4 flex justify-between text-faint">
              <span>Fig. 1 — the author</span>
              <span className="hidden sm:inline">Hover to focus</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <h2 data-split="lines" className="display text-[clamp(2.5rem,5.6vw,6rem)]">
            Engineer by trade, <span className="serif-em text-signal">designer</span> by habit.
          </h2>

          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-paper/70 md:text-xl">
            <p data-fade>
              I&rsquo;m Pawan, a full-stack engineer who cares as much about how a tool feels as about what it computes.
              For the past few years I&rsquo;ve built the software frontier labs use to understand their models: at xAI,
              Nebula for model debugging and RL observability, and Starfleet for the human data behind Grok&rsquo;s
              post-training; now at Thinking Machines Lab, a platform for runs, rollouts, datasets and evals.
            </p>
            <p data-fade>
              Before that I was the founding engineer at Converge Lab, built real-time infrastructure at TuneIn, and
              spent two years shipping products in Fukuoka, Japan. I studied software engineering at Carnegie Mellon.
            </p>
            <p data-fade>
              I like putting tools in people&rsquo;s hands early and iterating with them. Designing interfaces has been
              a hobby for as long as I&rsquo;ve been writing code, so I usually design what I build.
            </p>
          </div>

          <div data-fade className="mt-12">
            <Magnetic>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Open"
                className="group inline-flex items-center gap-4 rounded-full bg-paper py-4 pl-7 pr-4 text-ink transition-colors hover:bg-signal"
              >
                <span className="text-base font-medium tracking-tight">Read the résumé</span>
                <span className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="mono-label text-dim">Education</h3>
              <span data-rule aria-hidden className="mt-4 block h-px bg-line" />
              <ul>
                {EDUCATION.map((e) => (
                  <li key={e.school} data-fade className="border-b border-line py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-xl font-medium tracking-tight">{e.school}</p>
                      <span className="mono-label text-dim">{e.year}</span>
                    </div>
                    <p className="mt-1 text-paper/70">{e.degree}</p>
                    <p className="mono-label mt-3 text-faint">
                      {e.place} · {e.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label text-dim">Recognition</h3>
              <span data-rule aria-hidden className="mt-4 block h-px bg-line" />
              <ul>
                {RECOGNITION.map((r) => (
                  <li key={r.title} data-fade className="border-b border-line py-6">
                    <p className="text-xl font-medium tracking-tight">{r.title}</p>
                    <p className="mt-1 text-paper/70">{r.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
