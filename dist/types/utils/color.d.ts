import { ColorInput } from "tinycolor2";
export declare type ColorFormat = "rgb" | "prgb" | "hex" | "hex6" | "hex3" | "hex4" | "hex8" | "name" | "hsl" | "hsv";
export declare class Color {
    private instance;
    private alphaValue;
    private redValue;
    private greenValue;
    private blueValue;
    private hueValue;
    private saturationValue;
    private brightnessValue;
    private hslSaturationValue;
    private lightnessValue;
    pst: number;
    constructor(input?: ColorInput);
    private initAlpha;
    private initLightness;
    private initRgb;
    private initHsb;
    toString(format?: ColorFormat): string;
    toHexString: () => string;
    toRgbString: () => string;
    get hex(): string;
    set hex(hexString: string);
    set hue(value: number);
    get hue(): number;
    set saturation(value: number);
    get saturation(): number;
    set brightness(value: number);
    get brightness(): number;
    set lightness(value: number);
    get lightness(): number;
    set red(value: number);
    get red(): number;
    set green(value: number);
    get green(): number;
    set blue(value: number);
    get blue(): number;
    set alpha(value: number);
    get alpha(): number;
    get RGB(): number[];
    get HSB(): number[];
    get HSL(): number[];
}
export declare function rgbaColor(r: number, g: number, b: number, a: number): string;
export declare const clamp: (value: number, min: number, max: number) => number;
export declare const HistoryColorKey = "color-history";
export declare const MAX_STORAGE_LENGTH = 8;