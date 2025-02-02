class Factory {
  constructor() {
    this.properties = {
      physic: {
        weight: 25
      },
      coordinates: {
        x: 0,
        y: 0,
      },
      size: {
        x: 25,
        y: 25,
      },
      inertia: {
        x: 3000,
        y: 1500,
      },
    };
    this.methods = {};
  }

  getClass(propertyList, methodsList, sprite) {
    const properties = this.properties;

    function SomeObject() {
      this.id = Math.random();
      (propertyList || []).forEach(property => {
        if (property === 'sprite') {
          this[property] = new Image();
          this[property].src = sprite || './images/mario.png';
        } else {
          this[property] = { ...properties[property] };
        }
      });
    }

    (methodsList || []).forEach(method => {
      SomeObject.prototype[method] = this.methods[method];
    });
    return SomeObject;
  }
}