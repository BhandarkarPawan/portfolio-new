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
      regular: "hsl(0, 0%, 100%)",
      light: "hsla(0, 0%, 100%, 0.6)",
      dark: "hsl(44, 100%, 69%)",
    },
    background: {
      blur: "hsl(214, 36%, 24%, 0.75)",
      regular: "hsl(214, 36%, 24%)",
      dark: "hsl(214, 36%, 18%)",
      light: "hsl(214, 36%, 28%)",
    },
    footer: "hsl(214, 36%, 12%)",
    secondary: "hsl(214, 36%, 70%)",
    tertiary: "hsl(214, 36%, 80%)",
    quaternary: "hsl(214, 36%, 90%)",
    quinary: "hsl(214, 36%, 98%)",
  },
};

export const DARK_COLORS = {
  "--color-primary": "hsl(44, 100%, 69%)",
  "--color-primary-hover": "hsl(44, 100%, 69%, 0.9)",
  "--color-text-regular": "hsl(0, 0%, 100%)",
  "--color-text-light": "hsla(0, 0%, 100%, 0.6)",
  "--color-text-dark": "hsl(44, 100%, 69%)",
  "--color-background-light": "hsl(214, 36%, 24%)",
  "--color-background-regular": "hsl(214, 36%, 24%)",
  "--color-background-dark": "hsl(214, 36%, 18%)",
  "--color-background-blur": "hsl(214, 36%, 24%, 0.75)",
  "--color-footer": "hsl(214, 36%, 12%)",
  "--color-secondary": "hsl(214, 36%, 70%)",
  "--color-tertiary": "hsl(214, 36%, 80%)",
  "--color-quaternary": "hsl(214, 36%, 90%)",
  "--color-quinary": "hsl(214, 36%, 98%)",
};

export const LIGHT_THEME: Theme = {
  colors: {
    primary: "hsl(202, 92%, 30%)",
    primaryHover: "hsla(202, 92%, 30%, 0.9)",
    text: {
      regular: "hsl(202, 10%, 20%)",
      light: "hsl(202, 10%, 40%)",
      dark: "hsl(202, 92%, 30%)",
    },
    background: {
      blur: "hsla(202, 20%, 95%, 0.75)",
      regular: "hsl(202, 20%, 95%)",
      dark: "hsl(202, 20%, 85%)",
      light: "hsl(202, 20%, 100%)",
    },
    footer: "hsl(202, 20%, 80%)",
    secondary: "hsl(202, 36%, 40%)",
    tertiary: "hsl(202, 36%, 50%)",
    quaternary: "hsl(202, 36%, 60%)",
    quinary: "hsl(202, 36%, 70%)",
  },
};

export const LIGHT_COLORS = {
  "--color-primary": "hsl(202, 92%, 30%)",
  "--color-primary-hover": "hsla(202, 92%, 30%, 0.9)",
  "--color-text-regular": "hsl(202, 10%, 20%)",
  "--color-text-light": "hsl(202, 10%, 40%)",
  "--color-text-dark": "hsl(202, 92%, 30%)",
  "--color-background-light": "hsl(202, 20%, 100%)",
  "--color-background-regular": "hsl(202, 20%, 95%)",
  "--color-background-dark": "hsl(202, 20%, 85%)",
  "--color-background-blur": "hsla(202, 20%, 95%, 0.75)",
  "--color-footer": "hsl(202, 20%, 80%)",
  "--color-secondary": "hsl(202, 36%, 40%)",
  "--color-tertiary": "hsl(202, 36%, 50%)",
  "--color-quaternary": "hsl(202, 36%, 60%)",
  "--color-quinary": "hsl(202, 36%, 70%)",
};

export default Theme;
