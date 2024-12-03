import { Color } from "../utils/color";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    color: import("vue-types").VueTypeDef<Color>;
    size: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}>, {
    barElement: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    cursorElement: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    getCursorStyle: import("vue").ComputedRef<{
        left: string;
        top: number;
    }>;
    getBackgroundStyle: import("vue").ComputedRef<{
        background: string;
    }>;
    onClickSider: (event: Event) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    color: import("vue-types").VueTypeDef<Color>;
    size: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
