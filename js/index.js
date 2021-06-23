// Задача:
// код ниже должен отобразить на canvas 2 танка (можно черными квадратами)

const scene = new Scene();
const camera = new Camera();
const display = new Display('my_canvas');

camera.bind(scene); // камера должна смотреть на эту сцену
camera.resolution = [ 1000, 1000 ]; // область захвата камеры;
panzerB.x = 500; // позиция камеры
panzerB.y = 500; // позиция камеры
display.bind(camera); // display выводит обьекты захваченные камерой в #my_canvas

const panzerA = Factory.create('panzer'); // получили типовой обьект класса Танк
panzerA.x = 100; // позиция танка
panzerA.y = 100;

const panzerB = Factory.create('panzer'); // получили типовой обьект класса Танк
panzerB.x = 400; // позиция танка
panzerB.y = 400;


scene.add(panzerA);
scene.add(panzerB);