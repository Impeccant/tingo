# tingo
A character creator created here during internship at Tingo.Ai, using web GPU
# 3D Character Creator (v1 scaffold)

Babylon.js + WebGL2 + pure ES modules via CDN. No bundlers.

## Stack (final)
- Babylon.js (WebGL2; no WebGPU dependency)
- lil-gui for morph sliders
- GLB export (primary), OBJ snapshot export (fallback)
- Feature-flagged AI hooks (`Meshy.ai`, 2D style preview service)

## Hard constraints implemented in architecture
- Layer 0 base coverage is always on and non-removable.
- No child presets.
- Generic style labels only (`Realistic`, `Stylized`, `Chibi`, `Cartoon`).

## Run locally
From repo root:

```bash
cd tingo
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Assets
Place MakeHuman CC0 assets in:
- `assets/meshes/makehuman_base.glb`
- `assets/meshes/clothing/**`

## Export compatibility docs
- `docs/blender-import-guide.md`
- `docs/ue5-import-guide.md`
- `docs/csp-reference-guide.md`


## Go live quickly
1. Deploy files with `./scripts/publish.sh <user@host> <remote_path> [port]`.
2. Use `deploy/nginx-character-creator.conf` on your web server.
3. Follow `docs/go-live-checklist.md` for preflight and post-deploy validation.