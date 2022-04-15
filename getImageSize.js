import { get } from 'https'
import sizeOf from 'image-size'

export const getImageSize = ({ url }) => {
  return new Promise(resolve => {
    get(url, response => {
      const chunks = []
      response
        .on('data', chunk => {
          chunks.push(chunk)
        })
        .on('end', () => {
          const buffer = Buffer.concat(chunks)
          const { height, width } = sizeOf(buffer)

          resolve({ height, width })
        })
    })
  })
}
