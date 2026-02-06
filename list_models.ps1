$apiKey = "AIzaSyCsJQJuug8ugm7vEmoiOb8_tG1o9B_QEjw"

Write-Host "Listando modelos disponibles con esta API key..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models?key=$apiKey" -Method Get
    Write-Host "`nModelos disponibles:" -ForegroundColor Green
    foreach ($model in $response.models) {
        Write-Host "  - $($model.name)" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "Error al listar modelos: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nIntentando con v1..." -ForegroundColor Cyan
    try {
        $response = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1/models?key=$apiKey" -Method Get
        Write-Host "`nModelos disponibles (v1):" -ForegroundColor Green
        foreach ($model in $response.models) {
            Write-Host "  - $($model.name)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "Error con v1 también: $($_.Exception.Message)" -ForegroundColor Red
    }
}
