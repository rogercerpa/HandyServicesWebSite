import Link from "next/link";
import { Card, CardContent, Button, Badge } from "@/components/ui";
import { 
  mockAppointments, 
  mockPortalStats,
  mockServiceHistory 
} from "@/lib/data/portal-mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function PortalDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-charcoal-400">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="text-center">
            <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-electric" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {mockPortalStats.upcomingAppointments}
            </p>
            <p className="text-sm text-charcoal-400">Upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {mockPortalStats.completedJobs}
            </p>
            <p className="text-sm text-charcoal-400">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {formatCurrency(mockPortalStats.totalSpent)}
            </p>
            <p className="text-sm text-charcoal-400">Total Spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {mockPortalStats.averageRating.toFixed(1)}
            </p>
            <p className="text-sm text-charcoal-400">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-white">
              Upcoming Appointments
            </h2>
            <Link href="/quote">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Schedule New
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {mockAppointments.length > 0 ? (
              mockAppointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {apt.serviceName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-charcoal-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(apt.date)}</span>
                          <span>•</span>
                          <span>{apt.time}</span>
                        </div>
                      </div>
                      <Badge variant="warning">{apt.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-charcoal-700">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-charcoal-500" />
                        <span className="text-charcoal-400">{apt.estimatedDuration}</span>
                      </div>
                      <span className="font-semibold text-electric">
                        {formatCurrency(apt.price)}
                      </span>
                    </div>
                    {apt.notes && (
                      <p className="mt-3 text-sm text-charcoal-500 italic">
                        Note: {apt.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <AlertCircle className="w-10 h-10 text-charcoal-600 mx-auto mb-3" />
                  <p className="text-charcoal-400">No upcoming appointments</p>
                  <Link href="/quote" className="mt-4 inline-block">
                    <Button size="sm">Schedule a Service</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Services */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-white">
              Recent Services
            </h2>
            <Link href="/portal/history">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {mockServiceHistory.slice(0, 3).map((service) => (
              <Card key={service.id}>
                <CardContent>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {service.serviceName}
                      </h3>
                      <p className="text-sm text-charcoal-400">
                        {formatDate(service.completedDate)}
                      </p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  {service.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: service.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-electric fill-electric" />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-charcoal-700">
                    <span className="text-sm text-charcoal-400">
                      Technician: {service.technician}
                    </span>
                    <span className="font-semibold text-white">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-8 border-t border-charcoal-800">
        <h2 className="font-heading text-xl font-bold text-white mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/quote">
            <Button>Request New Service</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">Contact Support</Button>
          </Link>
          <Link href="/portal/payments">
            <Button variant="ghost">View Invoices</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

