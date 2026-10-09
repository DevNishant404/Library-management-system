import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-md border  border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-0.5 focus-visible:ring-webtheme-light disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-webtheme-light disabled:opacity-50 aria-invalid:border-webtheme-light aria-invalid:ring-3 aria-invalid:ring-webtheme-light md:text-sm dark:bg-webtheme-light dark:disabled:bg-input/80 dark:aria-invalid:border-webtheme-light dark:aria-invalid:ring-webtheme-light",
        className
      )}
      {...props}
    />
  )
}

export { Input }
