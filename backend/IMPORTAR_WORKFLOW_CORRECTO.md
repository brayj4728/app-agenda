# ⚠️ ACCIÓN REQUERIDA: Importar Workflow Correcto

## 🔍 Diagnóstico

**Problema detectado:** Subiste el workflow VIEJO que NO tiene el sistema de bloqueo de horas.

**Evidencia:**
- ✅ Endpoint principal funciona: `/webhook/appointments`
- ❌ Endpoint nuevo NO funciona: `/webhook/appointments/available-hours`

---

## ✅ Solución (5 minutos)

### Paso 1: Descargar el Workflow Correcto

El archivo correcto es:
```
backend/n8n_workflow_WITH_TIME_BLOCKING.json
```

**NO uses:** `backend/n8n_workflow.json` (ese es el viejo)

### Paso 2: Importar en n8n

1. **Abre n8n:**
   ```
   https://n8n-n8n.xxboi7.easypanel.host
   ```

2. **Ve a Workflows** (menú lateral)

3. **Haz clic en "Import from File"** o el botón "+"

4. **Selecciona el archivo:**
   ```
   backend/n8n_workflow_WITH_TIME_BLOCKING.json
   ```

5. **Haz clic en "Import"**

### Paso 3: Activar el Nuevo Workflow

1. **Busca el workflow:** "Solar Rosette Agenda (With Time Blocking)"

2. **Actívalo:** Toggle en ON (verde)

3. **Desactiva el viejo:** "Solar Rosette Agenda (Final Complete System)"

### Paso 4: Verificar que Funciona

Ejecuta este comando:
```powershell
Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments/available-hours?date=2026-02-10" | ConvertTo-Json
```

**Respuesta esperada:**
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

---

## 📊 Comparación de Workflows

| Característica | n8n_workflow.json (VIEJO) | n8n_workflow_WITH_TIME_BLOCKING.json (NUEVO) |
|----------------|---------------------------|----------------------------------------------|
| Endpoints básicos | ✅ | ✅ |
| Endpoint `/available-hours` | ❌ | ✅ |
| Bloqueo de horas | ❌ | ✅ |
| Nodos totales | ~20 | ~24 |
| Estado | Obsoleto | Actual |

---

## 🎯 Diferencias Clave

### Workflow VIEJO (el que subiste):
```
- Webhook Create
- Webhook Get
- Webhook Update
- Webhook Delete
- Webhook Login
- Webhook Register
... (sin nodos de bloqueo)
```

### Workflow NUEVO (el que debes subir):
```
- Webhook Create
- Webhook Get
- Webhook Update
- Webhook Delete
- Webhook Login
- Webhook Register
... (todos los anteriores)

+ Webhook Available Hours  ← NUEVO
+ Generate Time Slots      ← NUEVO
+ Calculate Available Hours ← NUEVO
+ Respond Available Hours   ← NUEVO
```

---

## 🔄 Proceso Completo

```
1. Descarga: backend/n8n_workflow_WITH_TIME_BLOCKING.json
2. Abre n8n
3. Import from File
4. Selecciona el archivo
5. Activa el nuevo workflow
6. Desactiva el viejo
7. Prueba el endpoint
8. ✅ ¡Listo!
```

---

## 🆘 Si Tienes Problemas

### Error: "Workflow already exists"
**Solución:** Está bien, n8n creará uno nuevo con un nombre diferente. Solo activa el nuevo y desactiva el viejo.

### Error: "Webhook path conflict"
**Solución:** Desactiva primero el workflow viejo, luego activa el nuevo.

### El endpoint sigue sin funcionar
**Solución:** 
1. Verifica que el workflow nuevo esté ACTIVO (toggle verde)
2. Espera 10 segundos
3. Vuelve a probar el endpoint

---

## ✅ Checklist

- [ ] Descargué `backend/n8n_workflow_WITH_TIME_BLOCKING.json`
- [ ] Lo importé en n8n
- [ ] Activé el workflow nuevo
- [ ] Desactivé el workflow viejo
- [ ] Probé el endpoint y funciona
- [ ] El frontend carga las horas dinámicamente

---

## 📞 Próximo Paso

Después de importar el workflow correcto, ejecuta:
```powershell
powershell -ExecutionPolicy Bypass -File backend/test_endpoints.ps1
```

Deberías ver:
```
✅ TEST 1: FUNCIONA
✅ TEST 2: FUNCIONA
```

---

**Archivo correcto:** `backend/n8n_workflow_WITH_TIME_BLOCKING.json`  
**Tamaño:** ~52 KB  
**Nodos:** 24  
**Última modificación:** 2026-02-07
