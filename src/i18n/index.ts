import i18next from "./i18next";
 

export  *  from  "./client";

// 如果不是客户端，则不导出
// export  *  from  "./server";

export  *  from  "./settings";

 
 
export default i18next;



// const loadedLanguages = [];

// function loadLanguageAsync(lang) {
//   if (!loadedLanguages.includes(lang)) {
//     return import(`./locales/${lang}.json`).then((messages) => {
//       i18next.addResourceBundle(lang, 'translation', messages.default);
//       loadedLanguages.push(lang);
//       i18next.changeLanguage(lang);
//     });
//   }
//   return Promise.resolve(i18next.changeLanguage(lang));
// }

// loadLanguageAsync('zh/zh')
// loadLanguageAsync(getLanguage())
