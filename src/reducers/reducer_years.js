import { Year } from "../classes/Year";

export default function () {
  let years = [];
  for (let i = 2015; i < 2018; i++) {
    years.push(new Year(i));
  }
  return years;
}