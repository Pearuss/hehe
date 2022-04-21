module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    screens: {
      xsm: { max: "340px" },
      sm: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
    },
    fontFamily: {},
    extend: {
      colors: {
        primary: "#dd6b20",
        blueCustom: "#3F85F6",
        orangeCustom: "#dd6b20",
        blueLightCustom: "#61A6FA",
        darkBlueCustom: "#3D5170",
        logoBlue: "#516775",
      },
      keyframes: {
        jelly: {
          "0%, 100%": {
            transform: "scale(1, 1)",
          },
          "25%": {
            transform: "scale(0.9, 1.1)",
          },
          "50%": {
            transform: "scale(1.1, 0.9)",
          },
          "75%": {
            transform: "scale(0.95, 1.05)",
          },
        },
      },
    },
  },
  plugins: [],
};
