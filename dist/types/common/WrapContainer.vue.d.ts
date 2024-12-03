declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    theme: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    showTab: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    activeKey: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}>, {
    state: {
        activeKey: string;
    };
    onActiveKeyChange: (key: string) => void;
    lang: import("vue").ComputedRef<{
        [key: string]: string;
    }> | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:activeKey")[], "change" | "update:activeKey", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    theme: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    showTab: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    activeKey: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:activeKey"?: ((...args: any[]) => any) | undefined;
}>, {
    activeKey: string;
    theme: string;
    showTab: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
