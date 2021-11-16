import { FullTest } from 'services/models/Test'

export const matchRating = (search: string, array: string[]): number[] => {
  return array.map(value => {
    return value
      .toLowerCase()
      .indexOf(search?.toLowerCase())
  })
}

export const filterPositiveRating = (rating: number[]) => {
  return rating.filter(rate => rate >= 0)
}

export const filterByPositiveRating = (array: FullTest[], rating: number[]) => {
  return array.filter((_, i) => rating[i] >= 0)
}
