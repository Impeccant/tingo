import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Color4
} from 'https://cdn.jsdelivr.net/npm/@babylonjs/core@7.26.2/+esm';

import { loadBaseCharacter } from './characterSystem.js';
import { createMorphController } from './morphController.js';
import { STYLE_MODES, STYLE_RANGE_MAP, suggestOutfitForStyle } from './stylePresets.js';
import { FACE_PRESETS, BODY_PRESETS, AGE_PRESETS } from './ethnicityPresets.js';
import { createClothingSystem } from './clothingSystem.js';
import { bindClothingToCharacterMorphs } from './clothingMorphBinder.js';
import { createMaterialEditor } from './materialEditor.js';
import { createExportService } from './exportService.js';
import { createPerfMonitor } from './perfMonitor.js';
import { createAIService } from './aiService.js';

function fillSelect(el, values, defaultValue) {
  values.forEach((v) => {
    const option = document.createElement('option');
    option.value = v;
    option.textContent = v;
    el.appendChild(option);
  });
  el.value = defaultValue ?? values[0];
}

async function bootstrap() {
  const canvas = document.getElementById('renderCanvas');
  const engine = new Engine(canvas, true, { disableWebGL2Support: false });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.04, 0.05, 0.08, 1);

  const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.6, 2.8, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  const character = await loadBaseCharacter(scene);
  const morphController = createMorphController();
  const clothingSystem = createClothingSystem();
  const materialEditor = createMaterialEditor();
  const exporter = createExportService(scene);
  const perf = createPerfMonitor(scene, engine, document.getElementById('perfHud'));
  const aiService = createAIService();

  if (character.meshes.length > 0) {
  bindClothingToCharacterMorphs(character.meshes[0], []);
  materialEditor.applySkinPreset(character.meshes[0], 'neutral');
}

  const faceSelect = document.getElementById('ethnicityPreset');
  const bodySelect = document.getElementById('bodyPreset');
  const ageSelect = document.getElementById('agePreset');
  const styleSelect = document.getElementById('styleMode');

  fillSelect(faceSelect, FACE_PRESETS, 'Mixed');
  fillSelect(bodySelect, BODY_PRESETS, 'Androgynous');
  fillSelect(ageSelect, AGE_PRESETS, 'Adult');
  fillSelect(styleSelect, STYLE_MODES, 'Realistic');

  styleSelect.addEventListener('change', (event) => {
    const mode = event.target.value;
    morphController.applyStyleRange(STYLE_RANGE_MAP[mode]);
    console.info('Suggested outfit for style:', suggestOutfitForStyle(mode));
  });

  document.getElementById('exportGlbBtn').addEventListener('click', async () => {
    await exporter.exportGLB();
  });
  document.getElementById('exportObjBtn').addEventListener('click', () => {
    exporter.exportObjSnapshot();
  });

  async function doStylePreview(styleName) {
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();
    const res = await aiService.requestStylePreview(blob, styleName);
    if (res.enabled) {
      document.getElementById('stylePreview').src = res.previewUrl;
    }
  }

  document.getElementById('stylizeBtn').addEventListener('click', () => doStylePreview('Stylized'));
  document.getElementById('cartoonifyBtn').addEventListener('click', () => doStylePreview('Cartoon'));

  try {
    if (!clothingSystem.getState().baseCoverage) {
      console.warn('Base coverage layer is missing. Layer 0 should always be present.');
    }
  } catch (error) {
    console.warn('Unable to validate base coverage layer at startup.', error);
  }

  engine.runRenderLoop(() => {
    perf.update();
    scene.render();
  });

  window.addEventListener('resize', () => engine.resize());
}

bootstrap();