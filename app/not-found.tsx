import Link from "next/link";
import { Button } from "@/components/ui";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <span className="font-heading text-[150px] md:text-[200px] font-bold text-charcoal-800 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-electric/20 rounded-full flex items-center justify-center animate-pulse">
              <Search className="w-12 h-12 text-electric" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-charcoal-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button leftIcon={<Home className="w-5 h-5" />}>
              Go Home
            </Button>
          </Link>
          <Button 
            variant="secondary" 
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Go Back
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-charcoal-800">
          <p className="text-sm text-charcoal-500 mb-4">Looking for something?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-charcoal-400 hover:text-electric transition-colors">
              Our Services
            </Link>
            <Link href="/contact" className="text-charcoal-400 hover:text-electric transition-colors">
              Contact Us
            </Link>
            <Link href="/quote" className="text-charcoal-400 hover:text-electric transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

