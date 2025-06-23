import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);

    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  }

   const refresh = () => {
    fetchData();
  }

  useEffect(() => {

    if (autoFetch) {
      fetchData();
    }
    // Cleanup function to reset state when component unmounts
    return () => reset();
  }, []);
    
  // console.log('fetch result: ', data , 'loading:', loading, 'error:', error);
  return { data, loading, error, refetch: fetchData, reset, refresh };
}

export default useFetch;
