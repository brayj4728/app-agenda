const fs = require('fs');

const workflowPath = 'backend/n8n_workflow_FINAL_WORKING.json';
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

let fixedCount = 0;

workflow.nodes.forEach(node => {
    if (node.parameters && node.parameters.functionCode) {
        const original = node.parameters.functionCode;
        // Replace literal \n sequence with actual newline character
        // Note: in JS, the literal sequence \n is represented as "\\n" 
        // We want to turn "\\n" into "\n"
        const fixed = original.replace(/\\n/g, '\n');

        if (original !== fixed) {
            node.parameters.functionCode = fixed;
            fixedCount++;
            console.log(`✅ Fixed syntax in node: ${node.name}`);
        }
    }
});

if (fixedCount > 0) {
    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');
    console.log(`\n🎉 Total nodes fixed: ${fixedCount}`);
    console.log(`📁 File updated: ${workflowPath}`);
} else {
    console.log('✨ No literal \\n sequences found in functionCode fields.');
}
