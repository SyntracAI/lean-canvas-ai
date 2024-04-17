'use client';

import { ErrorBoundary } from '@/app/_ui/components/ErrorBoundary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <head />
      <body>
        <ErrorBoundary error={error} reset={reset} />
      </body>
    </html>
  );
}
