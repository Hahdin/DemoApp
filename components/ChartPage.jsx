import React from 'react'
import {GoogleCharts} from 'google-charts'
export class ChartPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      data: null,
      chart: null,
      max: 240,
    }
    this.drawChart = this.drawChart.bind(this)
    this.getData = this.getData.bind(this)
    this.addData = this.addData.bind(this)
  }
  componentWillMount() {
  }
  componentDidMount(){
    //Load the charts library with a callback
    GoogleCharts.load(this.drawChart)
    let t = setInterval(() =>{
      this.drawChart()
    }, 1000)
    this.setState({timer: t})
  }

  getData(headings){
    if (this.state.data){
      return this.addData()
    }
    let count = this.state.max
    let i = 0
    let data = []
    while(count--){
      let s1 = 100000 + (-10000 + Math.random() * 20000)
      let s2 = 110000 + (-10000 + Math.random() * 20000)
      //first 300 seconds ago
      data[i++] = [new Date(Date.now() - (count * 1000)), s1, s2 ]
    }
    data.unshift(headings)
    this.setState({ data: data  })
    return data
  }
  addData(){
    let data = this.state.data
    if (data.length >= this.state.max){
      data.splice(1, data.length - (this.state.max - 1))//start at 1, don't remove header
    }
    let s1 = 100000 + (-10000 + Math.random() * 20000)
    let s2 = 110000 + (-10000 + Math.random() * 20000)
    data.push( [new Date(Date.now()), s1, s2 ])
    this.setState({data: data})
    return data
  }

  drawChart() {
    if ( this.state.chart){
      this.state.chart.clearChart()
      delete this.state.chart
      this.setState({chart: null})
    }
    let raw = this.getData([{label: 'Time', type: 'date'}, {label: 'Sensor1', type: 'number'}, {label: 'Sensor2', type: 'number'}])
    const data = GoogleCharts.api.visualization.arrayToDataTable(raw)
    let options = {
      title: 'Your Sensor Readings',
      // width: window.innerWidth *.75,
      //height: window.innerHeight ,
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: {
        format: 'HH:mm:ss',
        gridlines: {
          color: '#ff00ff',
          count: 3
        },
        minorGridlines: {
          color: '#0000ff',
          count: 6
        }
      },
      vAxis: {
        minValue: 80000,
       // ticks: [0,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000],
        gridlines: {
          color: '#ff0000',
          count: 100,

        },
        minorGridlines: {
          color: '#00ff00',
          count: -1
        }
      }
    };
    let chart = new google.visualization.LineChart(document.getElementById('gchart'));
    //let chart = new google.visualization.AreaChart(document.getElementById('gchart'));
    chart.draw(data, options)
    this.setState({chart: chart})
  }

  componentWillUnmount() {
    if (this.state.timer) { 
      clearInterval(this.state.timer)
    }
  }
  render(){
    return (
      <div id='gchart'></div>
    )
  }
}
