"use client"

interface DonationCardProps {
  label: string
  title: string
  amount: string
  icon: string
  subtitle: string
  copyId: string
  onClick: () => void
  featured?: boolean
  badge?: string | null
  microCopyPrefix: string
}

export default function DonationCard({
  label,
  title,
  amount,
  icon,
  subtitle,
  copyId,
  onClick,
  featured = false,
  badge,
  microCopyPrefix,
}: DonationCardProps) {
  return (
    <article
      className={[
        "group cursor-pointer rounded-2xl border border-[#E5E7EB] bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between",
        featured ? "scale-[1.02] border-[3px] border-[#F59E0B] shadow-2xl" : "",
      ].join(" ")}
      onClick={onClick}
    >
      <div className="p-4 md:p-5 flex flex-col gap-2">
        {badge && (
          <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-[#FEE2E2] border border-[#FCA5A5] mb-1">
            <span className="text-[11px] md:text-[12px] font-semibold text-[#B91C1C] uppercase tracking-wide">
              {badge}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">{icon}</span>
          <div className="text-left">
            <p className="text-[#6B7280] text-[12px] md:text-[13px] uppercase tracking-wide font-semibold">{label}</p>
            <p className="text-[#111827] text-[20px] md:text-[22px] font-extrabold">R$ {amount}</p>
          </div>
        </div>

        <h4 className="mt-1 text-[#C41E3A] text-[16px] md:text-[18px] font-extrabold">{title}</h4>

        <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">{subtitle}</p>
      </div>

      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <button
          type="button"
          className={[
            "w-full h-[46px] md:h-[48px] flex items-center justify-center rounded-xl text-[14px] md:text-[15px] font-semibold tracking-wide btn-cta cta-slide-in",
            featured
              ? "bg-gradient-to-r from-[#F59E0B] to-[#C2410C] text-white shadow-lg btn-pulse-featured"
              : "bg-gradient-to-r from-[#C41E3A] to-[#991B1B] text-white shadow-lg btn-pulse",
          ].join(" ")}
        >
          {featured ? `QUERO SER O PAPAI NOEL POR R$ ${amount}` : `DOAR R$ ${amount}`}
        </button>
        <p className="mt-2 text-[12px] md:text-[13px] text-[#6B7280] leading-snug">
          {microCopyPrefix}{" "}
          <span id={copyId} className="font-semibold text-[#F59E0B] tabular-nums">
            0
          </span>{" "}
          pessoas escolheram este valor nas últimas 3 horas.
        </p>
      </div>
    </article>
  )
}
