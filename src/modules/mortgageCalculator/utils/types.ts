export type FormItem = {
  name: string
  preLabel?: string | undefined
  postLabel?: string | undefined
  label: string
  cols?: 1 | 2 | 3
  required?: boolean
  type?: string
  options?: string[]
  step?: string | undefined
}