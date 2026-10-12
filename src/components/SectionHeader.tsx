type Props = {
  index: string;
  label: string;
  title?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
};

export default function SectionHeader({ index, label, title, aside, className = "" }: Props) {
  return (
    <header className={className}>
      <div className="mono-label flex items-center gap-4 text-dim">
        <span className="text-signal">({index})</span>
        <span>{label}</span>
        <span data-rule aria-hidden className="h-px flex-1 bg-line" />
        {aside}
      </div>
      {title ? (
        <h2 data-split="lines" className="display mt-8 max-w-[16ch] text-[clamp(2.75rem,7vw,7.5rem)] md:mt-10">
          {title}
        </h2>
      ) : null}
    </header>
  );
}
