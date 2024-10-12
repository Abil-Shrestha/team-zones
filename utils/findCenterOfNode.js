export function findCenterOfNode(node) {
  const { left, right, top, bottom } = node.getBoundingClientRect();
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  return { centerX, centerY };
}
