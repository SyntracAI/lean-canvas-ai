'use client';

import { Button } from '@syntrac/frontend-web-ui';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Something went wrong</h3>
      <p>{error.message}</p>
      <Button onClick={reset} className="mt-3">
        Recover
      </Button>
    </div>
  );
};
