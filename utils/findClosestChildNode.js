import { findCenterOfNode } from "./findCenterOfNode";
import { findDistance } from "./findDistance";

export function findClosestChildNode(x, y, parentNode) {
  let closest = parentNode.children[0];

  for (let card of parentNode.children) {
    const { centerX, centerY } = findCenterOfNode(card);

    const distToCard = findDistance({
      x1: centerX,
      x2: x,
      y1: centerY,
      y2: y,
    });

    const { centerX: closestCenterX, centerY: closestCenterY } =
      findCenterOfNode(closest);

    const distToClosest = findDistance({
      x1: closestCenterX,
      x2: x,
      y1: closestCenterY,
      y2: y,
    });

    if (distToCard < distToClosest) {
      closest = card;
    }
  }

  return closest;
}
