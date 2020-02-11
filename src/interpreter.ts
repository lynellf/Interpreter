type TState = { [key: string]: unknown }
type TFunc<V> = (variables: readonly V[], state: TState) => TState
type TConstraint = (state: TState) => boolean
type TDescription<V> = {
  variables: V[];
  functions: TFunc<V>[];
  initialState: TState;
  constraints: TConstraint[];
};

export default class Interpreter<V> {
  variables: V[] = [];
  functions: TFunc<V>[] = [];
  state: TState;
  constraints: TConstraint[] = [];

  constructor(description: TDescription<V>) {
    const { variables, functions, initialState, constraints } = description;
    this.variables = variables;
    this.functions = functions;
    this.state = initialState;
    this.constraints = constraints;
  }

  private callFunc = (func: TFunc<V>) => {
    const state = Object.freeze({ ...this.state });
    const variables = Object.freeze([...this.variables]);
    this.state = func(variables, state);
  };

  private assert = (state: TState, objective: TConstraint) => {
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
