import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xd4c2ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Soft ambient hemisphere light: warm daylight from above + warm skin bounce from below
  // Keeps the face, chin, and neck smoothly unified in the same natural tone without harsh shadows
  const hemiLight = new THREE.HemisphereLight(0xfff6ee, 0xf2e3d5, 0);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Soft frontal key light at face height for natural, healthy facial clarity (not stark white)
  const frontFillLight = new THREE.DirectionalLight(0xfff3e8, 0);
  frontFillLight.position.set(0, 13.5, 12);
  scene.add(frontFillLight);

  // Dedicated chin & neck upward fill light to smoothly lift shadows under chin and neck
  // Exactly matching the natural warm skin tone of the face
  const neckFillLight = new THREE.DirectionalLight(0xffecd8, 0);
  neckFillLight.position.set(0, 10.8, 8);
  scene.add(neckFillLight);

  // Soft warm monitor glow
  const faceGlowLight = new THREE.PointLight(0xffe8d6, 0, 15, 1.8);
  faceGlowLight.position.set(0, 10.4, 3.8);
  scene.add(faceGlowLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.85,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.1,
      duration: duration,
      ease: ease,
    });
    gsap.to(hemiLight, {
      intensity: 0.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(frontFillLight, {
      intensity: 0.9,
      duration: duration,
      ease: ease,
    });
    gsap.to(neckFillLight, {
      intensity: 0.65,
      duration: duration,
      ease: ease,
    });
    gsap.to(faceGlowLight, {
      intensity: 1.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(faceGlowLight, {
      intensity: 2.2,
      repeat: -1,
      yoyo: true,
      duration: 1.6,
      ease: "sine.inOut",
      delay: duration,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
