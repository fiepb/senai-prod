"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/" },
    { name: "Serviços", href: "/" },
    { name: "Portfólio", href: "/" },
    { name: "Contato", href: "/" },
  ];

  return (
    <header className="bg-background  w-full border-b-[1px]">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <Button variant="default" size="sm">
              Sair
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
