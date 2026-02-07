const fs = require('fs');

// Leer el backup original
const workflow = JSON.parse(fs.readFileSync('backend/n8n_workflow_BACKUP.json', 'utf8'));

// Buscar y actualizar el nodo "Register Logic"
for (const node of workflow.nodes) {
  if (node.name === 'Register Logic') {
    console.log('✓ Encontrado nodo "Register Logic"');

    // Código actualizado con campo phone
    node.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
if (!staticData.users) { staticData.users = []; }

const body = items[0].json.body;

// Create User Object WITH PHONE FIELD
const newUser = {
  id: Date.now(),
  name: body.name,
  email: body.email,
  cedula: body.cedula,
  phone: body.phone || '',
  role: body.role || 'patient',
  type: body.type || '',
  registeredAt: new Date().toISOString()
};

staticData.users.push(newUser);

return [{ json: { success: true, user: newUser } }];`;

    console.log('✓ Campo "phone" agregado');
    break;
  }
}

// Buscar y actualizar el nodo "Create Logic"
for (const node of workflow.nodes) {
  if (node.name === 'Create Logic') {
    console.log('✓ Encontrado nodo "Create Logic"');
    node.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
if (!staticData.appointments) { staticData.appointments = []; }
const body = items[0].json.body;

// CONFLICT DETECTION
const conflict = staticData.appointments.find(a => 
  a.dateStr == body.dateStr && 
  a.time == body.time &&
  a.status != 'CANCELADA'
);
if (conflict) {
  return [{ json: { success: false, message: 'Lo sentimos, esta hora ya está ocupada por otro paciente.' } }];
}

const newAppt = {
  id: Date.now(),
  patientName: body.patientName,
  patientCedula: body.patientCedula,
  dateStr: body.dateStr,
  time: body.time,
  type: body.type || 'Cita',
  status: 'PENDIENTE',
  color: 'bg-orange',
  whatsappSent: false // INITIAL STATE
};
staticData.appointments.push(newAppt);
return [{ json: { success: true, appointment: newAppt } }];`;
    console.log('✓ Campo "whatsappSent" agregado a Create Logic');
    break;
  }
}

// Buscar y actualizar el nodo "Update Logic"
for (const node of workflow.nodes) {
  if (node.name === 'Update Logic') {
    console.log('✓ Encontrado nodo "Update Logic"');
    node.parameters.functionCode = `const staticData = getWorkflowStaticData('global');

if (!staticData.appointments) { staticData.appointments = []; }

const body = items[0].json.body || {};
const idToUpdate = body.id;
const newStatus = body.status;
const newColor = body.color;
const whatsappSent = body.whatsappSent;

// Find and Update
const matching = staticData.appointments.find(a => String(a.id) === String(idToUpdate));

if (matching) {
    if(newStatus) matching.status = newStatus;
    if(newColor) matching.color = newColor;
    if(whatsappSent !== undefined) matching.whatsappSent = whatsappSent;
    return [{ json: { success: true, appointment: matching } }];
}

return [{ json: { success: false, message: 'Cita no encontrada' } }];`;
    console.log('✓ Campo "whatsappSent" agregado a Update Logic');
    break;
  }
}

// Buscar y actualizar el nodo "Get User Logic"
for (const node of workflow.nodes) {
  if (node.name === 'Get User Logic') {
    console.log('✓ Encontrado nodo "Get User Logic"');
    node.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
const users = staticData.users || [];
const cedula = items[0].json.query.cedula;

if (!cedula) return [{ json: { success: false, message: 'Cedula no proporcionada' } }];

const user = users.find(u => String(u.cedula) === String(cedula));

if (user) {
    return [{ json: { success: true, user: user } }];
}

return [{ json: { success: false, message: 'Usuario no encontrado' } }];`;
    console.log('✓ Respuesta de "Get User Logic" actualizada');
    break;
  }
}

// Actualizar el nodo "Delete Users Logic" para el nuevo profesional
for (const node of workflow.nodes) {
  if (node.name === 'Delete Users Logic') {
    console.log('✓ Encontrado nodo "Delete Users Logic"');
    node.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
if (!staticData.users) return [{ json: { success: true, deleted: 0 } }];

const keepCedula = '1000491639'; // Carmona Cesar
const initialCount = staticData.users.length;

// Primero limpiamos citas si es necesario (opcional)
// staticData.appointments = []; 

// Filtramos para dejar solo a Carmona Cesar
staticData.users = staticData.users.filter(u => String(u.cedula) === keepCedula);

const deletedCount = initialCount - staticData.users.length;
return [{ json: { success: true, deleted: deletedCount, remaining: staticData.users.length } }];`;
    console.log('✓ Lógica de borrado actualizada para Carmona Cesar');
    break;
  }
}

// Guardar el workflow actualizado
fs.writeFileSync('backend/n8n_workflow_FINAL.json', JSON.stringify(workflow, null, 2));

console.log('✓ Archivo guardado: backend/n8n_workflow_FINAL.json');
console.log('\nLISTO! Importa "backend/n8n_workflow_FINAL.json" en N8N');
