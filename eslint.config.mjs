import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat configs, so they are spread directly rather
 * than routed through @eslint/eslintrc's FlatCompat (which throws on this config).
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      // Handoff prototypes — kept verbatim as the visual reference, not linted.
      "project/**",
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // The brand SVG lockups are intentionally <img>: they are tiny, must not be
      // re-encoded, and next/image adds nothing for them.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
