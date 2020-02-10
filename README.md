# Interpreter
 Interprets a description of your application and handles the rest.

Usage
===

```typescript
function printMessage(variables, state){
  state.message = variables[0]
  return state
}

function nonEmptyMessage(state){
  return state.message.length > 0
}

const description = {
  variables: ["hello world"],
  functions: [printMessage],
  initialState: {
    message: ""
  },
  constraints: [nonEmptyMessage]
};

const messenger = new Interpreter(description);
const [{ message }, [hasMessage]] = messenger.interpret();

if (hasMessage) {
  console.log(message);
} else {
  console.error("Message is empty!");
}
```