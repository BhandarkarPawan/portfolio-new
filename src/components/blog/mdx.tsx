import Image from "next/image";
import Link from "next/link";
import { isValidElement } from "react";
import { codeToHtml } from "shiki";

async function CodeBlock({ children }: React.ComponentProps<"pre">) {
  if (!isValidElement<{ className?: string; children?: string }>(children)) {
    throw new Error("Expected a fenced code block to contain a single <code> element");
  }
  const lang = children.props.className?.replace("language-", "") ?? "text";
  const html = await codeToHtml(String(children.props.children ?? "").trimEnd(), { lang, theme: "vesper" });
  return (
    <div className="code-block not-prose overflow-hidden rounded-lg border border-line">
      <div className="mono-label flex justify-between border-b border-line px-5 py-2.5 text-faint">
        <span>{lang}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mono-label !mt-3 text-center leading-relaxed text-faint">{children}</p>;
}

function SideBySideCode({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="!my-10 md:-mx-[12vw]">
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

type ImageProps = { src: string; alt: string; width: number; height: number };

function ImageWithCaption({ caption, alt, ...image }: ImageProps & { caption: string }) {
  return (
    <figure className="!my-10">
      <Image
        {...image}
        alt={alt}
        className="w-full rounded-lg border border-line"
        sizes="(min-width: 768px) 720px, 100vw"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

function ImageWithAttribution({
  attrName,
  attrUrl,
  attrHost,
  attrHostUrl,
  alt,
  ...image
}: ImageProps & { attrName: string; attrUrl: string; attrHost?: string; attrHostUrl?: string }) {
  return (
    <figure className="!my-10">
      <Image
        {...image}
        alt={alt}
        className="w-full rounded-lg border border-line"
        sizes="(min-width: 768px) 720px, 100vw"
        priority
      />
      <Caption>
        Image by <a href={attrUrl}>{attrName}</a>
        {attrHost ? <> · hosted on {attrHostUrl ? <a href={attrHostUrl}>{attrHost}</a> : attrHost}</> : null}
      </Caption>
    </figure>
  );
}

function Anchor({ href = "", children, ...rest }: React.ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  // The page header renders the title; the MDX h1 would duplicate it.
  h1: () => null,
  pre: CodeBlock,
  a: Anchor,
  Caption,
  SideBySideCode,
  ImageWithCaption,
  ImageWithAttribution,
  // Legacy wrapper from the old site's posts; layout spacing now comes from .prose-pb.
  Paragraph: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};
