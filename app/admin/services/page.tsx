import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, Button } from "@/components/ui";
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ServiceActions } from "./ServiceActions";

async function getServices() {
  const supabase = await createClient();
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return services || [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg text-charcoal-300">
            Manage the services displayed on your website
          </h2>
        </div>
        <Link href="/admin/services/new">
          <Button leftIcon={<Plus className="w-5 h-5" />}>
            Add Service
          </Button>
        </Link>
      </div>

      {/* Services List */}
      {services.length > 0 ? (
        <Card>
          <div className="divide-y divide-charcoal-700">
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                className="flex items-center gap-4 p-4 hover:bg-charcoal-800/50 transition-colors"
              >
                {/* Drag Handle */}
                <div className="text-charcoal-500 cursor-move">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Service Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white truncate">
                      {service.name}
                    </h3>
                    {!service.is_active && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-charcoal-700 text-charcoal-400 text-xs rounded-full">
                        <EyeOff className="w-3 h-3" />
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal-400 truncate mt-1">
                    {service.short_description}
                  </p>
                </div>

                {/* Price */}
                <div className="hidden sm:block text-right">
                  <p className="text-electric font-semibold">
                    {formatCurrency(service.starting_price)}
                  </p>
                  <p className="text-xs text-charcoal-500">starting</p>
                </div>

                {/* Actions */}
                <ServiceActions service={service} />
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-charcoal-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              No Services Yet
            </h3>
            <p className="text-charcoal-400 mb-6 max-w-md mx-auto">
              Start by adding your first service. Services will appear on your
              website for customers to browse and request quotes.
            </p>
            <Link href="/admin/services/new">
              <Button leftIcon={<Plus className="w-5 h-5" />}>
                Add Your First Service
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

