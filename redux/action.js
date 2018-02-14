const action = (type, options) => {
  return {
    type: type,
    ...options
  }
}

export { action }