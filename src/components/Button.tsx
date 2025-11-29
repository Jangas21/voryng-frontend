    "use client"

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "ghost"
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:scale-[1.02] active:scale-[0.99]"
      : "border border-white/15 text-white hover:bg-white/5"

  if (href)
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    )

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}
