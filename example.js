const html = require('bel')
const ScrollList = require('.')
const sl = new ScrollList()

const data = []

for (var i = 0; i < 10000; i++) {
  data.push(html`<li>Here is a dang element ${i}</li>`)
}

const batch = 500
const index = 0

const el = sl.render({
  data,
  batch,
  index
})

document.body.appendChild(el)
