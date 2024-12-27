
interface CookieValue<TValue> {
  // serializer(value: TValue): string | undefined
  // deserializer(value: string): TValue
}

export class CounterCookieValue {
  value: string
  constructor(value: string) {
    this.value = value
  }
  getValue(): number {
    return parseInt(this.value)
  }
}