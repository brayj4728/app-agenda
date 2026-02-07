import json
import sys

# Read the existing workflow
with open('backend/n8n_workflow.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# New nodes to add
new_nodes = [
    # Webhook for available-hours endpoint
    {
        "parameters": {
            "httpMethod": "GET",
            "path": "appointments/available-hours",
            "responseMode": "responseNode",
            "options": {}
        },
        "name": "Webhook Available Hours",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [200, 2500],
        "webhookId": "available-hours-webhook",
        "id": "webhook-available-hours"
    },
    # Generate all time slots
    {
        "parameters": {
            "functionCode": """const WORK_START_HOUR = 9;   // 9:00 AM
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
}];"""
        },
        "name": "Generate Time Slots",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [450, 2500],
        "id": "generate-time-slots"
    },
    # Get occupied hours
    {
        "parameters": {
            "functionCode": """const staticData = getWorkflowStaticData('global');
const allAppointments = staticData.appointments || [];

// Get requested date from previous node
const requestedDate = $('Generate Time Slots').first().json.requestedDate;
const allHours = $('Generate Time Slots').first().json.allHours;

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
}];"""
        },
        "name": "Calculate Available Hours",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [700, 2500],
        "id": "calculate-available-hours"
    },
    # Respond with available hours
    {
        "parameters": {
            "options": {}
        },
        "name": "Respond Available Hours",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1,
        "position": [950, 2500],
        "id": "respond-available-hours"
    }
]

# Add new connections
new_connections = {
    "Webhook Available Hours": {
        "main": [[{
            "node": "Generate Time Slots",
            "type": "main",
            "index": 0
        }]]
    },
    "Generate Time Slots": {
        "main": [[{
            "node": "Calculate Available Hours",
            "type": "main",
            "index": 0
        }]]
    },
    "Calculate Available Hours": {
        "main": [[{
            "node": "Respond Available Hours",
            "type": "main",
            "index": 0
        }]]
    }
}

# Add new nodes to workflow
workflow['nodes'].extend(new_nodes)

# Add new connections
workflow['connections'].update(new_connections)

# Update workflow name
workflow['name'] = "Solar Rosette Agenda (With Time Blocking)"

# Write the updated workflow
with open('backend/n8n_workflow_TIME_BLOCKING.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=4, ensure_ascii=False)

print("✅ New workflow created: backend/n8n_workflow_TIME_BLOCKING.json")
print("📋 Added 4 new nodes for time slot blocking")
print("🔗 Added 3 new connections")
print("\nNew endpoint: GET /webhook/appointments/available-hours?date=YYYY-MM-DD")
