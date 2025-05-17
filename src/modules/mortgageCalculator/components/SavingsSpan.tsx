import type { ReactNode } from "react";


export default function SavingsSpan({ children, ...props }: { children: ReactNode}) {
  return (
    <span className="text-green-600 text-2xl font-semibold pr-2" {...props}>{children}</span>
  )
}
