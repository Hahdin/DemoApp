import React from 'react'
import * as d3 from 'd3'
export class SunMoonPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      radius: 0,
      radii: {
        sun: 0,
        earthOrbit: 0,
        earth: 0,
        moonOrbit: 0,
        moon: 0,
      },
      container: null,
      timer: null,
    }
  }
  componentWillMount() {
    //init state
    let w = window.innerWidth * .75
    let h = window.innerHeight * .75
    let r = Math.min(w, h)
    let rr = {
      sun: r / 8,
      earthOrbit: r / 2.5,
      earth: r / 32,
      moonOrbit: r / 16,
      moon: r / 96,
    }

    this.setState({
      width: w,
      height: h,
      radius: r,
      radii: { ...rr },
      //svg: d3.select('space').append('svg')
    })
  }
  componentDidMount() {
    this.draw()
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  draw() {
    //Space
    let svg = d3.select('#space').append('svg')
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .append('g')
      .attr('transform', 'translate(' + this.state.width / 2 + ',' + this.state.height / 2 + ')')
    // Sun
    svg.append('circle')
      .attr('class', 'sun')
      .style('background', '#dff0d8')
      .attr('r', this.state.radii.sun)
      .attr('fill', 'rgba(255, 204, 0, 1.0)')

    // Earth's orbit
    svg.append('circle')
      .attr('class', 'earthOrbit')
      .attr('r', this.state.radii.earthOrbit)
      .style('fill', 'none')
      .style('stroke', 'rgba(255, 204, 0, 0.25)')
    // Current position of Earth in its orbit
    let earthOrbitPosition = d3.arc()
      .outerRadius(this.state.radii.earthOrbit + 1)
      .innerRadius(this.state.radii.earthOrbit - 1)
      .startAngle(0)
      .endAngle(0)


    svg.append('path')
      .attr('class', 'earthOrbitPosition')
      .attr('d', earthOrbitPosition)
      .style('fill', 'rgba(255, 0, 0, 0.75)')

    // Earth
    svg.append('circle')
      .attr('class', 'earth')
      .attr('r', this.state.radii.earth)
      .attr('transform', 'translate(0,' + -this.state.radii.earthOrbit + ')')
      .style('fill', 'rgba(113, 170, 255, 1.0)');
    // Time of day
    let day = d3.arc()
      .outerRadius(this.state.radii.earth)
      .innerRadius(0)
      .startAngle(0)
      .endAngle(0)
    svg.append('path')
      .attr('class', 'day')
      .attr('d', day)
      .attr('transform', 'translate(0,' + -this.state.radii.earthOrbit + ')')
      .style('fill', 'rgba(53, 110, 195, 1.0)')
    //Moon's orbit
    svg.append('circle')
      .attr('class', 'moonOrbit')
      .attr('r', this.state.radii.moonOrbit)
      .attr('transform', 'translate(0,' + -this.state.radii.earthOrbit + ')')
      .style('fill', 'none')
      .style('stroke', 'rgba(113, 170, 255, 0.25)')
    // Current position of the Moon in its orbit
    let moonOrbitPosition = d3.arc()
      .outerRadius(this.state.radii.moonOrbit + 1)
      .innerRadius(this.state.radii.moonOrbit - 1)
      .startAngle(0)
      .endAngle(0)
    svg.append('path')
      .attr('class', 'moonOrbitPosition')
      .attr('d', moonOrbitPosition)
      .attr('transform', 'translate(0,' + -this.state.radii.earthOrbit + ')')
      .style('fill', 'rgba(113, 170, 255, 0.75)')
    // Moon
    svg.append('circle')
      .attr('class', 'moon')
      .attr('r', this.state.radii.moon)
      .attr('transform', 'translate(0,' + (-this.state.radii.earthOrbit + -this.state.radii.moonOrbit) + ')')
      .style('fill', 'rgba(150, 150, 150, 1.0)')

    let timer = setInterval(() => {
      //let now = new Date(Date.now() - (new Date().getTimezoneOffset() * 60 * 1000))
      let now = new Date()
      let interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(),
        (2 * Math.PI * d3.timeHours(d3.timeYear.floor(now), now).length / d3.timeHours(d3.timeYear.floor(now), d3.timeYear.ceil(now)).length))
      let interpolateDay = d3.interpolate(day.endAngle()(),
        (2 * Math.PI * d3.timeSeconds(d3.timeDay.floor(now), now).length / d3.timeSeconds(d3.timeDay.floor(now), d3.timeDay.ceil(now)).length))
      let interpolateMoonOrbitPosition = d3.interpolate(moonOrbitPosition.endAngle()(),
        (2 * Math.PI * d3.timeHours(d3.timeMonth.floor(now), now).length / d3.timeHours(d3.timeMonth.floor(now), d3.timeMonth.ceil(now)).length))
      d3.transition().tween('orbit', () => {
        return (t) => {
          // Animate Earth orbit position
          d3.select('.earthOrbitPosition')
            .attr('d', earthOrbitPosition.endAngle(interpolateEarthOrbitPosition(t)));

          // Transition Earth
          d3.select('.earth')
            .attr('transform', 'translate(' +
              this.state.radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
              ',' + -this.state.radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ')')

          // Animate day
          // Transition day
          d3.select('.day')
            .attr('d', day.endAngle(interpolateDay(t)))
            .attr('transform', 'translate(' +
              this.state.radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
              ',' + -this.state.radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ')')

          // Transition Moon orbit
          d3.select('.moonOrbit')
            .attr('transform', 'translate(' +
              this.state.radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
              ',' + -this.state.radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ')')

          // Animate Moon orbit position
          // Transition Moon orbit position
          d3.select('.moonOrbitPosition')
            .attr('d', moonOrbitPosition.endAngle(interpolateMoonOrbitPosition(t)))
            .attr('transform', 'translate(' +
              this.state.radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
              ',' + -this.state.radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ')');

          // Transition Moon
          d3.select('.moon')
            .attr('transform', 'translate(' +
              (this.state.radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
                this.state.radii.moonOrbit * Math.sin(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + ','
              + (-this.state.radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) +
                -this.state.radii.moonOrbit * Math.cos(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + ')')
        }
      })
    }, 1000)
    this.setState({timer: timer})
  }
  render() {
    return (
      <div id='space'></div>
    )
  }
}
export default SunMoonPage
