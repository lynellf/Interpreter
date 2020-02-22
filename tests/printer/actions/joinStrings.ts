import { TState, TVars } from "../printer.ts";

export default function joinStrings(vars: TVars, state: TState) {
  const message = vars.join(' ');
  const output = {...state, message};
  return output;
}
