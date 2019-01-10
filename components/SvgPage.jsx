import React from 'react'
import * as d3 from 'd3'
export class SvgPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 1,
      chartData: [],
      timer: null,
    }
  }
  getData (count) {
    let max = count
    let chartData = [...this.state.chartData]
    let value = this.state.value
    if (chartData.length > max) {
      chartData.splice(0, chartData.length - max)
    }
    let inc = -25 + Math.random() * 50
    if (value < 50) {
      inc = Math.random() * 50
    }
    value = value + inc
    chartData.push(value)
    this.setState({
      value: value,
      chartData: chartData
    })
  }

  getLineData () {
    let chartData = []
    let data = []
    //  Inspired by Lee Byron’s test data generator. - http://  leebyron.com/streamgraph/
    let m = 300
    let count = 300
    for (let i = 0; i < m; ++i) {
      data[i] = 0.1 + 0.1 * Math.random()
    }
    //  5 bumps
    count = 15
    let final = []
    while (count--) {
      let x = 1 / (0.1 + Math.random())
      let y = 2 * Math.random() - 0.5
      let z = 10 / (0.1 + Math.random())
      for (let i = 0; i < m; i++) {
        let w = (i / m - y) * z
        data[i] += x * Math.exp(-w * w)
        final[m - i] = { date: Date.now() - 1000 * i, value: data[i], }
      }
    }

    let value = this.state.value
    chartData = [...final]
    this.setState({
      value: value,
      chartData: chartData
    })
  }
  getSmooth () {
    let d = 0.1 + 0.1 * Math.random()
    let x = 1 / (0.1 + Math.random())
    let y = 2 * Math.random() - 0.5
    let z = 10 / (0.1 + Math.random())
    let w = (1 / 300 - y) * z
    d += x * Math.exp(-w * w)
    return d
  }

  appendLineData () {
    let chartData = [...this.state.chartData]
    let value = this.state.value
    if (chartData.length >= 300) {
      chartData.splice(0, chartData.length - 299)
    }
    value = this.getSmooth()
    chartData.push({ date: Date.now(), value: value })
    this.setState({
      value: value,
      chartData: chartData
    })
  }
  getSvg () {
    let svg = d3.select('#bar').select('svg')
    if (!svg._groups[0][0]) { //  append the first time
      svg = d3.select('#bar').append('svg')
    } else {
      svg.selectAll('*').remove()//  turf the children
    }
    return svg
  }
  chart () {
    this.appendLineData()
    let data = [...this.state.chartData]
    let svgW = window.innerWidth * 0.75
    let svgH = window.innerHeight * 0.75
    let margin = { top: 20, right: 20, bottom: 30, left: 50 }
    let w = svgW - margin.left - margin.right
    let h = svgH - margin.top - margin.bottom

    let svg = this.getSvg()
    svg.attr('width', svgW).attr('height', svgH)
    //  create group
    let g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    //  create scales
    let x = d3.scaleTime().rangeRound([0, w])
    let y = d3.scaleLinear().rangeRound([h, 0])
    //  create line
    let line = d3.line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
    //  update scale domains
    x.domain(d3.extent(data, (d) => d.date))
    y.domain(d3.extent(data, (d) => d.value))
    //  define axies
    let xAxisCall = d3.axisBottom()
    let yAxisCall = d3.axisLeft()
    //  set axis scales
    xAxisCall.scale(x)
    yAxisCall.scale(y)
    //  append x axis
    g.append('g')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxisCall)
      .select('.domain')
      .remove()
    //  append y axis
    g.append('g')
      .call(yAxisCall)
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)')
    //  append line
    g.append('path')
      .datum(data)
      .attr('fill', 'rgba(255,0,0,0.3)')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }

  componentWillMount () {
    this.getLineData()
  }
  componentDidMount () {
    let timer = setInterval(() => {
      this.chart()
    }, 1000)
    this.setState({ timer: timer })
  }
  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
  render () {
    return (
      <div>
        <h1>SVG chart with D3</h1>
        <div id='bar'></div>
      </div>)
  }
}
export default SvgPage
