import React, { useCallback, useEffect, useRef, useState } from "react";

import * as colors from "tokens/colors";
import { GEO_POSITION_NOT_AVAILABLE_ERROR, TRANSITION } from "constants";
import { CitySearchForm } from "./CitySearchForm/CitySearchForm";
import { CityCard } from "./CityCard/CityCard";
import { getUserCityInfo } from "../utils/getUserCityInfo";
import { getCityTimeZone } from "../utils/getCityTimeZone";
import { useCardDrag } from "./hooks/useCardDrag";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";

export function Card({
  id,
  active,
  index,
  setCityActive,
  onDelete,
  hideDelete,
  onTimeChange,
  timeFormat,
  cityInfo,
  setCityInfo,
  baseTimeZone,
  baseTimeZoneOffset,
  showingCurrentTime,
  setShowingCurrentTime,
  isUserCity,
  cardsContainerRef,
  onCardDragEnd,
}) {
  const cardRef = useRef();
  const cardWrapperRef = useRef();

  const currentColorScheme = useCurrentColorScheme();

  const [showForm, setShowForm] = useState(!isUserCity && !cityInfo.place_id);

  const handleCitySelect = (city) => {
    setCityInfo(city);
    setShowForm(false);
    setCityInfo({ timeZone: undefined });
  };

  const handleEdit = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleCancel = () => {
    if (cityInfo.place_id) {
      setShowForm(false);
    } else {
      onDelete();
    }
  };

  useEffect(() => {
    async function fetchUserCity() {
      try {
        const city = await getUserCityInfo();
        setCityInfo(city);
        setShowForm(false);

        const timeZone = await getCityTimeZone({
          lon: city.lon,
          lat: city.lat,
        });
        setCityInfo({ timeZone });
      } catch (error) {
        if (error.message === GEO_POSITION_NOT_AVAILABLE_ERROR) {
          setShowForm(true);
        }
      }
    }

    if (isUserCity) {
      fetchUserCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useCardDrag({
    cardRef,
    cardWrapperRef,
    cardsContainerRef,
    index,
    onCardDragEnd,
  });

  const getCardBackgroundColor = () => {
    if (showForm) {
      return currentColorScheme === "dark"
        ? colors.ColorOnsurfaceDarkL100
        : colors.ColorOnsurfaceLightL100;
    }
    if (currentColorScheme === "dark") {
      return active && !showForm
        ? colors.ColorAccentOrange100
        : colors.ColorOnsurfaceDarkL100;
    } else if (currentColorScheme === "light") {
      return active && !showForm
        ? colors.ColorOnsurfaceLightD100
        : colors.ColorOnsurfaceLightL100;
    }
  };

  return (
    <div ref={cardWrapperRef} data-index={index}>
      <div
        style={{
          ...style,
          backgroundColor: getCardBackgroundColor(),
        }}
        ref={cardRef}
        onDragStart={() => false}
        data-id={id}
      >
        {showForm ? (
          <CitySearchForm
            onSelect={handleCitySelect}
            onCancel={handleCancel}
            showCancel={!(index === 0 && cityInfo.place_id === undefined)}
            setCityInfo={setCityInfo}
          />
        ) : (
          <CityCard
            active={active}
            onDelete={onDelete}
            onEdit={handleEdit}
            hideDelete={hideDelete}
            onTimeChange={onTimeChange}
            setCityActive={setCityActive}
            cityInfo={cityInfo}
            cardRef={cardRef}
            timeFormat={timeFormat}
            baseTimeZone={baseTimeZone}
            baseTimeZoneOffset={baseTimeZoneOffset}
            showingCurrentTime={showingCurrentTime}
            setShowingCurrentTime={setShowingCurrentTime}
          />
        )}
      </div>
    </div>
  );
}

const style = {
  boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.04)",
  borderRadius: "24px",
  transition: TRANSITION,
  overflow: "hidden",
  height: 240,
  width: "100%",
  justifySelf: "center",
  zIndex: 5,
};
