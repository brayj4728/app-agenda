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

// Guardar el workflow actualizado
fs.writeFileSync('backend/n8n_workflow_FINAL.json', JSON.stringify(workflow, null, 2));

console.log('✓ Archivo guardado: backend/n8n_workflow_FINAL.json');
console.log('\nLISTO! Importa "backend/n8n_workflow_FINAL.json" en N8N');
