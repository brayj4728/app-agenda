# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Solar Rosette! 

## Cómo Contribuir

### 1. Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU-USUARIO/solar-rosette.git
cd solar-rosette
```

### 2. Crear una Rama
```bash
git checkout -b feature/nombre-de-tu-feature
# o
git checkout -b fix/nombre-del-bug
```

### 3. Hacer Cambios
- Escribe código limpio y comentado
- Sigue las convenciones de estilo existentes
- Prueba tus cambios localmente

### 4. Commit
```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

### Convenciones de Commit
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, punto y coma, etc
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Mantenimiento

### 5. Push y Pull Request
```bash
git push origin feature/nombre-de-tu-feature
```
Luego crea un Pull Request en GitHub.

## Áreas de Contribución

### 🎨 Frontend
- Mejoras de UI/UX
- Nuevas animaciones
- Responsive design
- Accesibilidad

### 🔧 Backend
- Optimización de workflows N8N
- Nuevos endpoints
- Mejoras de performance

### 🤖 IA
- Mejoras en prompts de Gemini
- Nuevas funcionalidades IA
- Análisis de datos

### 📚 Documentación
- Mejorar README
- Tutoriales
- Ejemplos de uso

### 🧪 Testing
- Agregar tests
- Mejorar cobertura
- Tests de integración

## Estándares de Código

### HTML
- Usar HTML5 semántico
- Indentación: 4 espacios
- Comentarios descriptivos

### CSS
- Mobile-first
- Variables CSS para colores
- BEM naming (opcional)

### JavaScript
- ES6+
- Funciones descriptivas
- Evitar variables globales
- Comentarios JSDoc

## Testing

Antes de hacer PR:
```bash
# Probar en navegador
# Verificar responsive (F12 → Device toolbar)
# Probar funcionalidad IA
# Verificar que no rompiste nada existente
```

## Reportar Bugs

Usa GitHub Issues con:
- Descripción clara del bug
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Navegador y versión

## Sugerir Features

Usa GitHub Issues con:
- Descripción de la feature
- Caso de uso
- Mockups si es UI (opcional)
- Impacto esperado

## Code Review

Tu PR será revisado considerando:
- ✅ Funcionalidad correcta
- ✅ Código limpio y mantenible
- ✅ Sin bugs introducidos
- ✅ Documentación actualizada
- ✅ Responsive design

## Preguntas

¿Dudas? Abre un Issue con la etiqueta `question`.

---

¡Gracias por contribuir! 🌟
