"use client"; // Error components must be Client components

import { useEffect } from "react";

// Error components always take two special props error and reset
// Error is the actual object of whatever went wrong and reset is a special function in Next.js that will attempt to re-render the page component
// Error components are useful so that users have a fallback in case of any page breaking issues
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* This way user can attempt to re-render the page manually */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
