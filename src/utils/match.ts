export const matchRating = (search: string, array: string[]): number[] => {
  return array.map(value => {
    return value
      .toLowerCase()
      .indexOf(search?.toLowerCase())
  })
}

export const filterPositiveRating = (rating: number[]): number[] => {
  return rating.filter(rate => rate >= 0)
}

export const filterByPositiveRating = <T>(array: T[], rating: number[]): T[] => {
  return array.filter((_, i) => rating[i] >= 0)
}
