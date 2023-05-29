import { CallableString } from './utils'

export const SECRET_JWT = new CallableString({
  key: 'some-secret-key',
  num: Date.now(),
  increment() {
    this.num = Date.now()
    console.log(this.num)
  },
  toString() {
    const string = this.key + '-' + this.num
    return string
  },
})

// SECRET_JWT.num
