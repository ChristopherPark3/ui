import * as React from "react";

/** Stands in for a server search in stories: filters `source` after a delay, like a debounced fetch. */
export function useFakeSearch(source: string[], query: string, delay = 600) {
  const [results, setResults] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(source.filter((item) => item.toLowerCase().includes(q)));
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [source, query, delay]);

  return { results, loading };
}
