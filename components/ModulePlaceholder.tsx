export function ModulePlaceholder({
  module,
  description,
  reads,
  writes,
  steps,
}: {
  module: string;
  description: string;
  reads: string;
  writes: string;
  steps: string[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="card flex flex-col items-center px-8 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 3" />
            <path d="M12 8v8M8 12h8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Not yet built — placeholder
        </span>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">{module}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{description}</p>

        <div className="mt-8 grid w-full gap-4 text-left sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Reads</div>
            <p className="mt-1 text-sm text-slate-600">{reads}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Writes</div>
            <p className="mt-1 text-sm text-slate-600">{writes}</p>
          </div>
        </div>

        <div className="mt-6 w-full text-left">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Planned flow
          </div>
          <ol className="mt-2 space-y-2">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
