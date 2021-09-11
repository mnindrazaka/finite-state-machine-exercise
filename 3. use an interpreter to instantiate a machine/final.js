const { createMachine, interpret } = require("xstate");

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

const lightBulbMachine = createMachine(config);
const lightBulbService = interpret(lightBulbMachine);
lightBulbService.start();

lightBulbService.onTransition((state) => {
  console.log(state.value);
});

lightBulbService.send("TOGGLE");
lightBulbService.send("TOGGLE");
lightBulbService.send("BREAK");
lightBulbService.send("BREAK");
