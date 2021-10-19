export function generateColors(): string[] {
  const saturation = "24";
  const lightness = "40";
  const colors: string[] = [];
  for (let hue = 0; hue < 1780; hue += 100) {
    colors.push(`hsl(${hue % 360},${saturation}%,${lightness}%)`);
  }
  return colors;
}
