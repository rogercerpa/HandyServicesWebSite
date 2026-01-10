import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "../ServiceForm";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

async function getService(id: string) {
  const supabase = await createClient();
  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    return null;
  }

  return service;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  return <ServiceForm service={service} />;
}

