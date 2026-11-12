import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(/\s+/)
    .filter((str) => str.length > 0);
}

export function startREPL(state: State) {
  const rl = state.readline;
  const commands = state.commands;

  rl.prompt();

  rl.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const command = commands[words[0]];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (error) {
      console.error(error);
    }

    rl.prompt();
  });
}
