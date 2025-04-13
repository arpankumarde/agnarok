"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { createAgent } from "@/app/actions/agent";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [permissions, setPermissions] = useState<string[]>([]);

  return (
    <div className="flex items-center justify-center max-h-screen">
      <div className="max-w-xl p-4">
        <h1 className="text-2xl font-bold">Create a new Agent</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a new agent to test out your code.
        </p>
        <form
          action={async (e) => {
            const name = e.get("name")?.toString() || "";
            const description = e.get("description")?.toString() || "";
            const mode = e.get("mode")?.toString() || "online";
            const pcode = permissions.join(", ").toLowerCase();

            const agent = createAgent({
              name,
              description,
              mode,
              permissions,
              pcode,
            })
              .then((res) => {
                console.log(res);
                router.push(`/playground/${res.agent.agentid}`);
                alert("Agent created successfully!");
              })
              .catch((error) => {
                console.error("Error creating agent:", error);
                alert("Error creating agent. Please try again later.");
              });
          }}
          className="mt-4 space-y-4"
        >
          <Label htmlFor="name">Agent Name</Label>
          <Input type="text" name="name" placeholder="Agent Name" required />
          <Label htmlFor="description">Agent Description</Label>
          <Textarea name="description" placeholder="Agent Description" />
          <Label htmlFor="mode">Mode</Label>
          <Select defaultValue="online" name="mode">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="permissions">Permissions</Label>
          <div>
            {[
              "Crawl4ai",
              "Arxiv",
              "Github",
              "Newspaper4k",
              "YFinance",
              "Youtube",
              "DuckDuckGo",
              "Postgres",
              "Wikipedia",
              "Cal",
            ].map((integration) => (
              <div
                key={integration}
                className="flex items-center space-x-2 my-1"
              >
                <input
                  title="Permissions"
                  type="checkbox"
                  id={integration}
                  checked={permissions.includes(integration)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPermissions([...permissions, integration]);
                    } else {
                      setPermissions(
                        permissions.filter((p) => p !== integration)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <Label htmlFor={integration} className="text-sm">
                  {integration}
                </Label>
              </div>
            ))}
          </div>

          <Button type="submit">Create Agent</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
