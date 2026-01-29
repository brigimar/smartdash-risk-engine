import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Inicio', href: '#' },
    { label: 'Soluciones', href: '#solution' },
    { label: 'Alertas Core', href: '#alerts' },
    { label: 'Diagnóstico', href: '#wizard' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white hidden sm:inline">SMARTDASH</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href={getLoginUrl()}>
            <Button 
              variant="ghost" 
              className="text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Iniciar Sesión
            </Button>
          </a>
          <a href={getLoginUrl()}>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 rounded-full font-semibold transition-all duration-200 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Proteger mi Negocio
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0B1120]/95 backdrop-blur-md border-b border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a href={getLoginUrl()} className="block">
                <Button 
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={closeMenu}
                >
                  Iniciar Sesión
                </Button>
              </a>
              <a href={getLoginUrl()} className="block">
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={closeMenu}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Proteger mi Negocio
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
