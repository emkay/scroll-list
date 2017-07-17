const html = require('bel')
const ScrollList = require('.')
const sl = new ScrollList()

const root = html`<ul></ul>`
const data = []

for (var i = 0; i < 10000; i++) {
  data.push(html`<li>Here is a dang element ${i}</li>`)
}

let batch = 500
let index = 0

const el = sl.render({
  root,
  data,
  batch,
  index
})

document.body.appendChild(el)
