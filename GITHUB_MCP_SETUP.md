# Guía de Configuración de GitHub MCP para Solar Rosette

Esta guía te ayudará a configurar la integración de GitHub MCP (Model Context Protocol) en el proyecto Solar Rosette.

## 📋 Requisitos Previos

- **Git instalado**: Descarga desde [git-scm.com](https://git-scm.com/download/win)
- **Cuenta de GitHub**: Crea una en [github.com](https://github.com)
- **Token de GitHub**: Personal Access Token con permisos apropiados

## 🔑 Obtener Token de GitHub

1. **Ir a GitHub Settings**
   - Navega a: https://github.com/settings/tokens
   - O: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generar nuevo token**
   - Click en "Generate new token (classic)"
   - Nombre: `Solar Rosette - MCP`
   - Expiración: Selecciona según tu preferencia (recomendado: 90 días)

3. **Seleccionar permisos (scopes)**
   - ✅ `repo` - Acceso completo a repositorios privados
   - ✅ `workflow` - Actualizar workflows de GitHub Actions
   - ✅ `read:org` - Leer información de organizaciones
   - ✅ `admin:repo_hook` - Administrar webhooks (opcional)

4. **Copiar el token**
   - ⚠️ **IMPORTANTE**: Copia el token inmediatamente, no podrás verlo de nuevo
   - Formato: `github_pat_XXXXXXXXXXXXXXXXXXXX...`

## ⚙️ Configuración del Proyecto

### 1. Configurar Variables de Entorno

El archivo `.env` ya está creado con tu token. Verifica que contenga:

```env
GITHUB_TOKEN=tu_token_aqui
GITHUB_OWNER=tu-usuario-github
GITHUB_REPO=solar-rosette
```

**Actualiza estos valores:**
- `GITHUB_OWNER`: Tu nombre de usuario de GitHub
- `GITHUB_REPO`: El nombre de tu repositorio (por defecto: `solar-rosette`)

### 2. Verificar Configuración

Ejecuta el script de verificación:

```powershell
.\scripts\setup-github.ps1 -Verify
```

Esto verificará:
- ✓ Archivo `.env` existe
- ✓ `.env` está protegido en `.gitignore`
- ✓ Workflows de GitHub configurados
- ✓ Token de GitHub válido

### 3. Probar Conexión con GitHub API

```powershell
.\scripts\setup-github.ps1 -TestAPI
```

Esto probará la autenticación y mostrará información de tu cuenta.

## 🚀 Inicializar Repositorio Git

Si aún no has inicializado Git en tu proyecto:

```powershell
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit: Solar Rosette v1.0.0"

# Crear repositorio en GitHub (usando la API)
# O manualmente en github.com/new

# Agregar remote
git remote add origin https://github.com/TU-USUARIO/solar-rosette.git

# Push inicial
git branch -M main
git push -u origin main
```

## 📦 Usar GitHub MCP

### Comandos Disponibles

Una vez configurado, puedes usar GitHub MCP para:

**Gestión de Repositorio:**
```powershell
# Ver información del repositorio
gh repo view

# Crear issues
gh issue create --title "Nueva funcionalidad" --body "Descripción"

# Listar pull requests
gh pr list
```

**Workflows:**
- Los workflows en `.github/workflows/` se ejecutarán automáticamente
- CI se ejecuta en cada push y pull request
- Verifica el estado en: `https://github.com/TU-USUARIO/solar-rosette/actions`

### API de GitHub desde PowerShell

Ejemplo de uso directo de la API:

```powershell
# Cargar token
$env:GITHUB_TOKEN = (Get-Content .env | Where-Object { $_ -match "GITHUB_TOKEN" } | ForEach-Object { $_.Split('=')[1] })

# Headers
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
}

# Obtener información del usuario
Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers

# Listar repositorios
Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers
```

## 🔒 Seguridad

### ⚠️ NUNCA subas tu token a GitHub

El archivo `.env` ya está en `.gitignore`, pero verifica siempre:

```powershell
# Verificar que .env está ignorado
git check-ignore .env
# Debe devolver: .env
```

### Rotar Token

Si accidentalmente expones tu token:

1. Ve a https://github.com/settings/tokens
2. Encuentra el token comprometido
3. Click en "Delete"
4. Genera un nuevo token
5. Actualiza `.env` con el nuevo token

## 🛠️ Troubleshooting

### Error: "Bad credentials"
- Verifica que el token esté correctamente copiado en `.env`
- Asegúrate de que el token no haya expirado
- Verifica que el token tenga los permisos necesarios

### Error: "Not Found"
- Verifica que `GITHUB_OWNER` y `GITHUB_REPO` sean correctos
- Asegúrate de que el repositorio exista
- Verifica que tengas acceso al repositorio

### Git no reconocido
- Instala Git desde: https://git-scm.com/download/win
- Reinicia PowerShell después de instalar
- Verifica con: `git --version`

## 📚 Recursos Adicionales

- [Documentación de GitHub API](https://docs.github.com/en/rest)
- [GitHub CLI](https://cli.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🆘 Soporte

Si encuentras problemas:

1. Ejecuta el script de verificación: `.\scripts\setup-github.ps1 -Verify`
2. Revisa los logs de GitHub Actions
3. Verifica que tu token tenga los permisos correctos
4. Consulta la documentación de GitHub

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
