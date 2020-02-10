# Interpreter

Interprets a description of your application and handles the rest.

# Usage

```typescript
import Interpreter from "../mod.ts";

type TDesc = typeof description;
type TVars = TDesc['variables']
type TState = TDesc['initialState']

function printMessage(variables: TVars, state: TState) {
  return { ...state, message: variables[0] };
}

function nonEmptyMessage(state: TState) {
  return state.message.length > 0;
}

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
```

# API

**Variables** is an array of anything. Primitives, non primitives, functions, etc. **Variables** are immutable.

**Functions** is an array of functions which are required to have the same signature. 

```
type TFunc<V, S> = (variables: V[], state: S) => S
```

**Functions** are executed in the order they are inserted.

**Constraints** is an array of functions which are also required to have the same signature

```
type TConstraint<S> = (state: S) => boolean
```

**Constraints** can help ensure the state/output of the interpreter is valid by your definitions.

**State** is always an object, with properties the user can define. **State** is immutable. Each **Function** must return a brand new state.