import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      const modelUrl = "./models/mycharacter.glb";

      loader.load(
        modelUrl,
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = false;
              child.receiveShadow = false;
              mesh.frustumCulled = true;
              if (mesh.material && !Array.isArray(mesh.material)) {
                (mesh.material as THREE.ShaderMaterial).precision = "mediump";
              }
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat) {
                // Soften harsh baked crevice shadows on face, chin, and neck
                if (mat.aoMap) {
                  mat.aoMapIntensity = 0.4;
                }
                // Clear any artificial dark/purple emissive so skin tones stay natural, clean, and uniform
                if (
                  mesh.name.toLowerCase().includes("look") ||
                  mesh.name.toLowerCase().includes("head") ||
                  mat?.name?.toLowerCase().includes("look")
                ) {
                  if (mat.emissive) {
                    mat.emissive = new THREE.Color(0x000000);
                    mat.emissiveIntensity = 0;
                  }
                }
              }
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();

          const footR = character.getObjectByName("footR");
          if (footR) footR.position.y = 3.36;
          const footL = character.getObjectByName("footL");
          if (footL) footL.position.y = 3.36;

          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
