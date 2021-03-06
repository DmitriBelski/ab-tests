export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC'
}

type Reverse<T> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : []
type FlipArguments<T> = T extends (...args: infer P) => infer R
  ? P extends []
    ? () => R
    : (...args: Reverse<P>) => R
  : never

function flip<T extends Function> (func: T): FlipArguments<T> {
  return function () {
    return func(...Array.from(arguments).reverse())
  } as FlipArguments<T>
}

const uniCompare = (a: unknown, b: unknown): number => {
  const arr = [a, b]
  if (isNumberTuple(arr)) {
    const [a, b] = arr
    return a - b
  } else if (isStringTuple(arr)) {
    const [a, b] = arr
    return a.localeCompare(b)
  } else {
    return 0
  }
}

const isNumberTuple = (arr: unknown[]): arr is [number, number] => {
  return arr.length === 2 && typeof arr[0] === 'number' && typeof arr[1] === 'number'
}

const isStringTuple = (arr: unknown[]): arr is [string, string] => {
  return arr.length === 2 && typeof arr[0] === 'string' && typeof arr[1] === 'string'
}

const prepareCompare = <T extends Function>(func: T, order: OrderBy): T | FlipArguments<T> => {
  switch (order) {
    case OrderBy.ASC:
      return func
    case OrderBy.DESC:
      return flip(func)
  }
}

const prepareElement = <T>(element: T, key: keyof T, rule: string, rating?: number) => {
  switch (rule) {
    case 'name':
    case 'type':
    case 'site':
      return element[key]
    case 'status':
    case 'searched':
      return rating
  }
}

export const sort = <T>(array: T[], key: keyof T, rule: string, order: OrderBy, rating?: number[]): T[] => {
  const result = [...array] as Array<T>
  return result.sort((a, b) => {
    const first = prepareElement(a, key, rule, rating?.[array.indexOf(a)])
    const second = prepareElement(b, key, rule, rating?.[array.indexOf(b)])
    const prepared = prepareCompare(uniCompare, order)
    return prepared(first, second)
  })
}
