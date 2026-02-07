# PowerShell script to add time blocking nodes to n8n workflow
$workflowPath = "backend/n8n_workflow.json"
$outputPath = "backend/n8n_workflow_WITH_TIME_BLOCKING.json"

# Read existing workflow
$workflow = Get-Content $workflowPath -Raw | ConvertFrom-Json

# Define new nodes
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
const WORK_START_HOUR = 9;   // 9:00 AM
const WORK_END_HOUR = 17;    // 5:00 PM  
const INTERVAL_MINUTES = 60; // 1 hour blocks

// Get date from query parameter
const requestedDate = items[0].json.query.date;

if (!requestedDate) {
  return [{
    json: {
      success: false,
      message: 'Missing date parameter'
    }
  }];
}

// Generate all possible time slots
const allHours = [];
for (let hour = WORK_START_HOUR; hour <= WORK_END_HOUR; hour++) {
  const hourStr = hour.toString().padStart(2, '0');
  allHours.push(`${hourStr}:00`);
}

// Pass data to next node
return [{
  json: {
    requestedDate,
    allHours
  }
}];
"@
        }
        name        = "Generate Time Slots"
        type        = "n8n-nodes-base.function"
        typeVersion = 1
        position    = @(450, 2500)
        id          = "generate-time-slots"
    },
    @{
        parameters  = @{
            functionCode = @"
const staticData = getWorkflowStaticData('global');
const allAppointments = staticData.appointments || [];

// Get requested date from previous node
const requestedDate = `$('Generate Time Slots').first().json.requestedDate;
const allHours = `$('Generate Time Slots').first().json.allHours;

// Filter appointments for this specific date (exclude cancelled)
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
        name        = "Calculate Available Hours"
        type        = "n8n-nodes-base.function"
        typeVersion = 1
        position    = @(700, 2500)
        id          = "calculate-available-hours"
    },
    @{
        parameters  = @{
            options = @{}
        }
        name        = "Respond Available Hours"
        type        = "n8n-nodes-base.respondToWebhook"
        typeVersion = 1
        position    = @(950, 2500)
        id          = "respond-available-hours"
    }
)

# Add new nodes to workflow
$workflow.nodes += $newNodes

# Add new connections
$workflow.connections | Add-Member -NotePropertyName "Webhook Available Hours" -NotePropertyValue @{
    main = @(
        @(
            @{
                node  = "Generate Time Slots"
                type  = "main"
                index = 0
            }
        )
    )
} -Force

$workflow.connections | Add-Member -NotePropertyName "Generate Time Slots" -NotePropertyValue @{
    main = @(
        @(
            @{
                node  = "Calculate Available Hours"
                type  = "main"
                index = 0
            }
        )
    )
} -Force

$workflow.connections | Add-Member -NotePropertyName "Calculate Available Hours" -NotePropertyValue @{
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

# Update workflow name
$workflow.name = "Solar Rosette Agenda (With Time Blocking)"

# Save the updated workflow
$workflow | ConvertTo-Json -Depth 100 | Set-Content $outputPath -Encoding UTF8

Write-Host "✅ Workflow creado exitosamente: $outputPath" -ForegroundColor Green
Write-Host "📋 Se agregaron 4 nodos nuevos para bloqueo de horas" -ForegroundColor Cyan
Write-Host "🔗 Nuevo endpoint: GET /webhook/appointments/available-hours?date=YYYY-MM-DD" -ForegroundColor Yellow
