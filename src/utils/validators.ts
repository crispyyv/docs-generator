export const identifierValidate = (num: string) =>
  /^[0-9\b]+$/.test(num) && num.length === 12;
