"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getCurrentUser } from "@/services/user.service";

export default function Layout({ children }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  async function loadCurrentUser() {
    try {
      const token = await getToken();

      const response = await getCurrentUser(token);

      setCurrentUser(response.data);
      console.log(currentUser);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    loadCurrentUser();
  }, [isLoaded, isSignedIn]);

  return (
    <SidebarProvider>
      <AppSidebar currentUser={currentUser} />
      <main className="bg-background-500 text-foreground flex-1">
        {children}
      </main>
    </SidebarProvider>
  );
}
