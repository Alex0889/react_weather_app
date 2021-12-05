import { ICurrent } from '../../app/interfaces/ICurrent';

export function isICurrent(x: any): x is ICurrent {
  return x.temp  === "number";
}