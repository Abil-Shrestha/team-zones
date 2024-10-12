import React, { memo, useRef } from "react";

import { useIsInfoPanelOpenQwark, useOverlayOpenQwark } from "qwarks";
import { useScreenWidth } from "hooks/useScreenWidth";
// import ShortCuts from "./ShortCuts";
// import CompactMode from "./CompactMode";
// import WeMakeProduct from "./WeMakeProductOld";
import { CreatorsCard } from "./CreatorsCard";
import { Donation } from "./Donation";
// import Help from "./Help";
import { HEADER_HIGHT_MOBILE } from "constants";
import { AddToHomeScreen } from "./AddToHomeScreen";
import { SendEmail } from "./SendEmail";
import { TwoCardsContainer } from "./TwoCardsContainer";

const styles = {
  container: {
    position: "absolute",
    zIndex: 50,
    right: 0,
    transition: "transform 0.2s ease",
    width: "100%",
    maxWidth: 430,
  },

  infoPanelModal: {
    display: "flex",
    justifySelf: "end",
    flexDirection: "column",
    gap: 8,
    marginLeft: "auto",
    overflowY: "scroll",
    padding: 10,
  },

  scroll: {
    position: "relative",
    overflowY: "scroll",
    display: "block",
    scrollBehavior: "smooth",
    height: "100%",
    zIndex: 2,
  },
};

export const InfoPanel = memo(function () {
  const [isOpen, setIsOpen] = useIsInfoPanelOpenQwark();
  const [, setIsOverlayOpen] = useOverlayOpenQwark();
  const { isMobile } = useScreenWidth();
  const rootRef = useRef(null);

  return (
    <div
      id="info-panel"
      style={{
        ...styles.container,
        transform: isOpen ? "translate(0)" : "translateX(100%)",
        height: isMobile ? `calc(100% - ${HEADER_HIGHT_MOBILE}px)` : "100%",
        marginTop: isMobile ? HEADER_HIGHT_MOBILE : "",
      }}
    >
      <div
        style={{
          ...styles.scroll,
        }}
        onClick={(e) => {
          if (e.target === rootRef.current) {
            setIsOpen(false);
            setIsOverlayOpen(false);
            return null;
          }
        }}
        ref={rootRef}
      >
        <div
          style={{
            ...styles.infoPanelModal,
            maxWidth: isMobile ? "" : styles.infoPanelModal.maxWidth,
          }}
        >
          <AddToHomeScreen />
          <SendEmail />
          <Donation />
          <TwoCardsContainer>
            <CreatorsCard
              name="Mykhailo Karlov"
              position="Designer"
              webLink="https://twitter.com/karlov_works"
              linkedinLink="https://www.linkedin.com/in/mykarlov"
            />
            <CreatorsCard
              name="Dinislam Maushov"
              position="Developer"
              webLink="https://twitter.com/maushov"
              linkedinLink="https://www.linkedin.com/in/maushov"
            />
          </TwoCardsContainer>
          {/* {!isMobile && <ShortCuts />} */}
          {/* {!isMobile && <CompactMode buttonFunction={() => {}} />} */}
          {/* <Help
            firstLink={"https://choosetohelp.ge/eng"}
            secondLink={"https://helpingtoleave.org/en#donate"}
          /> */}
        </div>
      </div>
    </div>
  );
});
