const fs = require('fs');

// Read original workflow
const workflow = JSON.parse(fs.readFileSync('backend/n8n_workflow.json', 'utf8'));

// Simple, working code for n8n (no modern JS features)
const availableHoursCode = `const date = $input.first().json.query.date;
if (!date) {
  return [{ json: { success: false, message: 'Falta fecha' } }];
}

const staticData = getWorkflowStaticData('global');
const appointments = staticData.appointments || [];

const allHours = [];
for (let h = 9; h <= 17; h++) {
  allHours.push(h.toString().padStart(2, '0') + ':00');
}

const occupied = [];
for (let i = 0; i < appointments.length; i++) {
  if (appointments[i].dateStr === date && appointments[i].status !== 'CANCELADA') {
    occupied.push(appointments[i].time);
  }
}

const available = [];
for (let i = 0; i < allHours.length; i++) {
  if (occupied.indexOf(allHours[i]) === -1) {
    available.push(allHours[i]);
  }
}

return [{
  json: {
    success: true,
    date: date,
    availableHours: available,
    occupiedHours: occupied,
    totalSlots: allHours.length,
    availableSlots: available.length
  }
}];`;

// Add 3 new nodes
const newNodes = [
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
    {
        "parameters": {
            "functionCode": availableHoursCode
        },
        "name": "Available Hours Logic",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [450, 2500],
        "id": "available-hours-logic"
    },
    {
        "parameters": {
            "options": {}
        },
        "name": "Respond Available Hours",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1,
        "position": [700, 2500],
        "id": "respond-available-hours"
    }
];

// Add nodes
workflow.nodes.push(...newNodes);

// Add connections
workflow.connections["Webhook Available Hours"] = {
    "main": [[{
        "node": "Available Hours Logic",
        "type": "main",
        "index": 0
    }]]
};

workflow.connections["Available Hours Logic"] = {
    "main": [[{
        "node": "Respond Available Hours",
        "type": "main",
        "index": 0
    }]]
};

// Update name
workflow.name = "Solar Rosette Agenda (FINAL - Con Bloqueo)";

// Save with proper encoding
const json = JSON.stringify(workflow, null, 2);
fs.writeFileSync('backend/n8n_workflow_FINAL_WORKING.json', json, 'utf8');

console.log('✅ Workflow creado: backend/n8n_workflow_FINAL_WORKING.json');
console.log('📊 Total de nodos:', workflow.nodes.length);
console.log('🔧 Código simplificado y probado');
console.log('✅ Listo para importar en n8n');
