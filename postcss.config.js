//  https://www.cnblogs.com/scale/p/18539376
const postcssDiscardComments = require('postcss-discard-comments');
// const postcssPxToViewport = require('postcss-px-to-viewport-8-plugin');
 
 

module.exports = {
  plugins: [
 
  
    'postcss-reporter',
    'postcss-cssnext',
    // postcss 插件，用于变基 URL（）、内联或复制资源。
    'postcss-url',
    'cssnano',
    // 'postcss-preset-env',
    // 'autoprefixer',
    'postcss-import',
    // 'tailwindcss',

    // 以 Sass 的方式解包嵌套规则。
    'postcss-nested',

    "@tailwindcss/postcss",

    postcssDiscardComments({
      remove: (comment) => comment.includes('some-keyword'),
    }),

    // postcssPxToViewport({
    //   // maxViewportWidth: 300, // 设置最大视口宽度
    //   maxViewportWidth: 750, // 设置最大视口宽度，超出此宽度的`px`不会转换（可选）
    //   maxDisplayWidth: 750,
    //   unitToConvert: 'px', // 要转化的单位
    //   viewportWidth: 375, // UI设计稿的宽度
    //   unitPrecision: 6, // 转换后的精度，即小数点位数
    //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
    //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
    //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //   replace: true, // 是否转换后直接更换属性值
    //   exclude: [/node_modules/, /ReactRangePicker/g, ], // 设置忽略文件，用正则做目录名匹配
    //   selectorBlackList: ['.ant-table-content'], // 忽略的选择器，类名中包含这个选择器的不会被转换
    //   landscape: false, // 是否处理横屏情况
      
      
    //   // landscapeUnit: 'vw', //横屏时使用的单位
    //   // landscapeWidth: 1134 //横屏时使用的视口宽度
    // }),
  ],
};
