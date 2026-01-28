# SmartDash Risk Engine - TODO

## Sistema de Autenticación y Base de Datos
- [x] Diseñar esquema completo de base de datos
- [x] Crear tabla de cuentas de Mercado Libre vinculadas a usuarios
- [x] Crear tabla de eventos y alertas
- [x] Crear tabla de métricas históricas
- [x] Crear tabla de suscripciones y planes
- [x] Implementar OAuth con Mercado Libre API
- [x] Sistema de gestión de múltiples cuentas ML por usuario

## Dashboard de Risk Score
- [x] Calculadora de Risk Score basada en múltiples factores
- [x] Visualización en tiempo real (Bajo/Medio/Alto/Crítico)
- [x] Umbrales críticos personalizables
- [x] Historial de evolución del riesgo
- [ ] Gráficos interactivos con Recharts

## Sistema de Alertas Inteligentes
- [x] Motor de reglas de scoring
- [x] Priorización automática de alertas
- [x] Traducción de reglas opacas de ML a acciones claras
- [ ] Sistema de notificaciones por email
- [ ] Integración con WhatsApp Business API para alertas críticas
- [ ] Panel de alertas activas y resueltas

## Monitor de Métricas Críticas
- [ ] Seguimiento de tasa de cancelaciones
- [ ] Monitor de reclamos (válidos vs excluibles)
- [ ] Detección de stock crítico
- [ ] Medición de tiempo de respuesta
- [ ] Evaluación de calidad de publicaciones
- [ ] Dashboard de métricas en tiempo real

## Asistente Preventivo con IA
- [ ] Integración con OpenAI API
- [ ] Sugerencias contextuales basadas en historial
- [ ] Reformulación humana de alertas técnicas
- [ ] Aprendizaje reflejado ("Las últimas 2 veces que ignoraste...")
- [ ] Priorización inteligente de riesgos
- [ ] Análisis de patrones históricos de penalizaciones
- [ ] Predicciones de riesgos emergentes

## Integración con Mercado Libre
- [ ] OAuth 2.0 con Mercado Libre
- [ ] Sincronización automática de datos
- [ ] Webhooks para eventos en tiempo real
- [ ] Monitoreo de múltiples cuentas
- [ ] Detección de cambios en reglas de ML
- [ ] Manejo de rate limits de API

## Base de Conocimiento
- [ ] Reglas de exclusión de reclamos explicadas
- [ ] Diferencia entre restricción/suspensión/bloqueo
- [ ] Mejores prácticas para evitar penalizaciones
- [ ] Casos de estudio de riesgos evitados
- [ ] Sistema de búsqueda en la base de conocimiento
- [ ] Artículos categorizados por tipo de riesgo

## Panel Multi-cuenta (Agencias)
- [ ] Vista consolidada de todas las cuentas
- [ ] Filtros por nivel de riesgo
- [ ] Comparación de métricas entre cuentas
- [ ] Asignación de cuentas a miembros del equipo
- [ ] Dashboard agregado de riesgos

## Sistema de Suscripciones
- [ ] Plan Gratuito (1 cuenta, alertas limitadas)
- [ ] Plan Starter ($29/mes - 3 cuentas)
- [ ] Plan Professional ($79/mes - 10 cuentas)
- [ ] Plan Enterprise ($199/mes - ilimitado)
- [ ] Sistema de facturación
- [ ] Gestión de upgrades/downgrades
- [ ] Período de prueba

## Reportes Automáticos
- [ ] Generación de reportes semanales
- [ ] Generación de reportes mensuales
- [ ] Análisis de riesgos evitados
- [ ] Identificación de tendencias
- [ ] Recomendaciones personalizadas
- [ ] Envío automático por email
- [ ] Exportación a PDF

## UI/UX y Landing Page
- [ ] Diseño de sistema de colores y tipografía
- [ ] Landing page comercial
- [ ] Onboarding flow para nuevos usuarios
- [ ] Tutorial interactivo
- [ ] Diseño responsive mobile-first
- [ ] Animaciones y micro-interacciones

## Testing y Calidad
- [ ] Tests unitarios para calculadora de Risk Score
- [ ] Tests de integración con ML API
- [ ] Tests del asistente IA
- [ ] Tests del sistema de alertas
- [ ] Tests de suscripciones
- [ ] Validación de flujos críticos

## Optimizaciones y Mejoras
- [ ] Cron jobs para monitoreo periódico
- [ ] Cache de datos de ML API
- [ ] Optimización de consultas a base de datos
- [ ] Manejo de errores y reintentos
- [ ] Logging y monitoreo de errores
- [ ] Documentación de API interna
