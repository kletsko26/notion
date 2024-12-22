import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);

      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        setLoading(false);
        const message = `Couldn't fetch ${url}, status: ${response.status}`;
        setError({ status: response.status, message });
        throw new Error(message);
      }
      const data = await response.json();
      setLoading(false);
      return data;
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { request, loading, error, clearError };
};

export default useHttp;
