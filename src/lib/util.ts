import {differenceInYears} from "date-fns";

export function calculateAge(dop: Date) {
  return differenceInYears(new Date(), dop)
}