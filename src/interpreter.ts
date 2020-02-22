type TState<S> = Record<string, S>;
type TAction<V, S> = (variables: readonly V[], state: TState<S>) => TState<S>;
type TConstraint<S> = (state: TState<S>) => boolean;
type TDescription<V, S> = {
  variables: V[];
  actions: TAction<V, S>[];
  initialState: TState<S>;
  constraints: TConstraint<S>[];
};

export default class Interpreter<V, S> {
  variables: V[] = [];
  actions: TAction<V, S>[] = [];
  state: TState<S>;
  constraints: TConstraint<S>[] = [];

  constructor(description: TDescription<V, S>) {
    const { variables, actions, initialState, constraints } = description;
    this.variables = variables;
    this.actions = actions;
    this.state = initialState;
    this.constraints = constraints;
  }

  private callFunc = (func: TAction<V, S>) => {
    const state = Object.freeze({ ...this.state });
    const variables = Object.freeze([...this.variables]);
    this.state = func(variables, state);
  };

  private assert = (state: TState<S>, objective: TConstraint<S>) => {
    return objective(state);
  };

  interpret = () => {
    const { callFunc, assert } = this;
    const actions = this.actions;
    const constraints = this.constraints;
    actions.forEach(func => callFunc(func));
    const state = this.state;
    const assertions = constraints.map(obj => assert(state, obj));

    return [state, assertions] as const;
  };
}
