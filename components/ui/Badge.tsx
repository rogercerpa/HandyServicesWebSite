import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-charcoal-700 text-charcoal-200",
    success: "bg-green-900/50 text-green-400 border-green-700/50",
    warning: "bg-electric-900/50 text-electric-400 border-electric-700/50",
    error: "bg-red-900/50 text-red-400 border-red-700/50",
    info: "bg-blue-900/50 text-blue-400 border-blue-700/50",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border border-transparent",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

