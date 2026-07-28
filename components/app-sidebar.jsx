"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import {
  Grid2X2,
  ArrowLeftRight,
  CircleDollarSign,
  Calculator,
  ReceiptText,
  Landmark,
  Tag,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Grid2X2,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: CircleDollarSign,
    },
    {
      title: "Tax Estimator",
      url: "/tax-estimator",
      icon: Calculator,
    },
    {
      title: "Receipts",
      url: "/receipts",
      icon: ReceiptText,
    },
    {
      title: "Bank Accounts",
      url: "/bank-accounts",
      icon: Landmark,
    },
    {
      title: "Subscription",
      url: "/subscription",
      icon: Tag,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="p-5 bg-muted">
      <SidebarHeader className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/fintrackpro-logo.png"
            alt="FinTrack Pro"
            width={40}
            height={40}
          />

          <div>
            <h1 className="text-xl font-bold">
              FinTrack<span className="text-primary">Pro</span>
            </h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarContent className="py-8">
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(item.url + "/");

              return (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "px-4 py-1 rounded-md mb-2",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-primary hover:bg-secondary hover:text-secondary-foreground",
                  )}
                >
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <item.icon className="h-[22px] w-[22px]" />
                      <span className="font-semibold">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-4 " />
        <div className="flex items-center gap-2 py-2">
          <UserButton />
          <div>
            <p className="text-sm font-semibold leading-none">
              {useUser().user?.firstName} {useUser().user?.lastName}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
