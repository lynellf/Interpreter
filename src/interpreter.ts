type TState = { [key: string]: unknown }
type TAction<V> = (variables: readonly V[], state: TState) => TState
type TConstraint = (state: TState) => boolean
type TDescription<V> = {
  variables: V[];
  actions: TAction<V>[];
  initialState: TState;
  constraints: TConstraint[];
};

export default class Interpreter<V> {
  variables: V[] = [];
  actions: TAction<V>[] = [];
  state: TState;
  constraints: TConstraint[] = [];

  constructor(description: TDescription<V>) {
    const { variables, actions, initialState, constraints } = description;
    this.variables = variables;
    this.actions = actions;
    this.state = initialState;
    this.constraints = constraints;
  }

  private callFunc = (func: TAction<V>) => {
    const state = Object.freeze({ ...this.state });
    const variables = Object.freeze([...this.variables]);
    this.state = func(variables, state);
  };

  private assert = (state: TState, objective: TConstraint) => {
    return objective(state);
  };

  interpret = () => {
    const { callFunc, assert } = this;
    const actions = this.actions;
    const constraints = this.constraints;
    actions.forEach(action => callFunc(action));
    const state = this.state;
    const assertions = constraints.map(obj => assert(state, obj));

    return [state, assertions] as const;
  };
}
