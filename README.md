# 🌟 Solar Rosette - Sistema de Gestión de Citas Médicas

Sistema completo de gestión de citas para fisioterapia con inteligencia artificial integrada.

## 📋 Características

### Para Pacientes
- ✅ Registro e inicio de sesión
- 📅 Agendar citas en tiempo real
- 📱 Interfaz móvil responsive

### Para Profesionales
- 📊 Dashboard profesional con estadísticas
- 👥 Gestión de pacientes
- 🤖 **IA Sugerencias** - Análisis inteligente de agenda con Gemini Pro
- 📈 Historial completo de citas

### Para Administradores
- 🔧 Panel de administración
- 📋 Gestión de usuarios

## 🚀 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: N8N (Workflow Automation)
- **IA**: Google Gemini Pro API
- **Diseño**: Mobile-first, iOS-inspired UI

## 📁 Estructura del Proyecto

```
solar-rosette/
├── public/                      # Archivos públicos (HTML, CSS, JS)
├── backend/                    # Configuración backend (N8N Workflow)
└── tests/                     # Scripts de prueba PowerShell
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/brayj4728/app-agenda.git
   ```

2. **Importar el workflow de N8N**
   - Importar `backend/n8n_workflow.json` en tu instancia de N8N.

3. **Abrir la aplicación**
   - Servir la carpeta `public/` con cualquier servidor web (ej. `http-server`).

---
**Versión**: 1.0.0
