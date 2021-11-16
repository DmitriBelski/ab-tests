import { StatusOrder } from 'services/models/Status'
import { FullTest, TestHeaders } from 'services/models/Test'

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

const isNumberTuple = (arr: unknown[]): arr is number[] => {
  return arr.length === 2 && typeof arr[0] === 'number' && typeof arr[1] === 'number'
}

const isStringTuple = (arr: unknown[]): arr is string[] => {
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

const prepareElement = (element: FullTest, tag: TestHeaders): number | string => {
  switch (tag) {
    case 'name':
    case 'type':
    case 'site':
      return element[tag] || ''
    case 'status':
      return StatusOrder.findIndex(order => order === element[tag])
    default:
      return 0
  }
}

export const sort = (array: FullTest[], tag: TestHeaders, order: OrderBy): FullTest[] => {
  const result = [...array] as Array<FullTest>
  return result.sort((a, b) => {
    const first = prepareElement(a, tag)
    const second = prepareElement(b, tag)
    const prepared = prepareCompare(uniCompare, order)
    return prepared(first, second)
  })
}

// const sort = (array: FullTest[], tag: TestTableHeaders, order: OrderBy) => {
//   const result = [...array] as Array<FullTest>
//   return result.sort((a, b) => {
//     const first: string = a[tag] || ''
//     const second: string = b[tag] || ''
//     switch (order) {
//       case OrderBy.ASC:
//         return first.localeCompare(second)
//       case OrderBy.DESC:
//         return second.localeCompare(first)
//       default:
//         return 0
//     }
//   })
// }

// const sortStatus = (array: FullTest[], tag: TestTableHeaders, order: OrderBy) => {
//   const result = [...array] as Array<FullTest>
//   return result.sort((a, b) => {
//     const first: number = StatusOrder.findIndex(order => order === a[tag])
//     const second: number = StatusOrder.findIndex(order => order === b[tag])
//     switch (order) {
//       case OrderBy.ASC:
//         return first - second
//       case OrderBy.DESC:
//         return second - first
//       default:
//         return 0
//     }
//   })
// }

// if (type.tag === 'status') {
//   result = sortStatus(tests, type.tag, type.order)
// } else {
//   result = sort(tests, type.tag, type.order)
// }
