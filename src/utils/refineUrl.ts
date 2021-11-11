function refineUrl (string: string): string {
  const re = /^http(s)?:\/\/(www\.)?/
  return string.replace(re, '')
}

export default refineUrl
