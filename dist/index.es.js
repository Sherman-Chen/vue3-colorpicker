var je = Object.defineProperty;
var Ue = (e, t, o) => t in e ? je(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var V = (e, t, o) => (Ue(e, typeof t != "symbol" ? t + "" : t, o), o);
import { defineComponent as O, ref as w, reactive as Y, watch as te, computed as M, openBlock as p, createElementBlock as $, normalizeClass as T, createElementVNode as d, normalizeStyle as K, Fragment as U, renderList as oe, getCurrentInstance as Ze, nextTick as Ee, createCommentVNode as S, toDisplayString as ce, resolveComponent as B, createBlock as L, createVNode as j, onMounted as Je, inject as Te, withDirectives as Ne, vShow as Oe, withModifiers as Qe, createTextVNode as xe, renderSlot as et, provide as tt, withCtx as Ae, resolveDynamicComponent as Re, mergeProps as Le, Teleport as ot } from "vue";
import { tryOnMounted as ae, whenever as E, useEyeDropper as nt, useDebounceFn as J, useLocalStorage as ye, useEventListener as Ve, onClickOutside as at } from "@vueuse/core";
import P from "tinycolor2";
import { stringify as rt, parse as lt } from "gradient-parser";
import { createPopper as st } from "@popperjs/core";
import v from "vue-types";
import { DOMUtils as de } from "@aesoper/normal-utils";
import { merge as ge } from "lodash-es";
import it from "color-scales";
const H = (e) => Math.round(e * 100) / 100;
class D {
  constructor(t) {
    V(this, "instance");
    V(this, "alphaValue", 0);
    // RGB
    V(this, "redValue", 0);
    V(this, "greenValue", 0);
    V(this, "blueValue", 0);
    // HSV
    V(this, "hueValue", 0);
    V(this, "saturationValue", 0);
    V(this, "brightnessValue", 0);
    // HSL
    V(this, "hslSaturationValue", 0);
    V(this, "lightnessValue", 0);
    V(this, "pst", 0);
    V(this, "initAlpha", () => {
      const t = this.instance.getAlpha();
      this.alphaValue = Math.min(1, t) * 100;
    });
    V(this, "initLightness", () => {
      const { s: t, l: o } = this.instance.toHsl();
      this.hslSaturationValue = H(t), this.lightnessValue = H(o);
    });
    V(this, "initRgb", () => {
      const { r: t, g: o, b: n } = this.instance.toRgb();
      this.redValue = H(t), this.greenValue = H(o), this.blueValue = H(n);
    });
    V(this, "initHsb", () => {
      const { h: t, s: o, v: n } = this.instance.toHsv();
      this.hueValue = Math.min(360, Math.ceil(t)), this.saturationValue = H(o), this.brightnessValue = H(n);
    });
    V(this, "toHexString", () => this.instance.toHexString());
    V(this, "toRgbString", () => this.instance.toRgbString());
    this.instance = P(t), this.initRgb(), this.initHsb(), this.initLightness(), this.initAlpha();
  }
  toString(t) {
    return this.instance.toString(t);
  }
  get hex() {
    return this.instance.toHex();
  }
  set hex(t) {
    this.instance = P(t), this.initHsb(), this.initRgb(), this.initAlpha(), this.initLightness();
  }
  // 色调
  set hue(t) {
    this.saturation === 0 && this.brightness === 0 && (this.saturationValue = 1, this.brightnessValue = 1), this.instance = P({
      h: H(t),
      s: this.saturation,
      v: this.brightness,
      a: this.alphaValue / 100
    }), this.initRgb(), this.initLightness(), this.hueValue = H(t);
  }
  get hue() {
    return this.hueValue;
  }
  // 饱和度
  set saturation(t) {
    this.instance = P({
      h: this.hue,
      s: H(t),
      v: this.brightness,
      a: this.alphaValue / 100
    }), this.initRgb(), this.initLightness(), this.saturationValue = H(t);
  }
  get saturation() {
    return this.saturationValue;
  }
  // 明度
  set brightness(t) {
    this.instance = P({
      h: this.hue,
      s: this.saturation,
      v: H(t),
      a: this.alphaValue / 100
    }), this.initRgb(), this.initLightness(), this.brightnessValue = H(t);
  }
  get brightness() {
    return this.brightnessValue;
  }
  // 亮度
  set lightness(t) {
    this.instance = P({
      h: this.hue,
      s: this.hslSaturationValue,
      l: H(t),
      a: this.alphaValue / 100
    }), this.initRgb(), this.initHsb(), this.lightnessValue = H(t);
  }
  get lightness() {
    return this.lightnessValue;
  }
  // red
  set red(t) {
    const o = this.instance.toRgb();
    this.instance = P({
      ...o,
      r: H(t),
      a: this.alphaValue / 100
    }), this.initHsb(), this.initLightness(), this.redValue = H(t);
  }
  get red() {
    return this.redValue;
  }
  // green
  set green(t) {
    const o = this.instance.toRgb();
    this.instance = P({
      ...o,
      g: H(t),
      a: this.alphaValue / 100
    }), this.initHsb(), this.initLightness(), this.greenValue = H(t);
  }
  get green() {
    return this.greenValue;
  }
  // blue
  set blue(t) {
    const o = this.instance.toRgb();
    this.instance = P({
      ...o,
      b: H(t),
      a: this.alphaValue / 100
    }), this.initHsb(), this.initLightness(), this.blueValue = H(t);
  }
  get blue() {
    return this.blueValue;
  }
  // alpha
  set alpha(t) {
    this.instance.setAlpha(t / 100), this.alphaValue = t;
  }
  get alpha() {
    return this.alphaValue;
  }
  get RGB() {
    return [this.red, this.green, this.blue, this.alpha / 100];
  }
  get HSB() {
    return [this.hue, this.saturation, this.brightness, this.alpha / 100];
  }
  get HSL() {
    return [this.hue, this.hslSaturationValue, this.lightness, this.alpha / 100];
  }
}
function De(e, t, o, n) {
  return `rgba(${[e, t, o, n / 100].join(",")})`;
}
const Ce = (e, t, o) => t < o ? e < t ? t : e > o ? o : e : e < o ? o : e > t ? t : e, me = "color-history", _e = 8, ct = O({
  name: "Alpha",
  props: {
    color: v.instanceOf(D),
    size: v.oneOf(["small", "default"]).def("default")
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = w(null), n = w(null);
    let a = e.color || new D();
    const r = Y({
      red: a.red,
      green: a.green,
      blue: a.blue,
      alpha: a.alpha
    });
    te(
      () => e.color,
      (i) => {
        i && (a = i, ge(r, {
          red: i.red,
          green: i.green,
          blue: i.blue,
          alpha: i.alpha
        }));
      },
      { deep: !0 }
    );
    const c = M(() => {
      const i = De(r.red, r.green, r.blue, 0), y = De(r.red, r.green, r.blue, 100);
      return {
        background: `linear-gradient(to right, ${i} , ${y})`
      };
    }), s = () => {
      if (o.value && n.value) {
        const i = r.alpha / 100, y = o.value.getBoundingClientRect(), k = n.value.offsetWidth;
        return Math.round(i * (y.width - k) + k / 2);
      }
      return 0;
    }, h = M(() => ({
      left: s() + "px",
      top: 0
    })), _ = (i) => {
      i.target !== o.value && u(i);
    }, u = (i) => {
      if (i.stopPropagation(), o.value && n.value) {
        const y = o.value.getBoundingClientRect(), k = n.value.offsetWidth;
        let g = i.clientX - y.left;
        g = Math.max(k / 2, g), g = Math.min(g, y.width - k / 2);
        const l = Math.round((g - k / 2) / (y.width - k) * 100);
        a.alpha = l, r.alpha = l, t("change", l);
      }
    };
    return ae(() => {
      const i = {
        drag: (y) => {
          u(y);
        },
        end: (y) => {
          u(y);
        }
      };
      o.value && n.value && de.triggerDragEvent(o.value, i);
    }), { barElement: o, cursorElement: n, getCursorStyle: h, getBackgroundStyle: c, onClickSider: _ };
  }
});
const X = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, a] of t)
    o[n] = a;
  return o;
};
function ut(e, t, o, n, a, r) {
  return p(), $("div", {
    class: T(["vc-alpha-slider", "transparent", { "small-slider": e.size === "small" }])
  }, [
    d("div", {
      ref: "barElement",
      class: "vc-alpha-slider__bar",
      style: K(e.getBackgroundStyle),
      onClick: t[0] || (t[0] = (...c) => e.onClickSider && e.onClickSider(...c))
    }, [
      d("div", {
        class: T(["vc-alpha-slider__bar-pointer", { "small-bar": e.size === "small" }]),
        ref: "cursorElement",
        style: K(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-alpha-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 4)
  ], 2);
}
const ke = /* @__PURE__ */ X(ct, [["render", ut], ["__scopeId", "data-v-bcb416bc"]]), dt = [
  // 第一行
  [
    "#fcc02e",
    "#f67c01",
    "#e64a19",
    "#d81b43",
    "#8e24aa",
    "#512da7",
    "#1f87e8",
    "#008781",
    "#05a045"
  ],
  // 第二行
  [
    "#fed835",
    "#fb8c00",
    "#f5511e",
    "#eb1d4e",
    "#9c28b1",
    "#5d35b0",
    "#2097f3",
    "#029688",
    "#4cb050"
  ],
  // 第三行
  [
    "#ffeb3c",
    "#ffa727",
    "#fe5722",
    "#eb4165",
    "#aa47bc",
    "#673bb7",
    "#42a5f6",
    "#26a59a",
    "#83c683"
  ],
  // 第四行
  [
    "#fff176",
    "#ffb74e",
    "#ff8a66",
    "#f1627e",
    "#b968c7",
    "#7986cc",
    "#64b5f6",
    "#80cbc4",
    "#a5d6a7"
  ],
  // 第五行
  [
    "#fff59c",
    "#ffcc80",
    "#ffab91",
    "#fb879e",
    "#cf93d9",
    "#9ea8db",
    "#90caf8",
    "#b2dfdc",
    "#c8e6ca"
  ],
  // 最后一行
  [
    "transparent",
    "#ffffff",
    "#dedede",
    "#a9a9a9",
    "#4b4b4b",
    "#353535",
    "#212121",
    "#000000",
    "advance"
  ]
], gt = O({
  name: "Palette",
  props: {
    defaultColors: {
      type: Array,
      default: () => dt
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = (a) => a === "advance" || a === "transparent" ? {} : {
      background: P(a).toRgbString()
    }, n = (a) => {
      t("change", a);
    };
    return {
      palettes: e.defaultColors,
      computedBgStyle: o,
      onColorChange: n
    };
  }
});
const ht = { class: "vc-compact" }, pt = ["onClick"];
function ft(e, t, o, n, a, r) {
  return p(), $("div", ht, [
    (p(!0), $(U, null, oe(e.palettes, (c, s) => (p(), $("div", {
      key: s,
      class: "vc-compact__row"
    }, [
      (p(!0), $(U, null, oe(c, (h, _) => (p(), $("div", {
        key: _,
        class: "vc-compact__color-cube--wrap",
        onClick: (u) => e.onColorChange(h)
      }, [
        d("div", {
          class: T([
            "vc-compact__color_cube",
            {
              advance: h === "advance",
              transparent: h === "transparent"
            }
          ]),
          style: K(e.computedBgStyle(h))
        }, null, 6)
      ], 8, pt))), 128))
    ]))), 128))
  ]);
}
const ze = /* @__PURE__ */ X(gt, [["render", ft], ["__scopeId", "data-v-40b33f10"]]), vt = O({
  name: "Board",
  props: {
    color: v.instanceOf(D),
    round: v.bool.def(!1),
    hide: v.bool.def(!0)
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    var g, l, C;
    const o = Ze(), n = {
      h: ((g = e.color) == null ? void 0 : g.hue) || 0,
      s: 1,
      v: 1
    }, a = new D(n).toHexString(), r = Y({
      hueColor: a,
      saturation: ((l = e.color) == null ? void 0 : l.saturation) || 0,
      brightness: ((C = e.color) == null ? void 0 : C.brightness) || 0
    }), c = w(0), s = w(0), h = w(), _ = w(), u = M(() => ({
      top: c.value + "px",
      left: s.value + "px"
    })), i = () => {
      if (o) {
        const f = o.vnode.el;
        s.value = r.saturation * (f == null ? void 0 : f.clientWidth), c.value = (1 - r.brightness) * (f == null ? void 0 : f.clientHeight);
      }
    }, y = (f) => {
      f.target !== _.value && k(f);
    }, k = (f) => {
      if (o) {
        const N = o.vnode.el, z = N == null ? void 0 : N.getBoundingClientRect();
        let W = f.clientX - z.left, F = f.clientY - z.top;
        W = Ce(W, 0, z.width), F = Ce(F, 0, z.height);
        const Q = W / z.width, m = Ce(-(F / z.height) + 1, 0, 1);
        s.value = W, c.value = F, r.saturation = Q, r.brightness = m, t("change", Q, m);
      }
    };
    return ae(() => {
      o && o.vnode.el && h.value && (de.triggerDragEvent(h.value, {
        drag: (f) => {
          k(f);
        },
        end: (f) => {
          k(f);
        }
      }), Ee(() => {
        i();
      }));
    }), E(
      () => e.color,
      (f) => {
        ge(r, {
          hueColor: new D({ h: f.hue, s: 1, v: 1 }).toHexString(),
          saturation: f.saturation,
          brightness: f.brightness
        }), i();
      },
      { deep: !0 }
    ), { state: r, cursorElement: h, getCursorStyle: u, onClickBoard: y };
  }
});
function Ct(e, t, o, n, a, r) {
  return p(), $("div", {
    ref: "boardElement",
    class: T(["vc-saturation", { "vc-saturation__chrome": e.round, "vc-saturation__hidden": e.hide }]),
    style: K({ backgroundColor: e.state.hueColor }),
    onClick: t[0] || (t[0] = (...c) => e.onClickBoard && e.onClickBoard(...c))
  }, [
    t[2] || (t[2] = d("div", { class: "vc-saturation__white" }, null, -1)),
    t[3] || (t[3] = d("div", { class: "vc-saturation__black" }, null, -1)),
    d("div", {
      class: "vc-saturation__cursor",
      ref: "cursorElement",
      style: K(e.getCursorStyle)
    }, t[1] || (t[1] = [
      d("div", null, null, -1)
    ]), 4)
  ], 6);
}
const $e = /* @__PURE__ */ X(vt, [["render", Ct], ["__scopeId", "data-v-dc8c7a9d"]]), bt = O({
  name: "Hue",
  props: {
    color: v.instanceOf(D),
    size: v.oneOf(["small", "default"]).def("default")
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = w(null), n = w(null);
    let a = e.color || new D();
    const r = Y({
      hue: a.hue || 0
    });
    te(
      () => e.color,
      (u) => {
        u && (a = u, ge(r, { hue: a.hue }));
      },
      { deep: !0 }
    );
    const c = () => {
      if (o.value && n.value) {
        const u = o.value.getBoundingClientRect(), i = n.value.offsetWidth;
        return r.hue === 360 ? u.width - i / 2 : r.hue % 360 * (u.width - i) / 360 + i / 2;
      }
      return 0;
    }, s = M(() => ({
      left: c() + "px",
      top: 0
    })), h = (u) => {
      u.target !== o.value && _(u);
    }, _ = (u) => {
      if (u.stopPropagation(), o.value && n.value) {
        const i = o.value.getBoundingClientRect(), y = n.value.offsetWidth;
        let k = u.clientX - i.left;
        k = Math.min(k, i.width - y / 2), k = Math.max(y / 2, k);
        const g = Math.round((k - y / 2) / (i.width - y) * 360);
        a.hue = g, r.hue = g, t("change", g);
      }
    };
    return ae(() => {
      const u = {
        drag: (i) => {
          _(i);
        },
        end: (i) => {
          _(i);
        }
      };
      o.value && n.value && de.triggerDragEvent(o.value, u);
    }), { barElement: o, cursorElement: n, getCursorStyle: s, onClickSider: h };
  }
});
function yt(e, t, o, n, a, r) {
  return p(), $("div", {
    class: T(["vc-hue-slider", { "small-slider": e.size === "small" }])
  }, [
    d("div", {
      ref: "barElement",
      class: "vc-hue-slider__bar",
      onClick: t[0] || (t[0] = (...c) => e.onClickSider && e.onClickSider(...c))
    }, [
      d("div", {
        class: T(["vc-hue-slider__bar-pointer", { "small-bar": e.size === "small" }]),
        ref: "cursorElement",
        style: K(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-hue-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 512)
  ], 2);
}
const Se = /* @__PURE__ */ X(bt, [["render", yt], ["__scopeId", "data-v-f557cbeb"]]), mt = O({
  name: "Lightness",
  props: {
    color: v.instanceOf(D),
    size: v.oneOf(["small", "default"]).def("default")
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = w(null), n = w(null);
    let a = e.color || new D();
    const [r, c, s] = a.HSL, h = Y({
      hue: r,
      saturation: c,
      lightness: s
    });
    te(
      () => e.color,
      (g) => {
        if (g) {
          a = g;
          const [l, C, f] = a.HSL;
          ge(h, {
            hue: l,
            saturation: C,
            lightness: f
          });
        }
      },
      { deep: !0 }
    );
    const _ = M(() => {
      const g = P({
        h: h.hue,
        s: h.saturation,
        l: 0.8
      }).toPercentageRgbString(), l = P({
        h: h.hue,
        s: h.saturation,
        l: 0.6
      }).toPercentageRgbString(), C = P({
        h: h.hue,
        s: h.saturation,
        l: 0.4
      }).toPercentageRgbString(), f = P({
        h: h.hue,
        s: h.saturation,
        l: 0.2
      }).toPercentageRgbString();
      return {
        background: [
          `linear-gradient(to right, rgb(255, 255, 255), ${g}, ${l}, ${C}, ${f}, rgb(0, 0, 0))`,
          `-webkit-linear-gradient(left, rgb(255, 255, 255), ${g}, ${l}, ${C}, ${f}, rgb(0, 0, 0))`,
          `-moz-linear-gradient(left, rgb(255, 255, 255), ${g}, ${l}, ${C}, ${f}, rgb(0, 0, 0))`,
          `-ms-linear-gradient(left, rgb(255, 255, 255), ${g}, ${l}, ${C}, ${f}, rgb(0, 0, 0))`
        ]
      };
    }), u = () => {
      if (o.value && n.value) {
        const g = h.lightness, l = o.value.getBoundingClientRect(), C = n.value.offsetWidth;
        return (1 - g) * (l.width - C) + C / 2;
      }
      return 0;
    }, i = M(() => ({
      left: u() + "px",
      top: 0
    })), y = (g) => {
      g.target !== o.value && k(g);
    }, k = (g) => {
      if (g.stopPropagation(), o.value && n.value) {
        const l = o.value.getBoundingClientRect(), C = n.value.offsetWidth;
        let f = g.clientX - l.left;
        f = Math.max(C / 2, f), f = Math.min(f, l.width - C / 2);
        const N = 1 - (f - C / 2) / (l.width - C);
        a.lightness = N, t("change", N);
      }
    };
    return ae(() => {
      const g = {
        drag: (l) => {
          k(l);
        },
        end: (l) => {
          k(l);
        }
      };
      o.value && n.value && de.triggerDragEvent(o.value, g);
    }), { barElement: o, cursorElement: n, getCursorStyle: i, getBackgroundStyle: _, onClickSider: y };
  }
});
function _t(e, t, o, n, a, r) {
  return p(), $("div", {
    class: T(["vc-lightness-slider", { "small-slider": e.size === "small" }])
  }, [
    d("div", {
      ref: "barElement",
      class: "vc-lightness-slider__bar",
      style: K(e.getBackgroundStyle),
      onClick: t[0] || (t[0] = (...c) => e.onClickSider && e.onClickSider(...c))
    }, [
      d("div", {
        class: T(["vc-lightness-slider__bar-pointer", { "small-bar": e.size === "small" }]),
        ref: "cursorElement",
        style: K(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-lightness-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 4)
  ], 2);
}
const We = /* @__PURE__ */ X(mt, [["render", _t], ["__scopeId", "data-v-9836acab"]]), kt = O({
  name: "History",
  props: {
    colors: v.arrayOf(String).def(() => []),
    round: v.bool.def(!1)
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    return { onColorSelect: (n) => {
      t("change", n);
    } };
  }
});
const $t = {
  key: 0,
  class: "vc-colorPicker__record"
}, St = { class: "color-list" }, wt = ["onClick"];
function Pt(e, t, o, n, a, r) {
  return e.colors && e.colors.length > 0 ? (p(), $("div", $t, [
    d("div", St, [
      (p(!0), $(U, null, oe(e.colors, (c, s) => (p(), $("div", {
        key: s,
        class: T(["color-item", "transparent", { "color-item__round": e.round }]),
        onClick: (h) => e.onColorSelect(c)
      }, [
        d("div", {
          class: "color-item__display",
          style: K({ backgroundColor: c })
        }, null, 4)
      ], 10, wt))), 128))
    ])
  ])) : S("", !0);
}
const we = /* @__PURE__ */ X(kt, [["render", Pt], ["__scopeId", "data-v-9369baf5"]]), Ht = O({
  name: "Display",
  props: {
    color: v.instanceOf(D),
    disableAlpha: v.bool.def(!1)
  },
  emits: ["update:color", "change"],
  setup(e, { emit: t }) {
    var i, y, k, g;
    const o = w("hex"), n = Y({
      color: e.color,
      hex: (i = e.color) == null ? void 0 : i.hex,
      alpha: ((y = e.color) == null ? void 0 : y.alpha) + "%",
      rgba: (k = e.color) == null ? void 0 : k.RGB,
      previewBgColor: (g = e.color) == null ? void 0 : g.toRgbString()
    }), { isSupported: a, open: r, sRGBHex: c } = nt(), s = M(() => ({
      background: n.previewBgColor
    })), h = () => {
      o.value = o.value === "rgba" ? "hex" : "rgba";
    }, _ = J((l) => {
      if (!l.target.value)
        return;
      let C = parseInt(l.target.value.replace("%", ""));
      C > 100 && (l.target.value = "100%", C = 100), C < 0 && (l.target.value = "0%", C = 0), isNaN(C) && (l.target.value = "100%", C = 100), !isNaN(C) && n.color && (n.color.alpha = C), t("update:color", n.color), t("change", n.color);
    }, 300), u = J((l, C) => {
      if (l.target.value) {
        if (o.value === "hex") {
          const f = l.target.value.replace("#", "");
          P(f).isValid() && n.color && (n.color.hex = f);
        } else if (C !== void 0 && n.rgba && n.color) {
          l.target.value < 0 && (l.target.value = 0), C === 3 && l.target.value > 1 && (l.target.value = 1), C < 3 && l.target.value > 255 && (l.target.value = 255), n.rgba[C] = Number(l.target.value);
          const [f, N, z, W] = n.rgba;
          n.color.hex = P({ r: f, g: N, b: z }).toHex(), n.color.alpha = Math.floor(W * 100);
        }
        t("update:color", n.color), t("change", n.color);
      }
    }, 300);
    return E(
      () => e.color,
      (l) => {
        l && (n.color = l, n.alpha = Math.floor(n.color.alpha) + "%", n.hex = n.color.hex, n.rgba = n.color.RGB);
      },
      { deep: !0 }
    ), E(
      () => n.color,
      () => {
        n.color && (n.previewBgColor = n.color.toRgbString());
      },
      { deep: !0 }
    ), E(
      () => c.value,
      () => {
        c.value && (n.color.hex = c.value, t("update:color", n.color), t("change", n.color));
      }
    ), {
      state: n,
      getBgColorStyle: s,
      inputType: o,
      onInputTypeChange: h,
      onAlphaBlur: _,
      onInputChange: u,
      isSupported: a,
      open: r
    };
  }
});
const Bt = { class: "vc-display" }, At = {
  key: 1,
  class: "vc-current-color2 vc-transparent"
}, Rt = {
  key: 2,
  style: { display: "flex", flex: "1", gap: "4px", height: "100%" }
}, Lt = { class: "vc-color-input" }, Vt = ["value"], Dt = {
  key: 0,
  class: "vc-alpha-input"
}, Mt = ["value"], It = {
  key: 3,
  style: { display: "flex", flex: "1", gap: "4px", height: "100%" }
}, Kt = ["value", "onInput"];
function Et(e, t, o, n, a, r) {
  return p(), $("div", Bt, [
    (e.isSupported, p(), $("div", At, [
      d("div", {
        class: "color-cube",
        style: K(e.getBgColorStyle)
      }, null, 4)
    ])),
    e.inputType === "hex" ? (p(), $("div", Rt, [
      d("div", Lt, [
        d("input", {
          value: e.state.hex,
          onInput: t[1] || (t[1] = (...c) => e.onInputChange && e.onInputChange(...c))
        }, null, 40, Vt)
      ]),
      e.disableAlpha ? S("", !0) : (p(), $("div", Dt, [
        d("input", {
          class: "vc-alpha-input__inner",
          value: parseInt(e.state.alpha),
          onInput: t[2] || (t[2] = (...c) => e.onAlphaBlur && e.onAlphaBlur(...c))
        }, null, 40, Mt)
      ]))
    ])) : e.state.rgba ? (p(), $("div", It, [
      (p(!0), $(U, null, oe(e.state.rgba, (c, s) => (p(), $("div", {
        class: "vc-rgb-input",
        key: s
      }, [
        d("div", null, [
          d("input", {
            value: c.toFixed(2),
            onInput: (h) => e.onInputChange(h, s)
          }, null, 40, Kt)
        ]),
        d("div", null, ce(["R", "G", "B", "A"][s]), 1)
      ]))), 128))
    ])) : S("", !0),
    d("div", {
      class: "vc-input-toggle",
      onClick: t[3] || (t[3] = (...c) => e.onInputTypeChange && e.onInputTypeChange(...c))
    })
  ]);
}
const Pe = /* @__PURE__ */ X(Ht, [["render", Et], ["__scopeId", "data-v-c2960dc8"]]), Tt = O({
  name: "FkColorPicker",
  components: { Display: Pe, Alpha: ke, Palette: ze, Board: $e, Hue: Se, Lightness: We, History: we },
  props: {
    color: v.instanceOf(D),
    disableHistory: v.bool.def(!1),
    roundHistory: v.bool.def(!1),
    disableAlpha: v.bool.def(!1),
    defaultColors: {
      type: Array,
      default: void 0
    }
  },
  emits: ["update:color", "change", "advanceChange"],
  setup(e, { emit: t }) {
    const o = e.color || new D(), n = Y({
      color: o,
      hex: o.toHexString(),
      rgb: o.toRgbString()
    }), a = w(!1), r = M(() => ({ background: n.rgb })), c = () => {
      a.value = !1, t("advanceChange", !1);
    }, s = ye(me, [], {}), h = J(() => {
      if (e.disableHistory)
        return;
      const l = n.color.toRgbString();
      if (s.value = s.value.filter((C) => !P.equals(C, l)), !s.value.includes(l)) {
        for (; s.value.length > _e; )
          s.value.pop();
        s.value.unshift(l);
      }
    }, 500), _ = (l) => {
      l === "advance" ? (a.value = !0, t("advanceChange", !0)) : (n.color.hex = l, t("advanceChange", !1));
    }, u = (l) => {
      n.color.alpha = l;
    }, i = (l) => {
      n.color.hue = l;
    }, y = (l, C) => {
      n.color.saturation = l, n.color.brightness = C;
    }, k = (l) => {
      n.color.lightness = l;
    }, g = (l) => {
      const f = l.target.value.replace("#", "");
      P(f).isValid() && (n.color.hex = f);
    };
    return E(
      () => e.color,
      (l) => {
        l && (n.color = l);
      },
      { deep: !0 }
    ), E(
      () => n.color,
      () => {
        n.hex = n.color.hex, n.rgb = n.color.toRgbString(), h(), t("update:color", n.color), t("change", n.color);
      },
      { deep: !0 }
    ), {
      state: n,
      advancePanelShow: a,
      onBack: c,
      onCompactChange: _,
      onAlphaChange: u,
      onHueChange: i,
      onBoardChange: y,
      onLightChange: k,
      onInputChange: g,
      previewStyle: r,
      historyColors: s
    };
  }
});
const Nt = { class: "vc-fk-colorPicker" }, Ot = { class: "vc-fk-colorPicker__inner" }, zt = { class: "vc-fk-colorPicker__header" };
function Wt(e, t, o, n, a, r) {
  const c = B("Palette"), s = B("Board"), h = B("Hue"), _ = B("Lightness"), u = B("Alpha"), i = B("Display"), y = B("History");
  return p(), $("div", Nt, [
    d("div", Ot, [
      d("div", zt, [
        e.advancePanelShow ? (p(), $("span", {
          key: 0,
          style: { cursor: "pointer" },
          onClick: t[0] || (t[0] = (...k) => e.onBack && e.onBack(...k))
        }, t[1] || (t[1] = [
          d("div", { class: "back" }, null, -1)
        ]))) : S("", !0)
      ]),
      e.advancePanelShow ? S("", !0) : (p(), L(c, {
        key: 0,
        onChange: e.onCompactChange,
        "default-colors": e.defaultColors
      }, null, 8, ["onChange", "default-colors"])),
      e.advancePanelShow ? (p(), L(s, {
        key: 1,
        color: e.state.color,
        onChange: e.onBoardChange
      }, null, 8, ["color", "onChange"])) : S("", !0),
      e.advancePanelShow ? (p(), L(h, {
        key: 2,
        color: e.state.color,
        onChange: e.onHueChange
      }, null, 8, ["color", "onChange"])) : S("", !0),
      e.advancePanelShow ? S("", !0) : (p(), L(_, {
        key: 3,
        color: e.state.color,
        onChange: e.onLightChange
      }, null, 8, ["color", "onChange"])),
      e.disableAlpha ? S("", !0) : (p(), L(u, {
        key: 4,
        color: e.state.color,
        onChange: e.onAlphaChange
      }, null, 8, ["color", "onChange"])),
      j(i, {
        color: e.state.color,
        "disable-alpha": e.disableAlpha
      }, null, 8, ["color", "disable-alpha"]),
      e.disableHistory ? S("", !0) : (p(), L(y, {
        key: 5,
        round: e.roundHistory,
        colors: e.historyColors,
        onChange: e.onCompactChange
      }, null, 8, ["round", "colors", "onChange"]))
    ])
  ]);
}
const Me = /* @__PURE__ */ X(Tt, [["render", Wt], ["__scopeId", "data-v-0e3f0858"]]), Gt = O({
  name: "ChromeColorPicker",
  components: { Display: Pe, Alpha: ke, Board: $e, Hue: Se, History: we },
  props: {
    color: v.instanceOf(D),
    disableHistory: v.bool.def(!1),
    roundHistory: v.bool.def(!1),
    disableAlpha: v.bool.def(!1)
  },
  emits: ["update:color", "change"],
  setup(e, { emit: t }) {
    const o = e.color || new D(), n = Y({
      color: o,
      hex: o.toHexString(),
      rgb: o.toRgbString()
    }), a = M(() => ({ background: n.rgb })), r = ye(me, [], {}), c = J(() => {
      if (e.disableHistory)
        return;
      const i = n.color.toRgbString();
      if (r.value = r.value.filter((y) => !P.equals(y, i)), !r.value.includes(i)) {
        for (; r.value.length > _e; )
          r.value.pop();
        r.value.unshift(i);
      }
    }, 500), s = (i) => {
      n.color.alpha = i;
    }, h = (i) => {
      n.color.hue = i;
    }, _ = (i, y) => {
      n.color.saturation = i, n.color.brightness = y;
    }, u = (i) => {
      i !== "advance" && (n.color.hex = i);
    };
    return E(
      () => e.color,
      (i) => {
        i && (n.color = i);
      },
      { deep: !0 }
    ), E(
      () => n.color,
      () => {
        n.hex = n.color.hex, n.rgb = n.color.toRgbString(), c(), t("update:color", n.color), t("change", n.color);
      },
      { deep: !0 }
    ), {
      state: n,
      previewStyle: a,
      historyColors: r,
      onAlphaChange: s,
      onHueChange: h,
      onBoardChange: _,
      onCompactChange: u
    };
  }
});
const Xt = { class: "vc-chrome-colorPicker" }, Yt = { class: "vc-chrome-colorPicker-body" }, Ft = { class: "chrome-controls" }, qt = { class: "chrome-sliders" };
function jt(e, t, o, n, a, r) {
  const c = B("Board"), s = B("Hue"), h = B("Alpha"), _ = B("Display"), u = B("History");
  return p(), $("div", Xt, [
    j(c, {
      round: !0,
      hide: !1,
      color: e.state.color,
      onChange: e.onBoardChange
    }, null, 8, ["color", "onChange"]),
    d("div", Yt, [
      d("div", Ft, [
        d("div", qt, [
          j(s, {
            size: "small",
            color: e.state.color,
            onChange: e.onHueChange
          }, null, 8, ["color", "onChange"]),
          e.disableAlpha ? S("", !0) : (p(), L(h, {
            key: 0,
            size: "small",
            color: e.state.color,
            onChange: e.onAlphaChange
          }, null, 8, ["color", "onChange"]))
        ])
      ]),
      j(_, {
        color: e.state.color,
        "disable-alpha": e.disableAlpha
      }, null, 8, ["color", "disable-alpha"]),
      e.disableHistory ? S("", !0) : (p(), L(u, {
        key: 0,
        round: e.roundHistory,
        colors: e.historyColors,
        onChange: e.onCompactChange
      }, null, 8, ["round", "colors", "onChange"]))
    ])
  ]);
}
const Ie = /* @__PURE__ */ X(Gt, [["render", jt], ["__scopeId", "data-v-00ebf251"]]), He = "ColorPickersProvider", Ut = (e, t) => {
  const o = e.getBoundingClientRect(), n = o.left + o.width / 2, a = o.top + o.height / 2, r = Math.abs(n - t.clientX), c = Math.abs(a - t.clientY), s = Math.sqrt(Math.pow(r, 2) + Math.pow(c, 2)), h = c / s, _ = Math.acos(h);
  let u = Math.floor(180 / (Math.PI / _));
  return t.clientX > n && t.clientY > a && (u = 180 - u), t.clientX == n && t.clientY > a && (u = 180), t.clientX > n && t.clientY == a && (u = 90), t.clientX < n && t.clientY > a && (u = 180 + u), t.clientX < n && t.clientY == a && (u = 270), t.clientX < n && t.clientY < a && (u = 360 - u), u;
};
let be = !1;
const Zt = (e, t) => {
  const o = function(a) {
    var r;
    (r = t.drag) == null || r.call(t, a);
  }, n = function(a) {
    var r;
    document.removeEventListener("mousemove", o, !1), document.removeEventListener("mouseup", n, !1), document.onselectstart = null, document.ondragstart = null, be = !1, (r = t.end) == null || r.call(t, a);
  };
  e && e.addEventListener("mousedown", (a) => {
    var r;
    be || (document.onselectstart = () => !1, document.ondragstart = () => !1, document.addEventListener("mousemove", o, !1), document.addEventListener("mouseup", n, !1), be = !0, (r = t.start) == null || r.call(t, a));
  });
};
const Jt = {
  angle: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 16,
    validator: (e) => e >= 16
  },
  borderWidth: {
    type: Number,
    default: 1,
    validator: (e) => e >= 1
  },
  borderColor: {
    type: String,
    default: "#666"
  }
}, Qt = O({
  name: "Angle",
  props: Jt,
  emits: ["update:angle", "change"],
  setup(e, {
    emit: t
  }) {
    const o = w(null), n = w(0);
    te(() => e.angle, (s) => {
      n.value = s;
    });
    const a = () => {
      let s = Number(n.value);
      isNaN(s) || (s = s > 360 || s < 0 ? e.angle : s, n.value = s === 360 ? 0 : s, t("update:angle", n.value), t("change", n.value));
    }, r = M(() => ({
      width: e.size + "px",
      height: e.size + "px",
      borderWidth: e.borderWidth + "px",
      borderColor: e.borderColor,
      transform: `rotate(${n.value}deg)`
    })), c = (s) => {
      o.value && (n.value = Ut(o.value, s) % 360, a());
    };
    return Je(() => {
      const s = {
        drag: (h) => {
          c(h);
        },
        end: (h) => {
          c(h);
        }
      };
      o.value && Zt(o.value, s);
    }), () => j("div", {
      class: "bee-angle"
    }, [j("div", {
      class: "bee-angle__round",
      ref: o,
      style: r.value
    }, null)]);
  }
});
function ue(e) {
  let t;
  if (Array.isArray(e))
    t = [], e.forEach((o) => {
      t.push(ue(o));
    });
  else if (typeof e == "object" && e !== null) {
    t = {};
    for (const o in e)
      Object.hasOwnProperty.call(e, o) && (t[o] = ue(e[o]));
  } else
    t = e;
  return t;
}
function xt(e, t = 2) {
  const o = new RegExp(`^\\d+(?:\\.\\d{0,${t}})?`, "g");
  return e.match(o) ? e.match(o) : "";
}
const eo = O({
  name: "GradientColorPicker",
  components: {
    Angle: Qt,
    Display: Pe,
    Alpha: ke,
    Palette: ze,
    Board: $e,
    Hue: Se,
    Lightness: We,
    History: we
  },
  props: {
    angle: v.number.def(0),
    type: v.oneOf(["linear", "radial"]).def("linear"),
    disableHistory: v.bool.def(!1),
    roundHistory: v.bool.def(!1),
    disableAlpha: v.bool.def(!1),
    pickerType: v.oneOf(["fk", "chrome"]).def("fk"),
    colors: v.array.def([]),
    colorStops: v.array.def([]),
    gradientType: v.oneOf(["both", "liner", "radial"]).def("both"),
    defaultColors: {
      type: Array,
      default: void 0
    }
  },
  emits: [
    "update:startColor",
    "update:endColor",
    "update:angle",
    "gradientChange",
    "advanceChange",
    "angleChange",
    "typeChange"
  ],
  setup(e, { emit: t }) {
    const o = Y({
      angle: e.angle,
      type: e.gradientType == "both" ? e.type : e.gradientType,
      // rgba
      colors: e.colors,
      colorStops: e.colorStops,
      selectIndex: 0,
      movePst: {
        x: 0,
        y: 0
      },
      pageX: 0,
      pageY: 0,
      mouseStartPst: {
        x: 0,
        y: 0
      },
      startMovePst: 0
    });
    let n = !1;
    const a = Te(He), r = w(e.pickerType === "chrome"), c = w(), s = w(), h = w(), _ = w();
    te(
      () => [e.angle],
      (b) => {
        o.angle = b[0];
      }
    ), te(
      () => e.type,
      (b) => {
        o.type = b;
      }
    );
    const u = M({
      get: () => o.colors[o.selectIndex],
      set: (b) => {
        o.colors[o.selectIndex] = b;
      }
    }), i = M(() => {
      const b = ue(o.colors).sort((G, le) => G.pst - le.pst).map((G) => `${G.toRgbString()} ${xt(
        String(G.pst) || "",
        5
      )}%`);
      let R = `background:linear-gradient(${o.angle}deg, ${b.join(",")})`;
      return o.type === "radial" && (R = `background: radial-gradient(circle,  ${b.join(
        ","
      )})`), R;
    }), y = M(() => e.gradientType == "both" ? ["linear", "radial"] : []), k = (b) => {
      n && (o.movePst.x = b.pageX - o.mouseStartPst.x, o.movePst.y = b.pageY - o.mouseStartPst.y, o.pageX = b.pageX, o.pageY = b.pageY, g());
    }, g = () => {
      if (_.value) {
        const b = _.value.getBoundingClientRect().width;
        let R = (o.startMovePst * b / 100 + o.movePst.x) / b;
        R > 1 ? R = 1 : R < 0 && (R = 0), o.colors[o.selectIndex].pst = Math.round(R * 100), t("gradientChange", o.colors);
      }
    }, l = () => {
      n = !1, C();
    }, C = () => {
      f();
    }, f = () => {
      n = !1, o.mouseStartPst = { x: 0, y: 0 }, o.movePst.x = 0, o.movePst.y = 0;
    }, N = () => {
      Ve(document.body, "mousemove", k), Ve(document.body, "mouseup", l);
    }, z = (b) => {
      b.key === "Delete" && o.colors.length > 2 && (o.colors.splice(o.selectIndex, 1), o.selectIndex = Math.min(
        o.selectIndex,
        o.colors.length - 1
      ), t("gradientChange", o.colors));
    }, W = (b) => {
      o.selectIndex !== b && (o.selectIndex = b);
    }, F = () => {
      o.startMovePst = o.colors[o.selectIndex].pst;
    }, Q = (b, R) => {
      N();
      const G = R;
      W(b), n = !0, o.mouseStartPst.x = G.pageX, o.mouseStartPst.y = G.pageY, F();
    }, m = (b) => {
      if (_.value) {
        const R = _.value.getBoundingClientRect(), G = R.left, le = b.pageX - G, Ye = ue(o.colors).sort((ee, se) => ee.pst - se.pst).map((ee) => ee.toHexString()), Fe = new it(0, R.width, Ye).getColor(le).toHexString(), qe = 100 * le / R.width, Be = new D(Fe);
        Be.pst = qe, o.colors.push(Be), o.selectIndex = o.colors.length - 1, Ee(() => {
          var se;
          const ee = (se = c.value) == null ? void 0 : se[o.selectIndex];
          ee && ee.focus();
        }), t("gradientChange", o.colors);
      }
    }, A = (b) => {
      const R = b.target, G = parseInt(R.value.replace("°", ""));
      isNaN(G) || (o.angle = G % 360), t("update:angle", o.angle), t("angleChange", o.angle);
    }, I = (b) => {
      o.angle = b, t("update:angle", o.angle), t("angleChange", o.angle);
    }, ne = (b) => {
      b === "advance" ? (r.value = !0, t("advanceChange", !0)) : (u.value.hex = b, t("advanceChange", !1)), q();
    }, x = (b) => {
      u.value.alpha = b, q();
    }, he = (b) => {
      u.value.hue = b, q();
    }, pe = (b, R) => {
      u.value.saturation = b, u.value.brightness = R, q();
    }, fe = (b) => {
      u.value.lightness = b, q();
    }, ve = () => {
      q();
    }, q = () => {
      t("gradientChange", o.colors);
    }, re = () => {
      r.value = !1, t("advanceChange", !1);
    }, Ge = () => {
      o.type = o.type === "linear" ? "radial" : "linear", t("typeChange", o.type);
    }, Z = ye(me, [], {}), Xe = J(() => {
      if (e.disableHistory)
        return;
      const b = u.value.toRgbString();
      if (Z.value = Z.value.filter((R) => !P.equals(R, b)), !Z.value.includes(b)) {
        for (; Z.value.length > _e; )
          Z.value.pop();
        Z.value.unshift(b);
      }
    }, 100);
    return E(
      () => u.value,
      () => {
        Xe();
      },
      { deep: !0 }
    ), {
      handlePotBar: m,
      refColorBar: _,
      startGradientRef: c,
      stopGradientRef: s,
      colorRangeRef: h,
      state: o,
      currentColor: u,
      gradientBg: i,
      advancePanelShow: r,
      onDegreeBlur: A,
      onCompactChange: ne,
      onAlphaChange: x,
      onHueChange: he,
      onBoardChange: pe,
      onLightChange: fe,
      historyColors: Z,
      onBack: re,
      onDegreeChange: I,
      onDisplayChange: ve,
      onTypeChange: Ge,
      lang: a == null ? void 0 : a.lang,
      sliderPotDown: Q,
      clickGColorPot: W,
      getGradientTypes: y,
      handleKeyDown: z
    };
  }
});
const to = { class: "vc-gradient-picker" }, oo = { class: "vc-gradient-picker__header" }, no = {
  key: 0,
  class: "vc-gradient__types"
}, ao = { class: "vc-gradient-picker__body" }, ro = {
  class: "vc-color-range",
  ref: "colorRangeRef"
}, lo = {
  class: "vc-color-range__container",
  ref: "refColorBar"
}, so = { class: "vc-gradient__stop__container" }, io = ["onMousedown", "onClick"], co = { class: "vc-picker-degree-input vc-degree-input" }, uo = { class: "vc-degree-input__control" }, go = ["value"], ho = { class: "vc-degree-input__panel" }, po = { class: "vc-degree-input__disk" };
function fo(e, t, o, n, a, r) {
  const c = B("Angle"), s = B("Board"), h = B("Hue"), _ = B("Palette"), u = B("Lightness"), i = B("Alpha"), y = B("Display"), k = B("History");
  return p(), $("div", to, [
    d("div", oo, [
      d("div", null, [
        Ne(d("div", {
          class: "back",
          style: { cursor: "pointer" },
          onClick: t[0] || (t[0] = (...g) => e.onBack && e.onBack(...g))
        }, null, 512), [
          [Oe, e.pickerType === "fk" && e.advancePanelShow]
        ])
      ]),
      e.getGradientTypes.length == 2 ? (p(), $("div", no, [
        (p(!0), $(U, null, oe(e.getGradientTypes, (g) => (p(), $("div", {
          class: T(["vc-gradient__type", { active: e.state.type === g }]),
          key: g,
          onClick: t[1] || (t[1] = (...l) => e.onTypeChange && e.onTypeChange(...l))
        }, ce(e.lang ? e.lang[g] : g), 3))), 128))
      ])) : S("", !0)
    ]),
    d("div", ao, [
      d("div", ro, [
        d("div", lo, [
          d("div", {
            class: "vc-background",
            style: K(e.gradientBg),
            onClick: t[2] || (t[2] = (...g) => e.handlePotBar && e.handlePotBar(...g))
          }, null, 4),
          d("div", so, [
            (p(!0), $(U, null, oe(e.colors, (g, l) => (p(), $("div", {
              class: T(["vc-gradient__stop", {
                "vc-gradient__stop--current": l == e.state.selectIndex
              }]),
              key: l,
              ref_for: !0,
              ref: "startGradientRef",
              style: K({ left: `calc(${g.pst + "%"} - 8px)` }),
              onMousedown: (C) => e.sliderPotDown(l, C),
              onClick: (C) => e.clickGColorPot(l),
              onKeydown: t[3] || (t[3] = Qe((...C) => e.handleKeyDown && e.handleKeyDown(...C), ["stop", "prevent"])),
              tabindex: "0"
            }, t[6] || (t[6] = [
              d("span", { class: "vc-gradient__stop--inner" }, null, -1)
            ]), 46, io))), 128))
          ])
        ], 512)
      ], 512),
      d("div", co, [
        d("div", uo, [
          d("input", {
            value: e.state.angle,
            onBlur: t[4] || (t[4] = (...g) => e.onDegreeBlur && e.onDegreeBlur(...g))
          }, null, 40, go),
          t[7] || (t[7] = xe("deg "))
        ]),
        d("div", ho, [
          d("div", po, [
            j(c, {
              angle: e.state.angle,
              "onUpdate:angle": t[5] || (t[5] = (g) => e.state.angle = g),
              size: 40,
              onChange: e.onDegreeChange
            }, null, 8, ["angle", "onChange"])
          ])
        ])
      ])
    ]),
    e.advancePanelShow ? (p(), L(s, {
      key: 0,
      color: e.currentColor,
      onChange: e.onBoardChange
    }, null, 8, ["color", "onChange"])) : S("", !0),
    e.advancePanelShow ? (p(), L(h, {
      key: 1,
      color: e.currentColor,
      onChange: e.onHueChange
    }, null, 8, ["color", "onChange"])) : S("", !0),
    e.advancePanelShow ? S("", !0) : (p(), L(_, {
      key: 2,
      onChange: e.onCompactChange,
      "default-colors": e.defaultColors
    }, null, 8, ["onChange", "default-colors"])),
    e.advancePanelShow ? S("", !0) : (p(), L(u, {
      key: 3,
      color: e.currentColor,
      onChange: e.onLightChange
    }, null, 8, ["color", "onChange"])),
    e.disableAlpha ? S("", !0) : (p(), L(i, {
      key: 4,
      color: e.currentColor,
      onChange: e.onAlphaChange
    }, null, 8, ["color", "onChange"])),
    j(y, {
      color: e.currentColor,
      "disable-alpha": e.disableAlpha,
      onChange: e.onDisplayChange
    }, null, 8, ["color", "disable-alpha", "onChange"]),
    e.disableHistory ? S("", !0) : (p(), L(k, {
      key: 5,
      round: e.roundHistory,
      colors: e.historyColors,
      onChange: e.onCompactChange
    }, null, 8, ["round", "colors", "onChange"]))
  ]);
}
const Ke = /* @__PURE__ */ X(eo, [["render", fo], ["__scopeId", "data-v-54d37a39"]]), vo = O({
  name: "WrapContainer",
  props: {
    theme: v.oneOf(["white", "black"]).def("white"),
    showTab: v.bool.def(!1),
    activeKey: v.oneOf(["pure", "gradient"]).def("pure")
  },
  emits: ["update:activeKey", "change"],
  setup(e, { emit: t }) {
    const o = Y({
      activeKey: e.activeKey
    }), n = Te(He), a = (r) => {
      o.activeKey = r, t("update:activeKey", r), t("change", r);
    };
    return E(
      () => e.activeKey,
      (r) => {
        o.activeKey = r;
      }
    ), { state: o, onActiveKeyChange: a, lang: n == null ? void 0 : n.lang };
  }
});
const Co = { class: "vc-colorpicker--container" }, bo = {
  key: 0,
  class: "vc-colorpicker--tabs"
}, yo = { class: "vc-colorpicker--tabs__inner" }, mo = { class: "vc-btn__content" }, _o = { class: "vc-btn__content" };
function ko(e, t, o, n, a, r) {
  var c, s;
  return p(), $("div", {
    class: T(["vc-colorpicker", e.theme])
  }, [
    d("div", Co, [
      e.showTab ? (p(), $("div", bo, [
        d("div", yo, [
          d("div", {
            class: T([
              "vc-colorpicker--tabs__btn",
              {
                "vc-btn-active": e.state.activeKey === "pure"
              }
            ]),
            onClick: t[0] || (t[0] = (h) => e.onActiveKeyChange("pure"))
          }, [
            d("button", null, [
              d("div", mo, ce((c = e.lang) == null ? void 0 : c.pure), 1)
            ])
          ], 2),
          d("div", {
            class: T([
              "vc-colorpicker--tabs__btn",
              {
                "vc-btn-active": e.state.activeKey === "gradient"
              }
            ]),
            onClick: t[1] || (t[1] = (h) => e.onActiveKeyChange("gradient"))
          }, [
            d("button", null, [
              d("div", _o, ce((s = e.lang) == null ? void 0 : s.gradient), 1)
            ])
          ], 2),
          d("div", {
            class: "vc-colorpicker--tabs__bg",
            style: K({
              width: "50%",
              left: `calc(${e.state.activeKey === "gradient" ? 50 : 0}%)`
            })
          }, null, 4)
        ])
      ])) : S("", !0),
      et(e.$slots, "default", {}, void 0, !0)
    ])
  ], 2);
}
const $o = /* @__PURE__ */ X(vo, [["render", ko], ["__scopeId", "data-v-73cd7770"]]), So = {
  start: "Start",
  end: "End",
  pure: "Pure",
  gradient: "Gradient",
  linear: "linear",
  radial: "radial"
}, wo = {
  start: "开始",
  end: "结束",
  pure: "纯色",
  gradient: "渐变",
  linear: "线性",
  radial: "径向"
}, Po = {
  En: So,
  "ZH-cn": wo
}, Ho = {
  isWidget: v.bool.def(!1),
  pickerType: v.oneOf(["fk", "chrome"]).def("fk"),
  shape: v.oneOf(["circle", "square"]).def("square"),
  pureColor: {
    type: [String, Object],
    default: "#000000"
  },
  gradientColor: v.string.def(""),
  format: {
    type: String,
    default: "rgb"
  },
  disableAlpha: v.bool.def(!1),
  disableHistory: v.bool.def(!1),
  roundHistory: v.bool.def(!1),
  useType: v.oneOf(["pure", "gradient", "both"]).def("pure"),
  activeKey: v.oneOf(["pure", "gradient"]).def("pure"),
  lang: {
    type: String,
    default: "ZH-cn"
  },
  zIndex: v.number.def(9999),
  pickerContainer: {
    type: [String, HTMLElement],
    default: "body"
  },
  debounce: v.number.def(100),
  theme: v.oneOf(["white", "black"]).def("white"),
  gradientData: v.object.def({}),
  gradientType: v.oneOf(["both", "liner", "radial"]).def("both"),
  defaultColors: {
    type: Array,
    default: void 0
  }
}, Bo = O({
  name: "ColorPicker",
  components: {
    FkColorPicker: Me,
    ChromeColorPicker: Ie,
    GradientColorPicker: Ke,
    WrapContainer: $o
  },
  inheritAttrs: !1,
  props: Ho,
  emits: [
    "update:pureColor",
    "pureColorChange",
    "update:gradientColor",
    "gradientColorChange",
    "update:activeKey",
    "activeKeyChange",
    "update:gradientData",
    "gradientDataChange"
  ],
  setup(e, { emit: t }) {
    tt(He, {
      lang: M(() => Po[e.lang || "ZH-cn"])
    });
    const o = Y({
      pureColor: e.pureColor || "",
      activeKey: e.useType === "gradient" ? "gradient" : e.activeKey,
      //  "pure" | "gradient"
      isAdvanceMode: !1
    }), n = new D(o.pureColor), a = Y({
      colors: [],
      angle: 0,
      type: "linear",
      gradientColor: e.gradientColor
    });
    !e.gradientColor && e.gradientData && e.gradientData.gradientColor ? a.gradientColor = e.gradientData.gradientColor || "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)" : e.gradientColor || (a.gradientColor = "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)");
    const r = w(n), c = w(!1), s = w(null), h = w(null);
    let _ = null;
    const u = M(() => ({
      background: o.activeKey !== "gradient" ? P(o.pureColor).toRgbString() : a.gradientColor
    })), i = M(() => o.activeKey === "gradient" ? Ke.name : e.pickerType === "fk" ? Me.name : Ie.name), y = (m) => {
      o.isAdvanceMode = m;
    }, k = M(() => {
      const m = {
        disableAlpha: e.disableAlpha,
        disableHistory: e.disableHistory,
        roundHistory: e.roundHistory,
        pickerType: e.pickerType,
        defaultColors: e.defaultColors
      };
      return o.activeKey === "gradient" ? {
        ...m,
        angle: a.angle,
        type: a.type,
        colors: a.colors,
        gradientType: e.gradientType,
        onAngleChange: (A) => {
          a.angle = A, f();
        },
        onTypeChange: (A) => {
          a.type = A, f();
        },
        onGradientChange: (A) => {
          a.colors = A, f();
        },
        onAdvanceChange: y
      } : {
        ...m,
        disableAlpha: e.disableAlpha,
        disableHistory: e.disableHistory,
        roundHistory: e.roundHistory,
        color: r.value,
        onChange: W,
        onAdvanceChange: y
      };
    }), g = () => {
      c.value = !0, _ ? _.update() : z();
    }, l = () => {
      c.value = !1;
    }, C = () => {
      var m, A;
      try {
        const [I] = lt(a.gradientColor);
        I && I.type.includes("gradient") && I.colorStops.length >= 2 && (I.colorStops.forEach((ne, x) => {
          var re;
          const he = Number((re = ne.length) == null ? void 0 : re.value) || 0, [pe, fe, ve, q] = ne.value;
          a.colors[x] = new D({
            r: Number(pe),
            g: Number(fe),
            b: Number(ve),
            a: Number(q)
          }), a.colors[x].pst = he;
        }), I.type === "linear-gradient" && ((m = I.orientation) == null ? void 0 : m.type) === "angular" && (a.angle = Number((A = I.orientation) == null ? void 0 : A.value) || 0), a.type = I.type.split("-")[0], t("update:gradientData", I));
      } catch (I) {
        console.log(`[Parse Color]: ${I}`);
      }
    }, f = J(() => {
      const m = N();
      try {
        a.gradientColor = rt(m), t("update:gradientColor", a.gradientColor), t("gradientColorChange", a.gradientColor);
        const A = m[0];
        A.gradientColor = a.gradientColor, t("gradientDataChange", A), t("update:gradientData", A);
      } catch (A) {
        console.log(A);
      }
    }, e.debounce), N = () => {
      const m = [], A = a.colors.map((I) => ({
        type: "rgba",
        value: I.RGB.map((x) => x.toString()),
        length: { value: I.pst + "", type: "%" }
      }));
      return a.type === "linear" ? m.push({
        type: "linear-gradient",
        orientation: { type: "angular", value: a.angle + "" },
        colorStops: A
      }) : a.type === "radial" && m.push({
        type: "radial-gradient",
        orientation: [{ type: "shape", value: "circle" }],
        colorStops: A
      }), m;
    }, z = () => {
      s.value && h.value && (_ = st(s.value, h.value, {
        placement: "auto",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          },
          {
            name: "flip",
            options: {
              allowedAutoPlacements: ["top", "bottom", "left", "right"],
              rootBoundary: "viewport"
            }
          }
        ]
      }));
    }, W = (m) => {
      r.value = m, o.pureColor = m.toString(e.format), F();
    }, F = J(() => {
      t("update:pureColor", o.pureColor), t("pureColorChange", o.pureColor);
    }, e.debounce);
    at(h, () => {
      l();
    });
    const Q = (m) => {
      o.activeKey = m, t("update:activeKey", m), t("activeKeyChange", m);
    };
    return ae(() => {
      C();
    }), E(
      () => e.gradientColor,
      (m) => {
        m != a.gradientColor && (a.gradientColor = m);
      }
    ), E(
      () => a.gradientColor,
      () => {
        C();
      }
    ), E(
      () => e.activeKey,
      (m) => {
        o.activeKey = m;
      }
    ), E(
      () => e.useType,
      (m) => {
        o.activeKey !== "gradient" && m === "gradient" ? o.activeKey = "gradient" : o.activeKey = "pure";
      }
    ), E(
      () => e.pureColor,
      (m) => {
        P.equals(m, o.pureColor) || (o.pureColor = m, r.value = new D(m));
      },
      { deep: !0 }
    ), {
      colorCubeRef: s,
      pickerRef: h,
      showPicker: c,
      colorInstance: r,
      getBgColorStyle: u,
      onColorChange: W,
      onShowPicker: g,
      onActiveKeyChange: Q,
      getComponentName: i,
      getBindArgs: k,
      state: o
    };
  }
});
function Ao(e, t, o, n, a, r) {
  const c = B("WrapContainer");
  return p(), $(U, null, [
    e.isWidget ? (p(), L(c, {
      key: 0,
      "active-key": e.state.activeKey,
      "onUpdate:activeKey": t[0] || (t[0] = (s) => e.state.activeKey = s),
      "show-tab": e.useType === "both",
      onChange: e.onActiveKeyChange,
      style: K({ zIndex: e.zIndex }),
      theme: e.theme
    }, {
      default: Ae(() => [
        (p(), L(Re(e.getComponentName), Le({ key: e.getComponentName }, e.getBindArgs), null, 16))
      ]),
      _: 1
    }, 8, ["active-key", "show-tab", "onChange", "style", "theme"])) : S("", !0),
    e.isWidget ? S("", !0) : (p(), $(U, { key: 1 }, [
      d("div", {
        class: T(["vc-color-wrap transparent", { round: e.shape === "circle" }]),
        ref: "colorCubeRef"
      }, [
        d("div", {
          class: "current-color",
          style: K(e.getBgColorStyle),
          onClick: t[1] || (t[1] = (...s) => e.onShowPicker && e.onShowPicker(...s))
        }, null, 4)
      ], 2),
      (p(), L(ot, { to: e.pickerContainer }, [
        Ne(d("div", {
          ref: "pickerRef",
          style: K({ zIndex: e.zIndex })
        }, [
          e.showPicker ? (p(), L(c, {
            key: 0,
            "show-tab": e.useType === "both" && !e.state.isAdvanceMode,
            "active-key": e.state.activeKey,
            "onUpdate:activeKey": t[2] || (t[2] = (s) => e.state.activeKey = s),
            onChange: e.onActiveKeyChange,
            theme: e.theme
          }, {
            default: Ae(() => [
              (p(), L(Re(e.getComponentName), Le({ key: e.getComponentName }, e.getBindArgs), null, 16))
            ]),
            _: 1
          }, 8, ["show-tab", "active-key", "onChange", "theme"])) : S("", !0)
        ], 4), [
          [Oe, e.showPicker]
        ])
      ], 8, ["to"]))
    ], 64))
  ], 64);
}
const ie = /* @__PURE__ */ X(Bo, [["render", Ao], ["__scopeId", "data-v-559b6b17"]]), Wo = {
  install: (e) => {
    e.component(ie.name, ie), e.component("Vue3" + ie.name, ie);
  }
};
export {
  D as Color,
  ie as ColorPicker,
  Wo as default
};
