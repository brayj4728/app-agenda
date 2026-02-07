# 🔧 SOLUCIÓN: Código correcto para copiar/pegar en n8n

## El problema
El workflow importado tiene un error. La solución más rápida es editar manualmente los nodos en n8n.

## SOLUCIÓN RÁPIDA (5 minutos)

### Paso 1: Edita el nodo "Calculate Available Hours"

1. Abre el workflow en n8n
2. Haz doble clic en el nodo "Calculate Available Hours"
3. **REEMPLAZA TODO** el código con este:

```javascript
const staticData = getWorkflowStaticData('global');
const allAppointments = staticData.appointments || [];

// Get query parameter
const requestedDate = $input.first().json.query.date;

if (!requestedDate) {
  return [{
    json: {
      success: false,
      message: 'Missing date parameter'
    }
  }];
}

// Generate time slots
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;
const allHours = [];

for (let hour = WORK_START_HOUR; hour <= WORK_END_HOUR; hour++) {
  const hourStr = hour.toString().padStart(2, '0');
  allHours.push(`${hourStr}:00`);
}

// Filter occupied hours
const occupiedHours = allAppointments
  .filter(a => a.dateStr === requestedDate && a.status !== 'CANCELADA')
  .map(a => a.time);

// Calculate available hours
const availableHours = allHours.filter(hour => !occupiedHours.includes(hour));

return [{
  json: {
    success: true,
    date: requestedDate,
    availableHours: availableHours,
    occupiedHours: occupiedHours,
    totalSlots: allHours.length,
    availableSlots: availableHours.length
  }
}];
```

### Paso 2: Simplifica el flujo

**OPCIÓN MÁS FÁCIL:** Elimina los nodos intermedios y usa solo 2 nodos:

1. **Webhook Available Hours** (ya existe)
2. **Calculate Available Hours** (con el código de arriba)

Conecta directamente: Webhook → Calculate Available Hours → Respond

### Paso 3: Guarda y prueba

1. Haz clic en "Save"
2. Verifica que esté "Active"
3. Prueba el endpoint

## PRUEBA

Ejecuta esto en PowerShell:

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

## ALTERNATIVA: Workflow desde cero (10 minutos)

Si lo anterior no funciona, crea un workflow nuevo:

### Nodo 1: Webhook
- HTTP Method: GET
- Path: `appointments/available-hours`
- Response Mode: Respond to Webhook

### Nodo 2: Code (pega el código de arriba)

### Nodo 3: Respond to Webhook
- Conecta del nodo Code

¡Listo! Mucho más simple.
