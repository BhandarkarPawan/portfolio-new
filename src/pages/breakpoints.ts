export const BREAKPOINTS = { tablet: 768, desktop: 1024, largeDesktop: 1280 };

export const QUERIES = {
    tabletAndUp: `@media (min-width: ${BREAKPOINTS.tablet}px)`,
    desktopAndUp: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
    largeDesktopAndUp: `@media (min-width: ${BREAKPOINTS.largeDesktop}px)`,
};
