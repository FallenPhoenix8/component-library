import fs from "node:fs"
import path from "path"

export default defineEventHandler(async () => {
  let pages: string[] = []
  const pathToPages = path.join(process.cwd(), "/pages/")

  pages = fs.readdirSync(pathToPages)
  const names: { friendlyName: string; page: string }[] = []
  pages.map((elem) => {
    if (elem == "index.vue") {
      names.push({ page: "/", friendlyName: path.parse(elem).name })
    } else {
      names.push({
        friendlyName: path.parse(elem).name.replaceAll("-", " "),
        page: `/${path.parse(elem).name}`,
      })
    }
  })

  return names
})
