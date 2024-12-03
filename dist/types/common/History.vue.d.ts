declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    colors: import("vue-types").VueTypeDef<string[]> & {
        default: () => string[];
    };
    round: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}>, {
    onColorSelect: (v: string) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    colors: import("vue-types").VueTypeDef<string[]> & {
        default: () => string[];
    };
    round: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    round: boolean;
    colors: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
