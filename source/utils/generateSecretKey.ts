import bcrypt from 'bcrypt'

export const generateSecretKey = () => {
  const key = Math.random().toString(36).slice(2)
  const saltRounds = 10
  const hashedKey = bcrypt.hashSync(key, saltRounds)
  return hashedKey
}
