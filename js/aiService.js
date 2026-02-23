const FEATURE_FLAGS = {
  meshyTextTo3D: false,
  stylePreview2D: false
};

export function createAIService() {
  return {
    async generateMeshyModel(prompt) {
      if (!FEATURE_FLAGS.meshyTextTo3D) {
        return { enabled: false, message: 'Meshy.ai hook is disabled in v1 by default.' };
      }
      return { enabled: true, prompt };
    },
    async requestStylePreview(imageBlob, style = 'Stylized') {
      if (!FEATURE_FLAGS.stylePreview2D) {
        return { enabled: false, previewUrl: '' };
      }
      return { enabled: true, previewUrl: URL.createObjectURL(imageBlob), style };
    }
  };
}