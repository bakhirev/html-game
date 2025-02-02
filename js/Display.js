class Display {
  constructor(id) {
    this.element = document.getElementById(id);
    this.context = this.element.getContext('2d');
    this.size = {
      x: this.element.offsetWidth,
      y: this.element.offsetHeight,
    }
    this.element.setAttribute('width', this.size.x);
    this.element.setAttribute('height', this.size.y);
    this.camera = null;
    this.scale = null;
  }

  bind(camera) {
    this.camera = camera;
    this.scale = {
      x: this.getScale('x'),
      y: this.getScaleInverse('y'),
    };
  }

  render() {
    if (!this.camera) return;
    this.context.clearRect(0, 0, this.size.x, this.size.y);
    this.context.beginPath();
    this.camera.getVisibleObjects()
      .forEach(object => {
        const width = this.scale.x(object.size.x);
        const height = this.scale.x(object.size.y);
        const x = this.scale.x(object.coordinates.x - this.camera.coordinates.x);
        const y = this.scale.y(object.coordinates.y - this.camera.coordinates.y) - height;
        this.context.drawImage(object.sprite, x, y, width, height);
        // this.context.fillStyle = this.context.createPattern(object.sprite, 'repeat');
        // this.context.fillRect(x, y, width, height);
        // this.context.rect(x, y, width, height);
      });
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }

  getScale(axis) {
    return coordinate => {
      const scale = this.size[axis] / this.camera.size[axis];
      return coordinate * scale;
    };
  }

  getScaleInverse(axis) {
    return coordinate => {
      const scale = this.size[axis] / this.camera.size[axis];
      return this.size[axis] - (coordinate * scale);
    };
  }
}