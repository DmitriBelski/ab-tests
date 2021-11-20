function refineUrl (string: string): string {
  const url = new URL(string)
  return url.hostname.replace('www.', '')
}

export default refineUrl
