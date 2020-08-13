const markdownpdf = require("markdown-pdf")
const fs = require("fs")
const path = require('path')
class Walker {
  constructor(max) {
    this.tasks = []
    this.max = max
    this.count = 0
  }
  addTask(cb) {
    this.tasks.push(cb)
  }
  run() {
    for (let i = 0; i < this.max; i++) {
      this.next()
    }
  }
  next() {
    if (!this.tasks.length) {
      return
    }
    const cb = this.tasks.shift()
    const count = ++this.count
    console.log(`task${count} running`)
    return cb().catch(e => e).then(() => {
      console.log(`task${count} finished`)
      this.next()
    })
  }
}
const cwd = process.cwd()
if (!fs.existsSync(path.join(cwd, `/pdf`))) {
  fs.mkdirSync(path.join(cwd, `/pdf`))
}
const docBasePath = path.join(cwd, `/docs`)
const pdfBasePath = path.join(cwd, `/pdf`)
const walker = new Walker(20)
dfsGenerate('./')
function dfsGenerate(relativePath) {
  const parentPath = path.join(docBasePath, relativePath)
  const dirs = fs.readdirSync(parentPath)
  for (const dir of dirs) {
    const curPath = path.join(parentPath, dir)
    const pdfPath = path.join(pdfBasePath, relativePath, dir)
    if (fs.statSync(curPath).isDirectory()) {
      !fs.existsSync(pdfPath) && fs.mkdirSync(pdfPath)
      dfsGenerate(path.join(relativePath, dir))
    } else if (dir.endsWith('.md')) {
      walker.addTask(() =>
        new Promise((resolve, reject) => {
          const finalPdfPath = pdfPath.replace('.md', '.pdf')
          const writeStream = fs.createWriteStream(finalPdfPath)
          writeStream.on('finish', () => {
            resolve()
            console.log(`${finalPdfPath}写入完成`)
          })
          writeStream.on('error', () => {
            reject()
            console.log(`${finalPdfPath}写入失败`)
          })
          fs.createReadStream(curPath).pipe(markdownpdf())
            .pipe(writeStream)
        })
      )
    }
  }
}
walker.run()

