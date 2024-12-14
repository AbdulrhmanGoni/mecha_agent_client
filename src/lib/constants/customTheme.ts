
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const customTheme: CustomThemeConfig = {
    name: 'custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "8px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255",
        "--on-secondary": "255 255 255",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #1c71d8 
        "--color-primary-50": "221 234 249", // #ddeaf9
        "--color-primary-100": "210 227 247", // #d2e3f7
        "--color-primary-200": "198 220 245", // #c6dcf5
        "--color-primary-300": "164 198 239", // #a4c6ef
        "--color-primary-400": "96 156 228", // #609ce4
        "--color-primary-500": "28 113 216", // #1c71d8
        "--color-primary-600": "25 102 194", // #1966c2
        "--color-primary-700": "21 85 162", // #1555a2
        "--color-primary-800": "17 68 130", // #114482
        "--color-primary-900": "14 55 106", // #0e376a
        // secondary | #4F46E5 
        "--color-secondary-50": "229 227 251", // #e5e3fb
        "--color-secondary-100": "220 218 250", // #dcdafa
        "--color-secondary-200": "211 209 249", // #d3d1f9
        "--color-secondary-300": "185 181 245", // #b9b5f5
        "--color-secondary-400": "132 126 237", // #847eed
        "--color-secondary-500": "79 70 229", // #4F46E5
        "--color-secondary-600": "71 63 206", // #473fce
        "--color-secondary-700": "59 53 172", // #3b35ac
        "--color-secondary-800": "47 42 137", // #2f2a89
        "--color-secondary-900": "39 34 112", // #272270
        // tertiary | #0EA5E9 
        "--color-tertiary-50": "219 242 252", // #dbf2fc
        "--color-tertiary-100": "207 237 251", // #cfedfb
        "--color-tertiary-200": "195 233 250", // #c3e9fa
        "--color-tertiary-300": "159 219 246", // #9fdbf6
        "--color-tertiary-400": "86 192 240", // #56c0f0
        "--color-tertiary-500": "14 165 233", // #0EA5E9
        "--color-tertiary-600": "13 149 210", // #0d95d2
        "--color-tertiary-700": "11 124 175", // #0b7caf
        "--color-tertiary-800": "8 99 140", // #08638c
        "--color-tertiary-900": "7 81 114", // #075172
        // success | #42ff00 
        "--color-success-50": "227 255 217", // #e3ffd9
        "--color-success-100": "217 255 204", // #d9ffcc
        "--color-success-200": "208 255 191", // #d0ffbf
        "--color-success-300": "179 255 153", // #b3ff99
        "--color-success-400": "123 255 77", // #7bff4d
        "--color-success-500": "66 255 0", // #42ff00
        "--color-success-600": "59 230 0", // #3be600
        "--color-success-700": "50 191 0", // #32bf00
        "--color-success-800": "40 153 0", // #289900
        "--color-success-900": "32 125 0", // #207d00
        // warning | #e5a50a 
        "--color-warning-50": "251 242 218", // #fbf2da
        "--color-warning-100": "250 237 206", // #faedce
        "--color-warning-200": "249 233 194", // #f9e9c2
        "--color-warning-300": "245 219 157", // #f5db9d
        "--color-warning-400": "237 192 84", // #edc054
        "--color-warning-500": "229 165 10", // #e5a50a
        "--color-warning-600": "206 149 9", // #ce9509
        "--color-warning-700": "172 124 8", // #ac7c08
        "--color-warning-800": "137 99 6", // #896306
        "--color-warning-900": "112 81 5", // #705105
        // error | #e01b24 
        "--color-error-50": "250 221 222", // #faddde
        "--color-error-100": "249 209 211", // #f9d1d3
        "--color-error-200": "247 198 200", // #f7c6c8
        "--color-error-300": "243 164 167", // #f3a4a7
        "--color-error-400": "233 95 102", // #e95f66
        "--color-error-500": "224 27 36", // #e01b24
        "--color-error-600": "202 24 32", // #ca1820
        "--color-error-700": "168 20 27", // #a8141b
        "--color-error-800": "134 16 22", // #861016
        "--color-error-900": "110 13 18", // #6e0d12
        // surface | #1a2131 
        "--color-surface-50": "221 222 224", // #dddee0
        "--color-surface-100": "209 211 214", // #d1d3d6
        "--color-surface-200": "198 200 204", // #c6c8cc
        "--color-surface-300": "163 166 173", // #a3a6ad
        "--color-surface-400": "95 100 111", // #5f646f
        "--color-surface-500": "26 33 49", // #1a2131
        "--color-surface-600": "23 30 44", // #171e2c
        "--color-surface-700": "20 25 37", // #141925
        "--color-surface-800": "16 20 29", // #10141d
        "--color-surface-900": "13 16 24", // #0d1018
    }
}