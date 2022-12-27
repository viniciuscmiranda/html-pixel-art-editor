export function loopGrid(
  size: number,
  callback: (x: number, y: number) => void
) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      callback(x, y);
    }
  }
}
