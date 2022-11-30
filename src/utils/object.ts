export const addWhen = (condition: any, value: any) => {
  if (Array.isArray(value)) return condition ? value : []
  return condition ? [value] : []
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
