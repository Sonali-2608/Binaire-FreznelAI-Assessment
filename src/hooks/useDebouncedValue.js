import { useEffect, useState } from "react";

// Returns a version of `value` that only updates `delay` ms after typing stops.
// Used so search filtering doesn't re-run on every keystroke.
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
