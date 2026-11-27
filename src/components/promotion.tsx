import { useEffect, useState } from "react";
import { plans } from "@/lib/plans";
import { promotionDate, splitPrice } from "@/lib/promotion";

export function TodayPromotion() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => setDate(promotionDate(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-normal">
      <span>SOMENTE HOJE</span>
      <span className="min-h-4 text-xs normal-case text-muted-foreground">{date}</span>
    </p>
  );
}

export function PromotionPrice({ price }: { price: string }) {
  const { prefix, amount, cents } = splitPrice(price);
  return (
    <span className="font-normal">
      De <span className="line-through">{plans[0].originalPrice}</span> por{" "}
      <span className="whitespace-nowrap">{prefix}<strong className="font-bold">{amount}</strong>{cents}</span> no mês
    </span>
  );
}