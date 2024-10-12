import { useCurrentColorScheme } from "hooks/useCurrentColorScheme";
import {
  ColorOnsurfaceDarkL100,
  ColorOnsurfaceLightL100,
  ColorTextDarkL100,
  ColorTextDarkL150,
  ColorTextLightL100,
  ColorTextLightL250,
} from "tokens/colors";

const styles = {
  container: {
    padding: "14px 16px 16px 16px",
    borderRadius: "20px",
    boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.04)",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
  },

  title: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "left",
  },

  description: {
    marginTop: 4,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    textAlign: "left",
    color: "#63666C",
  },
};

export function InfoCard({
  title,
  description,
  rightElement,
  children,
  height,
}) {
  const currentColorScheme = useCurrentColorScheme();
  return (
    <div
      style={{
        ...styles.container,
        height,
        background:
          currentColorScheme === "dark"
            ? ColorOnsurfaceDarkL100
            : ColorOnsurfaceLightL100,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            ...styles.title,
            color:
              currentColorScheme === "dark"
                ? ColorTextDarkL100
                : ColorTextLightL100,
          }}
        >
          {title}
        </div>

        <div
          style={{
            ...styles.description,
            color:
              currentColorScheme === "light"
                ? ColorTextLightL250
                : ColorTextDarkL150,
          }}
        >
          {description}
        </div>

        <div
          style={{
            marginTop: 16,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          {children}
        </div>
      </div>

      {rightElement ? rightElement : null}
    </div>
  );
}
