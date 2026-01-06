"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, Button, Input, Select } from "@/components/ui";
import { services } from "@/lib/data/services";
import { 
  quoteConfigurations, 
  getQuoteConfigByServiceId, 
  calculateQuote,
  type ServiceQuoteConfig,
  type QuoteQuestion 
} from "@/lib/data/quote-questions";
import { formatCurrency } from "@/lib/utils";
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Calculator,
  Send,
  Phone,
  Upload,
  X
} from "lucide-react";

const steps = [
  { id: 1, name: "Select Service" },
  { id: 2, name: "Project Details" },
  { id: 3, name: "Your Info" },
  { id: 4, name: "Review" },
];

function QuoteWizardContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentConfig = selectedService ? getQuoteConfigByServiceId(selectedService) : null;
  const estimatedPrice = currentConfig ? calculateQuote(currentConfig, answers) : 0;

  // Reset answers when service changes
  useEffect(() => {
    setAnswers({});
  }, [selectedService]);

  const handleAnswerChange = (questionId: string, value: string | number | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== "";
      case 2:
        // Check if required questions are answered
        if (!currentConfig) return false;
        return currentConfig.questions.every((q) => {
          const answer = answers[q.id];
          if (q.type === "number") return typeof answer === "number" && answer >= (q.min || 1);
          if (q.type === "select" || q.type === "radio") return !!answer;
          return true; // checkbox is optional
        });
      case 3:
        return contactInfo.name && contactInfo.email && contactInfo.phone;
      default:
        return true;
    }
  };

  const renderQuestion = (question: QuoteQuestion) => {
    const value = answers[question.id];

    switch (question.type) {
      case "number":
        return (
          <div key={question.id} className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-200">
              {question.question}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleAnswerChange(question.id, Math.max((question.min || 1), (Number(value) || 1) - 1))}
                className="w-12 h-12 bg-charcoal-700 rounded-xl text-white text-xl font-bold hover:bg-charcoal-600 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={value || question.min || 1}
                onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value) || 1)}
                min={question.min}
                max={question.max}
                className="w-20 bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-3 text-white text-center text-xl font-bold focus:outline-none focus:border-electric"
              />
              <button
                type="button"
                onClick={() => handleAnswerChange(question.id, Math.min((question.max || 99), (Number(value) || 1) + 1))}
                className="w-12 h-12 bg-charcoal-700 rounded-xl text-white text-xl font-bold hover:bg-charcoal-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        );

      case "select":
        return (
          <div key={question.id} className="space-y-2">
            <label className="block text-sm font-medium text-charcoal-200">
              {question.question}
            </label>
            <select
              value={(value as string) || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric appearance-none cursor-pointer"
            >
              <option value="">Select an option</option>
              {question.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                  {opt.priceModifier ? ` (+${formatCurrency(opt.priceModifier)})` : ""}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div key={question.id} className="space-y-3">
            <label className="block text-sm font-medium text-charcoal-200">
              {question.question}
            </label>
            <div className="space-y-2">
              {question.options?.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 bg-charcoal-800 border rounded-xl cursor-pointer transition-colors ${
                    value === opt.value
                      ? "border-electric bg-electric/10"
                      : "border-charcoal-700 hover:border-charcoal-600"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={() => handleAnswerChange(question.id, opt.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      value === opt.value ? "border-electric" : "border-charcoal-500"
                    }`}
                  >
                    {value === opt.value && (
                      <div className="w-2.5 h-2.5 bg-electric rounded-full" />
                    )}
                  </div>
                  <span className="text-white flex-1">{opt.label}</span>
                  {opt.priceModifier !== 0 && (
                    <span className="text-sm text-electric">
                      {opt.priceModifier! > 0 ? "+" : ""}{formatCurrency(opt.priceModifier!)}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        const selectedValues = (value as string[]) || [];
        return (
          <div key={question.id} className="space-y-3">
            <label className="block text-sm font-medium text-charcoal-200">
              {question.question}
            </label>
            <div className="space-y-2">
              {question.options?.map((opt) => {
                const isChecked = selectedValues.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-4 bg-charcoal-800 border rounded-xl cursor-pointer transition-colors ${
                      isChecked
                        ? "border-electric bg-electric/10"
                        : "border-charcoal-700 hover:border-charcoal-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const newValues = isChecked
                          ? selectedValues.filter((v) => v !== opt.value)
                          : [...selectedValues, opt.value];
                        handleAnswerChange(question.id, newValues);
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isChecked ? "border-electric bg-electric" : "border-charcoal-500"
                      }`}
                    >
                      {isChecked && <CheckCircle className="w-3 h-3 text-charcoal" />}
                    </div>
                    <span className="text-white flex-1">{opt.label}</span>
                    {opt.priceModifier !== 0 && (
                      <span className="text-sm text-electric">
                        +{formatCurrency(opt.priceModifier!)}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container-custom py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-lg text-charcoal-300 mb-8">
              Thank you for your request. We&apos;ll review your project details and 
              get back to you within 24 hours with a detailed quote.
            </p>
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-charcoal-300">Estimated Quote</span>
                <span className="text-3xl font-bold text-electric">
                  {formatCurrency(estimatedPrice)}
                </span>
              </div>
              <p className="text-sm text-charcoal-500">
                This is an estimate based on the information provided. 
                Final pricing may vary based on site assessment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="secondary">Return Home</Button>
              </Link>
              <Link href="tel:+1234567890">
                <Button leftIcon={<Phone className="w-5 h-5" />}>
                  Call Us Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-electric font-semibold mb-4 tracking-wide uppercase text-sm">
              Free Quote
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Your Instant Estimate
            </h1>
            <p className="text-charcoal-300">
              Answer a few questions and we&apos;ll provide an estimated price for your project.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        currentStep >= step.id
                          ? "bg-electric text-charcoal"
                          : "bg-charcoal-700 text-charcoal-400"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        currentStep >= step.id ? "text-white" : "text-charcoal-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                        currentStep > step.id ? "bg-electric" : "bg-charcoal-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,320px] gap-8">
            {/* Main Form Area */}
            <Card>
              <CardContent className="min-h-[400px]">
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-xl font-bold text-white mb-6">
                      What service do you need?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedService === service.id
                              ? "border-electric bg-electric/10"
                              : "border-charcoal-700 bg-charcoal-800 hover:border-charcoal-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={selectedService === service.id}
                            onChange={() => setSelectedService(service.id)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                              selectedService === service.id
                                ? "border-electric"
                                : "border-charcoal-500"
                            }`}
                          >
                            {selectedService === service.id && (
                              <div className="w-2.5 h-2.5 bg-electric rounded-full" />
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-white block">
                              {service.name}
                            </span>
                            <span className="text-sm text-charcoal-400">
                              From {formatCurrency(service.startingPrice)}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && currentConfig && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-xl font-bold text-white mb-6">
                      Tell us about your project
                    </h2>
                    <p className="text-charcoal-400 mb-6">
                      {currentConfig.serviceName}
                    </p>
                    <div className="space-y-6">
                      {currentConfig.questions.map(renderQuestion)}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-xl font-bold text-white mb-6">
                      Your Contact Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="John Doe"
                        value={contactInfo.name}
                        onChange={handleContactChange}
                        required
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={contactInfo.email}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={contactInfo.phone}
                        onChange={handleContactChange}
                        required
                      />
                      <Input
                        label="Preferred Date (Optional)"
                        name="preferredDate"
                        type="date"
                        value={contactInfo.preferredDate}
                        onChange={handleContactChange}
                      />
                    </div>
                    <Input
                      label="Service Address"
                      name="address"
                      placeholder="123 Main St, City, State 12345"
                      value={contactInfo.address}
                      onChange={handleContactChange}
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-charcoal-200">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        placeholder="Any additional details about your project..."
                        rows={3}
                        value={contactInfo.notes}
                        onChange={handleContactChange}
                        className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-3 text-white placeholder:text-charcoal-400 focus:outline-none focus:border-electric resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && currentConfig && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-xl font-bold text-white mb-6">
                      Review Your Quote Request
                    </h2>

                    {/* Service Summary */}
                    <div className="bg-charcoal-700/50 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-3">Service</h3>
                      <p className="text-electric font-medium">{currentConfig.serviceName}</p>
                    </div>

                    {/* Answers Summary */}
                    <div className="bg-charcoal-700/50 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-3">Project Details</h3>
                      <div className="space-y-2">
                        {currentConfig.questions.map((q) => {
                          const answer = answers[q.id];
                          let displayValue = "";
                          if (q.type === "number") {
                            displayValue = String(answer || q.min || 1);
                          } else if (q.options && typeof answer === "string") {
                            displayValue = q.options.find((o) => o.value === answer)?.label || answer;
                          } else if (Array.isArray(answer)) {
                            displayValue = answer
                              .map((v) => q.options?.find((o) => o.value === v)?.label || v)
                              .join(", ");
                          }
                          return (
                            <div key={q.id} className="flex justify-between text-sm">
                              <span className="text-charcoal-400">{q.question}</span>
                              <span className="text-white font-medium">{displayValue || "-"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contact Summary */}
                    <div className="bg-charcoal-700/50 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-3">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-charcoal-400">Name</span>
                          <span className="text-white">{contactInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal-400">Email</span>
                          <span className="text-white">{contactInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal-400">Phone</span>
                          <span className="text-white">{contactInfo.phone}</span>
                        </div>
                        {contactInfo.address && (
                          <div className="flex justify-between">
                            <span className="text-charcoal-400">Address</span>
                            <span className="text-white">{contactInfo.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-charcoal-700">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Back
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                      rightIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Price Estimate Sidebar */}
            <div className="lg:sticky lg:top-24">
              <Card className="bg-charcoal-900">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-electric" />
                    <h3 className="font-heading text-lg font-bold text-white">
                      Estimated Quote
                    </h3>
                  </div>

                  {selectedService && currentConfig ? (
                    <>
                      <div className="text-center py-6">
                        <span className="text-4xl font-bold text-electric">
                          {formatCurrency(estimatedPrice)}
                        </span>
                        <p className="text-sm text-charcoal-400 mt-2">
                          Based on selections
                        </p>
                      </div>

                      <div className="border-t border-charcoal-700 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-charcoal-400">Service</span>
                          <span className="text-white">{currentConfig.serviceName}</span>
                        </div>
                      </div>

                      <p className="text-xs text-charcoal-500 mt-4">
                        * This is an estimate. Final pricing may vary based on 
                        site conditions and specific requirements.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-charcoal-400">
                        Select a service to see your estimated quote
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="mt-4">
                <CardContent className="text-center">
                  <p className="text-charcoal-300 mb-3">Need help?</p>
                  <Link href="tel:+1234567890">
                    <Button variant="secondary" size="sm" leftIcon={<Phone className="w-4 h-4" />}>
                      (123) 456-7890
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-400">Loading quote wizard...</p>
        </div>
      </div>
    }>
      <QuoteWizardContent />
    </Suspense>
  );
}

