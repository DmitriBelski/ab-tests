export enum Type {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT'
}

type TypeFormatObject<T extends string> = Record<T, string>

export const typeFormat: TypeFormatObject<Type> = {
  [Type.CLASSIC]: 'Classic',
  [Type.MVT]: 'MVT',
  [Type.SERVER_SIDE]: 'Server-side'
}
