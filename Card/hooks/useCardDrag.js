import { useEffect, useRef } from "react";
import { TRANSITION } from "constants";
import { findCenterOfNode } from "../../utils/findCenterOfNode";
import { findClosestChildNode } from "../../utils/findClosestChildNode";
import { isInsideBox } from "../../utils/isInsideBox";

export function useCardDrag({
  cardRef: draggingCardRef,
  cardWrapperRef,
  cardsContainerRef,
  index,
  onCardDragEnd,
}) {
  const isTransitioning = useRef(false);
  const isDragging = useRef(false);
  const activeDragBaseIndex = useRef();

  useEffect(() => {
    draggingCardRef.current.onmousedown = function (pointerDownEvent) {
      activeDragBaseIndex.current = index;
      draggingCardRef.current.style.transition = null;
      cardWrapperRef.current.style.zIndex = 1000;

      function moveCardWithTranslation(node, x, y) {
        node.style.transform = `translate(${x}px, ${y}px)`;
      }

      function onMouseMove(pointerMoveEvent) {
        // set swapping flag for preventing click on card
        if (
          !isDragging.current &&
          (Math.abs(pointerDownEvent.clientX - pointerMoveEvent.clientX) > 1 ||
            Math.abs(pointerDownEvent.clientY - pointerMoveEvent.clientY) > 1)
        ) {
          isDragging.current = true;
        }

        // drag card
        moveCardWithTranslation(
          draggingCardRef.current,
          pointerMoveEvent.pageX - pointerDownEvent.clientX,
          pointerMoveEvent.pageY - pointerDownEvent.clientY
        );

        // get dragging card center coordinates
        const { centerX: draggingCardCenterX, centerY: draggingCardCenterY } =
          findCenterOfNode(draggingCardRef.current);

        // get current active base coordinates for dragging card
        const activeDragBaseCardRect =
          cardsContainerRef.current.children[
            activeDragBaseIndex.current
          ].getBoundingClientRect();

        // check if we are inside another card
        for (let currentCardWrapper of cardsContainerRef.current.children) {
          const currentCardWrapperRect =
            currentCardWrapper.getBoundingClientRect();
          const currentCardNode = currentCardWrapper.firstChild;

          if (
            isInsideBox(
              draggingCardCenterX,
              draggingCardCenterY,
              currentCardNode
            ) &&
            currentCardNode !== draggingCardRef.current &&
            currentCardWrapper !== cardsContainerRef.current.lastChild &&
            !isTransitioning.current
          ) {
            // move replaced card to current active base
            isTransitioning.current = true;
            moveCardWithTranslation(
              currentCardNode,
              activeDragBaseCardRect.x - currentCardWrapperRect.x,
              activeDragBaseCardRect.y - currentCardWrapperRect.y
            );

            // set next index data set for replaced card
            currentCardNode.dataset.nextIndex = activeDragBaseIndex.current;

            // get next index for active base
            const nextActiveDragBaseIndex = parseInt(
              findClosestChildNode(
                draggingCardCenterX,
                draggingCardCenterY,
                cardsContainerRef.current
              ).dataset.index
            );

            // set next index for dragging card
            draggingCardRef.current.dataset.nextIndex = nextActiveDragBaseIndex;

            // set active base index
            activeDragBaseIndex.current = nextActiveDragBaseIndex;

            // eslint-disable-next-line no-loop-func
            currentCardNode.ontransitionend = function () {
              isTransitioning.current = false;
            };
            break;
          }
        }
      }

      function onMouseUp() {
        isTransitioning.current = false;
        document.onmousemove = null;
        draggingCardRef.current.onmouseup = null;

        cardWrapperRef.current.style.zIndex = null;

        if (isDragging.current) {
          // prevent card clicking
          draggingCardRef.current.onclick = (e) => {
            e.stopPropagation();
          };

          setTimeout(() => {
            draggingCardRef.current.onclick = null;
            isDragging.current = false;
          }, 0);

          let toSwap = [];

          // collect cards to be swapped
          for (let cardWrapper of cardsContainerRef.current.children) {
            const card = cardWrapper.firstChild;
            const cardNextIndex = parseInt(card.dataset.nextIndex);
            if (cardNextIndex > -1) {
              toSwap.push({ id: parseInt(card.dataset.id), cardNextIndex });
            }
            card.style.transform = null;
            card.style.transition = null;
            card.removeAttribute("data-next-index");
          }

          onCardDragEnd(toSwap);

          // reset cards transitions
          for (let cardWrapper of cardsContainerRef.current.children) {
            const card = cardWrapper.firstChild;

            setTimeout(() => {
              card.style.transition = TRANSITION;
            }, 0);
          }
        } else {
          draggingCardRef.current.style.transition = TRANSITION;
        }
      }

      document.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;
    };
  }, [
    cardsContainerRef,
    cardWrapperRef,
    index,
    onCardDragEnd,
    draggingCardRef,
  ]);
}
