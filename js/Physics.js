class Physic {
  constructor() {
  }

  update(scene, time) {
    scene.objects.forEach(object => {
      this.updatePosition(object, 'x', time);
      this.updatePosition(object, 'y', time);
    });
  }

  updatePosition(object, axis, time) {
    if (!object.inertia) return;

    const gravity = axis === 'y' ? -5 : 0;
    let dx = time * (object.inertia[axis] / object.physic.weight) + gravity;
    if (dx > 5) dx = 5;
    if (dx < -5) dx = -5;
    if (dx > -1 && dx < 1) {
      object.inertia[axis] = 0;
      return;
    }

    object.coordinates[axis] += dx;
    if (object.coordinates[axis] < 0) {
      object.coordinates[axis] = 0;
    }
    object.inertia[axis] = object.inertia[axis] * 0.8;
  }

  static convert(object) {
    return {
      x: { min: object.coordinates.x, max: object.coordinates.x + object.size.x },
      y: { min: object.coordinates.y, max: object.coordinates.y + object.size.y }
    };
  }

  // пересекаются два прямоугольника или нет
  static intersection(A, B) {
    const x = (A.x.max - A.x.min + B.x.max - B.x.min - Math.abs(A.x.max + A.x.min - B.x.max - B.x.min)) / 2;
    const y = (A.y.max - A.y.min + B.y.max - B.y.min - Math.abs(A.y.max + A.y.min - B.y.max - B.y.min)) / 2;
    return (x > 0 && y > 0);
  }

  // насколько один прямоугольник вошел в другой
  // static penetration(A, B) {
  //   const dx = A.x.max + A.x.min - B.x.max - B.x.min;
  //   const dy = A.y.max + A.y.min - B.y.max - B.y.min;
  //   const x = (A.x.max - A.x.min + B.x.max - B.x.min - Math.abs(dx)) / 2;
  //   const y = (A.y.max - A.y.min + B.y.max - B.y.min - Math.abs(dy)) / 2;
  //
  //   if (x > 0 && y > 0) return {
  //     x: x,
  //     y: y,
  //     direction: {
  //       x: dx / Math.abs(dx),
  //       y: dy / Math.abs(dy)
  //     }
  //   };
  //
  //   return null;
  // }
}