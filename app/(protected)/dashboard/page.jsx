"user client";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  TrendingUp,
  ArrowUp,
  BanknoteArrowDown,
  ArrowDown,
} from "lucide-react";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4 py-10 px-12">
      {/* Welcome Message */}
      <div className="flex items-center gap-2 ">
        <div className="flex-1">
          <h1 className="text-2xl font-bold ">
            Welcome back, {user.firstName}!
          </h1>
          <p>Here's an overview of your finances this month</p>
        </div>
        <Button size="lg" className="py-5 px-6">
          <Plus />
          Add Transaction
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-8">
          <div className="flex flex-row items-center space-y-0 gap-4">
            <div className="bg-accent-15 p-4 rounded-sm border">
              <TrendingUp className="h-8 w-8 text-accent-2 " />
            </div>
            <div>
              <CardTitle className=" font-semibold">Total Income</CardTitle>
              <CardDescription className="text-primary">
                <p className="text-2xl font-bold">₱10,000.00</p>
                <p className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-accent-2" />
                  12.5 % vs June 2026
                </p>
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <div className="flex flex-row items-center space-y-0 gap-4">
            <div className="bg-muted p-4 rounded-sm border">
              <BanknoteArrowDown className="h-8 w-8 text-secondary " />
            </div>
            <div>
              <CardTitle className=" font-semibold">Total Expenses</CardTitle>
              <CardDescription className="text-primary">
                <p className="text-2xl font-bold">₱10,000.00</p>
                <p className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-accent-2" />
                  8.2 % vs June 2026
                </p>
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <CardHeader className="flex flex-col items-center justify-center space-y-0">
            <CardTitle className="font-semibold text-lg text-center">
              Quarterly Estimated Tax is locked.
            </CardTitle>
            <CardDescription className="text-primary">
              <p className="text-sm">
                Upgrade to Premium to unlock this feature.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
