// hooks/usePayments.ts
import { useState, useEffect } from "react";

interface UsePaymentsResponse {
  payments: Component.Payment[] | null;
  loading: boolean;
  error: string | null;
}

const usePayments = (userId: string): UsePaymentsResponse => {
  const [payments, setPayments] = useState<Component.Payment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/payments?id=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payments.");
        }

        const data = await response.json();
        setPayments(data.payments);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPayments();
    }
  }, [userId]);

  return { payments, loading, error };
};

export default usePayments;
