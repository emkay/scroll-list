const test = require('tape')
const html = require('bel')
const ScrollList = require('.')

test('basic', t => {
  const sl = new ScrollList()

  const data = []

  for (var i = 0; i < 10000; i++) {
    data.push(html`<li>dang element ${i}</li>`)
  }

  const batch = 500
  const index = 0

  const el = sl.render({
    data,
    batch,
    index
  })

  document.body.appendChild(el)
  t.pass('things seem ok yay!')
  t.end()
})

test('table test', t => {
  const sl = new ScrollList({
    root: 'tbody'
  })

  const data = []

  for (var i = 0; i < 10000; i++) {
    data.push(html`<tr><td>dang</td> <td>element ${i}</td></tr>`)
  }

  const batch = 500
  const index = 0

  const el = sl.render({
    data,
    batch,
    index
  })

  const table = html`<table></table>`
  table.appendChild(el)

  document.body.appendChild(table)
  t.pass('things seem ok yay!')
  t.end()
})

test('unsupported root node', t => {
  const sl = new ScrollList({root: 'p'})

  const data = []

  for (var i = 0; i < 10000; i++) {
    data.push(html`<li>dang element ${i}</li>`)
  }

  const batch = 500
  const index = 0

  const actual = () => {
    sl.render({
      data,
      batch,
      index
    })
  }

  t.throws(actual)
  t.end()
})
