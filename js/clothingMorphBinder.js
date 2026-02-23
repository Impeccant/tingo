export function bindClothingToCharacterMorphs(characterMesh, clothingMeshes) {
  // v1 placeholder: In production, copy morph target influences by name
  // and ensure all clothing meshes are skinned to the same armature.
  if (!characterMesh || !Array.isArray(clothingMeshes)) return;
  clothingMeshes.forEach((mesh) => {
    mesh.metadata = mesh.metadata || {};
    mesh.metadata.boundToCharacterMorphs = true;
  });
}