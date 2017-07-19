const microcomponent = require('microcomponent')
const html = require('bel')

const IntersectionObserver = window.IntersectionObserver

class ScrollList {
  constructor (opts) {
    opts = opts || {}
    opts.root = opts.root || 'ul'

    const selector = opts.root === 'ul' ? 'li' : 'tr'

    const component = microcomponent({
      state: {
        // loaded: false,
        root: opts.root,
        selector
      }
    })
    component.on('render', this.render)
    component.on('update', this._update)
    component.on('load', this._load)

    return component
  }

  render () {
    const {batch, data, index} = this.props
    const {root, selector} = this.state

    this.state.batch = batch
    this.state.index = index
    this.state.data = data

    const visibleData = data.slice(0, batch + index)

    switch (root) {
      case 'ul':
        this.state.node = html`<ul>${visibleData.map(el => el)}</ul>`
        break
      case 'tbody':
        this.state.node = html`<tbody>${visibleData.map(el => el)}</tbody>`
        break
      default:
        throw new Error('`root` element should be either ul or tbody')
    }

    if (this.state.lastNode) {
      const newNodes = this.state.node.querySelectorAll(selector)
      const newLastNode = newNodes[newNodes.length - 5]
      this.state.io.observe(newLastNode)
      this.state.io.unobserve(this.state.lastNode)
      this.state.lastNode = newLastNode
    }

    // @TODO: in some situations `load` is not being emitted.
    // if (!this.state.loaded) this._load()

    return this.state.node
  }

  _update (props) {
    return (props.index !== this.props.index) ||
      (props.data.length !== this.props.data.length)
  }

  _load () {
    // this.state.loaded = true
    const {selector} = this.state
    const nodes = this.state.node.querySelectorAll(selector)
    this.state.lastNode = nodes[nodes.length - 5]

    this.state.io = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        // @TODO: prune nodes above
        if (entry.isIntersecting) {
          this.render({
            data: this.state.data,
            batch: this.state.batch,
            index: this.state.index + this.state.batch
          })
        }
      })

    this.state.io.observe(this.state.lastNode)
  }
}

module.exports = ScrollList
