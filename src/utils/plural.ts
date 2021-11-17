function plural (amount: number, unit: string): string {
  if (amount === 1) {
    return `${amount} ${unit}`
  }
  return `${amount} ${unit}s`
}

export default plural
