import React, { useState, useRef, useLayoutEffect } from "react";
import uniqBy from "lodash.uniqby";
import { debounceAsync } from "utils/debounceAsync";
import { searchCities } from "utils/searchCities";
import { colors } from "colors";
import * as colorsNew from "tokens/colors";
import { SearchItem } from "./SearchItem";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { getCityTimeZone } from "utils/getCityTimeZone";
import { useScreenWidth } from "hooks/useScreenWidth";
import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import { Button } from "components/Button";

const searchCityDebounced = debounceAsync(searchCities, 300);

export function CitySearchForm({
  onSelect,
  onCancel,
  showCancel,
  setCityInfo,
}) {
  const inputRef = useRef();
  const formContainerRef = useRef();

  const currentColorScheme = useCurrentColorScheme();

  const [results, setResults] = useState([]);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");

  const { isMobile } = useScreenWidth();

  const resetForm = () => {
    setActiveResultIndex(-1);
    setResults([]);
    setInputValue("");
  };

  const fetchCities = async (value) => {
    try {
      const data = await searchCityDebounced(value);
      setResults(uniqBy(data, "osm_id"));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCityTimeZone = async (lon, lat) => {
    const data = await getCityTimeZone({
      lat,
      lon,
    });

    setCityInfo({ timeZone: data });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
    fetchCities(value);

    if (value.length === 0 && inputValue.length > 0) {
      resetForm();
    }
  };

  const handleKeyDown = (e) => {
    let nextActiveIndex = activeResultIndex;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextActiveIndex += 1;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextActiveIndex -= 1;
    }

    if (nextActiveIndex > -1 && nextActiveIndex < results.length) {
      setActiveResultIndex(nextActiveIndex);
    }

    if (e.key === "Enter" && results[activeResultIndex]) {
      handleCitySelect(results[activeResultIndex]);
    }
  };

  const handleClearIconClick = () => {
    resetForm();
    inputRef.current.focus();
  };

  const handleCitySelect = (city) => {
    onSelect(city);
    fetchCityTimeZone(city.lon, city.lat);
  };

  const scrollToFormContainer = () => {
    if (isMobile) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useLayoutEffect(() => {
    setTimeout(scrollToFormContainer, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={formContainerRef} style={boxStyle}>
      <div style={inputBoxStyle}>
        <input
          ref={inputRef}
          style={{
            ...inputStyle,
            color:
              currentColorScheme === "dark"
                ? colorsNew.ColorTextDarkL100
                : colorsNew.ColorTextLightL100,
          }}
          autoFocus
          value={inputValue}
          type="text"
          placeholder="Type city name..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={scrollToFormContainer}
        />
        {inputValue.length > 0 && (
          <CloseIcon
            fill={colors.text[150]}
            onClick={handleClearIconClick}
            style={{ marginRight: 20 }}
          />
        )}
      </div>

      <div
        style={{
          ...resultBoxStyle,
          borderTop: `1px solid ${
            currentColorScheme === "light"
              ? colorsNew.ColorDividerLightL100
              : colorsNew.ColorDividerDarkL100
          }`,
        }}
      >
        {results.map((city, index) => (
          <SearchItem
            key={city.osm_id}
            city={city}
            index={index}
            active={index === activeResultIndex}
            onClick={() => handleCitySelect(city)}
            setActive={setActiveResultIndex}
          />
        ))}
      </div>

      {showCancel && (
        <Button
          text="Cancel"
          onClick={onCancel}
          styles={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
        />
      )}
    </div>
  );
}

const boxStyle = {
  height: "100%",
  display: "grid",
  gridTemplateRows: "64px 1fr",
  position: "relative",
};

const inputStyle = {
  height: "100%",
  fontSize: 15,
  fontWeight: 500,
  padding: "0px 20px",
  flexGrow: 1,
  userSelect: "auto",
  WebkitUserSelect: "auto",
};

const resultBoxStyle = {
  overflow: "scroll",
  borderTop: `1px solid ${colors.divider[100]}`,
  overscrollBehavior: "contain",
};

const inputBoxStyle = {
  display: "flex",
  alignItems: "center",
};
