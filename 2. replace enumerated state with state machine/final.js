const { createMachine } = require("xstate");

const lit = {
  on: {
    BREAK: "broken",
    TOGGLE: "unlit",
  },
};

const unlit = {
  on: {
    BREAK: "broken",
    TOGGLE: "lit",
  },
};

const broken = {
  type: "final",
};

const states = { lit, unlit, broken };

const initial = "unlit";

const config = {
  id: "lightbulb",
  initial,
  states,
  strict: true,
};

const lightBulb = createMachine(config);

console.log(lightBulb.transition("unlit", "TOGGLE").value);
console.log(lightBulb.transition("lit", "TOGGLE").value);
console.log(lightBulb.transition("broken", "TOGGLE").value);
