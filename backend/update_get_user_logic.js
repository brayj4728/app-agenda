const fs = require('fs');

const workflowPath = 'backend/n8n_workflow_FINAL_WORKING.json';
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Find the Get User Logic node
const getUserLogicNode = workflow.nodes.find(n => n.name === 'Get User Logic');

if (getUserLogicNode) {
    // New logic to match frontend expectations (success flag and user object)
    getUserLogicNode.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
const users = staticData.users || [];
const cedula = items[0].json.query.cedula;

if (!cedula) return [{ json: { success: false, message: 'No cedula provided' } }];

const user = users.find(u => String(u.cedula) === String(cedula));

if (user) {
    return [{ json: { success: true, user: user } }];
} else {
    return [{ json: { success: false, message: 'Usuario no encontrado' } }];
}`;

    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
    console.log('✅ Get User Logic updated for compatibility.');
} else {
    console.error('❌ Get User Logic node not found.');
}
