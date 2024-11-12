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

export function Billing() {
  const { authState } = useAuth();
  const { user } = useUser(authState?.user?.uid);
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <div className="grid gap-6 md:grid-cols-[350px,1fr]">
        <div className="space-y-6">
          {/* Subscription Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              {user && user[0]?.premium ? (
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
                  laxman.rai.07.26@gmail.com
                </div>
              </div>
              <div>
                <div className="font-medium text-sm">Additional Recipients</div>
                <div className="text-sm text-muted-foreground">
                  lexy@minginc.xyz
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
                    <TableRow>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell>76AFPBM11XZ-0003</TableCell>
                      <TableCell>$15.00</TableCell>
                      <TableCell>Oct 17, 2024 (Local Time)</TableCell>
                      <TableCell>Oct 17, 2024 (Local Time)</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Void
                        </span>
                      </TableCell>
                      <TableCell>76AFPBM11XZ-0002</TableCell>
                      <TableCell>$33.00</TableCell>
                      <TableCell>Oct 6, 2024 (Local Time)</TableCell>
                      <TableCell>Oct 6, 2024 (Local Time)</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Paid
                        </span>
                      </TableCell>
                      <TableCell>76AFPBM11XZ-0001</TableCell>
                      <TableCell>$18.00</TableCell>
                      <TableCell>Sep 6, 2024 (Local Time)</TableCell>
                      <TableCell>Sep 6, 2024 (Local Time)</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
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
