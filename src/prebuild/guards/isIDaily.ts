import { IDaily } from '../../app/interfaces/IDaily';

export function isIDaily(x: any): x is IDaily {
  // console.log(x.temp  === "number");
  return typeof x.temp  !== "number";
}