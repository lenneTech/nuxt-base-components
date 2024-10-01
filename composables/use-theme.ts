export interface Color {
    [key: string]: string;
}

interface HSL {
    h: number;
    l: number;
    s: number;
}

interface Shade {
    lightness: number;
    name: number | string;
}

export function useTheme() {
    function setThemeColor(colorPalette: Color) {
        if (!colorPalette['50']) {
            return undefined;
        }

        const cssVars = `
      :root {
        --primary-50: ${colorPalette['50']} !important;
        --primary-100: ${colorPalette['100']} !important;
        --primary-200: ${colorPalette['200']} !important;
        --primary-300: ${colorPalette['300']} !important;
        --primary-400: ${colorPalette['400']} !important;
        --primary-500: ${colorPalette['500']} !important;
        --primary-600: ${colorPalette['600']} !important;
        --primary-700: ${colorPalette['700']} !important;
        --primary-800: ${colorPalette['800']} !important;
        --primary-900: ${colorPalette['900']} !important;
        --primary-950: ${colorPalette['950']} !important;
      }
    `;

        return cssVars;
    }

    function hexToRgb(hex: string) {
        // Remove the leading hash if it's there
        hex = hex.replace(/^#/, '');

        // Parse the hex string into RGB components
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return [r, g, b];
    }

    function luminance(r: number, g: number, b: number) {
        const a = [r, g, b].map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function setBlack(hexColor: string) {
        const [r, g, b] = hexToRgb(hexColor);
        const lum = luminance(r, g, b);

        // This threshold is commonly used to decide text color based on background luminance
        return lum > 0.179;
    }

    function hexToHSL(hex: string): HSL {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || [];
        try {
            let r = parseInt(result[1], 16);
            let g = parseInt(result[2], 16);
            let b = parseInt(result[3], 16);
            (r /= 255), (g /= 255), (b /= 255);
            const max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            let h = 0,
                s,
                l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            const HSL: HSL = {h: 0, l: 0, s: 0};
            HSL.h = Math.round(h * 360);
            HSL.s = Math.round(s * 100);
            HSL.l = Math.round(l * 100);
            return HSL;
        } catch (error) {
            return {h: 0, l: 0, s: 0};
        }
    }

    function hslToHEX({h, l, s}: HSL): string {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, '0'); // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function generateColor({hex, preserve, shades}: { hex: string; preserve: boolean; shades: Shade[] }): Color {
        // convert hex to hsl
        const colorHSL = hexToHSL(hex);

        // initiate shade object
        const obj: Color = {};

        // initiate lightnessDelta object
        const lightnessDelta: { [key: string]: number } = {};

        // generate shades
        shades.forEach(({lightness, name}: Shade) => {
            // deconstruct h & s
            const {h, l, s} = colorHSL;

            // generate shade hsl
            const hsl: HSL = {h, l: lightness, s};

            // update shade object
            obj[name] = hslToHEX(hsl);

            // update lightnessDelta if preserving color
            if (preserve) {
                lightnessDelta[name] = Math.abs(l - lightness);
            }
        });

        // if preserving color, inject original color
        if (preserve) {
            const [closestShade] = Object.keys(lightnessDelta).sort((a, b) => lightnessDelta[a] - lightnessDelta[b]);
            obj[closestShade] = hex;
        }

        return obj;
    }

    function generateColorPalette(primary: string): Color {
        const preserve: boolean = true;
        const shades: Shade[] = [
            {lightness: 96.8, name: '50'},
            {lightness: 93.5, name: '100'},
            {lightness: 85.5, name: '200'},
            {lightness: 73, name: '300'},
            {lightness: 58.6, name: '400'},
            {lightness: 46, name: '500'},
            {lightness: 39, name: '600'},
            {lightness: 30, name: '700'},
            {lightness: 27, name: '800'},
            {lightness: 19, name: '900'},
            {lightness: 16, name: '950'},
        ];

        // generate palette
        return generateColor({hex: primary, preserve, shades});
    }

    function calculateHueRotate(startHex: string, targetHex: string) {
        const startHsl = hexToHSL(startHex);
        const targetHsl = hexToHSL(targetHex);
        let hueDifference = targetHsl.h - startHsl.h;
        if (hueDifference < 0) {
            hueDifference += 360;
        }

        return hueDifference;
    }

    return {
        calculateHueRotate,
        generateColorPalette,
        setBlack,
        setThemeColor,
    };
}
