type TDescription<V, S> = {
  variables: V[];
  functions: Function[];
  initialState: S;
  constraints: Function[];
};

export default class Interpreter<V, S> {
  variables: V[] = [];
  functions: Function[] = [];
  state: S;
  constraints: Function[] = [];

  constructor(description: TDescription<V, S>) {
    const { variables, functions, initialState, constraints } = description;
    this.variables = variables;
    this.functions = functions;
    this.state = initialState;
    this.constraints = constraints;
  }

  private callFunc = (func: Function) => {
    const state = this.state;
    const variables = this.variables;
    this.state = func(variables, state);
  };

  private assert = (state: S, objective: Function) => {
    return objective(state);
  };

  interpret = () => {
    const { callFunc, assert } = this;
    const functions = this.functions;
    const constraints = this.constraints;
    functions.forEach(func => callFunc(func));
    const state = this.state;
    const assertions = constraints.map(obj => assert(state, obj));

    return [state, assertions] as const;
  };
}
