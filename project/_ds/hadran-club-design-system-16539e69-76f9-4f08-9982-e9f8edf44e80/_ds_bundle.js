/* @ds-bundle: {"format":4,"namespace":"HadranClubDesignSystem_16539e","components":[{"name":"BenefitRow","sourcePath":"components/brand/BenefitRow.jsx"},{"name":"MemberCard","sourcePath":"components/brand/MemberCard.jsx"},{"name":"PartnerTile","sourcePath":"components/brand/PartnerTile.jsx"},{"name":"SavingsMeter","sourcePath":"components/brand/SavingsMeter.jsx"},{"name":"StatBlock","sourcePath":"components/brand/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/BenefitRow.jsx":"cf8737c5c16f","components/brand/MemberCard.jsx":"3ef6f5254cc6","components/brand/PartnerTile.jsx":"36b515d42521","components/brand/SavingsMeter.jsx":"90632bd77af2","components/brand/StatBlock.jsx":"432c8eab52f3","components/core/Badge.jsx":"9bf9dd311058","components/core/Button.jsx":"b9197ab3f3b7","components/core/Card.jsx":"5fb546542a11","components/core/Icon.jsx":"c7597f9469fa","components/core/IconButton.jsx":"25fdc1e4a48f","components/core/Tag.jsx":"100ab903bd8d","components/feedback/Dialog.jsx":"1374a0138c12","components/feedback/EmptyState.jsx":"0391fd916703","components/feedback/Toast.jsx":"12da8e122099","components/feedback/Tooltip.jsx":"daf51b821bab","components/forms/Checkbox.jsx":"e7a4dfcdcf65","components/forms/Input.jsx":"2db7dabbeb73","components/forms/Radio.jsx":"923f31f96c6d","components/forms/Select.jsx":"b6f66e5fb23e","components/forms/Switch.jsx":"248dabca208c","components/navigation/Footer.jsx":"504697da951e","components/navigation/NavBar.jsx":"2117a87df4a7","components/navigation/TabBar.jsx":"7fdc92ca5249","components/navigation/Tabs.jsx":"44d27053aac6","ui_kits/member-area/app-activity.jsx":"f2d5897c1343","ui_kits/member-area/app-card.jsx":"b0ad0e3930ed","ui_kits/member-area/app-dashboard.jsx":"204146359d37","ui_kits/member-area/app-data.jsx":"643884baa989","ui_kits/member-area/app-mobile.jsx":"df760d6b35fb","ui_kits/website/site-home.jsx":"c4a2b3e75486","ui_kits/website/site-join.jsx":"998f0e5f3a06","ui_kits/website/site-partners.jsx":"c0c006b8eb9d","ui_kits/website/site-shared.jsx":"b4c3596bc1cf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HadranClubDesignSystem_16539e = window.HadranClubDesignSystem_16539e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/MemberCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MemberCard({
  holder = 'ישראל ישראלי',
  number = '4271 •••• •••• 8032',
  tier = 'חבר מועדון',
  discount = '5%',
  variant = 'gold',
  logoSrc = '../../assets/logo-mark.svg',
  width = 400,
  style,
  ...rest
}) {
  const dark = variant === 'ink';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      width,
      aspectRatio: '1.586 / 1',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--space-xl)',
      background: dark ? 'var(--color-canvas-ink)' : 'var(--gradient-brand)',
      color: dark ? 'var(--color-primary)' : 'var(--color-ink)',
      fontFamily: 'var(--font-ui)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-gold)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      height: 46,
      filter: dark ? 'none' : 'brightness(0)',
      opacity: dark ? 1 : .85
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-sm)',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, discount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-wide)',
      opacity: .7
    }
  }, tier), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-lg)',
      fontWeight: 700
    }
  }, holder), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontSize: 'var(--text-body-sm)',
      opacity: .75,
      direction: 'ltr'
    }
  }, number))));
}
Object.assign(__ds_scope, { MemberCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/MemberCard.jsx", error: String((e && e.message) || e) }); }

// components/brand/SavingsMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SavingsMeter({
  value = 0,
  max = 100,
  label,
  caption,
  tone = 'gold',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-mute)'
    }
  }, Math.round(pct), "%")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--sand-300)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: tone === 'ink' ? 'var(--color-canvas-ink)' : 'var(--gradient-brand)',
      transition: 'width var(--duration-slow) var(--ease-out)'
    }
  })), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--color-mute)'
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { SavingsMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SavingsMeter.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CARD_TONES = {
  plain: {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)'
  },
  sand: {
    background: 'var(--color-canvas-soft)',
    color: 'var(--color-ink)'
  },
  gold: {
    background: 'var(--color-primary-pale)',
    color: 'var(--color-ink)'
  },
  ink: {
    background: 'var(--color-canvas-ink)',
    color: 'var(--color-primary)'
  },
  outline: {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-ink)'
  },
  hairline: {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-border)'
  }
};
function Card({
  tone = 'plain',
  padding = 'var(--card-padding)',
  radius = 'var(--radius-xl)',
  interactive,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const t = CARD_TONES[tone] || CARD_TONES.plain;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      ...t,
      padding,
      borderRadius: radius,
      border: t.border || '1px solid transparent',
      transition: 'var(--transition-base)',
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      boxShadow: interactive && hover ? 'var(--shadow-raised)' : 'var(--shadow-0)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide (static SVG, CDN) rendered as a CSS mask so it inherits currentColor.
const LUCIDE = 'https://unpkg.com/lucide-static@0.462.0/icons/';
function Icon({
  name = 'circle',
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = LUCIDE + name + '.svg';
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flexShrink: 0,
      backgroundColor: color,
      WebkitMaskImage: 'url(' + url + ')',
      maskImage: 'url(' + url + ')',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/BenefitRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BenefitRow({
  title,
  meta,
  amount,
  saved,
  icon = 'shopping-bag',
  divider = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      padding: 'var(--space-lg) 0',
      borderBottom: divider ? '1px solid var(--color-border)' : 'none',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-canvas-soft)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--color-primary-deep)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-md)',
      fontWeight: 700
    }
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-mute)'
    }
  }, meta) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 2
    }
  }, amount ? /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontSize: 'var(--text-body-md)',
      fontWeight: 700
    }
  }, amount) : null, saved ? /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600,
      color: 'var(--color-positive)'
    }
  }, saved) : null));
}
Object.assign(__ds_scope, { BenefitRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BenefitRow.jsx", error: String((e && e.message) || e) }); }

// components/brand/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatBlock({
  value,
  label,
  sublabel,
  icon,
  tone = 'plain',
  align = 'start',
  style,
  ...rest
}) {
  const tones = {
    plain: {
      background: 'transparent',
      color: 'var(--color-ink)'
    },
    sand: {
      background: 'var(--color-canvas-soft)',
      color: 'var(--color-ink)'
    },
    gold: {
      background: 'var(--color-primary-pale)',
      color: 'var(--color-ink)'
    },
    ink: {
      background: 'var(--color-canvas-ink)',
      color: 'var(--color-primary)'
    }
  };
  const t = tones[tone] || tones.plain;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'start',
      fontFamily: 'var(--font-ui)',
      padding: tone === 'plain' ? 0 : 'var(--card-padding)',
      borderRadius: 'var(--radius-xl)',
      ...t,
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: "var(--color-primary-deep)",
    style: {
      marginBottom: 'var(--space-sm)'
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-md)',
      lineHeight: 'var(--lh-display-md)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-md)',
      fontWeight: 600
    }
  }, label), sublabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: tone === 'ink' ? 'var(--sand-400)' : 'var(--color-mute)'
    }
  }, sublabel) : null);
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BADGE_TONES = {
  gold: {
    background: 'var(--color-primary-pale)',
    color: 'var(--color-ink-deep)'
  },
  positive: {
    background: 'var(--color-positive-pale)',
    color: 'var(--color-positive-deep)'
  },
  warning: {
    background: 'var(--color-warning-pale)',
    color: 'var(--color-warning-deep)'
  },
  negative: {
    background: 'var(--color-negative-bg)',
    color: '#fff'
  },
  neutral: {
    background: 'var(--color-canvas-soft)',
    color: 'var(--color-body)'
  },
  ink: {
    background: 'var(--color-canvas-ink)',
    color: 'var(--color-primary)'
  }
};
function Badge({
  tone = 'gold',
  icon,
  children,
  style,
  ...rest
}) {
  const t = BADGE_TONES[tone] || BADGE_TONES.gold;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-xs)',
      padding: '4px 12px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600,
      lineHeight: 'var(--lh-body-sm)',
      ...t,
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/brand/PartnerTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PartnerTile({
  name,
  category,
  discount = '5%',
  logoSrc,
  initials,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-lg)',
      cursor: 'pointer',
      transform: hover ? 'translateY(-2px)' : 'none',
      boxShadow: hover ? 'var(--shadow-raised)' : 'none',
      transition: 'var(--transition-base)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-lg)',
      flexShrink: 0,
      background: 'var(--color-canvas-soft)',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--color-primary-deep)'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  }) : initials || (name || '').slice(0, 2)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-md)',
      fontWeight: 700,
      color: 'var(--color-ink)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-mute)'
    }
  }, category)), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "gold"
  }, discount));
}
Object.assign(__ds_scope, { PartnerTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PartnerTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BTN_BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-sm)',
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  border: '1px solid transparent',
  borderRadius: 'var(--radius-xl)',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)'
};
const BTN_SIZES = {
  sm: {
    fontSize: 'var(--text-body-sm)',
    padding: '8px 16px',
    borderRadius: 'var(--radius-lg)',
    minHeight: 36
  },
  md: {
    fontSize: 'var(--text-button)',
    padding: '12px 24px',
    minHeight: 48
  },
  lg: {
    fontSize: 'var(--text-body-lg)',
    padding: '16px 32px',
    minHeight: 56
  }
};
const BTN_VARIANTS = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    hover: 'var(--color-primary-active)',
    active: 'var(--gold-400)'
  },
  secondary: {
    background: 'var(--color-canvas-soft)',
    color: 'var(--color-ink)',
    hover: 'var(--sand-300)',
    active: 'var(--sand-400)'
  },
  tertiary: {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    borderColor: 'var(--color-ink)',
    hover: 'var(--color-canvas-soft)',
    active: 'var(--sand-300)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-ink)',
    hover: 'var(--color-canvas-soft)',
    active: 'var(--sand-300)'
  },
  danger: {
    background: 'var(--color-negative)',
    color: '#fff',
    hover: 'var(--color-negative-deep)',
    active: 'var(--color-negative-deep)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  fullWidth,
  disabled,
  as = 'button',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary;
  const Tag = as;
  const bg = disabled ? 'var(--sand-200)' : press ? v.active : hover ? v.hover : v.background;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest, {
    style: {
      ...BTN_BASE,
      ...BTN_SIZES[size],
      background: bg,
      color: disabled ? 'var(--color-mute)' : v.color,
      borderColor: v.borderColor || 'transparent',
      width: fullWidth ? '100%' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: press && !disabled ? 'translateY(1px)' : 'none',
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 20
  }) : null, children, iconAfter ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: size === 'sm' ? 16 : 20
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const IB_SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};
const IB_VARIANTS = {
  solid: {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    hover: 'var(--color-canvas-soft)',
    border: 'transparent'
  },
  gold: {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    hover: 'var(--color-primary-active)',
    border: 'transparent'
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-ink)',
    hover: 'var(--color-canvas-soft)',
    border: 'var(--color-ink)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-body)',
    hover: 'var(--color-canvas-soft)',
    border: 'transparent'
  }
};
function IconButton({
  icon,
  size = 'md',
  variant = 'solid',
  label,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = IB_VARIANTS[variant] || IB_VARIANTS.solid;
  const px = IB_SIZES[size];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      width: px,
      height: px,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-full)',
      border: '1px solid ' + v.border,
      background: hover ? v.hover : v.background,
      color: v.color,
      cursor: 'pointer',
      transition: 'var(--transition-base)',
      padding: 0,
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected,
  onRemove,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600,
      background: selected ? 'var(--color-ink)' : hover ? 'var(--sand-300)' : 'var(--color-canvas-soft)',
      color: selected ? 'var(--color-primary)' : 'var(--color-ink)',
      border: '1px solid transparent',
      cursor: 'pointer',
      transition: 'var(--transition-base)',
      ...style
    }
  }), children, onRemove ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14,
    onClick: onRemove,
    style: {
      cursor: 'pointer',
      opacity: .6
    }
  }) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  description,
  footer,
  onClose,
  width = 480,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(18,16,11,.45)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 60,
      padding: 'var(--space-xl)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, rest, {
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--color-canvas)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-overlay)',
      padding: 'var(--space-2xl)',
      fontFamily: 'var(--font-ui)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-xs)',
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-body)',
      fontSize: 'var(--text-body-md)'
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "\u05E1\u05D2\u05D9\u05E8\u05D4",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  }) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-md)',
      justifyContent: 'flex-start'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 'var(--space-md)',
      padding: 'var(--space-3xl) var(--space-xl)',
      background: 'var(--color-canvas-soft)',
      borderRadius: 'var(--radius-xl)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-primary-pale)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28,
    color: "var(--color-primary-deep)"
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-xs)',
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-body)',
      maxWidth: 380
    }
  }, description) : null, action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TOAST_TONES = {
  positive: {
    bg: 'var(--color-canvas-ink)',
    fg: 'var(--color-primary)',
    icon: 'circle-check'
  },
  info: {
    bg: 'var(--color-canvas-ink)',
    fg: 'var(--color-on-ink)',
    icon: 'info'
  },
  negative: {
    bg: 'var(--color-negative-bg)',
    fg: '#fff',
    icon: 'circle-alert'
  }
};
function Toast({
  tone = 'positive',
  message,
  action,
  onAction,
  style,
  ...rest
}) {
  const t = TOAST_TONES[tone] || TOAST_TONES.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status"
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      background: t.bg,
      color: t.fg,
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-lg) var(--space-xl)',
      boxShadow: 'var(--shadow-overlay)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-md)',
      fontWeight: 600,
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, message), action ? /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      font: 'inherit',
      textDecoration: 'underline',
      cursor: 'pointer',
      opacity: .85
    }
  }, action) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  label,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false)
  }, rest, {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }), children, open ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      insetInlineStart: '50%',
      transform: 'translateX(50%)',
      background: 'var(--color-canvas-ink)',
      color: 'var(--color-on-ink)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-caption)',
      lineHeight: 'var(--lh-caption)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      zIndex: 50
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-md)',
      color: disabled ? 'var(--color-mute)' : 'var(--color-ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      transition: 'var(--transition-base)',
      border: '1px solid ' + (checked ? 'var(--color-ink)' : 'var(--color-border)'),
      background: checked ? 'var(--color-primary)' : 'var(--color-canvas)'
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: "var(--color-ink)"
  }) : null), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || 'in-' + (label || 'field');
  const borderColor = error ? 'var(--color-negative)' : focus ? 'var(--color-ink)' : 'var(--color-border)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600,
      color: 'var(--color-ink)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      background: 'var(--color-canvas)',
      border: '1px solid ' + borderColor,
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'var(--transition-base)'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--color-mute)"
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'inherit',
      fontSize: 'var(--text-body-md)',
      color: 'var(--color-ink)',
      minWidth: 0
    }
  })), suffix ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-mute)',
      fontWeight: 600
    }
  }, suffix) : null), hint || error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: error ? 'var(--color-negative)' : 'var(--color-mute)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  checked,
  onChange,
  name,
  value,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-md)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    onChange: onChange
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      marginTop: 1,
      borderRadius: 'var(--radius-full)',
      border: '1px solid ' + (checked ? 'var(--color-ink)' : 'var(--color-border)'),
      background: 'var(--color-canvas)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-primary-deep)'
    }
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-md)',
      fontWeight: 600,
      color: 'var(--color-ink)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-mute)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      width: '100%',
      appearance: 'none',
      font: 'inherit',
      fontSize: 'var(--text-body-md)',
      color: 'var(--color-ink)',
      background: 'var(--color-canvas)',
      border: '1px solid ' + (focus ? 'var(--color-ink)' : 'var(--color-border)'),
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'var(--transition-base)'
    }
  }), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    color: "var(--color-mute)",
    style: {
      position: 'absolute',
      insetInlineEnd: 16,
      pointerEvents: 'none'
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--color-mute)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 28,
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      padding: 3,
      background: checked ? 'var(--color-primary-deep)' : 'var(--sand-300)',
      opacity: disabled ? .5 : 1,
      transition: 'var(--transition-base)',
      display: 'flex',
      justifyContent: checked ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-canvas)',
      boxShadow: 'var(--shadow-card)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  logoSrc = '../../assets/logo-lockup-on-dark.svg',
  columns = [],
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({}, rest, {
    style: {
      background: 'var(--color-canvas-ink)',
      color: 'var(--color-on-ink)',
      fontFamily: 'var(--font-ui)',
      padding: 'var(--space-3xl) var(--space-xl)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr repeat(' + Math.max(columns.length, 1) + ', 1fr)',
      gap: 'var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "\u05D4\u05D3\u05E8\u05DF \u05E7\u05DC\u05D0\u05D1",
    style: {
      height: 44,
      alignSelf: 'flex-start'
    }
  }), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--sand-400)',
      maxWidth: 320,
      lineHeight: 'var(--lh-body-md)'
    }
  }, note) : null), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-sm)',
      fontWeight: 700,
      color: 'var(--color-primary)',
      margin: 0,
      letterSpacing: 'var(--tracking-wide)'
    }
  }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--sand-300)',
      textDecoration: 'none'
    }
  }, l))))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  logoSrc = '../../assets/logo-lockup.svg',
  links = [],
  cta,
  onCtaClick,
  active,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 40,
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-md) var(--space-xl)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "\u05D4\u05D3\u05E8\u05DF \u05E7\u05DC\u05D0\u05D1",
    style: {
      height: 38
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-xl)',
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    onClick: l.onClick,
    style: {
      fontSize: 'var(--text-body-sm)',
      fontWeight: 600,
      textDecoration: 'none',
      color: active === l.label ? 'var(--color-ink)' : 'var(--color-body)',
      borderBottom: active === l.label ? '2px solid var(--color-primary-deep)' : '2px solid transparent',
      paddingBottom: 2
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    label: "\u05D7\u05D9\u05E4\u05D5\u05E9",
    variant: "ghost",
    size: "sm"
  }), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onCtaClick
  }, cta) : null)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TabBar({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      display: 'flex',
      background: 'var(--color-canvas)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-sm) var(--space-md) var(--space-lg)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), items.map(it => {
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '8px 0',
        color: on ? 'var(--color-ink)' : 'var(--color-mute)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-caption)',
        fontWeight: on ? 700 : 500
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: 'flex',
      gap: 'var(--space-xl)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }), items.map(it => {
    const key = it.value ?? it;
    const on = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(key),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0 0 12px',
        fontSize: 'var(--text-body-md)',
        fontWeight: on ? 700 : 500,
        color: on ? 'var(--color-ink)' : 'var(--color-mute)',
        borderBottom: '2px solid ' + (on ? 'var(--color-primary-deep)' : 'transparent'),
        marginBottom: -1,
        transition: 'var(--transition-base)'
      }
    }, it.label ?? it);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-area/app-activity.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card,
  Tabs,
  BenefitRow,
  StatBlock,
  EmptyState,
  Button,
  Select
} = window.HadranClubDesignSystem_16539e;
function AppActivity() {
  const [cat, setCat] = React.useState('all');
  const items = ACTIVITY.filter(a => cat === 'all' || a.cat === cat);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: cat,
    onChange: setCat,
    items: [{
      value: 'all',
      label: 'הכל'
    }, {
      value: 'food',
      label: 'מזון'
    }, {
      value: 'clothes',
      label: 'ביגוד'
    }, {
      value: 'books',
      label: 'ספרי קודש'
    }, {
      value: 'health',
      label: 'בריאות'
    }],
    style: {
      border: 'none',
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['תמוז תשפ״ו', 'סיוון תשפ״ו', 'אייר תשפ״ו'],
    style: {
      width: 180
    }
  })), items.length ? items.map((a, i) => /*#__PURE__*/React.createElement(BenefitRow, _extends({
    key: a.title
  }, a, {
    divider: i < items.length - 1
  }))) : /*#__PURE__*/React.createElement(EmptyState, {
    icon: "receipt",
    title: "\u05D0\u05D9\u05DF \u05E7\u05E0\u05D9\u05D5\u05EA \u05D1\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D4\u05D6\u05D5",
    description: "\u05D1\u05D7\u05E8\u05D5 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D0\u05D7\u05E8\u05EA \u05D0\u05D5 \u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD.",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "tertiary",
      onClick: () => setCat('all')
    }, "\u05D4\u05E6\u05D2\u05EA \u05D4\u05DB\u05DC")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "sand",
    value: "\u20AA1,240",
    label: "\u05E1\u05DA \u05D4\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05D1\u05EA\u05DE\u05D5\u05D6",
    sublabel: "\u05DE\u05EA\u05D5\u05DA \u20AA24,800 \u05E7\u05E0\u05D9\u05D5\u05EA"
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "hairline",
    padding: "20px"
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 16,
      display: 'block',
      marginBottom: 12
    }
  }, "\u05E4\u05D9\u05DC\u05D5\u05D7 \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4"), [['מזון', 62], ['ביגוד', 21], ['ספרי קודש', 10], ['בריאות', 7]].map(([n, p]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 84,
      fontSize: 14
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 8,
      background: 'var(--sand-200)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: p + '%',
      height: '100%',
      background: 'var(--gradient-brand)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "tnum",
    style: {
      fontSize: 13,
      color: 'var(--color-mute)'
    }
  }, p, "%"))))));
}
Object.assign(window, {
  AppActivity
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-area/app-activity.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-area/app-card.jsx
try { (() => {
const {
  Card,
  MemberCard,
  Button,
  Switch,
  Input,
  Badge,
  Dialog,
  Icon,
  Tooltip
} = window.HadranClubDesignSystem_16539e;
function AppCard({
  notify
}) {
  const [frozen, setFrozen] = React.useState(false);
  const [sms, setSms] = React.useState(true);
  const [ask, setAsk] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MemberCard, {
    width: 460,
    variant: frozen ? 'ink' : 'gold',
    holder: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9",
    tier: frozen ? 'כרטיס מוקפא' : 'מנוי שנתי'
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700
    }
  }, "\u05D4\u05E7\u05E4\u05D0\u05EA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1", /*#__PURE__*/React.createElement(Tooltip, {
    label: "\u05D4\u05D4\u05E0\u05D7\u05D4 \u05DC\u05D0 \u05EA\u05D9\u05E0\u05EA\u05DF \u05D1\u05E7\u05D5\u05E4\u05D4 \u05E2\u05D3 \u05D4\u05D4\u05E4\u05E9\u05E8\u05D4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 16,
    color: "var(--color-mute)"
  }))), /*#__PURE__*/React.createElement(Switch, {
    checked: frozen,
    onChange: e => {
      setFrozen(e.target.checked);
      notify(e.target.checked ? 'הכרטיס הוקפא' : 'הכרטיס הופשר');
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "\u05E2\u05D3\u05DB\u05D5\u05E0\u05D9 SMS \u05E2\u05DC \u05D4\u05D8\u05D1\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA"), /*#__PURE__*/React.createElement(Switch, {
    checked: sms,
    onChange: e => setSms(e.target.checked)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "plus"
  }, "\u05DB\u05E8\u05D8\u05D9\u05E1 \u05E0\u05D5\u05E1\u05E3 \u05DC\u05D1\u05DF/\u05D1\u05EA \u05D4\u05D6\u05D5\u05D2"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "triangle-alert",
    onClick: () => setAsk(true)
  }, "\u05D3\u05D9\u05D5\u05D5\u05D7 \u05E2\u05DC \u05D0\u05D5\u05D1\u05D3\u05DF"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20,
      fontFamily: 'var(--font-display)',
      fontWeight: 800
    }
  }, "\u05E4\u05E8\u05D8\u05D9 \u05D4\u05D7\u05D1\u05E8"), /*#__PURE__*/React.createElement(Input, {
    label: "\u05E9\u05DD \u05DE\u05DC\u05D0",
    defaultValue: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05D8\u05DC\u05E4\u05D5\u05DF \u05E0\u05D9\u05D9\u05D3",
    defaultValue: "050-0000000",
    icon: "phone"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05DB\u05EA\u05D5\u05D1\u05EA",
    defaultValue: "\u05E8\u05D1\u05D9 \u05E2\u05E7\u05D9\u05D1\u05D0 84, \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7",
    icon: "map-pin"
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => notify('הפרטים נשמרו')
  }, "\u05E9\u05DE\u05D9\u05E8\u05EA \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD"))), /*#__PURE__*/React.createElement(Card, {
    tone: "sand",
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "positive"
  }, "\u05DE\u05E0\u05D5\u05D9 \u05E4\u05E2\u05D9\u05DC"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      color: 'var(--color-body)'
    }
  }, "\u05D4\u05DE\u05E0\u05D5\u05D9 \u05D4\u05E9\u05E0\u05EA\u05D9 \u05DE\u05EA\u05D7\u05D3\u05E9 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA \u05D1\u05DB\u05F4\u05D8 \u05D1\u05D0\u05DC\u05D5\u05DC \xB7 \u20AA249"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "tertiary"
  }, "\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05DE\u05E0\u05D5\u05D9")))), /*#__PURE__*/React.createElement(Dialog, {
    open: ask,
    title: "\u05DC\u05D3\u05D5\u05D5\u05D7 \u05E2\u05DC \u05D0\u05D5\u05D1\u05D3\u05DF \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1?",
    description: "\u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D9\u05D1\u05D5\u05D8\u05DC \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA \u05D5\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D7\u05DC\u05D5\u05E4\u05D9 \u05D9\u05D9\u05E9\u05DC\u05D7 \u05D0\u05DC\u05D9\u05DB\u05DD \u05EA\u05D5\u05DA 5 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD.",
    onClose: () => setAsk(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => {
        setAsk(false);
        notify('הכרטיס בוטל וכרטיס חלופי בדרך');
      }
    }, "\u05D1\u05D9\u05D8\u05D5\u05DC \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setAsk(false)
    }, "\u05D7\u05D6\u05E8\u05D4"))
  }));
}
Object.assign(window, {
  AppCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-area/app-card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-area/app-dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card,
  MemberCard,
  StatBlock,
  SavingsMeter,
  BenefitRow,
  Button,
  Badge,
  Icon,
  PartnerTile
} = window.HadranClubDesignSystem_16539e;
function AppDashboard({
  go,
  notify
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '380px 1fr',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MemberCard, {
    width: 380,
    holder: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9",
    number: "4271 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 8032"
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SavingsMeter, {
    value: 640,
    max: 1000,
    label: "\u05D9\u05E2\u05D3 \u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05E9\u05E0\u05EA\u05D9",
    caption: "\u05E2\u05D5\u05D3 \u20AA360 \u05E2\u05D3 \u05D4\u05D9\u05E2\u05D3 \u05E9\u05D4\u05D2\u05D3\u05E8\u05EA\u05DD"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "qr-code",
    onClick: () => go('card')
  }, "\u05D4\u05E6\u05D2\u05EA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "download",
    onClick: () => notify('הדוח החודשי נשלח למייל')
  }, "\u05D3\u05D5\u05D7 \u05D7\u05D5\u05D3\u05E9\u05D9")))), /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "gift"
  }, "\u05D4\u05D8\u05D1\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 18
    }
  }, "10% \u05D1\u05E1\u05E4\u05E8\u05D9 \u05D0\u05D5\u05E8 \u05D4\u05D7\u05D9\u05D9\u05DD"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--sand-400)'
    }
  }, "\u05E2\u05D3 \u05E1\u05D5\u05E3 \u05D7\u05D5\u05D3\u05E9 \u05D0\u05D1, \u05D1\u05DB\u05DC \u05D4\u05E1\u05E0\u05D9\u05E4\u05D9\u05DD, \u05D1\u05D4\u05E6\u05D2\u05EA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "plain",
    value: "\u20AA1,240",
    label: "\u05E0\u05D7\u05E1\u05DB\u05D5 \u05D4\u05D7\u05D5\u05D3\u05E9",
    sublabel: "\u05DC\u05E2\u05D5\u05DE\u05EA \u20AA980 \u05D1\u05D7\u05D5\u05D3\u05E9 \u05E9\u05E2\u05D1\u05E8",
    style: {
      background: 'var(--color-canvas)',
      padding: 24,
      borderRadius: 24
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "plain",
    value: "\u20AA8,410",
    label: "\u05E1\u05DA \u05D4\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF",
    sublabel: "\u05DE\u05D0\u05D6 \u05D4\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05D1\u05EA\u05E9\u05E4\u05F4\u05D3",
    style: {
      background: 'var(--color-canvas)',
      padding: 24,
      borderRadius: 24
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "gold",
    value: "18",
    label: "\u05E7\u05E0\u05D9\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9",
    sublabel: "\u05D1-7 \u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \u05E9\u05D5\u05E0\u05D9\u05DD"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "8px 24px 16px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20,
      fontFamily: 'var(--font-display)',
      fontWeight: 800
    }
  }, "\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    iconAfter: "arrow-left"
  }, "\u05DC\u05DB\u05DC \u05D4\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA")), ACTIVITY.slice(0, 4).map((a, i) => /*#__PURE__*/React.createElement(BenefitRow, _extends({
    key: a.title
  }, a, {
    divider: i < 3
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20,
    color: "var(--color-primary-deep)"
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 18
    }
  }, "\u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \u05E7\u05E8\u05D5\u05D1\u05D9\u05DD \u05D0\u05DC\u05D9\u05DB\u05DD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PartnerTile, {
    name: "\u05E8\u05E9\u05EA \u05D9\u05E9 \u05D7\u05E1\u05D3",
    category: "\u05E8\u05D7\u05D5\u05D1 \u05E8\u05D1\u05D9 \u05E2\u05E7\u05D9\u05D1\u05D0 84 \xB7 400 \u05DE\u05F3"
  }), /*#__PURE__*/React.createElement(PartnerTile, {
    name: "\u05D1\u05D9\u05D2\u05D5\u05D3 \u05D4\u05D3\u05E8",
    category: "\u05E8\u05D7\u05D5\u05D1 \u05D7\u05D6\u05D5\u05DF \u05D0\u05D9\u05E9 12 \xB7 900 \u05DE\u05F3",
    discount: "7%"
  })))));
}
Object.assign(window, {
  AppDashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-area/app-dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-area/app-data.jsx
try { (() => {
const ACTIVITY = [{
  title: 'רשת יש חסד',
  meta: 'סניף בני ברק · כ״ג בתמוז',
  amount: '₪312',
  saved: 'חסכת ₪15.60',
  icon: 'shopping-bag',
  cat: 'food'
}, {
  title: 'ביגוד הדר',
  meta: 'סניף ירושלים · כ״א בתמוז',
  amount: '₪480',
  saved: 'חסכת ₪33.60',
  icon: 'shirt',
  cat: 'clothes'
}, {
  title: 'ספרי אור החיים',
  meta: 'סניף בית שמש · י״ח בתמוז',
  amount: '₪220',
  saved: 'חסכת ₪22.00',
  icon: 'book-open',
  cat: 'books'
}, {
  title: 'מרכז המזון הדר',
  meta: 'סניף מודיעין עילית · ט״ז בתמוז',
  amount: '₪640',
  saved: 'חסכת ₪32.00',
  icon: 'shopping-cart',
  cat: 'food'
}, {
  title: 'אופטיקה כהן',
  meta: 'סניף בני ברק · י״ב בתמוז',
  amount: '₪890',
  saved: 'חסכת ₪71.20',
  icon: 'glasses',
  cat: 'health'
}, {
  title: 'צעצועי גן עדן',
  meta: 'סניף אשדוד · ח׳ בתמוז',
  amount: '₪150',
  saved: 'חסכת ₪7.50',
  icon: 'gift',
  cat: 'gifts'
}];
Object.assign(window, {
  ACTIVITY
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-area/app-data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-area/app-mobile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  TabBar,
  MemberCard,
  StatBlock,
  BenefitRow,
  SavingsMeter,
  Card,
  Badge,
  IconButton
} = window.HadranClubDesignSystem_16539e;
function AppMobile() {
  const [tab, setTab] = React.useState('home');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 780,
      background: 'var(--color-canvas-soft)',
      borderRadius: 40,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-overlay)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-canvas)',
      padding: '20px 20px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup.svg",
    style: {
      height: 30
    },
    alt: "\u05D4\u05D3\u05E8\u05DF \u05E7\u05DC\u05D0\u05D1"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA",
    variant: "ghost",
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(MemberCard, {
    width: 350,
    holder: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "plain",
    value: "\u20AA1,240",
    label: "\u05E0\u05D7\u05E1\u05DA \u05D4\u05D7\u05D5\u05D3\u05E9",
    style: {
      background: '#fff',
      padding: 16,
      borderRadius: 20
    }
  }), /*#__PURE__*/React.createElement(StatBlock, {
    tone: "gold",
    value: "18",
    label: "\u05E7\u05E0\u05D9\u05D5\u05EA \u05D4\u05D7\u05D5\u05D3\u05E9",
    style: {
      padding: 16
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "16px"
  }, /*#__PURE__*/React.createElement(SavingsMeter, {
    value: 640,
    max: 1000,
    label: "\u05D9\u05E2\u05D3 \u05E9\u05E0\u05EA\u05D9",
    caption: "\u05E2\u05D5\u05D3 \u20AA360 \u05E2\u05D3 \u05D4\u05D9\u05E2\u05D3"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 16px 8px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0 0'
    }
  }, /*#__PURE__*/React.createElement("b", null, "\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "\u05EA\u05DE\u05D5\u05D6")), ACTIVITY.slice(0, 3).map((a, i) => /*#__PURE__*/React.createElement(BenefitRow, _extends({
    key: a.title
  }, a, {
    divider: i < 2
  }))))), /*#__PURE__*/React.createElement(TabBar, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'home',
      label: 'ראשי',
      icon: 'house'
    }, {
      value: 'card',
      label: 'הכרטיס',
      icon: 'credit-card'
    }, {
      value: 'shops',
      label: 'בתי עסק',
      icon: 'store'
    }, {
      value: 'me',
      label: 'אישי',
      icon: 'user'
    }]
  }));
}
Object.assign(window, {
  AppMobile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-area/app-mobile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Card,
  Badge,
  StatBlock,
  MemberCard,
  PartnerTile,
  Icon
} = window.HadranClubDesignSystem_16539e;
function SiteHome({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-canvas-soft)',
      padding: '64px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "badge-percent"
  }, "5% \u05D4\u05E0\u05D7\u05D4 \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA \u05D1\u05E7\u05D5\u05E4\u05D4"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 72,
      lineHeight: 1.04,
      letterSpacing: '-.015em',
      margin: 0
    }
  }, "\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D0\u05D7\u05D3.", /*#__PURE__*/React.createElement("br", null), "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05D1\u05DB\u05DC \u05E7\u05E0\u05D9\u05D9\u05D4."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.6,
      color: 'var(--color-body)',
      maxWidth: 480,
      margin: 0
    }
  }, "\u05D1\u05DC\u05D9 \u05E6\u05D1\u05D9\u05E8\u05EA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D5\u05D1\u05DC\u05D9 \u05E7\u05D5\u05E4\u05D5\u05E0\u05D9\u05DD. \u05DE\u05E6\u05D9\u05D2\u05D9\u05DD \u05D0\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1 \u05D4\u05D3\u05E8\u05DF \u05E7\u05DC\u05D0\u05D1 \u05D1\u05E7\u05D5\u05E4\u05D4 \u2014 \u05D5\u05D4\u05D4\u05E0\u05D7\u05D4 \u05D9\u05D5\u05E8\u05D3\u05EA \u05DE\u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05DE\u05E7\u05D5\u05DD, \u05D1-312 \u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \u05D1\u05E8\u05D7\u05D1\u05D9 \u05D4\u05D0\u05E8\u05E5."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('join')
  }, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "tertiary",
    onClick: () => go('partners')
  }, "\u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D1\u05EA\u05D9 \u05D4\u05E2\u05E1\u05E7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--color-mute)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 18,
    color: "var(--color-primary-deep)"
  }), "\u05DC\u05DC\u05D0 \u05D4\u05EA\u05D7\u05D9\u05D9\u05D1\u05D5\u05EA \xB7 \u05D1\u05D9\u05D8\u05D5\u05DC \u05D1\u05DB\u05DC \u05E2\u05EA \xB7 \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05DE\u05D2\u05D9\u05E2 \u05E2\u05D3 \u05D4\u05D1\u05D9\u05EA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(MemberCard, {
    width: 440,
    holder: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9",
    style: {
      transform: 'rotate(-3deg)'
    }
  })))), /*#__PURE__*/React.createElement(Band, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u05D0\u05D9\u05DA \u05D6\u05D4 \u05E2\u05D5\u05D1\u05D3",
    title: "\u05E9\u05DC\u05D5\u05E9\u05D4 \u05E6\u05E2\u05D3\u05D9\u05DD, \u05E4\u05E2\u05DD \u05D0\u05D7\u05EA",
    lead: "\u05D4\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05DC\u05D5\u05E7\u05D7\u05EA \u05E9\u05EA\u05D9 \u05D3\u05E7\u05D5\u05EA. \u05D0\u05D7\u05E8 \u05DB\u05DA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05E4\u05E9\u05D5\u05D8 \u05E2\u05D5\u05D1\u05D3."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      color: 'var(--color-primary-deep)'
    }
  }, "1"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20
    }
  }, "\u05E0\u05E8\u05E9\u05DE\u05D9\u05DD \u05DC\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-body)',
      lineHeight: 1.6
    }
  }, "\u05DE\u05DE\u05DC\u05D0\u05D9\u05DD \u05E4\u05E8\u05D8\u05D9\u05DD \u05D1\u05E1\u05D9\u05E1\u05D9\u05D9\u05DD \u05D5\u05D1\u05D5\u05D7\u05E8\u05D9\u05DD \u05DE\u05E1\u05DC\u05D5\u05DC \u2014 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05D0\u05D5 \u05E9\u05E0\u05EA\u05D9."))), /*#__PURE__*/React.createElement(Card, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      color: 'var(--color-primary-deep)'
    }
  }, "2"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20
    }
  }, "\u05DE\u05E7\u05D1\u05DC\u05D9\u05DD \u05DB\u05E8\u05D8\u05D9\u05E1"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-body)',
      lineHeight: 1.6
    }
  }, "\u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D4\u05E4\u05D9\u05D6\u05D9 \u05DE\u05D2\u05D9\u05E2 \u05E2\u05D3 \u05D4\u05D1\u05D9\u05EA \u05EA\u05D5\u05DA 5 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD, \u05DE\u05D5\u05DB\u05DF \u05DC\u05E9\u05D9\u05DE\u05D5\u05E9."))), /*#__PURE__*/React.createElement(Card, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      color: 'var(--color-primary-deep)'
    }
  }, "3"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20
    }
  }, "\u05D7\u05D5\u05E1\u05DB\u05D9\u05DD \u05D1\u05E7\u05D5\u05E4\u05D4"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-body)',
      lineHeight: 1.6
    }
  }, "\u05DE\u05E6\u05D9\u05D2\u05D9\u05DD \u05D1\u05E7\u05D5\u05E4\u05D4 \u05DC\u05E4\u05E0\u05D9 \u05D4\u05EA\u05E9\u05DC\u05D5\u05DD \u2014 5% \u05D9\u05D5\u05E8\u05D3\u05D9\u05DD \u05DE\u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05DE\u05D9\u05D3."))))), /*#__PURE__*/React.createElement(Band, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "5%",
    label: "\u05D4\u05E0\u05D7\u05D4 \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA",
    sublabel: "\u05D1\u05DB\u05DC \u05E8\u05E9\u05EA \u05E9\u05D5\u05EA\u05E4\u05D4"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "312",
    label: "\u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \u05E9\u05D5\u05EA\u05E4\u05D9\u05DD",
    sublabel: "\u05D5\u05DE\u05E6\u05D8\u05E8\u05E4\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD \u05DB\u05DC \u05D7\u05D5\u05D3\u05E9"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "\u20AA1,240",
    label: "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05D7\u05D5\u05D3\u05E9\u05D9 \u05DE\u05DE\u05D5\u05E6\u05E2",
    sublabel: "\u05DC\u05DE\u05E9\u05E4\u05D7\u05D4 \u05D1\u05EA 6 \u05E0\u05E4\u05E9\u05D5\u05EA"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "24,800",
    label: "\u05DE\u05E9\u05E4\u05D7\u05D5\u05EA \u05D1\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF",
    sublabel: "\u05D1\u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7, \u05D9\u05E8\u05D5\u05E9\u05DC\u05D9\u05DD \u05D5\u05D1\u05D9\u05EA \u05E9\u05DE\u05E9"
  }))), /*#__PURE__*/React.createElement(Band, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u05DC\u05DE\u05D4 \u05D4\u05D3\u05E8\u05DF",
    title: "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05E9\u05E8\u05D5\u05D0\u05D9\u05DD \u05D1\u05D7\u05E9\u05D1\u05D5\u05DF"
  }), /*#__PURE__*/React.createElement(Bullet, {
    icon: "badge-percent",
    title: "\u05D4\u05D4\u05E0\u05D7\u05D4 \u05D9\u05D5\u05E8\u05D3\u05EA \u05D1\u05E7\u05D5\u05E4\u05D4",
    text: "\u05DC\u05D0 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA, \u05DC\u05D0 \u05D6\u05D9\u05DB\u05D5\u05D9 \u05E2\u05EA\u05D9\u05D3\u05D9 \u2014 \u05D4\u05E1\u05DB\u05D5\u05DD \u05E9\u05D0\u05EA\u05DD \u05DE\u05E9\u05DC\u05DE\u05D9\u05DD \u05E7\u05D8\u05DF \u05DB\u05D0\u05DF \u05D5\u05E2\u05DB\u05E9\u05D9\u05D5."
  }), /*#__PURE__*/React.createElement(Bullet, {
    icon: "store",
    title: "\u05D1\u05E8\u05E9\u05EA\u05D5\u05EA \u05E9\u05D0\u05EA\u05DD \u05DB\u05D1\u05E8 \u05E7\u05D5\u05E0\u05D9\u05DD \u05D1\u05D4\u05DF",
    text: "\u05E8\u05E9\u05EA\u05D5\u05EA \u05D4\u05DE\u05D6\u05D5\u05DF, \u05D4\u05D1\u05D9\u05D2\u05D5\u05D3 \u05D5\u05E1\u05E4\u05E8\u05D9 \u05D4\u05E7\u05D5\u05D3\u05E9 \u05E9\u05DE\u05E9\u05E8\u05EA\u05D5\u05EA \u05D0\u05EA \u05D4\u05E7\u05D4\u05D9\u05DC\u05D4."
  }), /*#__PURE__*/React.createElement(Bullet, {
    icon: "users",
    title: "\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D0\u05D7\u05D3 \u05DC\u05DE\u05E9\u05E4\u05D7\u05D4",
    text: "\u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05D5\u05E1\u05D9\u05E3 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E0\u05D5\u05E1\u05E3 \u05DC\u05D1\u05DF/\u05D1\u05EA \u05D4\u05D6\u05D5\u05D2 \u05D1\u05D0\u05D5\u05EA\u05D5 \u05DE\u05E0\u05D5\u05D9."
  }), /*#__PURE__*/React.createElement(Bullet, {
    icon: "wallet",
    title: "\u05E8\u05D5\u05D0\u05D9\u05DD \u05DB\u05DE\u05D4 \u05D7\u05E1\u05DB\u05EA\u05DD",
    text: "\u05D1\u05D0\u05D6\u05D5\u05E8 \u05D4\u05D0\u05D9\u05E9\u05D9 \u05DE\u05D5\u05E4\u05D9\u05E2\u05D4 \u05DB\u05DC \u05E7\u05E0\u05D9\u05D9\u05D4 \u05D5\u05D4\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05E9\u05E0\u05E6\u05D1\u05E8 \u05D4\u05D7\u05D5\u05D3\u05E9."
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "gold",
    padding: "32px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 28,
      lineHeight: 1.4,
      fontWeight: 700
    }
  }, "\u05F4\u05E7\u05D5\u05E0\u05D9\u05DD \u05D0\u05D5\u05EA\u05D5 \u05D3\u05D1\u05E8, \u05DE\u05E9\u05DC\u05DE\u05D9\u05DD \u05E4\u05D7\u05D5\u05EA. \u05D0\u05D7\u05E8\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05DB\u05D1\u05E8 \u05D4\u05D7\u05D6\u05D9\u05E8 \u05D0\u05EA \u05E2\u05E6\u05DE\u05D5.\u05F4"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--color-body)'
    }
  }, "\u05DE\u05E9\u05E4\u05D7\u05EA \u05E4\u05E8\u05D9\u05D3\u05DE\u05DF \xB7 \u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7 \xB7 \u05D7\u05D1\u05E8\u05D9 \u05DE\u05D5\u05E2\u05D3\u05D5\u05DF \u05DE\u05D0\u05D6 \u05EA\u05E9\u05E4\u05F4\u05D3"))))), /*#__PURE__*/React.createElement(Band, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7",
    title: "\u05D0\u05D9\u05E4\u05D4 \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05E2\u05D5\u05D1\u05D3",
    lead: "\u05DE\u05D1\u05D7\u05E8 \u05DE\u05EA\u05D5\u05DA 312 \u05D1\u05EA\u05D9 \u05D4\u05E2\u05E1\u05E7 \u05D4\u05E9\u05D5\u05EA\u05E4\u05D9\u05DD."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, PARTNERS.slice(0, 6).map(p => /*#__PURE__*/React.createElement(PartnerTile, _extends({
    key: p.name
  }, p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    iconAfter: "arrow-left",
    onClick: () => go('partners')
  }, "\u05DC\u05DB\u05DC \u05D1\u05EA\u05D9 \u05D4\u05E2\u05E1\u05E7"))), /*#__PURE__*/React.createElement(Band, null, /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    padding: "48px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      margin: 0,
      color: 'var(--color-primary)'
    }
  }, "\u05DE\u05EA\u05D7\u05D9\u05DC\u05D9\u05DD \u05DC\u05D7\u05E1\u05D5\u05DA \u05D4\u05D7\u05D5\u05D3\u05E9"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 18,
      color: 'var(--sand-300)'
    }
  }, "\u05DE\u05E0\u05D5\u05D9 \u05E9\u05E0\u05EA\u05D9 \u05D1-\u20AA249 \u2014 \u05DE\u05D5\u05D7\u05D6\u05E8 \u05DB\u05D1\u05E8 \u05D1\u05E7\u05E0\u05D9\u05D5\u05EA \u05E9\u05DC \u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD.")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('join')
  }, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05DC\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF")))));
}
Object.assign(window, {
  SiteHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-join.jsx
try { (() => {
const {
  Input,
  Select,
  Radio,
  Checkbox,
  Button,
  Card,
  MemberCard,
  Dialog,
  Badge,
  Icon
} = window.HadranClubDesignSystem_16539e;
function SiteJoin({
  go
}) {
  const [plan, setPlan] = React.useState('year');
  const [name, setName] = React.useState('');
  const [terms, setTerms] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-canvas-soft)',
      padding: '48px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.15fr .85fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "32px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      margin: 0
    }
  }, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05DC\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-body)',
      fontSize: 17
    }
  }, "\u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D9\u05D9\u05E9\u05DC\u05D7 \u05DC\u05DB\u05EA\u05D5\u05D1\u05EA \u05E9\u05EA\u05DE\u05DC\u05D0\u05D5 \u05EA\u05D5\u05DA 5 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9",
    placeholder: "\u05D9\u05E9\u05E8\u05D0\u05DC",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4",
    placeholder: "\u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05D8\u05DC\u05E4\u05D5\u05DF \u05E0\u05D9\u05D9\u05D3",
    placeholder: "050-0000000",
    icon: "phone",
    hint: "\u05E0\u05E9\u05DC\u05D7 \u05E7\u05D5\u05D3 \u05D0\u05D9\u05DE\u05D5\u05EA \u05D1-SMS"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05E0\u05D9",
    placeholder: "name@example.com",
    icon: "mail"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u05E2\u05D9\u05E8",
    options: ['בני ברק', 'ירושלים', 'בית שמש', 'מודיעין עילית', 'אשדוד', 'אחר']
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05DC\u05DE\u05E9\u05DC\u05D5\u05D7",
    placeholder: "\u05E8\u05D7\u05D5\u05D1 \u05D5\u05DE\u05E1\u05E4\u05E8",
    icon: "map-pin"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, "\u05DE\u05E1\u05DC\u05D5\u05DC \u05DE\u05E0\u05D5\u05D9"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: plan === 'year' ? 'gold' : 'hairline',
    padding: "16px",
    onClick: () => setPlan('year'),
    interactive: true
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "plan",
    label: "\u05E9\u05E0\u05EA\u05D9 \xB7 \u20AA249",
    description: "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05E9\u05DC 20% \xB7 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E0\u05D5\u05E1\u05E3 \u05DC\u05D1\u05DF/\u05D1\u05EA \u05D4\u05D6\u05D5\u05D2",
    checked: plan === 'year',
    onChange: () => setPlan('year')
  })), /*#__PURE__*/React.createElement(Card, {
    tone: plan === 'month' ? 'gold' : 'hairline',
    padding: "16px",
    onClick: () => setPlan('month'),
    interactive: true
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "plan",
    label: "\u05D7\u05D5\u05D3\u05E9\u05D9 \xB7 \u20AA26",
    description: "\u05DC\u05DC\u05D0 \u05D4\u05EA\u05D7\u05D9\u05D9\u05D1\u05D5\u05EA, \u05D1\u05D9\u05D8\u05D5\u05DC \u05D1\u05DB\u05DC \u05E2\u05EA",
    checked: plan === 'month',
    onChange: () => setPlan('month')
  })))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u05D0\u05E0\u05D9 \u05DE\u05D0\u05E9\u05E8/\u05EA \u05D0\u05EA \u05EA\u05E7\u05E0\u05D5\u05DF \u05D4\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF \u05D5\u05D0\u05EA \u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05D4\u05E4\u05E8\u05D8\u05D9\u05D5\u05EA",
    checked: terms,
    onChange: e => setTerms(e.target.checked)
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: () => setDone(true)
  }, "\u05E9\u05DC\u05D9\u05D7\u05EA \u05D1\u05E7\u05E9\u05D4 \u05D5\u05D4\u05D6\u05DE\u05E0\u05EA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--color-mute)',
      textAlign: 'center'
    }
  }, "\u05D1\u05DB\u05E4\u05D5\u05E3 \u05DC\u05EA\u05E7\u05E0\u05D5\u05DF \u05D4\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF. \u05D8.\u05DC.\u05D7."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'sticky',
      top: 104
    }
  }, /*#__PURE__*/React.createElement(MemberCard, {
    width: 380,
    holder: name ? name + ' ישראלי' : 'השם שלכם כאן',
    tier: plan === 'year' ? 'מנוי שנתי' : 'מנוי חודשי'
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "badge-percent"
  }, "5% \u05D1\u05DB\u05DC \u05E7\u05E0\u05D9\u05D9\u05D4"), [['truck', 'משלוח הכרטיס עד הבית'], ['users', 'כרטיס נוסף לבן/בת הזוג במסלול השנתי'], ['wallet', 'מעקב חיסכון באזור האישי'], ['shield-check', 'ביטול בכל עת, ללא קנס']].map(([i, t]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 18,
    color: "var(--color-primary-deep)"
  }), t)))))), /*#__PURE__*/React.createElement(Dialog, {
    open: done,
    title: "\u05D4\u05D1\u05E7\u05E9\u05D4 \u05D4\u05EA\u05E7\u05D1\u05DC\u05D4",
    description: "\u05E0\u05E6\u05D9\u05D2 \u05DE\u05D4\u05DE\u05D5\u05E2\u05D3\u05D5\u05DF \u05D9\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05DC\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05E4\u05E8\u05D8\u05D9\u05DD, \u05D5\u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D9\u05D9\u05E9\u05DC\u05D7 \u05D0\u05DC\u05D9\u05DB\u05DD \u05EA\u05D5\u05DA 5 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD.",
    onClose: () => setDone(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setDone(false);
        go('partners');
      }
    }, "\u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D1\u05EA\u05D9 \u05D4\u05E2\u05E1\u05E7"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDone(false)
    }, "\u05E1\u05D2\u05D9\u05E8\u05D4"))
  }));
}
Object.assign(window, {
  SiteJoin
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-join.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-partners.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Tag,
  PartnerTile,
  Input,
  Button,
  EmptyState,
  Badge
} = window.HadranClubDesignSystem_16539e;
function SitePartners({
  go
}) {
  const cats = ['הכל', 'רשתות מזון', 'ביגוד והנעלה', 'ספרי קודש', 'צעצועים ומתנות', 'ריהוט לבית', 'בריאות ואופטיקה', 'אירועים'];
  const [cat, setCat] = React.useState('הכל');
  const [q, setQ] = React.useState('');
  const list = PARTNERS.filter(p => (cat === 'הכל' || p.category === cat) && p.name.includes(q));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-canvas-soft)',
      padding: '48px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 56,
      lineHeight: 1.06,
      margin: 0
    }
  }, "\u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \u05E9\u05D5\u05EA\u05E4\u05D9\u05DD"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      color: 'var(--color-body)'
    }
  }, "312 \u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7 \xB7 \u05D4\u05E0\u05D7\u05D4 \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA \u05D1\u05E7\u05D5\u05E4\u05D4 \u05E2\u05DD \u05D4\u05E6\u05D2\u05EA \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1")), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D9\u05EA \u05E2\u05E1\u05E7",
    icon: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 320
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: c === cat,
    onClick: () => setCat(c)
  }, c))))), /*#__PURE__*/React.createElement(Band, null, list.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, list.map(p => /*#__PURE__*/React.createElement(PartnerTile, _extends({
    key: p.name
  }, p)))) : /*#__PURE__*/React.createElement(EmptyState, {
    icon: "store",
    title: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7",
    description: "\u05E0\u05E1\u05D5 \u05E9\u05DD \u05D0\u05D7\u05E8 \u05D0\u05D5 \u05D1\u05D7\u05E8\u05D5 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D0\u05D7\u05E8\u05EA.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "tertiary",
      size: "sm",
      onClick: () => {
        setQ('');
        setCat('הכל');
      }
    }, "\u05D0\u05D9\u05E4\u05D5\u05E1 \u05D7\u05D9\u05E4\u05D5\u05E9")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: 'var(--color-canvas-soft)',
      borderRadius: 24,
      padding: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "store"
  }, "\u05D1\u05E2\u05DC\u05D9 \u05E2\u05E1\u05E7?"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 18,
      fontWeight: 600
    }
  }, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DB\u05D1\u05D9\u05EA \u05E2\u05E1\u05E7 \u05E9\u05D5\u05EA\u05E3 \u05D5\u05E7\u05D1\u05DC\u05D5 \u05D7\u05E9\u05D9\u05E4\u05D4 \u05DC-24,800 \u05DE\u05E9\u05E4\u05D7\u05D5\u05EA."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "\u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05DC\u05D1\u05EA\u05D9 \u05E2\u05E1\u05E7"))));
}
Object.assign(window, {
  SitePartners
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-partners.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-shared.jsx
try { (() => {
const {
  Icon
} = window.HadranClubDesignSystem_16539e;
function Band({
  tone = 'white',
  children,
  style
}) {
  const bg = {
    white: 'var(--color-canvas)',
    sand: 'var(--color-canvas-soft)',
    ink: 'var(--color-canvas-ink)'
  }[tone];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      padding: '48px 24px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, children));
}
function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'start'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 720,
      marginBottom: 32,
      textAlign: align,
      marginInline: align === 'center' ? 'auto' : undefined
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '.08em',
      color: 'var(--color-primary-deep)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1.12,
      letterSpacing: '-.01em',
      margin: 0
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      lineHeight: 1.6,
      color: 'var(--color-body)'
    }
  }, lead) : null);
}
function Bullet({
  icon,
  title,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      background: 'var(--color-primary-pale)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22,
    color: "var(--color-primary-deep)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 18
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-body)',
      fontSize: 15,
      lineHeight: 1.6
    }
  }, text)));
}
const PARTNERS = [{
  name: 'רשת יש חסד',
  category: 'רשתות מזון',
  discount: '5%'
}, {
  name: 'מרכז המזון הדר',
  category: 'רשתות מזון',
  discount: '5%'
}, {
  name: 'ביגוד הדר',
  category: 'ביגוד והנעלה',
  discount: '7%'
}, {
  name: 'נעלי שוורץ',
  category: 'ביגוד והנעלה',
  discount: '5%'
}, {
  name: 'ספרי אור החיים',
  category: 'ספרי קודש',
  discount: '10%'
}, {
  name: 'צעצועי גן עדן',
  category: 'צעצועים ומתנות',
  discount: '5%'
}, {
  name: 'רהיטי לוי',
  category: 'ריהוט לבית',
  discount: '5%'
}, {
  name: 'אופטיקה כהן',
  category: 'בריאות ואופטיקה',
  discount: '8%'
}, {
  name: 'קייטרינג שבע ברכות',
  category: 'אירועים',
  discount: '5%'
}];
Object.assign(window, {
  Band,
  SectionHead,
  Bullet,
  PARTNERS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BenefitRow = __ds_scope.BenefitRow;

__ds_ns.MemberCard = __ds_scope.MemberCard;

__ds_ns.PartnerTile = __ds_scope.PartnerTile;

__ds_ns.SavingsMeter = __ds_scope.SavingsMeter;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
