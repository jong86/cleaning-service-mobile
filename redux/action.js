export const action = (type, options) => {
  return {
    type: type,
    ...options
  }
}
