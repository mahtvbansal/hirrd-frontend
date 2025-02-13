import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "@/context/AccountContext";

export function UserIconPopover() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AccountContext);

  const handleSignOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger asChild>
        <button className="rounded-full overflow-hidden w-10 h-10 border-none">
          <img
            src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybmhJWWFpbGtKYmNSMXM4cGt3cWZhdXM2T3giLCJyaWQiOiJ1c2VyXzJzaFlZMDViQnNWVTBXemdPbGR4c2lyaGFJZiIsImluaXRpYWxzIjoiTSJ9?width=80"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-56 bg-[#403d76] text-white rounded-md border-none shadow-md py-2"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col">
          <div className="px-4 py-2 text-sm">
            <p className="font-medium">{user.username}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <hr className="border-[#5a5793] my-2" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm py-2 pl-4",
              "hover:bg-[#5a5793]"
            )}
            onClick={() => {
              setOpen((prev) => !prev);
              navigate("/jobs");
            }}
          >
            All Jobs
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm py-2 pl-4",
              "hover:bg-[#5a5793]"
            )}
            onClick={() => {
              setOpen((prev) => !prev);
              navigate("/my-jobs");
            }}
          >
            My Jobs
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm py-2 pl-4",
              "hover:bg-[#5a5793]"
            )}
            onClick={() => {
              setOpen((prev) => !prev);
              navigate("/saved-jobs");
            }}
          >
            Saved Jobs
          </Button>
          {/* <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm py-2 pl-4",
              "hover:bg-zinc-700"
            )}
          >
            Manage Account
          </Button> */}
          <hr className="border-[#5a5793] my-2" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm py-2 pl-4",
              "hover:bg-[#5a5793]"
            )}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
