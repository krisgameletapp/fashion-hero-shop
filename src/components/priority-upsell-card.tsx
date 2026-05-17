"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { PRIORITY_CONFIG } from "@/lib/priority-config";
import { cn } from "@/lib/utils";

const BENEFITS = [
  "Gwarantowana odpowiedź w 2h (godz. 9–18 pn–pt)",
  "Przypisany dedykowany konsultant",
  "Priority queue — Twój ticket zawsze na górze kolejki",
] as const;

export function PriorityUpsellCard() {
  const { user } = useAuth();

  // Widoczna tylko dla negotiated i top-margin — nigdy dla buyer ani standard
  if (!user || user.role !== "seller") return null;
  if (user.tier !== "negotiated" && user.tier !== "top-margin") return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white p-6 shadow-sm",
        "flex flex-col gap-5"
      )}
    >
      {/* Badge */}
      <span className="inline-flex w-fit items-center rounded-full bg-[#212121]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.6px] text-[#212121]">
        Tylko dla wybranych sprzedawców
      </span>

      {/* Header */}
      <div className="space-y-1.5">
        <h3 className="text-xl font-light text-[#212121] leading-snug">
          Odpowiedź w 2h zamiast 3 dni
        </h3>
        <p className="text-[13px] text-[#6b6b6b]">
          Twój dedicated rep + priority queue.{" "}
          <span className="font-medium text-[#212121]">
            {PRIORITY_CONFIG.priceMonthly} {PRIORITY_CONFIG.currency}/mies.
          </span>
        </p>
      </div>

      {/* Benefits */}
      <ul className="space-y-2.5">
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#212121]">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-[13px] text-[#212121]/80">{benefit}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="space-y-2">
        <Link href="/seller/priority" className="btn-cta flex w-full items-center justify-center gap-2">
          Dołącz do Priority
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-center text-[11px] text-[#6b6b6b]">
          Anulowanie w każdej chwili. Aktywne do końca okresu.
        </p>
      </div>
    </div>
  );
}
