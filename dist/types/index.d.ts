import { Plugin } from "vue";
import ColorPicker from "./ColorPicker.vue";
import type { ColorPickerProps } from "./ColorPicker.vue";
declare const ColorPickers: Plugin;
export { Color } from "./utils/color";
export type { ColorFormat } from "./utils/color";
export { ColorPicker, type ColorPickerProps };
export default ColorPickers;
