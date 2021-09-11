const { createMachine, interpret } = require("xstate");

const lit = {
  on: {
    BREAK: "broken",
    TOGGLE: "unlit",
  },
};

const unlit = {
  on: {
    BREAK: {
      target: "broken",
      actions: "logAction",
    },
    TOGGLE: "lit",
  },
  exit: "logAction",
};

const broken = {
  type: "final",
  entry: "logAction",
};

const states = { lit, unlit, broken };

const initial = "unlit";

const config = {
  id: "lightbulb",
  initial,
  states,
  strict: true,
};

const lightBulbMachine = createMachine(config, {
  actions: {
    logAction: (context, type) => {
      console.log(context, type);
    },
  },
});

const lightBulbService = interpret(lightBulbMachine);
lightBulbService.start();

lightBulbService.onTransition((state) => {
  console.log(state.value);
});

lightBulbService.send("TOGGLE");
lightBulbService.send("TOGGLE");
lightBulbService.send("BREAK");
