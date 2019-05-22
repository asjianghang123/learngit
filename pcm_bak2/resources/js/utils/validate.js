export function isvalidUsername(str) {
  // return /^[a-zA-Z][a-zA-Z0-9]{3,15}/.test(str)
  return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}