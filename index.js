import fs from 'fs-extra'
import axios from 'axios'
import { getImageSize } from './getImageSize.js'
import { logger, time } from './logger.js'

const endtime = time()

const { writeJSON } = fs

const INITIAL_ID_XKCD_COMIC = 2500
const MAX_ID_XKCD_COMIC = 2588

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`
  logger(`Fetching ${url}...`)

  const { data } = await axios.get(url)
  const { num, news, transcript, img, ...resOfComic } = data
  logger(`Fetched comic #${num}. Getting image dimensions...`)
  const { height, width } = await getImageSize({ url: img })
  logger(`Got image dimensions: ${width}x${height}`)

  const comicToStore = {
    id,
    height,
    width,
    ...resOfComic,
  }

  const jsonFile = `./comics/${id}.json`
  await writeJSON(jsonFile, comicToStore)
  logger(`Wrote ${jsonFile}! 🎉\n`)
}

endtime()
