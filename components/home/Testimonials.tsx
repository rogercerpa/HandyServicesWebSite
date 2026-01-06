"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { Card, CardContent } from "@/components/ui";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="section-padding bg-charcoal-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-electric/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              What Our Customers Say
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-white hover:border-electric disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-300 hover:text-white hover:border-electric disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount + 2)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <CardContent className="relative">
                  {/* Quote Icon */}
                  <Quote className="absolute top-0 right-0 w-12 h-12 text-electric/10" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-electric fill-electric" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-charcoal-200 leading-relaxed mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-charcoal-700">
                    <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-electric">
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-charcoal-400">
                        {testimonial.service} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {Array.from({ length: testimonials.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-electric" : "bg-charcoal-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

