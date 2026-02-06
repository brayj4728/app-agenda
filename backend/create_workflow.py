import json

# Leer el backup original
with open('backend/n8n_workflow_BACKUP.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Buscar y actualizar el nodo "Register Logic"
for node in workflow['nodes']:
    if node['name'] == 'Register Logic':
        print("✓ Encontrado nodo 'Register Logic'")
        
        # Código actualizado con campo phone
        node['parameters']['functionCode'] = """const staticData = getWorkflowStaticData('global');
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

return [{ json: { success: true, user: newUser } }];"""
        
        print("✓ Campo 'phone' agregado")
        break

# Guardar el workflow actualizado
with open('backend/n8n_workflow_FINAL.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("✓ Archivo guardado: backend/n8n_workflow_FINAL.json")
print("\nLISTO! Importa 'backend/n8n_workflow_FINAL.json' en N8N")
