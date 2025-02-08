import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (options) => {

    setLoading(true);
    setError(null);

    try {
      const response = await cb(options);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      throw error
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
