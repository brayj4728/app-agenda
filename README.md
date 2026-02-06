# 🌟 Sistema de Gestión de Citas Médicas

Sistema completo de gestión de citas para fisioterapia con inteligencia artificial integrada.

## 📋 Características

### Para Pacientes
- ✅ Registro e inicio de sesión
- 📅 Agendar citas en tiempo real
- 🔔 Verificación de disponibilidad
- 📱 Interfaz móvil responsive

### Para Profesionales
- 📊 Dashboard profesional con estadísticas
- 👥 Gestión de pacientes
- 📝 Sistema de notas multi-entrada
- 🤖 **IA Sugerencias** - Análisis inteligente de agenda con Gemini Pro
- 📈 Historial completo de citas

### Para Administradores
- 🔧 Panel de administración
- 📋 Gestión de usuarios
- 📊 Visualización de datos

## 🚀 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: N8N (Workflow Automation)
- **IA**: Google Gemini Pro API
- **Base de Datos**: Almacenamiento en memoria N8N
- **Diseño**: Mobile-first, iOS-inspired UI

## 📁 Estructura del Proyecto

```
solar-rosette/
├── public/                      # Archivos públicos
│   ├── index.html              # Página principal
│   ├── login.html              # Inicio de sesión
│   ├── register.html           # Registro de usuarios
│   ├── agenda.html             # Sistema de agendamiento
│   └── dashboards/             # Dashboards
│       ├── professional_dashboard.html  # Dashboard profesional
│       ├── admin_dashboard.html        # Dashboard admin
│       └── admin_table.html            # Tabla de administración
├── backend/                    # Configuración backend
│   └── n8n_workflow.json      # Workflow N8N completo
└── tests/                     # Scripts de prueba
    └── *.ps1                  # Tests PowerShell
```

## 🛠️ Instalación

### Requisitos Previos
- N8N instalado y configurado
- Acceso a N8N en: `https://n8n-n8n.xxboi7.easypanel.host`
- API Key de Google Gemini Pro (para funcionalidad IA)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/solar-rosette.git
   cd solar-rosette
   ```

2. **Importar el workflow de N8N**
   - Abrir N8N
   - Ir a Workflows → Import
   - Seleccionar `backend/n8n_workflow.json`
   - Activar el workflow

3. **Configurar la API de Gemini**
   - El workflow ya incluye la API Key configurada
   - Para cambiarla, editar el nodo "Gemini API" en N8N

4. **Abrir la aplicación**
   - Abrir `public/index.html` en un navegador
   - O servir con un servidor local:
     ```bash
     # Con Python
     python -m http.server 8000
     
     # Con Node.js
     npx http-server public
     ```

## 🔗 Integración con GitHub

Este proyecto incluye integración con GitHub MCP para automatización y gestión del repositorio.

### Configuración de GitHub

1. **Obtener Token de GitHub**
   - Ve a [GitHub Settings → Tokens](https://github.com/settings/tokens)
   - Genera un nuevo token con permisos: `repo`, `workflow`, `read:org`

2. **Configurar el proyecto**
   ```powershell
   # Copiar .env.example a .env (si no existe)
   # Agregar tu token en GITHUB_TOKEN
   
   # Verificar configuración
   .\scripts\setup-github.ps1 -Verify
   
   # Probar conexión con GitHub API
   .\scripts\setup-github.ps1 -TestAPI
   ```

3. **Ver guía completa**
   - Consulta [GITHUB_MCP_SETUP.md](GITHUB_MCP_SETUP.md) para instrucciones detalladas

### Workflows Automáticos

- **CI/CD**: Se ejecuta automáticamente en cada push y PR
- **Validación**: Verifica estructura de archivos y sintaxis HTML
- **Estado**: Ver en GitHub Actions después del primer push

## 🔑 Usuarios de Prueba

### Profesional
- **Usuario**: Profesional de prueba
- **Cédula**: `1000595131`

### Paciente
- **Usuario**: Paciente de prueba
- **Cédula**: `1000595134`

## 🤖 Funcionalidad IA

La pestaña **"IA Sugerencias"** en el dashboard profesional utiliza Gemini Pro para:
- Analizar patrones de citas
- Identificar conflictos y huecos en la agenda
- Sugerir optimizaciones de horarios
- Alertar sobre citas próximas

### Uso
1. Ir al Dashboard Profesional
2. Click en la pestaña "IA Sugerencias"
3. Click en "Analizar Agenda"
4. Esperar respuesta de la IA (3-5 segundos)

## 📡 API Endpoints (N8N)

- `GET /webhook/appointments` - Obtener citas
- `POST /webhook/appointments` - Crear cita
- `PUT /webhook/appointments` - Actualizar cita
- `GET /webhook/users` - Obtener usuarios
- `POST /webhook/users` - Crear usuario
- `PUT /webhook/users` - Actualizar usuario
- `DELETE /webhook/users` - Eliminar usuario
- `POST /webhook/ai-insights` - Análisis IA de agenda

## 🎨 Diseño

- **Paleta de colores**: iOS-inspired
- **Tipografía**: Inter (Google Fonts)
- **Responsive**: Mobile-first (max-width: 400px)
- **Animaciones**: Transiciones suaves y micro-interacciones

## 🧪 Testing

Scripts de prueba disponibles en `tests/`:
- `test_register.ps1` - Prueba de registro
- `test_agenda_conflict.ps1` - Prueba de conflictos
- `test_update_status.ps1` - Prueba de actualización
- Y más...

## 📝 Notas Técnicas

### Sistema de Notas
- Soporte multi-nota por paciente
- Edición y eliminación individual
- Persistencia automática
- Formato JSON en backend

### Gestión de Estado
- LocalStorage para sesión de usuario
- Fetch API para comunicación con N8N
- Renderizado optimista (UI updates antes de confirmación)

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para gestión médica moderna


## ☁️ Despliegue en Vercel

Este proyecto está optimizado para desplegarse en Vercel.

### Instrucciones de Despliegue

1. **Importar Proyecto**:
   - Conectar repositorio de GitHub en el dashboard de Vercel.
   - Seleccionar `app-agenda`.

2. **Configuración de Build**:
   - **Framework Preset**: `Other` (HTML/Static).
   - **Build Command**: (Dejar vacío).
   - **Output Directory**: `public` (Importante).
   - **Install Command**: (Dejar vacío).

3. **Verificación**:
   - Una vez desplegado, visitar la URL proporcionada por Vercel (ej. `app-agenda.vercel.app`).
   - Verificar rutas `/login`, `/register`, `/agenda`, etc. (Configuradas en `vercel.json` raíz).

## 🔮 Roadmap


- [ ] Autenticación con JWT
- [ ] Base de datos persistente (PostgreSQL/Supabase)
- [ ] Notificaciones push
- [ ] Exportar reportes PDF
- [ ] App móvil nativa
- [ ] Integración con calendarios (Google Calendar)
- [ ] Videollamadas integradas

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
