"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { 
  Zap, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [authMethod, setAuthMethod] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "unauthorized" ? "You are not authorized to access the admin panel." : null
  );
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const supabase = createClient();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Check if user is admin
      const { data: admin } = await supabase
        .from("admins")
        .select("id")
        .eq("email", email)
        .single();

      if (!admin) {
        await supabase.auth.signOut();
        setError("You are not authorized to access the admin panel.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // First check if email is in admin whitelist
      const { data: admin } = await supabase
        .from("admins")
        .select("id")
        .eq("email", email)
        .single();

      if (!admin) {
        setError("This email is not authorized to access the admin panel.");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/admin`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMagicLinkSent(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-electric/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-electric" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                Check Your Email
              </h2>
              <p className="text-charcoal-300 mb-6">
                We&apos;ve sent a magic link to <span className="text-white font-medium">{email}</span>. 
                Click the link in the email to sign in.
              </p>
              <p className="text-sm text-charcoal-500 mb-6">
                The link will expire in 1 hour.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setMagicLinkSent(false);
                  setEmail("");
                }}
              >
                Use a Different Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-electric rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-charcoal" />
            </div>
            <div className="text-left">
              <span className="font-heading text-2xl font-bold text-white block">
                Fix it, papa!
              </span>
              <span className="text-xs text-charcoal-400">Admin Portal</span>
            </div>
          </Link>
        </div>

        <Card>
          <CardContent>
            <h1 className="font-heading text-xl font-bold text-white text-center mb-6">
              Sign in to Admin
            </h1>

            {/* Auth Method Toggle */}
            <div className="flex bg-charcoal-700 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setAuthMethod("password")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === "password"
                    ? "bg-electric text-charcoal"
                    : "text-charcoal-300 hover:text-white"
                }`}
              >
                <Lock className="w-4 h-4" />
                Password
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("magic")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === "magic"
                    ? "bg-electric text-charcoal"
                    : "text-charcoal-300 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Magic Link
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Password Login Form */}
            {authMethod === "password" && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@fixitpapa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  leftIcon={<Mail className="w-5 h-5" />}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  leftIcon={<Lock className="w-5 h-5" />}
                />
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
            )}

            {/* Magic Link Form */}
            {authMethod === "magic" && (
              <form onSubmit={handleMagicLinkLogin} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@fixitpapa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  leftIcon={<Mail className="w-5 h-5" />}
                />
                <p className="text-sm text-charcoal-400">
                  We&apos;ll send you a magic link to sign in without a password.
                </p>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                  rightIcon={!isLoading ? <Mail className="w-5 h-5" /> : undefined}
                >
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
              </form>
            )}

            {/* Back to Site Link */}
            <div className="mt-6 pt-6 border-t border-charcoal-700 text-center">
              <Link
                href="/"
                className="text-sm text-charcoal-400 hover:text-electric transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-charcoal-500 mt-6">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}

