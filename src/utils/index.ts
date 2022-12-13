export class CallableString extends Function {
  [key: string]: any

  constructor(obj: { [key: string]: any; toString: () => string }) {
    super('return arguments.callee._call.apply(arguments.callee, arguments)')

    if (obj) {
      Object.keys(obj).forEach((key: string) => {
        this[key] = obj[key]
      })
    }
  }

  _call() {
    return this.toString()
  }
}
