"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function BudgetSummary({ summary = {} }) {
  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="space-y-1">
            <CardTitle className="font-semibold">Total Budget</CardTitle>
            <CardDescription className="text-primary">
              <p className="text-2xl font-bold">
                ₱ {summary?.totalBudget.toLocaleString() ?? "0"}
              </p>
            </CardDescription>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-1">
            <CardTitle className="font-semibold">Total Spent</CardTitle>
            <CardDescription className="text-primary">
              <p className="text-2xl font-bold">
                ₱ {summary?.totalSpent.toLocaleString() ?? "0"}
              </p>
            </CardDescription>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-1">
            <CardTitle className="font-semibold">Remaining Budget</CardTitle>
            <CardDescription className="text-primary">
              <p
                className={`text-2xl font-bold text-accent-2 ${
                  summary.remainingBudget < 0 ? "text-red-600" : "accent-2"
                }`}
              >
                ₱ {summary?.remainingBudget.toLocaleString() ?? "0"}
              </p>
            </CardDescription>
          </div>
        </Card>
      </div>
    </div>
  );
}
