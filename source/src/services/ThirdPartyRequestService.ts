import https from 'https'

class ThirdPartyRequestService {
  constructor() {}

  async get<T = any>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      https.get(url, (result) => {
        let data: any[] = []

        result.on('data', (chunk) => {
          data.push(chunk)
        })

        result
          .on('end', () => {
            const receivedData: T = JSON.parse(Buffer.concat(data).toString())
            resolve(receivedData)
          })
          .on('error', (err) => {
            console.error('Third party request error: ', err.message)
            reject(err)
          })
      })
    })
  }
}

const thirdPartyRequestService = new ThirdPartyRequestService()

export default thirdPartyRequestService
