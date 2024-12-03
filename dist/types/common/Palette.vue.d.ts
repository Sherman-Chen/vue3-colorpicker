declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    defaultColors: {
        type: () => string[][];
        default: () => string[][];
    };
}>, {
    palettes: string[][];
    computedBgStyle: (color: string) => {
        background?: undefined;
    } | {
        background: string;
    };
    onColorChange: (color: string) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    defaultColors: {
        type: () => string[][];
        default: () => string[][];
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    defaultColors: string[][];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
