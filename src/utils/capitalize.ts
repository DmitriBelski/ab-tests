function capitalize<S extends string> (string: S): Capitalize<S> {
  const result = string.charAt(0).toUpperCase() + string.slice(1)
  return result as Capitalize<S>
}

export default capitalize
