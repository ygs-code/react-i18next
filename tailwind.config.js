/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
// const tailwind3Colors = require('tailwindcss3/defaultTheme').colors
// const PurgeCSS = require("purgecss").default;

function withConverterToPX(length) {
    const tempTailor = {}

    if (length) {
        Array.from({ length }, (_, i) => (tempTailor[i] = `${i}px`))
    }

    return tempTailor
}
/**
 * TailwindCSS https://tailwindcss.com/docs/installation
 * https://tailwind.nodejs.cn/docs/adding-custom-styles
 * https://blog.csdn.net/2301_76403820/article/details/131770683
 */

let config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    // 增加此配置让所有Tailwind CSS样式增加!important后辍达到提高样式优先级
    important: true,
    // content: ["./client/**/*.{js,jsx}", "./client/public/index.html"],
    //   purge: ["./src/**/*.{js,ts,jsx,tsx}", ],
    darkMode: 'class',
    theme: {
        screens: {
            xxs: '0px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            lsg: '900px',
            lg: '1024px',
            xl: '1280px',
            xsl: '1440px',
            xxl: '1536px',
            // xxl: '1536px',

            // sm：640px 及以上（小型设备，如手机横屏）
            // md：768px 及以上（中型设备，如平板竖屏）
            // lg：1024px 及以上（大型设备，如平板横屏、小型笔记本）
            // xl：1280px 及以上（特大设备，如桌面显示器）
            // 2xl：1536px 及以上（超大设备，如大尺寸桌面显示器）
        },

        extend: {
            colors: {
                // tw3: tailwind3Colors,
                ['theme-color']: 'rgb(110, 78, 230)',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            // backgroundImage: {
            //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            // },
            // animation: {
            //     'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            //     float: 'float 3s ease-in-out infinite',
            //     'gradient-shift': 'gradient-shift 15s ease infinite',
            //     typing: 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
            //     'particle-float': 'particle-float 4s linear infinite',
            //     glitch: 'glitch 1s, blur 0.2s ease-out',
            // },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                // 'marquee-scroll': {
                //     '0%': { transform: 'translateX(0)' },
                //     '100%': { transform: 'translateX(-50%)' },
                // },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },

                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                        boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
                    },
                    '50%': {
                        opacity: '0.8',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                'blink-caret': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#3b82f6' },
                },
                'particle-float': {
                    '0%': {
                        transform: 'translateY(0px) rotate(0deg)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateY(-100px) rotate(360deg)',
                        opacity: '0',
                    },
                },
                glitch: {
                    '0%': {
                        textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00',
                    },
                    '15%': {
                        textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00',
                    },
                    '16%': {
                        textShadow: '-0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00',
                    },
                    '49%': {
                        textShadow: '-0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00',
                    },
                    '50%': {
                        textShadow: '0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00',
                    },
                    '99%': {
                        textShadow: '0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00',
                    },
                    '100%': {
                        textShadow: '-0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff, -0.04em -0.025em 0 #fffc00',
                    },
                },
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                float: 'float 3s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 15s ease infinite',
                typing: 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
                'particle-float': 'particle-float 4s linear infinite',
                glitch: 'glitch 1s, blur 0.2s ease-out',

                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                // 'marquee-scroll': 'marquee-scroll 40s linear infinite',
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
                'marquee-infinite': 'marquee 25s linear infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'grid-white':
                    'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                'grid-black':
                    'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
            },
        },

        /**
         * 项目中使用
         * ### <div className="pt-10 m-21 ml-2 mt-33 h-40 font-16"></div>
         */
        // spacing: withConverterToPX(600),
        // colors: {
        //     ...colors,
        //     ['theme-color']: 'rgb(110, 78, 230)',
        //     // gray: colors.coolGray,
        //     // blue: colors.lightBlue,
        //     // red: colors.rose,
        //     // pink: colors.fuchsia,
        //     // ...antdTheme,
        // },

        /**
         * 字体规范
         * http://fed.lzstack.com/visual/font
         */
        // fontSize: {
        //   sm: ["12px", "20px"],
        //   base: ["14px", "22px"],
        //   lg: ["16px", "24px"],
        //   xl: ["20px", "28px"],
        //   "2xl": ["24px", "32px"],
        //   "3xl": ["28px", "36px"],
        //   "4xl": ["32px", "40px"],
        //   "5xl": ["36px", "44px"],
        //   "6xl": ["48px", "56px"]
        // },

        // fontFamily: {
        //   sans: [
        //     "PingFang SC",
        //     "PingFangSC-Regular",
        //     "Microsoft YaHei",
        //     "Lucida Console",
        //     "Arial",
        //     "sans-serif"
        //   ]
        // }
    },
    plugins: [
        // require('postcss-import'),
        // require('tailwindcss-animate'),
        (await import('tailwindcss-animate')).default,
        // // require("tailwindcss"),
    ],
    corePlugins: {
        preflight: false,
    },
}

// config = {
//   ...config,
//   theme: {
//     ...defaultConfig.theme,
//     ...config.theme
//   }
// };

module.exports = config
