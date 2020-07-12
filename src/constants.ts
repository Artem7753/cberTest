export const Breakpoint = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
}

export const mediaSizes = {
    before: {
        mobile: `@media (max-width: ${Breakpoint.MOBILE - 1}px)`,
        tablet: `@media (max-width: ${Breakpoint.TABLET - 1}px)`,
        desktop: `@media (max-width: ${Breakpoint.DESKTOP}px)`,
    },
    after: {
        mobile: `@media (min-width: ${Breakpoint.MOBILE}px)`,
        tablet: `@media (min-width: ${Breakpoint.TABLET}px)`,
        desktop: `@media (min-width: ${Breakpoint.DESKTOP + 1}px)`,
    },
};