"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, BanknoteArrowDown } from "lucide-react";

export default function DashboardSummary({ summary }) {
  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-8">
          <div className="flex flex-row items-center space-y-0 gap-4">
            <div className="bg-accent-15 p-4 rounded-sm ">
              <TrendingUp className="h-8 w-8 text-accent-2 " />
            </div>
            <div>
              <CardTitle className=" font-semibold">Total Income</CardTitle>
              <CardDescription className="text-primary">
                <p className="text-2xl font-bold">
                  ₱ {summary?.totalIncome.toLocaleString() ?? "0"}
                </p>
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <div className="flex flex-row items-center space-y-0 gap-4">
            <div className="bg-muted p-4 rounded-sm ">
              <BanknoteArrowDown className="h-8 w-8 text-secondary " />
            </div>
            <div>
              <CardTitle className=" font-semibold">Total Expenses</CardTitle>
              <CardDescription className="text-primary">
                <p className="text-2xl font-bold">
                  ₱ {summary?.totalExpense.toLocaleString() ?? "0"}
                </p>
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <CardHeader className="flex flex-col items-center justify-center space-y-0">
            <CardTitle className="font-semibold text-center">
              Quarterly Estimated Tax is locked.
            </CardTitle>
            <CardDescription className="text-primary">
              <p className="text-xs text-center">
                Upgrade to Premium to unlock this feature.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
