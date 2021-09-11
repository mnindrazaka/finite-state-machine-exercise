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
      actions: [
        (context, event) => {
          console.log(context, event);
        },
      ],
    },
    TOGGLE: "lit",
  },
  exit: () => {
    console.log("exit unlit");
  },
};

const broken = {
  type: "final",
  entry: () => {
    console.log("enter broken");
  },
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
