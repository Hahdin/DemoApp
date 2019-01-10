/* eslint-env node, mocha */
import React from 'react'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
export class CheckPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleRequest = this.handleRequest.bind(this)
    this.checkDomain = this.checkDomain.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      domain: null,
      res: {
        text: '',
        status: null,
      }
    }
  }
  componentDidMount () {
    document.addEventListener('fetch', event => {
      this.handleRequest(event.custom_object)
    })
  }
  async handleRequest (request) {
    // console.log('#', request)
    let headers = new Headers({

      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*'
    })
    //  const SECURE_RESPONSE = new Response('secure', { status: 200, headers: headers })
    //  const INSECURE_RESPONSE = new Response('not secure', { status: 200, headers: headers })
    //  const NO_SUCH_SITE = new Response('website not found', { status: 200, headers: headers })
    //  let domain = new URL(request.domain).searchParams.get('domain')
    let domain = new URL(request.domain)
    if (domain === null) {
      this.setState({
        res: {
          text: 'Please pass in domain via query string',
          status: 404,
          headers: null,
        }
      })
      return new Response('Please pass in domain via query string', { status: 404 })
    }
    try {
      let text = null
      let status = 404
      // let resp = await window.fetch(`http://${domain}`, { headers: { 'User-Agent': request.headers.get('User-Agent') } })
      let resp = await window.fetch(domain.href, {
        headers: {

          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*'
        }
      })
      if (resp.redirected === true && resp.url.startsWith('https')) {
        text = 'SECURE_RESPONSE'
        status = 200
      } else if (resp.redirected === false && resp.status === 502) {
        text = 'NO_SUCH_SITE'
        status = 200
      } else {
        text = 'INSECURE_RESPONSE'
        status = 200
      }
      this.setState({
        res: {
          text: text,
          status: status,
          headers: headers
        }
      })
    } catch (e) {
      // console.warn(e)
      return new Response(`Something went wrong ${e}`, { status: 404 })
    }
  }
  componentWillUnmount () {
  }
  async checkDomain () {
    try{
      let p = await window.fetch(this.state.domain).catch(reason => {
        return reason
      })
      let ce = new Event('fetch', { bubbles: true })
      ce.custom_object = p
      ce.custom_object.domain = this.state.domain
      document.getElementById('event_').dispatchEvent(ce)
      return p
    }
    catch(e){
      return e
    }
}
  handleChange (e) {
    this.setState({ domain: e.target.value })
  }
  render () {
    return (
      <div id='event_' >
        <form>
          <FormGroup>
            <ControlLabel>Enter Domain to Test</ControlLabel>
            <FormControl
              type="text"
              value={this.state.domain}
              placeholder="Enter domain"
              onChange={(e) => this.handleChange(e)}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <Button bsStyle="danger" onClick={() => this.checkDomain()}>Check</Button>
        <div>
          {this.state.res.text}
          {this.state.res.status}
          {this.state.res.headers}
        </div>
      </div>
    )
  }
}
export default CheckPage
