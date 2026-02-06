# 📦 Guía Rápida de Git - Solar Rosette

## Primera vez (Subir a GitHub)

### 1. Crear repositorio en GitHub
1. Ir a [github.com](https://github.com)
2. Click en "New repository"
3. Nombre: `solar-rosette`
4. Descripción: "Sistema de gestión de citas médicas con IA"
5. **NO** marcar "Initialize with README" (ya lo tenemos)
6. Click "Create repository"

### 2. Inicializar Git local
```bash
# Abrir terminal en la carpeta del proyecto
cd c:\Users\brayn15\.gemini\antigravity\playground\solar-rosette

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Sistema completo v1.0.0"

# Renombrar rama a main
git branch -M main

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/solar-rosette.git

# Subir al repositorio
git push -u origin main
```

### 3. Verificar
Ir a `https://github.com/TU-USUARIO/solar-rosette` y verificar que todo esté ahí.

---

## Comandos Comunes

### Ver estado
```bash
git status
```

### Agregar cambios
```bash
# Agregar archivo específico
git add archivo.html

# Agregar todos los cambios
git add .
```

### Hacer commit
```bash
git commit -m "feat: descripción del cambio"
```

### Subir cambios
```bash
git push
```

### Ver historial
```bash
git log --oneline
```

### Crear rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Cambiar de rama
```bash
git checkout main
```

### Fusionar rama
```bash
git checkout main
git merge feature/nueva-funcionalidad
```

---

## Workflow Recomendado

### Para nuevas features:
```bash
# 1. Crear rama
git checkout -b feature/nombre-feature

# 2. Hacer cambios y commits
git add .
git commit -m "feat: descripción"

# 3. Subir rama
git push -u origin feature/nombre-feature

# 4. Crear Pull Request en GitHub

# 5. Después de merge, actualizar main local
git checkout main
git pull
```

### Para fixes rápidos:
```bash
# 1. Hacer cambios
# 2. Commit
git add .
git commit -m "fix: descripción del fix"

# 3. Push
git push
```

---

## Ignorar archivos

Los archivos en `.gitignore` NO se subirán a GitHub:
- `node_modules/`
- `.env`
- `.DS_Store`
- Logs
- Archivos temporales

---

## Deshacer cambios

### Deshacer cambios no commiteados
```bash
# Archivo específico
git checkout -- archivo.html

# Todos los archivos
git reset --hard
```

### Deshacer último commit (mantener cambios)
```bash
git reset --soft HEAD~1
```

### Deshacer último commit (eliminar cambios)
```bash
git reset --hard HEAD~1
```

---

## Sincronizar con GitHub

### Bajar cambios
```bash
git pull
```

### Subir cambios
```bash
git push
```

### Ver remotes
```bash
git remote -v
```

---

## Tags (Versiones)

### Crear tag
```bash
git tag -a v1.0.0 -m "Versión 1.0.0"
git push origin v1.0.0
```

### Listar tags
```bash
git tag
```

### Ver tag específico
```bash
git show v1.0.0
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/solar-rosette.git
```

### Error: "Updates were rejected"
```bash
git pull --rebase
git push
```

### Ver qué cambió
```bash
git diff
```

---

## Recursos

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Guides](https://guides.github.com/)
- [Git Documentation](https://git-scm.com/doc)

---

**¡Listo para Git! 🚀**
