const fs = require('fs');

// Read the original workflow
const workflow = JSON.parse(fs.readFileSync('backend/n8n_workflow.json', 'utf8'));

// Add only 2 new nodes (simplified version)
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
            "functionCode": `const staticData = getWorkflowStaticData('global');
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
  allHours.push(\`\${hourStr}:00\`);
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
}];`
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

// Add new nodes
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
workflow.name = "Solar Rosette Agenda (Complete + Time Blocking)";

// Save
fs.writeFileSync('backend/n8n_workflow_FIXED.json', JSON.stringify(workflow, null, 4));

console.log('✅ Workflow corregido creado: backend/n8n_workflow_FIXED.json');
console.log('📊 Nodos agregados: 3');
console.log('🔗 Conexiones agregadas: 2');
console.log('\n📝 Cambios:');
console.log('  - Webhook Available Hours (GET /appointments/available-hours)');
console.log('  - Available Hours Logic (todo en un solo nodo)');
console.log('  - Respond Available Hours');
console.log('\n🚀 Listo para importar en n8n');
