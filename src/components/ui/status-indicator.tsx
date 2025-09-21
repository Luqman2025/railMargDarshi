import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "red" | "yellow" | "green";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function StatusIndicator({ 
  status, 
  size = "md", 
  animated = false, 
  className 
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  };

  const statusClasses = {
    red: "bg-signal-red",
    yellow: "bg-signal-yellow",
    green: "bg-signal-green"
  };

  return (
    <div 
      className={cn(
        "rounded-full",
        sizeClasses[size],
        statusClasses[status],
        animated && "animate-pulse",
        className
      )}
    />
  );
}