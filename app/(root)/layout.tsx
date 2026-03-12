import { cn } from "@/lib/utils";
import { Footer } from "@/modules/home/footer";
import { Header } from "@/modules/home/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "VibeCode - Editor ",
    default: "Code Editor For VibeCoders - VibeCode",
  },
};
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div
        className={cn(
          "fixed inset-0 -z-10",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e4e4e7_0.5px,transparent_0.5px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_0.5px,transparent_0.5px),linear-gradient(to_bottom,#262626_0.5px,transparent_0.5px)]",
        )}
      />
      {/* Subtle fade to bottom */}
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-transparent via-transparent to-white/50 dark:to-black/50 pointer-events-none" />

      <main className="z-20 relative w-full pt-0 ">{children}</main>
      <Footer />
    </>
  );
}
