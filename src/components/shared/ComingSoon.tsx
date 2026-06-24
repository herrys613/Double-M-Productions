/** Placeholder page body: the page name + "Coming soon". */
export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
          Double M Productions
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-muted">Coming soon.</p>
      </div>
    </section>
  );
}
