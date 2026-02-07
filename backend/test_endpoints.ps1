# 🔍 Diagnóstico del Sistema de Bloqueo de Horas

## Prueba 1: Endpoint Principal (Existente)
Write-Host "`n🧪 TEST 1: Endpoint principal de appointments" -ForegroundColor Cyan
Write-Host "=" * 60

try {
    $result = Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments?cedula=123&role=patient" -Method GET
    Write-Host "✅ FUNCIONA" -ForegroundColor Green
    Write-Host "Respuesta:" ($result | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "❌ ERROR: $_" -ForegroundColor Red
}

## Prueba 2: Endpoint de Horas Disponibles (Nuevo)
Write-Host "`n🧪 TEST 2: Endpoint de horas disponibles" -ForegroundColor Cyan
Write-Host "=" * 60

try {
    $result = Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments/available-hours?date=2026-02-10" -Method GET
    
    if ($result) {
        Write-Host "✅ FUNCIONA" -ForegroundColor Green
        Write-Host "Respuesta:" ($result | ConvertTo-Json -Depth 3)
    }
    else {
        Write-Host "⚠️ RESPUESTA VACÍA" -ForegroundColor Yellow
        Write-Host "El endpoint responde pero no devuelve datos."
        Write-Host "`nPosibles causas:" -ForegroundColor Yellow
        Write-Host "1. Subiste el workflow VIEJO (n8n_workflow.json)"
        Write-Host "2. El workflow no tiene los nodos nuevos"
        Write-Host "3. El path del webhook es diferente"
    }
}
catch {
    Write-Host "❌ ERROR: $_" -ForegroundColor Red
    Write-Host "`nPosibles causas:" -ForegroundColor Yellow
    Write-Host "1. El endpoint no existe (workflow sin nodos nuevos)"
    Write-Host "2. El workflow no está activo"
    Write-Host "3. Error en la configuración del webhook"
}

## Prueba 3: Verificar Path Alternativo
Write-Host "`n🧪 TEST 3: Probar path alternativo" -ForegroundColor Cyan
Write-Host "=" * 60

try {
    $result = Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/available-hours?date=2026-02-10" -Method GET
    
    if ($result) {
        Write-Host "✅ FUNCIONA CON PATH ALTERNATIVO" -ForegroundColor Green
        Write-Host "El endpoint está en: /webhook/available-hours (sin 'appointments/')"
        Write-Host "Respuesta:" ($result | ConvertTo-Json -Depth 3)
    }
    else {
        Write-Host "⚠️ RESPUESTA VACÍA" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "❌ No funciona con path alternativo" -ForegroundColor Red
}

## Diagnóstico Final
Write-Host "`n" + ("=" * 60)
Write-Host "📋 DIAGNÓSTICO" -ForegroundColor Cyan
Write-Host ("=" * 60)

Write-Host "`n¿Qué workflow subiste a n8n?"
Write-Host "A) n8n_workflow.json (viejo - SIN bloqueo de horas)"
Write-Host "B) n8n_workflow_WITH_TIME_BLOCKING.json (nuevo - CON bloqueo)"

Write-Host "`nSi subiste el A):" -ForegroundColor Yellow
Write-Host "  → Necesitas importar el archivo B)"
Write-Host "  → Archivo: backend/n8n_workflow_WITH_TIME_BLOCKING.json"

Write-Host "`nSi subiste el B):" -ForegroundColor Yellow
Write-Host "  → Verifica que el workflow esté ACTIVO en n8n"
Write-Host "  → Revisa los logs de n8n para ver errores"

Write-Host "`n" + ("=" * 60)
