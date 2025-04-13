import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  BotMessageSquare,
  BriefcaseBusiness,
  Building,
  Plus,
} from "lucide-react";
import prisma from "@/lib/prisma";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const agents = await prisma.agents.findMany({});

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/playground">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="Agnarok Logo"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Enterprise</span>
                  <span className="truncate text-xs">Agnarok Studio</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="py-5 duration-200 transition-colors"
                  asChild
                >
                  <Button asChild>
                    <Link href="/playground/create">
                      <Plus className="!size-5" />
                      Create New Agent
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {agents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <SidebarMenuButton
                    className="py-5 duration-200 transition-colors"
                    asChild
                  >
                    <Link href={`/playground/${agent.agentid}`}>
                      <div className="flex items-center gap-2">
                        <BotMessageSquare />
                        <span className="text-sm font-semibold">
                          {agent.name}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <Building className="!size-5" />
                Enterprise Profile
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant={"destructive"} asChild>
                <Link href="/auth">Logout</Link>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
