import Image from "next/image";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrendingDashboards } from "@/components/sections/trending-dashboards";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <TrendingDashboards />
    </div>
  );
}
