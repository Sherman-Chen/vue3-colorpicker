import { Color } from "../utils/color";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    color: import("vue-types").VueTypeDef<Color>;
    round: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    hide: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}>, {
    state: {
        hueColor: string;
        saturation: number;
        brightness: number;
    };
    cursorElement: import("vue").Ref<HTMLElement | null | undefined, HTMLElement | null | undefined>;
    getCursorStyle: import("vue").ComputedRef<{
        top: string;
        left: string;
    }>;
    onClickBoard: (event: Event) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    color: import("vue-types").VueTypeDef<Color>;
    round: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    hide: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    round: boolean;
    hide: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
