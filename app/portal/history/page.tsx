import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { mockServiceHistory } from "@/lib/data/portal-mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Star, 
  Calendar, 
  User, 
  FileText,
  Image as ImageIcon,
  MessageSquare
} from "lucide-react";

export default function ServiceHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Service History
        </h1>
        <p className="text-charcoal-400">
          View all your past services and leave reviews.
        </p>
      </div>

      {/* Service List */}
      <div className="space-y-6">
        {mockServiceHistory.map((service) => (
          <Card key={service.id}>
            <CardContent>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {service.serviceName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(service.completedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Technician: {service.technician}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">Completed</Badge>
                  <span className="text-xl font-bold text-electric">
                    {formatCurrency(service.price)}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {service.rating && (
                <div className="mb-4">
                  <p className="text-sm text-charcoal-400 mb-1">Your Rating</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < service.rating!
                            ? "text-electric fill-electric"
                            : "text-charcoal-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Review */}
              {service.review && (
                <div className="mb-4 p-4 bg-charcoal-700/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-electric" />
                    <span className="text-sm font-medium text-charcoal-300">Your Review</span>
                  </div>
                  <p className="text-charcoal-200 text-sm">&ldquo;{service.review}&rdquo;</p>
                </div>
              )}

              {/* Images */}
              {service.images.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-charcoal-400" />
                    <span className="text-sm text-charcoal-400">Photos</span>
                  </div>
                  <div className="flex gap-3">
                    {service.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-24 rounded-lg overflow-hidden bg-charcoal-700"
                      >
                        <Image
                          src={img}
                          alt={`Service photo ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-charcoal-700">
                {service.invoiceUrl && (
                  <Button variant="ghost" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                    View Invoice
                  </Button>
                )}
                {!service.review && (
                  <Button variant="secondary" size="sm" leftIcon={<Star className="w-4 h-4" />}>
                    Leave Review
                  </Button>
                )}
                <Link href={`/services/${service.serviceId}`}>
                  <Button variant="ghost" size="sm">
                    Book Again
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockServiceHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-charcoal-400 mb-4">No service history yet.</p>
            <Link href="/quote">
              <Button>Schedule Your First Service</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

