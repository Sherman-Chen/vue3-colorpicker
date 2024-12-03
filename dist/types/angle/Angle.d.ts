declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    angle: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    borderWidth: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:angle")[], "change" | "update:angle", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    angle: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    borderWidth: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:angle"?: ((...args: any[]) => any) | undefined;
}>, {
    size: number;
    angle: number;
    borderWidth: number;
    borderColor: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
