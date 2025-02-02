const factory = new Factory();
const Man = factory.getClass([
  'physic',
  'sprite',
  'coordinates',
  'size',
  'inertia',
], [], './images/mario.png');
const Grow = factory.getClass([
  'physic',
  'sprite',
  'coordinates',
  'size',

], [], './images/grow.png');
const man = new Man();
const man2 = new Man();
const scene = new Scene();
man2.coordinates.x= 300;

for (let i = 0; i < 10; i++) {
  const block = new Grow();
  block.coordinates.y = 100;
  block.coordinates.x = i * 50;
  scene.add(block);
}


scene.add(man);
scene.add(man2);
setTimeout(() => {
  scene.remove(man2.id);
}, 5000);

const camera = new Camera();
camera.bind(man);
camera.bind(scene);

const display = new Display('canvas');
display.bind(camera);

const joystick = new Joystick();
joystick.bind(man);

const physic = new Physic();


const timer = setInterval(() => {
  physic.update(scene, 1000 / 60); //
  display.render();
}, 1000 / 60);

