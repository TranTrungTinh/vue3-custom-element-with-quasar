const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  rgb =
    /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  rgba =
    /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/

// Keep in sync with ui/types/api/validation.d.ts
export const testPattern = {
  date: (v: string) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v: string) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v: string) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v: string) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  //dd/mm/yyyy
  dateFormat: (v: string) =>
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      v
    ),

  email: (v: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ),

  hexColor: (v: string) => hex.test(v),
  hexaColor: (v: string) => hexa.test(v),
  hexOrHexaColor: (v: string) => hexOrHexa.test(v),

  rgbColor: (v: string) => rgb.test(v),
  rgbaColor: (v: string) => rgba.test(v),
  rgbOrRgbaColor: (v: string) => rgb.test(v) || rgba.test(v),

  hexOrRgbColor: (v: string) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v: string) => hexa.test(v) || rgba.test(v),
  anyColor: (v: string) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v),
}
