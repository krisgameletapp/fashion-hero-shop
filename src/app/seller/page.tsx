"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { PriorityUpsellCard } from "@/components/priority-upsell-card";

const MOCK_STATS = [
  { label: "Aktywne listingi", value: "24" },
  { label: "Sprzedaż tego miesiąca", value: "12 480 zł" },
  { label: "Tickety oczekujące", value: "3" },
] as const;

export default function SellerPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;
  if (!user) return null;

  if (user.role !== "seller") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-[14px] text-[#6b6b6b] mb-4">
          Ten panel jest dostępny tylko dla sprzedawców FashionHero.
        </p>
        <Link href="/" className="text-[13px] text-[#212121] underline">
          Wróć do strony głównej
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="text-[11px] text-[#6b6b6b] mb-8 tracking-wide">
        <Link href="/" className="hover:text-[#212121] transition-colors">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#212121]">Panel sprzedawcy</span>
      </nav>

      <h1 className="text-2xl font-light text-[#212121] mb-1">
        Cześć, {user.firstName}
      </h1>
      <p className="text-[13px] text-[#6b6b6b] mb-10">
        Panel sprzedawcy FashionHero
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {MOCK_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-black/10 bg-white p-4"
          >
            <p className="text-[11px] uppercase tracking-[0.6px] text-[#6b6b6b] mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-light text-[#212121]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Priority section */}
      <PriorityUpsellCard />

      {/* Standard tier info */}
      {user.tier === "standard" && (
        <div className="mt-6 rounded-xl border border-black/10 bg-white p-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.6px] text-[#6b6b6b] mb-1">
            Twój plan
          </p>
          <p className="text-[14px] text-[#212121] mb-3">Standard</p>
          <Link
            href="/seller/priority"
            className="text-[12px] text-[#212121] underline hover:opacity-70 transition-opacity"
          >
            Dowiedz się więcej o Priority →
          </Link>
        </div>
      )}
    </div>
  );
}
