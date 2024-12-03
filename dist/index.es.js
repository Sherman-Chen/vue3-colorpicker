var qe = Object.defineProperty;
var je = (e, t, o) => t in e ? qe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var V = (e, t, o) => (je(e, typeof t != "symbol" ? t + "" : t, o), o);
import { defineComponent as O, ref as w, reactive as Y, watch as ee, computed as M, openBlock as p, createElementBlock as $, normalizeClass as T, createElementVNode as d, normalizeStyle as I, Fragment as U, renderList as te, getCurrentInstance as Ue, nextTick as Ze, createCommentVNode as S, toDisplayString as se, resolveComponent as B, createBlock as L, createVNode as j, onMounted as Je, inject as Ee, withDirectives as Ke, vShow as Te, createTextVNode as Qe, renderSlot as xe, provide as et, withCtx as Ae, resolveDynamicComponent as Re, mergeProps as Le, Teleport as tt } from "vue";
import { tryOnMounted as ne, whenever as K, useEyeDropper as ot, useDebounceFn as J, useLocalStorage as ye, useEventListener as ve, onClickOutside as nt } from "@vueuse/core";
import P from "tinycolor2";
import { stringify as at, parse as rt } from "gradient-parser";
import { createPopper as lt } from "@popperjs/core";
import v from "vue-types";
import { DOMUtils as ce } from "@aesoper/normal-utils";
import { merge as ue } from "lodash-es";
import st from "color-scales";
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
function Ve(e, t, o, n) {
  return `rgba(${[e, t, o, n / 100].join(",")})`;
}
const Ce = (e, t, o) => t < o ? e < t ? t : e > o ? o : e : e < o ? o : e > t ? t : e, me = "color-history", _e = 8, it = O({
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
    ee(
      () => e.color,
      (i) => {
        i && (a = i, ue(r, {
          red: i.red,
          green: i.green,
          blue: i.blue,
          alpha: i.alpha
        }));
      },
      { deep: !0 }
    );
    const c = M(() => {
      const i = Ve(r.red, r.green, r.blue, 0), y = Ve(r.red, r.green, r.blue, 100);
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
    return ne(() => {
      const i = {
        drag: (y) => {
          u(y);
        },
        end: (y) => {
          u(y);
        }
      };
      o.value && n.value && ce.triggerDragEvent(o.value, i);
    }), { barElement: o, cursorElement: n, getCursorStyle: h, getBackgroundStyle: c, onClickSider: _ };
  }
});
const G = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, a] of t)
    o[n] = a;
  return o;
};
function ct(e, t, o, n, a, r) {
  return p(), $("div", {
    class: T(["vc-alpha-slider", "transparent", { "small-slider": e.size === "small" }])
  }, [
    d("div", {
      ref: "barElement",
      class: "vc-alpha-slider__bar",
      style: I(e.getBackgroundStyle),
      onClick: t[0] || (t[0] = (...c) => e.onClickSider && e.onClickSider(...c))
    }, [
      d("div", {
        class: T(["vc-alpha-slider__bar-pointer", { "small-bar": e.size === "small" }]),
        ref: "cursorElement",
        style: I(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-alpha-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 4)
  ], 2);
}
const ke = /* @__PURE__ */ G(it, [["render", ct], ["__scopeId", "data-v-bcb416bc"]]), ut = [
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
], dt = O({
  name: "Palette",
  props: {
    defaultColors: {
      type: Array,
      default: () => ut
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = (a) => a === "advance" || a === "transparent" ? {} : {
      background: P(a).toRgbString()
    }, n = (a) => {
      t("change", a);
    };
    return console.log(e.defaultColors), {
      palettes: e.defaultColors,
      computedBgStyle: o,
      onColorChange: n
    };
  }
});
const gt = { class: "vc-compact" }, ht = ["onClick"];
function pt(e, t, o, n, a, r) {
  return p(), $("div", gt, [
    (p(!0), $(U, null, te(e.palettes, (c, s) => (p(), $("div", {
      key: s,
      class: "vc-compact__row"
    }, [
      (p(!0), $(U, null, te(c, (h, _) => (p(), $("div", {
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
          style: I(e.computedBgStyle(h))
        }, null, 6)
      ], 8, ht))), 128))
    ]))), 128))
  ]);
}
const Ne = /* @__PURE__ */ G(dt, [["render", pt], ["__scopeId", "data-v-94b7a9ce"]]), ft = O({
  name: "Board",
  props: {
    color: v.instanceOf(D),
    round: v.bool.def(!1),
    hide: v.bool.def(!0)
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    var g, l, C;
    const o = Ue(), n = {
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
        const N = o.vnode.el, X = N == null ? void 0 : N.getBoundingClientRect();
        let z = f.clientX - X.left, F = f.clientY - X.top;
        z = Ce(z, 0, X.width), F = Ce(F, 0, X.height);
        const Q = z / X.width, m = Ce(-(F / X.height) + 1, 0, 1);
        s.value = z, c.value = F, r.saturation = Q, r.brightness = m, t("change", Q, m);
      }
    };
    return ne(() => {
      o && o.vnode.el && h.value && (ce.triggerDragEvent(h.value, {
        drag: (f) => {
          k(f);
        },
        end: (f) => {
          k(f);
        }
      }), Ze(() => {
        i();
      }));
    }), K(
      () => e.color,
      (f) => {
        ue(r, {
          hueColor: new D({ h: f.hue, s: 1, v: 1 }).toHexString(),
          saturation: f.saturation,
          brightness: f.brightness
        }), i();
      },
      { deep: !0 }
    ), { state: r, cursorElement: h, getCursorStyle: u, onClickBoard: y };
  }
});
function vt(e, t, o, n, a, r) {
  return p(), $("div", {
    ref: "boardElement",
    class: T(["vc-saturation", { "vc-saturation__chrome": e.round, "vc-saturation__hidden": e.hide }]),
    style: I({ backgroundColor: e.state.hueColor }),
    onClick: t[0] || (t[0] = (...c) => e.onClickBoard && e.onClickBoard(...c))
  }, [
    t[2] || (t[2] = d("div", { class: "vc-saturation__white" }, null, -1)),
    t[3] || (t[3] = d("div", { class: "vc-saturation__black" }, null, -1)),
    d("div", {
      class: "vc-saturation__cursor",
      ref: "cursorElement",
      style: I(e.getCursorStyle)
    }, t[1] || (t[1] = [
      d("div", null, null, -1)
    ]), 4)
  ], 6);
}
const $e = /* @__PURE__ */ G(ft, [["render", vt], ["__scopeId", "data-v-dc8c7a9d"]]), Ct = O({
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
    ee(
      () => e.color,
      (u) => {
        u && (a = u, ue(r, { hue: a.hue }));
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
    return ne(() => {
      const u = {
        drag: (i) => {
          _(i);
        },
        end: (i) => {
          _(i);
        }
      };
      o.value && n.value && ce.triggerDragEvent(o.value, u);
    }), { barElement: o, cursorElement: n, getCursorStyle: s, onClickSider: h };
  }
});
function bt(e, t, o, n, a, r) {
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
        style: I(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-hue-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 512)
  ], 2);
}
const Se = /* @__PURE__ */ G(Ct, [["render", bt], ["__scopeId", "data-v-f557cbeb"]]), yt = O({
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
    ee(
      () => e.color,
      (g) => {
        if (g) {
          a = g;
          const [l, C, f] = a.HSL;
          ue(h, {
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
    return ne(() => {
      const g = {
        drag: (l) => {
          k(l);
        },
        end: (l) => {
          k(l);
        }
      };
      o.value && n.value && ce.triggerDragEvent(o.value, g);
    }), { barElement: o, cursorElement: n, getCursorStyle: i, getBackgroundStyle: _, onClickSider: y };
  }
});
function mt(e, t, o, n, a, r) {
  return p(), $("div", {
    class: T(["vc-lightness-slider", { "small-slider": e.size === "small" }])
  }, [
    d("div", {
      ref: "barElement",
      class: "vc-lightness-slider__bar",
      style: I(e.getBackgroundStyle),
      onClick: t[0] || (t[0] = (...c) => e.onClickSider && e.onClickSider(...c))
    }, [
      d("div", {
        class: T(["vc-lightness-slider__bar-pointer", { "small-bar": e.size === "small" }]),
        ref: "cursorElement",
        style: I(e.getCursorStyle)
      }, t[1] || (t[1] = [
        d("div", { class: "vc-lightness-slider__bar-handle" }, null, -1)
      ]), 6)
    ], 4)
  ], 2);
}
const Oe = /* @__PURE__ */ G(yt, [["render", mt], ["__scopeId", "data-v-9836acab"]]), _t = O({
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
const kt = {
  key: 0,
  class: "vc-colorPicker__record"
}, $t = { class: "color-list" }, St = ["onClick"];
function wt(e, t, o, n, a, r) {
  return e.colors && e.colors.length > 0 ? (p(), $("div", kt, [
    d("div", $t, [
      (p(!0), $(U, null, te(e.colors, (c, s) => (p(), $("div", {
        key: s,
        class: T(["color-item", "transparent", { "color-item__round": e.round }]),
        onClick: (h) => e.onColorSelect(c)
      }, [
        d("div", {
          class: "color-item__display",
          style: I({ backgroundColor: c })
        }, null, 4)
      ], 10, St))), 128))
    ])
  ])) : S("", !0);
}
const we = /* @__PURE__ */ G(_t, [["render", wt], ["__scopeId", "data-v-9369baf5"]]), Pt = O({
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
    }), { isSupported: a, open: r, sRGBHex: c } = ot(), s = M(() => ({
      background: n.previewBgColor
    })), h = () => {
      o.value = o.value === "rgba" ? "hex" : "rgba";
    }, _ = J((l) => {
      if (!l.target.value)
        return;
      let C = parseInt(l.target.value.replace("%", ""));
      C > 100 && (l.target.value = "100%", C = 100), C < 0 && (l.target.value = "0%", C = 0), isNaN(C) && (l.target.value = "100%", C = 100), !isNaN(C) && n.color && (n.color.alpha = C), t("update:color", n.color), t("change", n.color);
    }, 300), u = J((l, C) => {
      if (console.log(l.target.value), !!l.target.value) {
        if (o.value === "hex") {
          const f = l.target.value.replace("#", "");
          P(f).isValid() && n.color && (n.color.hex = f);
        } else if (C !== void 0 && n.rgba && n.color) {
          l.target.value < 0 && (l.target.value = 0), C === 3 && l.target.value > 1 && (l.target.value = 1), C < 3 && l.target.value > 255 && (l.target.value = 255), n.rgba[C] = Number(l.target.value);
          const [f, N, X, z] = n.rgba;
          n.color.hex = P({ r: f, g: N, b: X }).toHex(), n.color.alpha = Math.floor(z * 100);
        }
        t("update:color", n.color), t("change", n.color);
      }
    }, 300);
    return K(
      () => e.color,
      (l) => {
        l && (n.color = l, n.alpha = Math.floor(n.color.alpha) + "%", n.hex = n.color.hex, n.rgba = n.color.RGB);
      },
      { deep: !0 }
    ), K(
      () => n.color,
      () => {
        n.color && (n.previewBgColor = n.color.toRgbString());
      },
      { deep: !0 }
    ), K(
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
const Ht = { class: "vc-display" }, Bt = {
  key: 1,
  class: "vc-current-color2 vc-transparent"
}, At = {
  key: 2,
  style: { display: "flex", flex: "1", gap: "4px", height: "100%" }
}, Rt = { class: "vc-color-input" }, Lt = ["value"], Vt = {
  key: 0,
  class: "vc-alpha-input"
}, Dt = ["value"], Mt = {
  key: 3,
  style: { display: "flex", flex: "1", gap: "4px", height: "100%" }
}, It = ["value", "onInput"];
function Et(e, t, o, n, a, r) {
  return p(), $("div", Ht, [
    (e.isSupported, p(), $("div", Bt, [
      d("div", {
        class: "color-cube",
        style: I(e.getBgColorStyle)
      }, null, 4)
    ])),
    e.inputType === "hex" ? (p(), $("div", At, [
      d("div", Rt, [
        d("input", {
          value: e.state.hex,
          onInput: t[1] || (t[1] = (...c) => e.onInputChange && e.onInputChange(...c))
        }, null, 40, Lt)
      ]),
      e.disableAlpha ? S("", !0) : (p(), $("div", Vt, [
        d("input", {
          class: "vc-alpha-input__inner",
          value: parseInt(e.state.alpha),
          onInput: t[2] || (t[2] = (...c) => e.onAlphaBlur && e.onAlphaBlur(...c))
        }, null, 40, Dt)
      ]))
    ])) : e.state.rgba ? (p(), $("div", Mt, [
      (p(!0), $(U, null, te(e.state.rgba, (c, s) => (p(), $("div", {
        class: "vc-rgb-input",
        key: s
      }, [
        d("div", null, [
          d("input", {
            value: c.toFixed(2),
            onInput: (h) => e.onInputChange(h, s)
          }, null, 40, It)
        ]),
        d("div", null, se(["R", "G", "B", "A"][s]), 1)
      ]))), 128))
    ])) : S("", !0),
    d("div", {
      class: "vc-input-toggle",
      onClick: t[3] || (t[3] = (...c) => e.onInputTypeChange && e.onInputTypeChange(...c))
    })
  ]);
}
const Pe = /* @__PURE__ */ G(Pt, [["render", Et], ["__scopeId", "data-v-45db4ccf"]]), Kt = O({
  name: "FkColorPicker",
  components: { Display: Pe, Alpha: ke, Palette: Ne, Board: $e, Hue: Se, Lightness: Oe, History: we },
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
    console.log(e.defaultColors);
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
    return K(
      () => e.color,
      (l) => {
        l && (n.color = l);
      },
      { deep: !0 }
    ), K(
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
const Tt = { class: "vc-fk-colorPicker" }, Nt = { class: "vc-fk-colorPicker__inner" }, Ot = { class: "vc-fk-colorPicker__header" };
function zt(e, t, o, n, a, r) {
  const c = B("Palette"), s = B("Board"), h = B("Hue"), _ = B("Lightness"), u = B("Alpha"), i = B("Display"), y = B("History");
  return p(), $("div", Tt, [
    d("div", Nt, [
      d("div", Ot, [
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
const De = /* @__PURE__ */ G(Kt, [["render", zt], ["__scopeId", "data-v-d0dd0ff1"]]), Wt = O({
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
    return K(
      () => e.color,
      (i) => {
        i && (n.color = i);
      },
      { deep: !0 }
    ), K(
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
const Gt = { class: "vc-chrome-colorPicker" }, Xt = { class: "vc-chrome-colorPicker-body" }, Yt = { class: "chrome-controls" }, Ft = { class: "chrome-sliders" };
function qt(e, t, o, n, a, r) {
  const c = B("Board"), s = B("Hue"), h = B("Alpha"), _ = B("Display"), u = B("History");
  return p(), $("div", Gt, [
    j(c, {
      round: !0,
      hide: !1,
      color: e.state.color,
      onChange: e.onBoardChange
    }, null, 8, ["color", "onChange"]),
    d("div", Xt, [
      d("div", Yt, [
        d("div", Ft, [
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
const Me = /* @__PURE__ */ G(Wt, [["render", qt], ["__scopeId", "data-v-00ebf251"]]), He = "ColorPickersProvider", jt = (e, t) => {
  const o = e.getBoundingClientRect(), n = o.left + o.width / 2, a = o.top + o.height / 2, r = Math.abs(n - t.clientX), c = Math.abs(a - t.clientY), s = Math.sqrt(Math.pow(r, 2) + Math.pow(c, 2)), h = c / s, _ = Math.acos(h);
  let u = Math.floor(180 / (Math.PI / _));
  return t.clientX > n && t.clientY > a && (u = 180 - u), t.clientX == n && t.clientY > a && (u = 180), t.clientX > n && t.clientY == a && (u = 90), t.clientX < n && t.clientY > a && (u = 180 + u), t.clientX < n && t.clientY == a && (u = 270), t.clientX < n && t.clientY < a && (u = 360 - u), u;
};
let be = !1;
const Ut = (e, t) => {
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
const Zt = {
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
}, Jt = O({
  name: "Angle",
  props: Zt,
  emits: ["update:angle", "change"],
  setup(e, {
    emit: t
  }) {
    const o = w(null), n = w(0);
    ee(() => e.angle, (s) => {
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
      o.value && (n.value = jt(o.value, s) % 360, a());
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
      o.value && Ut(o.value, s);
    }), () => j("div", {
      class: "bee-angle"
    }, [j("div", {
      class: "bee-angle__round",
      ref: o,
      style: r.value
    }, null)]);
  }
});
function ie(e) {
  let t;
  if (Array.isArray(e))
    t = [], e.forEach((o) => {
      t.push(ie(o));
    });
  else if (typeof e == "object" && e !== null) {
    t = {};
    for (const o in e)
      Object.hasOwnProperty.call(e, o) && (t[o] = ie(e[o]));
  } else
    t = e;
  return t;
}
function Qt(e, t = 2) {
  const o = new RegExp(`^\\d+(?:\\.\\d{0,${t}})?`, "g");
  return e.match(o) ? e.match(o) : "";
}
const xt = O({
  name: "GradientColorPicker",
  components: {
    Angle: Jt,
    Display: Pe,
    Alpha: ke,
    Palette: Ne,
    Board: $e,
    Hue: Se,
    Lightness: Oe,
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
    const a = Ee(He), r = w(e.pickerType === "chrome"), c = w(), s = w(), h = w(), _ = w();
    ee(
      () => [e.angle],
      (b) => {
        o.angle = b[0];
      }
    ), ee(
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
      const b = ie(o.colors).sort((W, re) => W.pst - re.pst).map((W) => `${W.toRgbString()} ${Qt(
        String(W.pst) || "",
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
      ve(document.body, "mousemove", k), ve(document.body, "mouseup", l);
    };
    ve(window, "keydown", (b) => {
      b.key === "Delete" && o.colors.length > 2 && (o.colors.splice(o.selectIndex, 1), o.selectIndex = Math.min(
        o.selectIndex,
        o.colors.length - 1
      ), t("gradientChange", o.colors));
    });
    const z = (b) => {
      o.selectIndex !== b && (o.selectIndex = b);
    }, F = () => {
      o.startMovePst = o.colors[o.selectIndex].pst;
    }, Q = (b, R) => {
      N();
      const W = R;
      z(b), n = !0, o.mouseStartPst.x = W.pageX, o.mouseStartPst.y = W.pageY, F();
    }, m = (b) => {
      if (_.value) {
        const R = _.value.getBoundingClientRect(), W = R.left, re = b.pageX - W, Ge = ie(o.colors).sort((fe, Fe) => fe.pst - Fe.pst).map((fe) => fe.toHexString()), Xe = new st(0, R.width, Ge).getColor(re).toHexString(), Ye = 100 * re / R.width, Be = new D(Xe);
        Be.pst = Ye, o.colors.push(Be), o.selectIndex = o.colors.length - 1, t("gradientChange", o.colors);
      }
    }, A = (b) => {
      const R = b.target, W = parseInt(R.value.replace("°", ""));
      isNaN(W) || (o.angle = W % 360), t("update:angle", o.angle), t("angleChange", o.angle);
    }, E = (b) => {
      o.angle = b, t("update:angle", o.angle), t("angleChange", o.angle);
    }, oe = (b) => {
      b === "advance" ? (r.value = !0, t("advanceChange", !0)) : (u.value.hex = b, t("advanceChange", !1)), q();
    }, x = (b) => {
      u.value.alpha = b, q();
    }, de = (b) => {
      u.value.hue = b, q();
    }, ge = (b, R) => {
      u.value.saturation = b, u.value.brightness = R, q();
    }, he = (b) => {
      u.value.lightness = b, q();
    }, pe = () => {
      q();
    }, q = () => {
      t("gradientChange", o.colors);
    }, ae = () => {
      r.value = !1, t("advanceChange", !1);
    }, ze = () => {
      o.type = o.type === "linear" ? "radial" : "linear", t("typeChange", o.type);
    }, Z = ye(me, [], {}), We = J(() => {
      if (e.disableHistory)
        return;
      const b = u.value.toRgbString();
      if (Z.value = Z.value.filter((R) => !P.equals(R, b)), !Z.value.includes(b)) {
        for (; Z.value.length > _e; )
          Z.value.pop();
        Z.value.unshift(b);
      }
    }, 100);
    return K(
      () => u.value,
      () => {
        We();
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
      onCompactChange: oe,
      onAlphaChange: x,
      onHueChange: de,
      onBoardChange: ge,
      onLightChange: he,
      historyColors: Z,
      onBack: ae,
      onDegreeChange: E,
      onDisplayChange: pe,
      onTypeChange: ze,
      lang: a == null ? void 0 : a.lang,
      sliderPotDown: Q,
      clickGColorPot: z,
      getGradientTypes: y
    };
  }
});
const eo = { class: "vc-gradient-picker" }, to = { class: "vc-gradient-picker__header" }, oo = {
  key: 0,
  class: "vc-gradient__types"
}, no = { class: "vc-gradient-picker__body" }, ao = {
  class: "vc-color-range",
  ref: "colorRangeRef"
}, ro = {
  class: "vc-color-range__container",
  ref: "refColorBar"
}, lo = { class: "vc-gradient__stop__container" }, so = ["onMousedown", "onClick"], io = { class: "vc-picker-degree-input vc-degree-input" }, co = { class: "vc-degree-input__control" }, uo = ["value"], go = { class: "vc-degree-input__panel" }, ho = { class: "vc-degree-input__disk" };
function po(e, t, o, n, a, r) {
  const c = B("Angle"), s = B("Board"), h = B("Hue"), _ = B("Palette"), u = B("Lightness"), i = B("Alpha"), y = B("Display"), k = B("History");
  return p(), $("div", eo, [
    d("div", to, [
      d("div", null, [
        Ke(d("div", {
          class: "back",
          style: { cursor: "pointer" },
          onClick: t[0] || (t[0] = (...g) => e.onBack && e.onBack(...g))
        }, null, 512), [
          [Te, e.pickerType === "fk" && e.advancePanelShow]
        ])
      ]),
      e.getGradientTypes.length == 2 ? (p(), $("div", oo, [
        (p(!0), $(U, null, te(e.getGradientTypes, (g) => (p(), $("div", {
          class: T(["vc-gradient__type", { active: e.state.type === g }]),
          key: g,
          onClick: t[1] || (t[1] = (...l) => e.onTypeChange && e.onTypeChange(...l))
        }, se(e.lang ? e.lang[g] : g), 3))), 128))
      ])) : S("", !0)
    ]),
    d("div", no, [
      d("div", ao, [
        d("div", ro, [
          d("div", {
            class: "vc-background",
            style: I(e.gradientBg),
            onClick: t[2] || (t[2] = (...g) => e.handlePotBar && e.handlePotBar(...g))
          }, null, 4),
          d("div", lo, [
            (p(!0), $(U, null, te(e.colors, (g, l) => (p(), $("div", {
              class: T(["vc-gradient__stop", {
                "vc-gradient__stop--current": l == e.state.selectIndex
              }]),
              key: l,
              ref_for: !0,
              ref: "startGradientRef",
              style: I({ left: `calc(${g.pst + "%"} - 8px)` }),
              onMousedown: (C) => e.sliderPotDown(l, C),
              onClick: (C) => e.clickGColorPot(l)
            }, t[5] || (t[5] = [
              d("span", { class: "vc-gradient__stop--inner" }, null, -1)
            ]), 46, so))), 128))
          ])
        ], 512)
      ], 512),
      d("div", io, [
        d("div", co, [
          d("input", {
            value: e.state.angle,
            onBlur: t[3] || (t[3] = (...g) => e.onDegreeBlur && e.onDegreeBlur(...g))
          }, null, 40, uo),
          t[6] || (t[6] = Qe("deg "))
        ]),
        d("div", go, [
          d("div", ho, [
            j(c, {
              angle: e.state.angle,
              "onUpdate:angle": t[4] || (t[4] = (g) => e.state.angle = g),
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
const Ie = /* @__PURE__ */ G(xt, [["render", po], ["__scopeId", "data-v-8e205bb5"]]), fo = O({
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
    }), n = Ee(He), a = (r) => {
      o.activeKey = r, t("update:activeKey", r), t("change", r);
    };
    return K(
      () => e.activeKey,
      (r) => {
        o.activeKey = r;
      }
    ), { state: o, onActiveKeyChange: a, lang: n == null ? void 0 : n.lang };
  }
});
const vo = { class: "vc-colorpicker--container" }, Co = {
  key: 0,
  class: "vc-colorpicker--tabs"
}, bo = { class: "vc-colorpicker--tabs__inner" }, yo = { class: "vc-btn__content" }, mo = { class: "vc-btn__content" };
function _o(e, t, o, n, a, r) {
  var c, s;
  return p(), $("div", {
    class: T(["vc-colorpicker", e.theme])
  }, [
    d("div", vo, [
      e.showTab ? (p(), $("div", Co, [
        d("div", bo, [
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
              d("div", yo, se((c = e.lang) == null ? void 0 : c.pure), 1)
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
              d("div", mo, se((s = e.lang) == null ? void 0 : s.gradient), 1)
            ])
          ], 2),
          d("div", {
            class: "vc-colorpicker--tabs__bg",
            style: I({
              width: "50%",
              left: `calc(${e.state.activeKey === "gradient" ? 50 : 0}%)`
            })
          }, null, 4)
        ])
      ])) : S("", !0),
      xe(e.$slots, "default", {}, void 0, !0)
    ])
  ], 2);
}
const ko = /* @__PURE__ */ G(fo, [["render", _o], ["__scopeId", "data-v-73cd7770"]]), $o = {
  start: "Start",
  end: "End",
  pure: "Pure",
  gradient: "Gradient",
  linear: "linear",
  radial: "radial"
}, So = {
  start: "开始",
  end: "结束",
  pure: "纯色",
  gradient: "渐变",
  linear: "线性",
  radial: "径向"
}, wo = {
  En: $o,
  "ZH-cn": So
}, Po = {
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
}, Ho = O({
  name: "ColorPicker",
  components: {
    FkColorPicker: De,
    ChromeColorPicker: Me,
    GradientColorPicker: Ie,
    WrapContainer: ko
  },
  inheritAttrs: !1,
  props: Po,
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
    et(He, {
      lang: M(() => wo[e.lang || "ZH-cn"])
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
    })), i = M(() => o.activeKey === "gradient" ? Ie.name : e.pickerType === "fk" ? De.name : Me.name), y = (m) => {
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
        onChange: z,
        onAdvanceChange: y
      };
    }), g = () => {
      c.value = !0, _ ? _.update() : X();
    }, l = () => {
      c.value = !1;
    }, C = () => {
      var m, A;
      try {
        const [E] = rt(a.gradientColor);
        E && E.type.includes("gradient") && E.colorStops.length >= 2 && (E.colorStops.forEach((oe, x) => {
          var ae;
          const de = Number((ae = oe.length) == null ? void 0 : ae.value) || 0, [ge, he, pe, q] = oe.value;
          a.colors[x] = new D({
            r: Number(ge),
            g: Number(he),
            b: Number(pe),
            a: Number(q)
          }), a.colors[x].pst = de;
        }), E.type === "linear-gradient" && ((m = E.orientation) == null ? void 0 : m.type) === "angular" && (a.angle = Number((A = E.orientation) == null ? void 0 : A.value) || 0), a.type = E.type.split("-")[0]);
      } catch (E) {
        console.log(`[Parse Color]: ${E}`);
      }
    }, f = J(() => {
      const m = N();
      try {
        a.gradientColor = at(m), t("update:gradientColor", a.gradientColor), t("gradientColorChange", a.gradientColor);
        const A = m[0];
        A.gradientColor = a.gradientColor, t("gradientDataChange", A), t("update:gradientData", A);
      } catch (A) {
        console.log(A);
      }
    }, e.debounce), N = () => {
      const m = [], A = a.colors.map((E) => ({
        type: "rgba",
        value: E.RGB.map((x) => x.toString()),
        length: { value: E.pst + "", type: "%" }
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
    }, X = () => {
      s.value && h.value && (_ = lt(s.value, h.value, {
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
    }, z = (m) => {
      r.value = m, o.pureColor = m.toString(e.format), F();
    }, F = J(() => {
      t("update:pureColor", o.pureColor), t("pureColorChange", o.pureColor);
    }, e.debounce);
    nt(h, () => {
      l();
    });
    const Q = (m) => {
      o.activeKey = m, t("update:activeKey", m), t("activeKeyChange", m);
    };
    return ne(() => {
      C();
    }), K(
      () => e.gradientColor,
      (m) => {
        m != a.gradientColor && (a.gradientColor = m);
      }
    ), K(
      () => a.gradientColor,
      () => {
        C();
      }
    ), K(
      () => e.activeKey,
      (m) => {
        o.activeKey = m;
      }
    ), K(
      () => e.useType,
      (m) => {
        o.activeKey !== "gradient" && m === "gradient" ? o.activeKey = "gradient" : o.activeKey = "pure";
      }
    ), K(
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
      onColorChange: z,
      onShowPicker: g,
      onActiveKeyChange: Q,
      getComponentName: i,
      getBindArgs: k,
      state: o
    };
  }
});
function Bo(e, t, o, n, a, r) {
  const c = B("WrapContainer");
  return p(), $(U, null, [
    e.isWidget ? (p(), L(c, {
      key: 0,
      "active-key": e.state.activeKey,
      "onUpdate:activeKey": t[0] || (t[0] = (s) => e.state.activeKey = s),
      "show-tab": e.useType === "both",
      onChange: e.onActiveKeyChange,
      style: I({ zIndex: e.zIndex }),
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
          style: I(e.getBgColorStyle),
          onClick: t[1] || (t[1] = (...s) => e.onShowPicker && e.onShowPicker(...s))
        }, null, 4)
      ], 2),
      (p(), L(tt, { to: e.pickerContainer }, [
        Ke(d("div", {
          ref: "pickerRef",
          style: I({ zIndex: e.zIndex })
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
          [Te, e.showPicker]
        ])
      ], 8, ["to"]))
    ], 64))
  ], 64);
}
const le = /* @__PURE__ */ G(Ho, [["render", Bo], ["__scopeId", "data-v-457e5e58"]]), zo = {
  install: (e) => {
    e.component(le.name, le), e.component("Vue3" + le.name, le);
  }
};
export {
  D as Color,
  le as ColorPicker,
  zo as default
};
