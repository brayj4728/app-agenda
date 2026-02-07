const fs = require('fs');

const workflowPath = 'backend/n8n_workflow_FINAL_WORKING.json';
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Find the Delete Users Logic node
const deleteUsersLogicNode = workflow.nodes.find(n => n.name === 'Delete Users Logic');

if (deleteUsersLogicNode) {
    // New logic: Check if a specific ID (cedula) is provided.
    // If provided, delete only that user.
    // If not provided, keep the original "keep only Brayan" logic or similar.
    deleteUsersLogicNode.parameters.functionCode = `const staticData = getWorkflowStaticData('global');
if (!staticData.users) return [{ json: { success: true, deleted: 0 } }];

const body = items[0].json.body || items[0].json.query || {};
const cedulaToDelete = body.id || body.cedula;

const initialCount = staticData.users.length;

if (cedulaToDelete) {
    // DELETE INDIVIDUAL USER
    staticData.users = staticData.users.filter(u => String(u.cedula) !== String(cedulaToDelete));
    const deletedCount = initialCount - staticData.users.length;
    return [{ json: { success: true, deleted: deletedCount, message: 'Usuario eliminado correctamente' } }];
} else {
    // PROTECT BRAYAN AND REMOVE OTHERS (Original logic)
    const keepCedula = '1000595131';
    staticData.users = staticData.users.filter(u => String(u.cedula) === keepCedula);
    const deletedCount = initialCount - staticData.users.length;
    return [{ json: { success: true, deleted: deletedCount, message: 'Limpieza masiva completada' } }];
}`;

    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
    console.log('✅ Delete Users Logic updated to support individual deletion.');
} else {
    console.error('❌ Delete Users Logic node not found.');
}
