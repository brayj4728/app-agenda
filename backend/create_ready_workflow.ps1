# Create fixed workflow with correct encoding
$workflow = Get-Content "backend/n8n_workflow.json" -Raw -Encoding UTF8 | ConvertFrom-Json

# New nodes (simplified - only 3 nodes)
$newNodes = @(
    @{
        parameters  = @{
            httpMethod   = "GET"
            path         = "appointments/available-hours"
            responseMode = "responseNode"
            options      = @{}
        }
        name        = "Webhook Available Hours"
        type        = "n8n-nodes-base.webhook"
        typeVersion = 1
        position    = @(200, 2500)
        webhookId   = "available-hours-webhook"
        id          = "webhook-available-hours"
    },
    @{
        parameters  = @{
            functionCode = @"
const staticData = getWorkflowStaticData('global');
const allAppointments = staticData.appointments || [];

// Get query parameter
const requestedDate = items[0].json.query.date;

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
"@
        }
        name        = "Available Hours Logic"
        type        = "n8n-nodes-base.function"
        typeVersion = 1
        position    = @(450, 2500)
        id          = "available-hours-logic"
    },
    @{
        parameters  = @{
            options = @{}
        }
        name        = "Respond Available Hours"
        type        = "n8n-nodes-base.respondToWebhook"
        typeVersion = 1
        position    = @(700, 2500)
        id          = "respond-available-hours"
    }
)

# Add new nodes
$workflow.nodes += $newNodes

# Add connections
$workflow.connections | Add-Member -NotePropertyName "Webhook Available Hours" -NotePropertyValue @{
    main = @(
        @(
            @{
                node  = "Available Hours Logic"
                type  = "main"
                index = 0
            }
        )
    )
} -Force

$workflow.connections | Add-Member -NotePropertyName "Available Hours Logic" -NotePropertyValue @{
    main = @(
        @(
            @{
                node  = "Respond Available Hours"
                type  = "main"
                index = 0
            }
        )
    )
} -Force

# Update name
$workflow.name = "Solar Rosette Agenda (Complete + Time Blocking)"

# Save with UTF8 encoding (no BOM)
$json = $workflow | ConvertTo-Json -Depth 100 -Compress:$false
[System.IO.File]::WriteAllText("$PWD/backend/n8n_workflow_READY.json", $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "✅ Workflow creado: backend/n8n_workflow_READY.json" -ForegroundColor Green
Write-Host "📊 Total de nodos: $($workflow.nodes.Count)" -ForegroundColor Cyan
Write-Host "🔗 Encoding: UTF-8 sin BOM" -ForegroundColor Cyan
