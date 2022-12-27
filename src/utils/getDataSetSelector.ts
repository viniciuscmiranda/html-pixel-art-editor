export function getDataSetSelector(dataSet: Record<string, string | number>) {
  const selector: string[] = [];
  Object.entries(dataSet).forEach(([key, value]) => {
    selector.push(`[data-${key}="${value}"]`);
  });

  return selector.join("");
}
