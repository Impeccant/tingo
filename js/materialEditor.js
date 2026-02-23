export function createMaterialEditor() {
  return {
    applySkinPreset(mesh, presetName = 'neutral') {
      if (!mesh) return;
      mesh.metadata = mesh.metadata || {};
      mesh.metadata.skinPreset = presetName;
    }
  };
}