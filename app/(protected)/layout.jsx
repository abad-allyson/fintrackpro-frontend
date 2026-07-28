import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background-500 text-foreground flex-1">
        {children}
      </main>
    </SidebarProvider>
  );
}
