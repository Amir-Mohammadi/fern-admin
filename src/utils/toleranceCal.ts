export const getTolerance = (a: number, b: number) => {
  let percent: number = a - b;
  percent = percent / Math.abs(b);

  percent = percent * 100;

  if (percent > 0) {
    return '+' + percent;
  }

  return percent.toString();
};
