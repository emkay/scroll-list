const microcomponent = require('microcomponent')
const html = require('bel')

class ScrollList {
  constructor () {
    const component = microcomponent()
    component.on('render', this.render)
    component.on('update', this.update)
    component.on('load', this.load)

    return component
  }

  render () {
    const {batch, data, index} = this.props

    this.state.batch = batch
    this.state.index = index
    this.state.data = data

    const visibleData = data.slice(0, batch + index)

    this.state.node = html`<ul>${visibleData.map(el => el)}</ul>`

    if (this.state.lastNode) {
      const newNodes = this.state.node.querySelectorAll('li')
      const newLastNode = newNodes[newNodes.length - 5]
      this.state.io.observe(newLastNode)
      this.state.io.unobserve(this.state.lastNode)
      this.state.lastNode = newLastNode
    }

    return this.state.node
  }

  update (props) {
    return props.index !== this.props.index
  }

  load () {
    const nodes = this.state.node.querySelectorAll('li')
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
