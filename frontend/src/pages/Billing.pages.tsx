import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, HelpCircle } from "lucide-react";
import { useAuth, useUser } from "@/hooks";
import usePayments from "@/hooks/usePayments.hooks";

export function Billing() {
  const { authState } = useAuth();
  const { user } = useUser(authState?.user?.id);
  const { payments, loading, error } = usePayments(authState?.user?.id);

  const handleDownloadInvoice = async (payment: Component.Payment) => {
    try {
      const response = await fetch("http://localhost:3000/download-invoice", {
        method: "POST",
        body: JSON.stringify(payment),
      });
      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileName =
        contentDisposition?.split("filename=")[1] || "ming_invoice.pdf";
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      link.setAttribute("download", fileName);
      link.click();
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <div>Loading payments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <div className="grid gap-6 md:grid-cols-[350px,1fr]">
        <div className="space-y-6">
          {/* Subscription Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              {user && user?.premium ? (
                <div className="font-medium">Premium</div>
              ) : (
                <div>
                  <div className="font-medium">No Subscription</div>
                  <Button>Upgrade Now</Button>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Method Card */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Payment Method</h2>
              <Button variant="link" className="h-auto p-0">
                Edit
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Visa ****1900 exp. 10/2028
            </div>
          </Card>

          {/* Receipt Details Card */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Receipt Details</h2>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button variant="link" className="h-auto p-0">
                Add
              </Button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="font-medium text-sm">Tax ID</div>
                <div className="text-sm text-muted-foreground">None</div>
              </div>
              <div>
                <div className="font-medium text-sm">Business Address</div>
                <div className="text-sm text-muted-foreground">None</div>
              </div>
            </div>
          </Card>

          {/* Billing Email Recipients Card */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Billing Email Recipients</h2>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button variant="link" className="h-auto p-0">
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="font-medium text-sm">Account Admins</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </div>
              <div>
                <div className="font-medium text-sm">Additional Recipients</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Billing History Section */}
        <Card className="p-4">
          <Tabs defaultValue="history">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Invoices</TabsTrigger>
              <TabsTrigger value="history">Billing History</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <div className="space-y-4">
                <Input placeholder="Filter Invoices..." className="max-w-sm" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Issued</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments?.map((payment: Component.Payment) => (
                      <TableRow key={payment.stripePaymentId}>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === "succeeded"
                                ? "bg-green-50 text-green-700"
                                : payment.status === "failed"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {payment.stripePaymentId.slice(0, 5) +
                            "..." +
                            payment.stripePaymentId.slice(
                              payment.stripePaymentId.length - 5
                            )}
                        </TableCell>
                        <TableCell>
                          ${(payment.amount / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadInvoice(payment)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="text-center py-8 text-muted-foreground">
                No upcoming invoices
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
