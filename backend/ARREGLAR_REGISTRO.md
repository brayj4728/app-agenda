# ⚠️ ERROR: Endpoints de Usuarios No Funcionan

## 🔍 Problema Detectado

**Error en registro:**
```
Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

**Causa:**
El workflow activo en n8n NO tiene los endpoints de usuarios (register, login, etc.)

---

## ✅ Solución (3 minutos)

### El archivo correcto YA EXISTE

El archivo `backend/n8n_workflow_FINAL_WORKING.json` **SÍ tiene todos los endpoints**:

✅ Appointments (GET, POST, PUT, DELETE)  
✅ **Users (register, login, update, delete, get)** ← Estos faltan en n8n  
✅ AI Insights  
✅ Available Hours (nuevo)  

**Total:** 38 nodos (todos los originales + 3 nuevos)

---

## 🚀 Pasos para Arreglar

### Opción 1: Reemplazar Workflow (RECOMENDADO)

1. **Abre n8n:** https://n8n-n8n.xxboi7.easypanel.host

2. **Elimina el workflow actual:**
   - Ve a "Workflows"
   - Encuentra "Solar Rosette Agenda (FINAL - Con Bloqueo)"
   - Haz clic en los 3 puntos (...)
   - "Delete"

3. **Importa el archivo correcto:**
   - "Import from File"
   - Selecciona: `backend/n8n_workflow_FINAL_WORKING.json`
   - Import

4. **Activa el workflow:**
   - Toggle a ON (verde)

---

### Opción 2: Activar Workflow Original + Agregar Nodos

Si prefieres mantener el workflow original:

1. **Desactiva** "Solar Rosette Agenda (FINAL - Con Bloqueo)"
2. **Activa** "Solar Rosette Agenda (Final Complete System)" (el original)
3. **Agrega manualmente** los 3 nodos nuevos (ver guía en `backend/CODIGO_SIMPLE_N8N.md`)

---

## 🧪 Verificar que Funciona

Después de importar, ejecuta:

```powershell
# Test 1: Register
$body = @{name="Test";email="test@test.com";cedula="999";phone="123";role="patient";password="test"} | ConvertTo-Json
Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/users/register" -Method POST -Body $body -ContentType "application/json"

# Test 2: Available Hours
Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments/available-hours?date=2026-02-10"

# Test 3: Appointments
Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments?cedula=123&role=patient"
```

**Todos deben responder con JSON válido** ✅

---

## 📊 Endpoints que Deben Funcionar

| Endpoint | Método | Estado Actual |
|----------|--------|---------------|
| `/users/register` | POST | ❌ 404 |
| `/users/login` | POST | ❌ 404 |
| `/appointments` | GET | ✅ Funciona |
| `/appointments` | POST | ✅ Funciona |
| `/appointments/available-hours` | GET | ✅ Funciona |

---

## ⚠️ IMPORTANTE

El archivo `n8n_workflow_FINAL_WORKING.json` **ES EL CORRECTO**.

Contiene:
- ✅ 35 nodos originales (usuarios, appointments, AI)
- ✅ 3 nodos nuevos (bloqueo de horas)
- ✅ Total: 38 nodos

**Solo necesitas importarlo en n8n.**

---

**Archivo:** `backend/n8n_workflow_FINAL_WORKING.json`  
**Acción:** Eliminar workflow actual e importar este
