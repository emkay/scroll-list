const html = require('bel')
const ScrollList = require('.')
const sl = new ScrollList({
  root: 'tbody'
})

const data = []

for (var i = 0; i < 10000; i++) {
  data.push(html`<tr><td>dang element ${i}</td><td>another cell</td></tr>`)
}

const batch = 500
const index = 0

const el = sl.render({
  data,
  batch,
  index
})

const table = html`<table><thead><th>Message</th><th>Another Thing</th></table>`
table.appendChild(el)

document.body.appendChild(table)
