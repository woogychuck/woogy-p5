function positionOnCircle(
  centerX,
  centerY,
  radius,
  position,
  useRadians = false
) {
  if (!useRadians) {
    position = (position * Math.PI) / 180;
  }

  const yOffset = Math.sin(position) * radius;
  const xOffset = Math.cos(position) * radius;

  const x = centerX + xOffset;
  const y = centerY + yOffset;

  return { x, y };
}
