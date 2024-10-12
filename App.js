import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "./Card/Card";
import { AddButton } from "./AddButton";
import { disablePinchToZoom } from "./utils/disablePinchToZoom";
import { useScreenWidth } from "./hooks/useScreenWidth";
import { uniqueID } from "./utils/uniqueID";
import "./App.css";

import { Header } from "./Header/Header";
import { windowLocalStorage } from "./utils/localStorage";
import { useIsInfoPanelOpenQwark, useSelectedDateQwark } from "qwarks";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { InfoPanel } from "./InfoPanel/InfoPanel";
import { Overlay } from "Overlay";

import * as colors from "tokens/colors";

console.log("app version: 8");

function App() {
  const cardsContainerRef = useRef();

  const [, setSelectedTime] = useSelectedDateQwark();
  const [isInfoPanelOpen, setInfoPanelOpen] = useIsInfoPanelOpenQwark();
  const currentColorScheme = useCurrentColorScheme();

  const [activeCard, setActiveCard] = useState(
    windowLocalStorage.get("activeCard")
  );
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const [showingCurrentTime, setShowingCurrentTime] = useState(true);
  const [displayMode, setDisplayMode] = useState();

  const [timeFormat, setTimeFormat] = useState(
    windowLocalStorage.get("timeFormat") || 12
  );

  const [cities, setCities] = useState(
    windowLocalStorage.get("cities") || [{ id: uniqueID() }]
  );

  const { isMobile } = useScreenWidth();

  let activeCardTimeZone = {};

  if (activeCard) {
    activeCardTimeZone =
      cities.find((city) => city.id === activeCard).timeZone || {};
  }

  const { name: baseTimeZone, offset_sec: baseTimeZoneOffset } =
    activeCardTimeZone;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectedTime = useCallback((time) => setSelectedTime(time), []);

  const handleAddCity = () => {
    setCities((cities) => [
      ...cities,
      {
        id: uniqueID(),
      },
    ]);
  };

  const handleDeleteCity = useCallback(
    (idToDelete) => {
      setCities((cities) => cities.filter((city) => city.id !== idToDelete));

      if (idToDelete === activeCard) {
        setActiveCard(cities[0].id);
      }
    },
    [cities, activeCard]
  );

  const setActiveCardIfNeeded = (id) => {
    if (!activeCard) {
      setActiveCard(id);
    }
  };

  const setCityInfo = (id, newInfo) => {
    setCities((cities) => {
      return cities.map((city) => {
        if (city.id !== id) {
          return city;
        }

        return { ...city, ...newInfo };
      });
    });

    setActiveCardIfNeeded(id);
  };

  const resetCity = (id) => {
    setCities((cities) =>
      cities.map((city) => (city.id === id ? { id: city.id } : city))
    );
  };

  const onCardDragEnd = useCallback((toSwap) => {
    setCities((cities) => {
      const nextCities = [...cities];
      toSwap.forEach((swap) => {
        nextCities[swap.cardNextIndex] = cities.find(
          ({ id }) => id === swap.id
        );
      });

      return nextCities;
    });
  }, []);

  useEffect(() => {
    disablePinchToZoom();
  }, []);

  //check if it's in pwa mode
  useEffect(() => {
    const mqStandAlone = "(display-mode: standalone)";
    if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
      setDisplayMode("pwa");
    } else {
      setDisplayMode("browser");
    }
  }, []);

  useEffect(() => windowLocalStorage.set("cities", cities), [cities]);

  useEffect(
    () => windowLocalStorage.set("timeFormat", timeFormat),
    [timeFormat]
  );

  useEffect(() => {
    windowLocalStorage.set("activeCard", activeCard);
  }, [activeCard]);

  useEffect(() => {
    const cardsContainerNode = cardsContainerRef.current;

    cardsContainerNode.onscroll = () => {
      if (cardsContainerRef.current.scrollTop > 0) {
        setScrolledFromTop(true);
      } else {
        setScrolledFromTop(false);
      }
    };
    return () => (cardsContainerNode.onscroll = null);
  }, []);

  useEffect(() => {
    // Ensure navigator.serviceWorker is available before trying to access it
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("message: ", event.data);
        if (event.data === "SW updated") {
          window.location.reload();
        }
      });
    }
  }, []); // The empty array causes this effect to only run on mount

  return (
    <div
      id="app"
      className="App"
      style={{
        backgroundColor:
          currentColorScheme === "light"
            ? colors.ColorSurfaceLight100
            : colors.ColorSurfaceDark100,
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <Overlay onClose={() => setInfoPanelOpen(false)} />

      <Header
        timeFormat={timeFormat}
        toggleTimeFormat={(toggled) => setTimeFormat(toggled ? 24 : 12)}
        scrolledFromTop={scrolledFromTop}
        setShowingCurrentTime={setShowingCurrentTime}
        showingCurrentTime={showingCurrentTime}
      />

      <div
        ref={cardsContainerRef}
        style={{
          ...CardsContainerStyles,
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardMinWidth}px, 1fr))`,
          padding: isMobile ? 12 : "0 24px",
          paddingBottom: isMobile
            ? displayMode === "pwa"
              ? 120
              : 80
            : undefined,
          transform: isInfoPanelOpen && isMobile ? "translateX(-100%)" : "",
        }}
      >
        {cities.map((city, index) => (
          <Card
            id={city.id}
            key={city.id}
            index={index}
            initialFetch={index === 0}
            active={activeCard === city.id}
            setCityActive={() => setActiveCard(city.id)}
            onDelete={() => handleDeleteCity(city.id)}
            hideDelete={index === 0}
            onTimeChange={handleSelectedTime}
            baseTimeZone={baseTimeZone}
            timeFormat={timeFormat}
            cityInfo={city}
            setCityInfo={(newInfo) => setCityInfo(city.id, newInfo)}
            resetCity={() => resetCity(city.id)}
            baseTimeZoneOffset={baseTimeZoneOffset}
            showingCurrentTime={showingCurrentTime}
            setShowingCurrentTime={setShowingCurrentTime}
            isUserCity={index === 0 && !city.place_id}
            cardsContainerRef={cardsContainerRef}
            onCardDragEnd={onCardDragEnd}
          />
        ))}

        <AddButton
          style={
            isMobile
              ? {
                  ...addButtonMobileStyle,
                  bottom: displayMode === "pwa" ? 48 : 12,
                }
              : addButtonDeskTopStyle
          }
          onClick={handleAddCity}
        />
      </div>

      <InfoPanel />
    </div>
  );
}

const cardMinWidth = 300;

const CardsContainerStyles = {
  overflow: "scroll",
  display: "grid",
  gridGap: "16px",
  gridAutoRows: "min-content",
  overscrollBehavior: "contain",
  transition: "transform 0.2s ease",
};

const addButtonMobileStyle = {
  position: "fixed",
  right: 12,
  zIndex: 5,
};

const addButtonDeskTopStyle = {
  height: 240,
  width: "100%",
  justifySelf: "center",
};

export default App;
