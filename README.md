# SmartDash Risk Engine - v4.0

## 🚀 Descripción General
**SmartDash Risk Engine** es una plataforma avanzada de prevención de riesgos para el ecosistema de e-commerce, específicamente diseñada para vendedores de Mercado Libre, PYMEs y Estudios Contables. Esta versión 4.0 presenta una interfaz completamente rediseñada, alineada con el motor de riesgo y el Blueprint de Gestión de Riesgos.

## 🎨 Nueva Interfaz v4.0 (Rediseño UI/UX)
La capa de presentación ha sido refactorizada para ofrecer una experiencia profesional y técnica:
- **Tema Visual**: Deep Navy UI (#0B1120) con acentos en azul vibrante.
- **Arquitectura**: Basada en el Blueprint de Gestión de Riesgos, integrando NestJS y Supabase.
- **Componentes**: Header minimalista, Hero isométrico, Secciones de Arquitectura Multi-tenant y Planes Flexibles.
- **Responsividad**: Optimización completa para dispositivos móviles y escritorio.

## 🛠️ Tecnologías Principales
- **Frontend**: Next.js, React, Tailwind CSS 4, Shadcn/UI, Lucide React.
- **Backend**: NestJS (Arquitectura modular orientada a microservicios).
- **Base de Datos**: Supabase (PostgreSQL) con Row Level Security (RLS).
- **Seguridad**: Gestión multi-inquilino segura y mitigación de riesgos en tiempo real.

## 📁 Documentación de Soporte (Refactorización)
Para detalles específicos sobre el proceso de rediseño y la arquitectura, consulta los siguientes archivos en la raíz:
- [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md): Resumen técnico de los cambios realizados.
- [DESIGN_COMPARISON.md](./DESIGN_COMPARISON.md): Comparativa visual y funcional (Antes vs. Después).
- [extracted_blueprint_content.md](./extracted_blueprint_content.md): Contenido clave extraído del Blueprint técnico.

## 📦 Instalación y Desarrollo

### Requisitos Previos
- Node.js 22+
- pnpm (recomendado) o npm

### Pasos
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
4. Construir para producción:
   ```bash
   npm run build
   ```

## 🚉 Despliegue en Railway
El proyecto está optimizado para ser desplegado en Railway. Asegúrate de configurar las variables de entorno necesarias (OAuth, Database URL) en el panel de control de Railway antes de realizar el despliegue.

---
© 2026 SmartDash Risk Engine. Todos los derechos reservados.
