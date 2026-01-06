import { Card, CardContent, Button, Badge } from "@/components/ui";
import { mockPayments, mockPaymentMethods, mockPortalStats } from "@/lib/data/portal-mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  CreditCard, 
  Download, 
  Plus,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

export default function PaymentsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Paid</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "refunded":
        return <Badge variant="info">Refunded</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "refunded":
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Payments
        </h1>
        <p className="text-charcoal-400">
          View your payment history and manage payment methods.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="mb-8 bg-gradient-to-br from-charcoal-800 to-charcoal-900">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-charcoal-400 mb-1">Total Spent</p>
              <p className="font-heading text-4xl font-bold text-white">
                {formatCurrency(mockPortalStats.totalSpent)}
              </p>
              <p className="text-sm text-charcoal-500 mt-1">
                Across {mockPayments.length} payments
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                Download All Invoices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        {/* Payment History */}
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-4">
            Payment History
          </h2>
          <div className="space-y-4">
            {mockPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-charcoal-700 rounded-lg flex items-center justify-center mt-1">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {payment.description}
                        </h3>
                        <p className="text-sm text-charcoal-400 mb-2">
                          {formatDate(payment.date)} • {payment.method}
                        </p>
                        {payment.invoiceId && (
                          <p className="text-xs text-charcoal-500">
                            Invoice: {payment.invoiceId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white mb-2">
                        {formatCurrency(payment.amount)}
                      </p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-charcoal-700 flex gap-3">
                    <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-4">
            Payment Methods
          </h2>
          <div className="space-y-4">
            {mockPaymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-charcoal-700 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-charcoal-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {method.brand} •••• {method.last4}
                        </span>
                        {method.isDefault && (
                          <Badge variant="success" size="sm">Default</Badge>
                        )}
                      </div>
                      {method.expiryDate && (
                        <p className="text-xs text-charcoal-400">
                          Expires {method.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Payment Method */}
            <button className="w-full p-4 border-2 border-dashed border-charcoal-700 rounded-xl text-charcoal-400 hover:border-electric hover:text-electric transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Add Payment Method</span>
            </button>
          </div>

          {/* Help */}
          <Card className="mt-6">
            <CardContent>
              <p className="text-sm text-charcoal-400 mb-3">
                Need help with a payment?
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

