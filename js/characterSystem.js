// if (character.meshes.length > 0) {
//   bindClothingToCharacterMorphs(character.meshes[0], []);
//   materialEditor.applySkinPreset(character.meshes[0], 'neutral');
// }
import {
  SceneLoader,
  Vector3,
  TransformNode
} from 'https://cdn.jsdelivr.net/npm/@babylonjs/core@7.26.2/+esm';

export async function loadBaseCharacter(scene) {
  const root = new TransformNode('characterRoot', scene);

  // MakeHuman CC0 base mesh should be placed here by project maintainers.
  const basePath = './assets/meshes/';
  const baseFile = 'makehuman_base.glb';

  try {
    const result = await SceneLoader.ImportMeshAsync('', basePath, baseFile, scene);
    result.meshes.forEach((m) => {
      m.parent = root;
      m.position = m.position ?? Vector3.Zero();
    });
    return { root, meshes: result.meshes, skeletons: result.skeletons };
  } catch {
    // Graceful fallback placeholder when assets are not yet in repo.
    return { root, meshes: [], skeletons: [] };
  }
}