import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  BufferGeometry,
  SphereGeometry,
  PlaneGeometry,
  SpotLight,
  Vector2,
  AmbientLight,
  MeshLambertMaterial,
  Color,
  Material,
} from "THREE";
import { TrackballControls } from "../libs/TrackballControls";
import { initStats } from "../utils/index";
import * as dat from "dat.gui";
function First() {
  useEffect(() => {
    const { scene, camera, renderer, stats } = init();
    window.addEventListener("resize", () => onResize(camera, renderer), false);
    const plane = createPlane();
    const cube = createCube();
    const sphere = createSphere();
    plane.receiveShadow = true;
    cube.castShadow = true;
    sphere.castShadow = true;
    addEntitiesToScene(scene, [plane, cube, sphere]);
    addSpotLight(scene);
    addAmbient(scene);
    render(scene, camera, renderer, stats, update([cube, sphere]));
  }, []);
  const onResize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  function init() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    const renderer = new WebGLRenderer();
    renderer.setClearColor(new Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    const stats = initStats();
    return { scene, camera, renderer, stats };
  }

  function createPlane() {
    const planeGeometry = new PlaneGeometry(60, 20);
    const planeMaterial = new MeshLambertMaterial({
      color: 0xaaaaaa,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.name = "plane";
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    return plane;
  }

  function createCube() {
    const cubeGeometry = new BoxGeometry(4, 4, 4);
    const cubeMaterial = new MeshLambertMaterial({
      color: 0xff0000,
      // wireframe: true,
    });
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.name = "cube";
    cube.position.set(-4, 3, 0);
    return cube;
  }

  function createSphere() {
    const sphereGeometry = new SphereGeometry(4, 20, 20);
    const sphereMaterial = new MeshLambertMaterial({
      color: 0x7777ff,
      // wireframe: true,
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.name = "sphere";
    sphere.position.set(20, 4, 2);
    return sphere;
  }

  // 点光源
  function addSpotLight(scene: Scene) {
    const spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    scene.add(spotLight);
  }
  // 全局均匀光源
  function addAmbient(scene: Scene) {
    const ambientLight = new AmbientLight(0x353535);
    scene.add(ambientLight);
  }

  function addEntitiesToScene(
    scene: Scene,
    entities: Mesh<BufferGeometry, Material>[]
  ) {
    entities.reduce((scene, entity) => {
      return scene.add(entity);
    }, scene);
  }

  function render(
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    stats?: any,
    updateFunc?: () => void
  ) {
    document.getElementById("scene_1").appendChild(renderer.domElement);
    const trackballControls = initTrackballControls(camera, renderer);
    function renderScene() {
      requestAnimationFrame(renderScene);
      trackballControls.update();
      stats && stats.update();
      updateFunc && updateFunc();
      renderer.render(scene, camera);
    }
    renderScene();
  }
  /**
   * 更新逻辑
   * @param entities
   * @returns
   */
  function update(entities: Mesh<BufferGeometry, Material>[]) {
    let step = 0;
    const controls = { rotationSpeed: 0.02, bouncingSpeed: 0.02 };
    const gui = new dat.GUI();
    gui.domElement.style.display = "block";
    gui.domElement.style.height = "auto";
    gui.add(controls, "rotationSpeed", 0, 0.5);
    gui.add(controls, "bouncingSpeed", 0, 0.5);
    (window as any).gui = gui;
    return () => {
      entities.forEach((entity) => {
        if (entity.name === "cube") {
          entity.rotation.x += controls.rotationSpeed;
          entity.rotation.y += controls.rotationSpeed;
          entity.rotation.z += controls.rotationSpeed;
        } else {
          step += controls.bouncingSpeed;
          entity.position.x = 20 + 10 * Math.cos(step);
          entity.position.y = 2 + 10 * Math.abs(Math.sin(step));
        }
      });
    };
  }

  /**
   * 屏幕旋转控件
   * @param camera
   * @param renderer
   * @returns
   */
  function initTrackballControls(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    var trackballControls = new TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = ["65", "83", "68"];

    return trackballControls;
  }
  return <div id="scene_1" style={{ width: "100%", height: "100%" }}></div>;
}
export default First;
