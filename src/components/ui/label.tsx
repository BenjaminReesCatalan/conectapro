import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-text", className)}
      {...props}
    />
  );
}

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}
export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <hr
      className={cn("border-border my-4", className)}
      {...props}
    />
  );
}
