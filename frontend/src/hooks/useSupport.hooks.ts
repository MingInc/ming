import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth.hooks";

export const useSupport = () => {
  const [support, setSupport] = useState<Component.Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "transferred" | "closed"
  >("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const { authState } = useAuth();
  // const { closeDialog } = useDialog();

  // Fetching the support cases from the server
  useEffect(() => {
    const fetchSupport = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/support",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch support tickets");
        }
        const data = await response.json();
        setSupport(data?.tickets || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupport();
  }, []);

  const createCase = async (formData: FormData) => {
    setCreating(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/support",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: authState?.user?.stsTokenManager?.accessToken, // Replace with actual token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new case");
      }
      const data: Component.Ticket = await response.json();
      setSupport((prevSupport) => [...prevSupport, data]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setCreating(false);
    }
  };

  // Function to filter tickets based on search term and status
  const getFilteredCases = useCallback(() => {
    if (!support) return [];

    // Filter by status first
    const filteredByStatus = support.filter((ticket) => {
      return statusFilter === "all" || ticket.status === statusFilter;
    });

    // Filter by search term
    const filteredBySearch = filteredByStatus.filter((ticket) =>
      ticket?.ticketInfo?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return filteredBySearch;
  }, [support, searchTerm, statusFilter]);

  return {
    cases: support, // Return the array directly
    filteredCases: getFilteredCases(),
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createCase,
    loading,
    error,
    creating,
  };
};
