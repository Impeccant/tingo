export const LAYERS = {
  BASE_COVERAGE: 'baseCoverage',
  TOP: 'top',
  BOTTOM: 'bottom',
  FOOTWEAR: 'footwear',
  HAIR: 'hair',
  ACCESSORY: 'accessory',
  FULL_OUTFIT: 'fullOutfit'
};

export function createClothingSystem() {
  const state = {
    [LAYERS.BASE_COVERAGE]: 'base_coverage_01', // non-removable
    [LAYERS.TOP]: null,
    [LAYERS.BOTTOM]: null,
    [LAYERS.FOOTWEAR]: null,
    [LAYERS.HAIR]: null,
    [LAYERS.ACCESSORY]: [],
    [LAYERS.FULL_OUTFIT]: null
  };

  return {
    getState: () => structuredClone(state),
    setItem(layer, itemId) {
      if (layer === LAYERS.BASE_COVERAGE && !itemId) {
        throw new Error('Layer 0 base coverage is mandatory and cannot be removed.');
      }
      if (layer === LAYERS.ACCESSORY) {
        if (!Array.isArray(state[LAYERS.ACCESSORY])) state[LAYERS.ACCESSORY] = [];
        if (state[LAYERS.ACCESSORY].length >= 3) state[LAYERS.ACCESSORY].shift();
        state[LAYERS.ACCESSORY].push(itemId);
        return;
      }
      state[layer] = itemId;
    },
    clearLayer(layer) {
      if (layer === LAYERS.BASE_COVERAGE) return; // hard safety rule
      if (layer === LAYERS.ACCESSORY) {
        state[LAYERS.ACCESSORY] = [];
        return;
      }
      state[layer] = null;
    }
  };
}