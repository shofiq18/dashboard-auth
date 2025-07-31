
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import "@/app/globals.css"; 
import AppSidebar from "./page";

 // Import updated PrivateRoute

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen bg-[#F7F7F7] p-2">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    
  );
}