"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            School Management System
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.publicMetadata?.role as string}
            </p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;