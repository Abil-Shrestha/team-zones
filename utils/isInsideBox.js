export function isInsideBox(x, y, node) {
  const currentCardNodeRect = node.getBoundingClientRect();

  return (
    x > currentCardNodeRect.left &&
    x < currentCardNodeRect.right &&
    y > currentCardNodeRect.top &&
    y < currentCardNodeRect.bottom
  );
}
