import dotenv from 'dotenv'
dotenv.config()

export const FRONTEND_DIR_NAME = 'path-to-frontend'

export const isProd = () => {
  const args = process.argv.slice(2)
  return args.includes('-prod-db')
}

export const SECRET_JWT = {
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
}

export const PORT = process.env.PORT || (isProd() ? 443 : 5000)
// const { DB_USER, DB_TEST_PASS, DB_PROD_PASS } = process.env
// const DB_TEST_URL = `mongodb+srv://${DB_USER}:${DB_TEST_PASS}@mongo_db_url`
// const DB_PROD_URL = `mongodb+srv://${DB_USER}:${DB_PROD_PASS}@mongo_db_url`

// export const DB_URL = isProd() ? DB_PROD_URL : DB_TEST_URL