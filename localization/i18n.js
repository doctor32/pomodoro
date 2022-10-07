import messages from './msg.js'

const i18n = {

  locales: [
    {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png',
      code: "en",
      name: "English"
    },
    {
      flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png',
      code: "ru",
      name: "Russian"
    },
    {
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/2560px-Flag_of_Ukraine.svg.png',
      code: "ua",
      name: "Ukrainian"
    }
  ],
  defaultLocale: "ru",
  vueI18n: {
    fallbackLocale: "en",
    messages
  }
}

export default i18n