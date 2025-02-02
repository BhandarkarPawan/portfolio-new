type Theme = {
  colors: {
    primary: string;
    primaryHover: string;
    text: {
      regular: string;
      light: string;
      dark: string;
    };
    background: {
      blur: string;
      regular: string;
      dark: string;
      light: string;
    };
    footer: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
  };
};

export const DARK_THEME: Theme = {
  colors: {
    primary: "hsl(44, 100%, 69%)",
    primaryHover: "hsl(44, 100%, 69%, 0.9)",
    text: {
      regular: "hsl(0, 0%, 98%)",
      light: "hsl(0, 0%, 65%)",
      dark: "hsl(44, 100%, 69%)",
    },
    background: {
      blur: "hsl(0, 0%, 9%, 0.75)",
      regular: "hsl(0, 0%, 9%)",
      dark: "hsl(0, 0%, 7%)",
      light: "hsl(0, 0%, 11%)",
    },
    footer: "hsl(0, 0%, 5%)",
    secondary: "hsl(0, 0%, 45%)",
    tertiary: "hsl(0, 0%, 55%)",
    quaternary: "hsl(0, 0%, 65%)",
    quinary: "hsl(0, 0%, 75%)",
  },
};

export const DARK_COLORS = {
  "--color-primary": "hsl(44, 100%, 69%)",
  "--color-primary-dark": "hsl(44, 100%, 69%, 0.75)",
  "--color-primary-darker": "hsl(44, 100%, 69%, 0.65)",
  "--color-primary-hover": "hsl(44, 100%, 69%, 0.9)",
  "--color-text-regular": "hsl(0, 0%, 98%)",
  "--color-text-light": "hsl(0, 0%, 65%)",
  "--color-text-dark": "hsl(44, 100%, 69%)",
  "--color-background-light": "hsl(0, 0%, 11%)",
  "--color-background-regular": "hsl(0, 0%, 9%)",
  "--color-background-dark": "hsl(0, 0%, 7%)",
  "--color-background-blur": "hsl(0, 0%, 9%, 0.75)",
  "--color-footer": "hsl(0, 0%, 5%)",
  "--color-secondary": "hsl(0, 0%, 45%)",
  "--color-tertiary": "hsl(0, 0%, 55%)",
  "--color-quaternary": "hsl(0, 0%, 65%)",
  "--color-quinary": "hsl(0, 0%, 75%)",
};

export const LIGHT_THEME: Theme = {
  colors: {
    primary: "hsl(202, 92%, 30%)",
    primaryHover: "hsla(202, 92%, 30%, 0.9)",
    text: {
      regular: "hsl(0, 0%, 9%)",
      light: "hsl(0, 0%, 25%)",
      dark: "hsl(202, 92%, 30%)",
    },
    background: {
      blur: "hsl(0, 0%, 100%, 0.75)",
      regular: "hsl(0, 0%, 100%)",
      dark: "hsl(0, 0%, 96%)",
      light: "hsl(0, 0%, 98%)",
    },
    footer: "hsl(0, 0%, 94%)",
    secondary: "hsl(0, 0%, 45%)",
    tertiary: "hsl(0, 0%, 55%)",
    quaternary: "hsl(0, 0%, 65%)",
    quinary: "hsl(0, 0%, 75%)",
  },
};

export const LIGHT_COLORS = {
  "--color-primary": "hsl(202, 92%, 30%)",
  "--color-primary-hover": "hsla(202, 92%, 30%, 0.9)",
  "--color-primary-dark": "hsl(202, 92%, 30%, 0.75)",
  "--color-primary-darker": "hsl(202, 92%, 30%, 0.65)",
  "--color-text-regular": "hsl(0, 0%, 9%)",
  "--color-text-light": "hsl(0, 0%, 25%)",
  "--color-text-dark": "hsl(202, 92%, 30%)",
  "--color-background-light": "hsl(0, 0%, 98%)",
  "--color-background-regular": "hsl(0, 0%, 100%)",
  "--color-background-dark": "hsl(0, 0%, 96%)",
  "--color-background-blur": "hsl(0, 0%, 100%, 0.75)",
  "--color-footer": "hsl(0, 0%, 94%)",
  "--color-secondary": "hsl(0, 0%, 45%)",
  "--color-tertiary": "hsl(0, 0%, 55%)",
  "--color-quaternary": "hsl(0, 0%, 65%)",
  "--color-quinary": "hsl(0, 0%, 75%)",
};

export default Theme;
