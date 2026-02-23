import { GLTF2Export } from 'https://cdn.jsdelivr.net/npm/@babylonjs/serializers@7.26.2/+esm';

export function createExportService(scene) {
  return {
    async exportGLB() {
      const validation = this.validateExportReadiness();
      if (!validation.ok) {
        console.warn('[export] warnings:', validation.warnings);
        alert('Nothing to export yet — load a character first.');
        return;
      }

      try {
        const glb = await GLTF2Export.GLBAsync(scene, 'character_export');
        glb.downloadFiles();
      } catch (error) {
        console.warn('[export] GLB export failed:', error);
        alert('GLB export failed. Check console for details.');
      }
    },
    exportObjSnapshot() {
      console.info('OBJ posed snapshot export placeholder (for CSP workflow).');
    },
    validateExportReadiness() {
      const warnings = [];
      const meshes = scene.meshes ?? [];
      if (!meshes.length) warnings.push('No meshes in scene.');
      return { ok: warnings.length === 0, warnings };
    }
  };
}