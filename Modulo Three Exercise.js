class FiniteAutomaton {
  constructor() {
    this.states = new Set(["S0", "S1", "S2"]);
    this.alphabet = new Set([0, 1]);
    this.initialState = "S0";
    this.acceptingStates = new Set(["S0", "S1", "S2"]);

    this.transitions = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S0" },
      S2: { 0: "S1", 1: "S2" },
    };
  }

  processInput(input) {
    let currentState = this.initialState;

    for (const bit of input) {
      const nextState = this.transitions[currentState][bit];
      currentState = nextState;
    }

    return currentState;
  }

  getRemainder(input) {
    const finalState = this.processInput(input);

    switch (finalState) {
      case "S0":
        return 0;
      case "S1":
        return 1;
      case "S2":
        return 2;
      default:
        throw new Error("Invalid final state");
    }
  }
}

function runModThreeTests() {
  const automaton = new FiniteAutomaton();

  const testCases = [
    { input: "1101", expected: 1 },
    { input: "1110", expected: 2 },
    { input: "1111", expected: 0 },
    { input: "0", expected: 0 },
    { input: "1", expected: 1 },
    { input: "10", expected: 2 },
    { input: "11", expected: 0 },
    { input: "100", expected: 1 },
    { input: "101", expected: 2 },
    { input: "110", expected: 0 },
    { input: "1001", expected: 1 },
    { input: "1010", expected: 2 },
    { input: "1011", expected: 0 },
    { input: "1100", expected: 0 },
    { input: "110001101", expected: 1 },
    { input: "101010101010", expected: 0 },
    { input: "1111111111111", expected: 0 },
    { input: "1010101010110", expected: 2 },
    { input: "1101010101010101", expected: 1 },
    { input: "1111111111111110", expected: 2 },
  ];

  for (const { input, expected } of testCases) {
    const result = automaton.getRemainder(input);
    console.log(`Input: ${input}, Expected: ${expected}, Result: ${result}`);
  }
}

runModThreeTests();
