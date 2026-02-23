export const STYLE_MODES = ['Realistic', 'Stylized', 'Chibi', 'Cartoon'];

export const STYLE_MORPH_BASE = {
  Realistic: {},
  Stylized: { eyeScale: 0.25, noseSimplify: 0.2, foreheadScale: 0.15 },
  Chibi: { headScale: 0.45, limbScale: -0.3, roundness: 0.3 },
  Cartoon: { silhouetteStrong: 0.25, geoSimplify: 0.2 }
};

export const STYLE_RANGE_MAP = {
  Realistic: { globalMin: -1, globalMax: 1 },
  Stylized: { globalMin: -0.5, globalMax: 1.4 },
  Chibi: { globalMin: -0.4, globalMax: 1.8 },
  Cartoon: { globalMin: -0.7, globalMax: 1.2 }
};

export function suggestOutfitForStyle(styleMode) {
  const suggestions = {
    Realistic: 'casual_01',
    Stylized: 'stylized_fit_01',
    Chibi: 'chibi_cute_01',
    Cartoon: 'toon_block_01'
  };
  return suggestions[styleMode] ?? 'casual_01';
}