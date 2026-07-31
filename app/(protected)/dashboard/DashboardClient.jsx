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

  const currentMonth = getSelectedLabel(months, getCurrentMonth());
  const currentYear = getCurrentYear();

  async function loadCurrentUser() {
    try {
      const token = await getToken();

      const response = await getCurrentUser(token);

      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMonthlySummary() {
    try {
      const token = await getToken();
      const response = await getDashboardSummary(token);
      setSummary(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    loadCurrentUser();

    getMonthlySummary();
  }, [isLoaded, isSignedIn]);

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
