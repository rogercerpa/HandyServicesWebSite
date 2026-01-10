import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../TestimonialForm";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

async function getTestimonial(id: string) {
  const supabase = await createClient();
  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !testimonial) {
    return null;
  }

  return testimonial;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonial(id);

  if (!testimonial) {
    notFound();
  }

  return <TestimonialForm testimonial={testimonial} />;
}

