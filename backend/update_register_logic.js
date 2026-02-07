const fs = require('fs');

const workflowPath = 'backend/n8n_workflow_FINAL_WORKING.json';
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Find the Register Logic node
const registerLogicNode = workflow.nodes.find(n => n.name === 'Register Logic');

if (registerLogicNode) {
    // New logic with duplicate check
    registerLogicNode.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
if (!staticData.users) { staticData.users = []; }

const body = items[0].json.body;

// CHECK FOR DUPLICATES (Cedula or Email)
const existingUser = staticData.users.find(u => 
  String(u.cedula) === String(body.cedula) || 
  u.email === body.email
);

if (existingUser) {
  return [{ 
    json: { 
      success: false, 
      message: 'La cédula o el correo electrónico ya se encuentran registrados.' 
    } 
  }];
}

// Create User Object
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

    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
    console.log('✅ Register Logic updated with duplicate check.');
} else {
    console.error('❌ Register Logic node not found.');
}
