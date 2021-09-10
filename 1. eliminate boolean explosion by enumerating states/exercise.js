function lightBulb() {
  let isLit = false;
  let isBroken = false;

  return {
    state() {
      return { isLit, isBroken };
    },
    toggle() {
      if (isBroken) {
        isLit = false;
        return;
      }

      isLit = !isLit;
    },
    break() {
      isLit = false;
      isBroken = true;
    },
  };
}

const bulb = lightBulb();
bulb.toggle();
bulb.break();
console.log(bulb.state());
