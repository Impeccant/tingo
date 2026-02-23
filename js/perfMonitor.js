export function createPerfMonitor(scene, engine, hudEl) {
  return {
    update() {
      if (!hudEl) return;
      const fps = Math.round(engine.getFps());
      const drawCalls = scene.getActiveMeshes()?.length ?? 'n/a';
      const activeMeshes = scene.getActiveMeshes().length;
      hudEl.textContent = `FPS: ${fps} | Draw Calls: ${drawCalls} | Active Meshes: ${activeMeshes}`;
    }
  };
}