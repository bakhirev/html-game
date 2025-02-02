class Camera {
  constructor() {
    this.coordinates = {
      x: 0,
      y: 0,
    };
    this.size = {
      x: 500,
      y: 250,
    };
    this.target = null;
    this.scene = null;
  }

  bind(some) {
    if (some instanceof Scene) {
      this.scene = some;
    } else {
      this.target = some;
    }
  }

  getVisibleObjects() {
    this._updatePosition('x');
    // this._updatePosition('y');
    const position = Physic.convert(this);
    return this.scene.objects.filter(object => Physic.intersection(Physic.convert(object), position));
  }

  _updatePosition(axis) {
    if (!this.target) return;
    const add = this.target.size[axis] / 2;
    const remove = this.size[axis] / 2;
    this.coordinates[axis] = this.target.coordinates[axis] + add - remove;
  }
}