import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  SpotLight,
  Vector2,
  AmbientLight,
  BoxGeometry,
} from "THREE";
import { TrackballControls } from "../libs/TrackballControls";
function Second() {
  useEffect(() => {
    const { scene, camera, renderer } = init();
    const plane = createPlane();
    scene.add(plane);
    addSpotLight(scene);
    addAmbientLight(scene);
    render(scene, camera, renderer);
  }, []);
  function init() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
    const renderer = new WebGLRenderer();
    renderer.setClearColor(new Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return { scene, camera, renderer };
  }
  function render(
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    document.getElementById("scene_1").appendChild(renderer.domElement);
    const trackballControls = initTrackballControls(camera, renderer);
    function renderScene() {
      requestAnimationFrame(renderScene);
      trackballControls.update();
      renderer.render(scene, camera);
    }
    renderScene();
  }
  function createPlane() {
    const planeGeometry = new PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new MeshLambertMaterial({
      color: 0xffffff,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.name = "plane";
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    return plane;
  }
  function addSpotLight(scene: Scene) {
    const spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    scene.add(spotLight);
  }
  function addAmbientLight(scene: Scene) {
    const ambientLight = new AmbientLight(0x353535);
    scene.add(ambientLight);
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
  function addCube(
    scene: Scene,
    planeGeometryWidth: number,
    planeGeometryHeight: number
  ) {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cubeGeometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;
    cube.position.x = -30 + Math.round(Math.random() * planeGeometryWidth);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * planeGeometryHeight);
    scene.add(cube);
  }
  function removeCube() {}
  return <div id="scene_1" style={{ width: "100%", height: "100%" }}></div>;
}
export default Second;
