import langs from 'langs'

export const convertCodeToLang = (code: string): string => {
  const lang = langs.where('1', code)
  if (lang) {
    const langName = lang.name
    return langName
  } else {
    return 'No information'
  }
}
