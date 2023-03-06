import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            text: {
                regular: string;
                light: string;
                dark: string;
            };
            background: {
                regular: string;
                dark: string;
                light: string;
            };
        };
    }
}
