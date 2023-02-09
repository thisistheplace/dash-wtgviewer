export type Result = {
  value: number,
  color: string
}

export type ElementResults = {
  id: string,
  target: string,
  results: Result[]
}

export type Limits = {
  min: number,
  max: number
}

export type Results = {
  id: string,
  element_results: ElementResults[],
  limits?: Limits
}