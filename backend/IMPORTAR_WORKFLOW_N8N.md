# 🚀 Importar Workflow Completo con Bloqueo de Horas

## ✅ Archivo Listo para Importar
**Archivo:** `backend/n8n_workflow_WITH_TIME_BLOCKING.json`

Este archivo contiene:
- ✅ TODO tu flujo actual (sin cambios)
- ✅ 4 nodos nuevos para el bloqueo de horas
- ✅ Todas las conexiones configuradas

---

## 📥 Cómo Importar en n8n

### Opción 1: Importar como Workflow Nuevo (RECOMENDADO)

1. **Abre n8n:** `https://n8n-n8n.xxboi7.easypanel.host`

2. **Haz clic en "Workflows"** (menú lateral izquierdo)

3. **Haz clic en el botón "Import from File"** (arriba a la derecha)

4. **Selecciona el archivo:**
   ```
   backend/n8n_workflow_WITH_TIME_BLOCKING.json
   ```

5. **Haz clic en "Import"**

6. **Resultado:** Tendrás un workflow nuevo llamado:
   ```
   "Solar Rosette Agenda (With Time Blocking)"
   ```

7. **Activa el workflow nuevo** (toggle en ON)

8. **Desactiva el workflow viejo** (para evitar conflictos de webhooks)

---

### Opción 2: Reemplazar el Workflow Actual (Avanzado)

⚠️ **ADVERTENCIA:** Esto reemplazará tu workflow actual. Asegúrate de tener un backup.

1. Abre tu workflow actual en n8n
2. Haz clic en el menú "..." (arriba a la derecha)
3. Selecciona "Download"
4. Guarda el backup en tu computadora
5. Borra todos los nodos del workflow actual
6. Haz clic en "Import from File"
7. Selecciona `backend/n8n_workflow_WITH_TIME_BLOCKING.json`

---

## 🧪 Probar que Funciona

### 1. Verifica que el workflow esté activo
- El toggle debe estar en **ON** (verde)

### 2. Prueba el endpoint nuevo
Abre esta URL en tu navegador (cambia la fecha):
```
https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments/available-hours?date=2026-02-10
```

### 3. Respuesta esperada:
```json
{
  "success": true,
  "date": "2026-02-10",
  "availableHours": ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  "occupiedHours": [],
  "totalSlots": 9,
  "availableSlots": 9
}
```

### 4. Prueba el frontend
1. Abre `agenda.html` en tu navegador
2. Haz clic en "+" para agendar una cita
3. Selecciona una fecha
4. **Deberías ver solo las horas disponibles** en el dropdown

---

## 📊 Nodos Nuevos Agregados

El workflow ahora incluye estos 4 nodos adicionales:

```
[Webhook Available Hours]
    ↓
[Generate Time Slots]
    ↓
[Calculate Available Hours]
    ↓
[Respond Available Hours]
```

**Ubicación:** Los encontrarás al final del workflow (posición Y: 2500)

---

## ⚙️ Personalizar Horarios

Si quieres cambiar los horarios de trabajo:

1. **Abre el workflow en n8n**
2. **Busca el nodo:** `Generate Time Slots`
3. **Edita estas líneas:**
   ```javascript
   const WORK_START_HOUR = 9;   // Hora de inicio
   const WORK_END_HOUR = 17;    // Hora de fin
   const INTERVAL_MINUTES = 60; // Intervalo (60 = 1 hora)
   ```

### Ejemplos:

**Citas cada 30 minutos:**
```javascript
const INTERVAL_MINUTES = 30;
```

**Horario extendido (8 AM - 8 PM):**
```javascript
const WORK_START_HOUR = 8;
const WORK_END_HOUR = 20;
```

---

## 🆘 Troubleshooting

### Error: "Workflow with this webhook path already exists"
**Solución:** Desactiva el workflow viejo antes de activar el nuevo.

### El endpoint devuelve error 404
**Solución:** 
1. Verifica que el workflow esté activo
2. Espera 10 segundos y vuelve a intentar
3. Revisa que la URL sea correcta: `/webhook/appointments/available-hours`

### El frontend no muestra las horas
**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica que la URL del API en `agenda.html` sea correcta

---

## ✅ Checklist Final

- [ ] Importé el workflow en n8n
- [ ] El workflow está ACTIVO (toggle en ON)
- [ ] Probé el endpoint `/available-hours` y funciona
- [ ] El frontend muestra solo horas disponibles
- [ ] Desactivé el workflow viejo (si usé Opción 1)

---

## 🎉 ¡Listo!

Tu sistema ahora tiene:
- ✅ Bloqueo automático de horas
- ✅ Prevención de conflictos
- ✅ Actualización en tiempo real
- ✅ Todo sin romper el flujo existente

**Siguiente paso:** Prueba con 2 navegadores diferentes intentando agendar la misma hora. Solo uno debería tener éxito.
