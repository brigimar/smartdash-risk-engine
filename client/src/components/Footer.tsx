import React from 'react';
import { Shield, Mail, MessageCircle, Github, Twitter, Linkedin, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Producto',
      links: [
        { label: 'Características', href: '#alerts' },
        { label: 'Planes y Precios', href: '#pricing' },
        { label: 'Diagnóstico Gratuito', href: '#wizard' },
        { label: 'Integraciones', href: '#' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Prensa', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos de Servicio', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Política de Cookies', href: '#' },
        { label: 'Cumplimiento GDPR', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Centro de Ayuda', href: '#' },
        { label: 'Documentación', href: '#' },
        { label: 'Estado del Sistema', href: '#' },
        { label: 'Contactar', href: '#' },
      ],
    },
  ];

  const integrations = [
    { name: 'Mercado Libre', icon: '🛒' },
    { name: 'Tango', icon: '📊' },
    { name: 'Excel', icon: '📈' },
    { name: 'AFIP', icon: '🏛️' },
    { name: 'YouTube', icon: '▶️' },
    { name: 'TikTok', icon: '🎵' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-[#0B1120] border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Logo and Description */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter">SMARTDASH</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              El Motor de Prevención de Riesgos que protege tu capital y te da tranquilidad estratégica.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a href="mailto:hola@smartdash.io" className="hover:text-white transition-colors">
                  hola@smartdash.io
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MessageCircle className="h-4 w-4 text-cyan-400" />
                <a href="https://wa.me/5491122334455" className="hover:text-white transition-colors">
                  +54 9 11 2233-4455
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
            Integraciones Nativas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-center p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{integration.icon}</div>
                  <p className="text-xs text-slate-400 font-medium">{integration.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <p className="text-slate-400 text-sm">Síguenos:</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
                    >
                      <Icon className="h-5 w-5 text-slate-400 hover:text-cyan-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Info */}
            <div className="text-right text-slate-400 text-sm space-y-2">
              <p>SmartDash Risk Engine © {currentYear}</p>
              <p>Todos los derechos reservados</p>
            </div>
          </div>

          {/* Copyright and Compliance */}
          <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-xs space-y-2">
            <p>
              SmartDash es una plataforma de análisis de riesgos operativos. No es un servicio de seguros ni de asesoramiento financiero.
            </p>
            <p>
              Hecho con ❤️ en Argentina • Protegiendo negocios en Latinoamérica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
