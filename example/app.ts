import Interpreter from "../mod.ts";
import print from "./demo/print.ts";
import nonEmptyMessage from "./demo/checkMessage.ts";
export type TDesc = typeof description;
export type TVars = TDesc['variables']
export type TState = TDesc['initialState']

const description = {
  variables: ["hello world"],
  functions: [print],
  initialState: {
    message: ""
  },
  constraints: [nonEmptyMessage]
};

const app = new Interpreter(description);
const [output, [hasMessage]] = app.interpret();

if (hasMessage) {
  console.log({ message: output.message });
} else {
  console.error("Message is empty!");
}
