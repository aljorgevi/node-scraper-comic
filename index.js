import fs from 'fs-extra'
import axios from 'axios'

const { writeJSON } = fs

const INITIAL_ID_XKCD_COMIC = 2500
const MAX_ID_XKCD_COMIC = 2505

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`

  const { data } = await axios.get(url)
  const { num, news, transcript, ...resOfComic } = data

  const comicToStore = {
    id,
    ...resOfComic,
  }

  await writeJSON(`./comics/${id}.json`, comicToStore)
  console.log(data)
}
