const fs = require('fs');

const workflowPath = 'backend/n8n_workflow_FINAL_WORKING.json';
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Find the Get User Logic node
const getUserLogicNode = workflow.nodes.find(n => n.name === 'Get User Logic');

if (getUserLogicNode) {
    // New logic: Support cedula=ALL for admins to list everyone
    getUserLogicNode.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
const users = staticData.users || [];
const cedula = items[0].json.query.cedula;
const role = items[0].json.query.role;

if (!cedula) return [{ json: { success: false, message: 'No cedula provided' } }];

// ADMIN LIST ALL
if (cedula === 'ALL' && role === 'admin') {
    return [{ json: { success: true, users: users } }];
}

const user = users.find(u => String(u.cedula) === String(cedula));

if (user) {
    return [{ json: { success: true, user: user, users: [user] } }];
} else {
    return [{ json: { success: false, message: 'Usuario no encontrado', users: [] } }];
}`;

    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
    console.log('✅ Get User Logic updated to support LIST ALL for admins.');
} else {
    console.error('❌ Get User Logic node not found.');
}
