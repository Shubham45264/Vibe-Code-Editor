"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut, User, LogIn } from "lucide-react";
import LogoutButton from "./logout-button";
import { useCurrentUser } from "../hooks/use-current-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <Button asChild variant="default" size="sm" className="rounded-full px-4">
        <Link href="/auth/signin" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("relative rounded-full outline-hidden hover:opacity-80 transition-opacity")}>
          <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-800">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800">
              <User className="text-zinc-600 dark:text-zinc-400 h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={12}>
        <div className="flex items-center gap-3 p-2 px-3">
          <Avatar className="h-10 w-10 border border-zinc-100 dark:border-zinc-800">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-xs">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[160px]">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[160px]">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="my-2" />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

