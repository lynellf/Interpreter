# Interpreter

Interprets a description of your application and handles the rest.

### Made with Deno in mind. 😎

# Usage

```typescript
import Interpreter from "../mod.ts";

type TDesc = typeof description;
type TVars = TDesc['variables']
type TState = TDesc['initialState']

function printMessage(variables: TVars, state: TState) {
  return { ...state, message: variables.join("\n") };
}

function nonEmptyMessage(state: TState) {
  return state.message.length > 0;
}

const description = {
  variables: ["Hello World!", "This is a test"],
  functions: [print],
  initialState: {
    message: ""
  },
  constraints: [nonEmptyMessage]
};

const printer = new Interpreter(description);
const [{ message } , [hasMessage]] = app.interpret();

if (hasMessage) {
  console.log(message);
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
