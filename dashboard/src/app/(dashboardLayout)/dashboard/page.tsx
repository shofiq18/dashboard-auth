


"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie"; // Explicit import

import { Button } from "@/components/ui/button";

interface DecodedToken {
  email: string;
  role: string;
  // Add other claims if needed (e.g., name, iat, exp)
}

export default function AppSidebar() {
  const pathname = usePathname();
  
      
   

  return (
    <Sidebar>
      <SidebarContent className="bg-[#282828] flex flex-col justify-between p-2 max-w-[260px] h-screen">
        {/* Top Section */}
        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Profile */}
                <div className="flex justify-between  items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/dashboardIcons/logo.png"
                      width={225}
                      height={80}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Main menu */}
                <p className="text-white mt-4 mb-2 text-sm font-medium">Main Menu</p>
                <div className="flex flex-col gap-2">
                 
                    <button
                      className="flex w-full text-white items-center gap-2 rounded-sm px-4 py-2 transition-colors bg-green-600 hover:bg-green-700 focus:bg-green-700"
                    >
                      <Link href="/dashboard/admin" className="flex items-center gap-2 w-full">
                        <Image
                          src="/dashboardIcons/Group.png"
                          width={20}
                          height={20}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <span className="text-[16px]">Dashboard</span>
                      </Link>
                    </button>
                  

                  
                  

                  
                  
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section */}
        <div className="pt-4">
          <Separator className="bg-[#242432] mb-4" />
          <SidebarMenu>
            {/* User logout */}
            
            <div
              className="flex items-center gap-2 w-full mb-12 px-4 py-1 bg-white rounded-lg cursor-pointer"
              
            >
              <Image
                src="/dashboardIcons/Picture.png"
                width={40}
                height={40}
                alt="Profile"
                className="rounded-full"
              />
              <div className="flex flex-col px-3">
                <h3 className="text-lg font-semibold text-gray-700">admin</h3>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              
            </div>
            
              
            
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
