import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number): string => {
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(debounce);
  }, [value, delay]);

  return debounced;
};
