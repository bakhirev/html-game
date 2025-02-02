class Scene {
  constructor() {
    this.objects = [];
    this.objectById = {};
  }

  add(object) {
    this.objects.push(object);
    this.objectById[object.id] = object;
  }

  remove(id) {
    this.objects = this.objects.filter(object => object.id !== id);
    delete this.objectById[id];
  }
}