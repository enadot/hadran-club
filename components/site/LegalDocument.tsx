import { Icon } from "@/components/brand/Icon";
import type { LegalDocument as LegalDocumentData } from "@/lib/data/legal";
import { REVIEW_NOTE } from "@/lib/data/legal";

/**
 * The reading surface for the club's three legal documents.
 *
 * A single measured column, because that is what a long document needs and nothing
 * else here does. No cards, no bands, no reveal: legal text that fades in as you
 * scroll is legal text somebody has to wait for.
 */
export function LegalDocument({ doc }: { doc: LegalDocumentData }) {
  return (
    <div className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(28px,5.3vw,48px)] pb-20">
      <article className="mx-auto flex w-full max-w-[var(--container-narrow)] flex-col gap-[clamp(28px,5vw,44px)]">
        <header className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
            {doc.eyebrow}
          </span>
          <h1 className="m-0 text-[clamp(27px,6vw,44px)] leading-[1.08]">{doc.title}</h1>
          <p className="m-0 text-[clamp(16px,2.3vw,18px)] leading-[1.6] text-[var(--color-body)]">
            {doc.summary}
          </p>
          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            עודכן לאחרונה: {doc.updated}
          </span>

          {/* One line to delete once the text has been through legal review. */}
          <div className="mt-2 flex items-start gap-2.5 rounded-[var(--radius-md)] bg-[var(--color-canvas)] p-3.5">
            <span className="mt-0.5 flex-none">
              <Icon name="info" size={18} color="var(--color-primary-deep)" />
            </span>
            <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-body)]">
              {REVIEW_NOTE}
            </span>
          </div>
        </header>

        <div className="flex flex-col gap-[clamp(24px,4vw,36px)]">
          {doc.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="m-0 text-[clamp(19px,3vw,24px)] leading-[1.25]">{section.heading}</h2>

              {section.paragraphs?.map((text) => (
                <p
                  key={text}
                  className="m-0 text-[clamp(15px,2.2vw,17px)] leading-[1.75] text-[var(--color-body)]"
                >
                  {text}
                </p>
              ))}

              {section.list ? (
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[9px] size-1.5 flex-none rounded-full bg-[var(--gold-500)]" />
                      <span className="text-[clamp(15px,2.2vw,17px)] leading-[1.75] text-[var(--color-body)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
