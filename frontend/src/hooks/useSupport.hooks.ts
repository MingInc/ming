import { useToast } from "@/components/ui";
import { useState } from "react";
// import { useAuth } from "./useAuth.hooks";

export const useSupport = (support: Component.Ticket[]) => {
  // const [support, setSupport] = useState<Component.Ticket[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "transferred" | "closed"
  >("all");
  // const [loading, _] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const { toast } = useToast();

  const createCase = async (
    formData: FormData,
    onSuccess: (newTicket: Component.Ticket) => void
  ) => {
    setCreating(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/support",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new case");
      }

      const data: Component.Ticket = await response.json();

      // Optimistic update: immediately add the new case to the state
      // setSupport((prevSupport) => [...prevSupport, data]);
      onSuccess(data);

      toast({
        title: "Ticket Submitted Successfully",
        description: "Please check your email for further details.",
      });
    } catch (error) {
      setError((error as Error).message);
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to submit the ticket",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  // Function to filter tickets based on search term and status
  const getFilteredCases = () => {
    if (!support) return [];

    // Filter by status first
    const filteredByStatus = support.filter((ticket) => {
      return statusFilter === "all" || ticket.status === statusFilter;
    });

    // Filter by search term
    // const filteredBySearch = filteredByStatus.filter((ticket) =>
    //   ticket?.ticketInfo?.title
    //     ?.toLowerCase()
    //     .includes(searchTerm.toLowerCase())
    // );

    return filteredByStatus;
  };

  return {
    // cases: support, // Return the array directly
    filteredCases: getFilteredCases(),
    // searchTerm,
    // setSearchTerm,
    statusFilter,
    setStatusFilter,
    createCase,
    // loading,
    error,
    creating,
  };
};
