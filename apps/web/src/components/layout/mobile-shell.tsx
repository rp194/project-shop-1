import type { PropsWithChildren } from "react";

export function MobileShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">{children}</div>
    </div>
  );
}
