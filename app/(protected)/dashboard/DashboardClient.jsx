"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/services/user.service";
import { getDashboardSummary } from "@/services/dashboard.service";
import DashboardSummary from "./DashboardSummary";
import { getCurrentMonth, getCurrentYear } from "@/lib/getCurrentDate";
import { getSelectedLabel } from "@/lib/getSelectedLabel";
import { months } from "@/constants/global.constants";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardClient() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netIncome: 0,
  });
  const [pageLoading, setPageLoading] = useState(true);

  const currentMonth = getSelectedLabel(months, getCurrentMonth());
  const currentYear = getCurrentYear();

  async function loadUserAndData() {
    try {
      setPageLoading(true);
      const token = await getToken();

      const [userResponse, dashboardSummary] = await Promise.all([
        getCurrentUser(token),
        getDashboardSummary(token),
      ]);

      setSummary(dashboardSummary);
      setCurrentUser(userResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    loadUserAndData();
  }, [isLoaded, isSignedIn]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-10 px-12">
      {/* Welcome Message */}
      <div className="flex items-center gap-2 ">
        <div className="flex-1">
          <h1 className="text-2xl font-bold ">
            Welcome back, {currentUser.firstName}!
          </h1>
          <p>
            Here's an overview of your finances this {currentMonth}{" "}
            {currentYear}.
          </p>
        </div>
        <Button size="lg" className="py-5 px-6">
          <Plus />
          Add Transaction
        </Button>
      </div>

      <DashboardSummary summary={summary} />
    </div>
  );
}
