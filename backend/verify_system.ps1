# 🔍 Verificación Completa del Sistema

Write-Host "`n" + ("=" * 70) -ForegroundColor Cyan
Write-Host "🔍 VERIFICACIÓN DEL SISTEMA DE BLOQUEO DE HORAS" -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Cyan

## Test 1: Verificar archivo local
Write-Host "`n📁 TEST 1: Verificar archivo local" -ForegroundColor Yellow
Write-Host ("-" * 70)

$workflow = Get-Content "backend/n8n_workflow_WITH_TIME_BLOCKING.json" -Raw | ConvertFrom-Json
$nodeNames = $workflow.nodes | ForEach-Object { $_.name }
$hasAvailableHours = $nodeNames -contains "Webhook Available Hours"

if ($hasAvailableHours) {
    Write-Host "✅ Archivo correcto - Tiene el nodo 'Webhook Available Hours'" -ForegroundColor Green
    Write-Host "   Total de nodos: $($workflow.nodes.Count)"
}
else {
    Write-Host "❌ Archivo incorrecto - NO tiene el nodo necesario" -ForegroundColor Red
}

## Test 2: Probar endpoint
Write-Host "`n🌐 TEST 2: Probar endpoint /available-hours" -ForegroundColor Yellow
Write-Host ("-" * 70)

try {
    $response = Invoke-WebRequest -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments/available-hours?date=2026-02-10" -Method GET
    
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Content-Type: $($response.Headers['Content-Type'])"
    Write-Host "Content Length: $($response.Content.Length) bytes"
    
    if ($response.Content.Length -gt 0) {
        Write-Host "✅ Endpoint responde con datos" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "`nRespuesta:"
        Write-Host ($data | ConvertTo-Json -Depth 5)
    }
    else {
        Write-Host "❌ Endpoint responde VACÍO" -ForegroundColor Red
        Write-Host "`n⚠️  PROBLEMA DETECTADO:" -ForegroundColor Yellow
        Write-Host "   El workflow que está ACTIVO en n8n NO es el correcto."
        Write-Host "`n   Posibles causas:"
        Write-Host "   1. Importaste el archivo pero NO lo activaste"
        Write-Host "   2. Hay dos workflows y el viejo sigue activo"
        Write-Host "   3. El workflow nuevo tiene un error"
    }
}
catch {
    Write-Host "❌ Error al llamar al endpoint: $_" -ForegroundColor Red
}

## Test 3: Probar endpoint principal
Write-Host "`n🌐 TEST 3: Probar endpoint principal (para comparar)" -ForegroundColor Yellow
Write-Host ("-" * 70)

try {
    $response = Invoke-RestMethod -Uri "https://n8n-n8n.xxboi7.easypanel.host/webhook/appointments?cedula=123&role=patient" -Method GET
    
    if ($response.success) {
        Write-Host "✅ Endpoint principal funciona correctamente" -ForegroundColor Green
    }
}
catch {
    Write-Host "❌ Endpoint principal también falla" -ForegroundColor Red
}

## Diagnóstico Final
Write-Host "`n" + ("=" * 70) -ForegroundColor Cyan
Write-Host "📋 DIAGNÓSTICO FINAL" -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Cyan

if ($hasAvailableHours -and $response.Content.Length -eq 0) {
    Write-Host "`n⚠️  PROBLEMA IDENTIFICADO:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   El archivo local es correcto, pero el workflow en n8n NO está activo."
    Write-Host ""
    Write-Host "   SOLUCIÓN:" -ForegroundColor Green
    Write-Host "   1. Abre n8n: https://n8n-n8n.xxboi7.easypanel.host"
    Write-Host "   2. Ve a 'Workflows'"
    Write-Host "   3. Busca: 'Solar Rosette Agenda (With Time Blocking)'"
    Write-Host "   4. Verifica que el toggle esté en ON (verde)"
    Write-Host "   5. Si hay otro workflow activo, desactívalo"
    Write-Host ""
    Write-Host "   IMPORTANTE:" -ForegroundColor Red
    Write-Host "   - Solo puede haber UN workflow activo con el mismo webhook path"
    Write-Host "   - Si el viejo sigue activo, desactívalo primero"
    Write-Host ""
}
elseif ($hasAvailableHours -and $response.Content.Length -gt 0) {
    Write-Host "`n✅ TODO FUNCIONA CORRECTAMENTE" -ForegroundColor Green
    Write-Host ""
    Write-Host "   El sistema de bloqueo de horas está activo y funcionando."
    Write-Host ""
}
else {
    Write-Host "`n❌ ARCHIVO LOCAL INCORRECTO" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Necesitas usar: backend/n8n_workflow_WITH_TIME_BLOCKING.json"
    Write-Host ""
}

Write-Host "`n" + ("=" * 70) -ForegroundColor Cyan
Write-Host ""
