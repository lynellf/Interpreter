import { TState, TVars } from "../app.ts";
export default function(variables: TVars, state: TState) {
  const newState = { ...state, message: variables[0] };
  return newState;
}
