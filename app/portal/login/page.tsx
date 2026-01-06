"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/ui";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    router.push("/portal");
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-electric rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-charcoal" />
            </div>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-white mb-2">
            Customer Portal
          </h1>
          <p className="text-charcoal-400">
            Sign in to view your service history and manage your account
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                leftIcon={<Lock className="w-5 h-5" />}
                required
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-800 text-electric focus:ring-electric"
                  />
                  <span className="text-charcoal-300">Remember me</span>
                </label>
                <a href="#" className="text-electric hover:text-electric-400 transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
                rightIcon={!isLoading ? <ArrowRight className="w-5 h-5" /> : undefined}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-charcoal-700 text-center">
              <p className="text-charcoal-400 text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-electric hover:text-electric-400 transition-colors">
                  Contact us
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-center">
          <p className="text-sm text-charcoal-400">
            <span className="text-electric font-medium">Demo Mode:</span> Click &ldquo;Sign In&rdquo; with any 
            credentials to explore the portal with mock data.
          </p>
        </div>
      </div>
    </div>
  );
}

