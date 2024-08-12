"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the homepage after logout
  };

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image src="/logo.svg" alt="Car Hub Logo" width={118} height={18} className="object-contain" />
        </Link>
        {session ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out py-2 px-4 border border-transparent rounded-full bg-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {session.user?.name || "User"}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/Login"
            className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out py-2 px-4 border border-transparent rounded-full bg-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
