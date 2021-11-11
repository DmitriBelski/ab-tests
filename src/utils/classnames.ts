function classnames (classObj: Record<string, boolean>) {
  return Object.entries(classObj)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => key)
    .join(' ')
}

export default classnames
