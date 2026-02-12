export const clsx = (...classes: (string | boolean | undefined | null)[]): string => {
    return classes
        .filter((cls) => typeof cls === 'string')
        .join(' ');
};
