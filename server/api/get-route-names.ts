import fs from "node:fs"
import path from "path"

export default defineEventHandler(async () => {
  let pages: string[] = []
  const pathToPages = path.join(process.cwd(), "/pages/")

  pages = fs.readdirSync(pathToPages)
  const names = pages.map((elem) => {
    if (elem == "index.vue") {
      return "/"
    } else {
      return path.parse(elem).name
    }
  })

  return names.sort()
})
