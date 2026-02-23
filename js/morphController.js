import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';

export function createMorphController(initialState = {}) {
  const gui = new GUI({ title: 'Morph Sliders (v1)' });
  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '70px';
  gui.domElement.style.left = '4px';
  gui.domElement.style.zIndex = '10';
  const state = {
    height: 0,
    bodyMass: 0,
    shoulderWidth: 0,
    waist: 0,
    jawWidth: 0,
    noseSize: 0,
    eyeSize: 0,
    cheekbone: 0,
    chinLength: 0,
    browHeight: 0,
    ...initialState
  };


  Object.keys(state).forEach((key) => {
    gui.add(state, key, -1, 1, 0.01);
  });

  return {
    getState: () => ({ ...state }),
    applyStyleRange(range) {
      // In v1 this can be used to remap slider bounds; placeholder for dynamic controller rebuild.
      return range;
    },
    destroy: () => gui.destroy()
  };
}