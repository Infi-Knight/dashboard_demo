import * as React from 'react';
import { Button } from '@/components/button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) {
  return (
    <div
      role="alert"
      className="mx-4 mt-8 md:mx-6 lg:mx-12 text-rose-500 grid place-content-center text-center gap-6"
    >
      <p>Something went wrong</p>
      <Button onClick={resetErrorBoundary}>Try reloading the page</Button>
    </div>
  );
}
