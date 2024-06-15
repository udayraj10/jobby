import {Component} from 'react'
import Header from '../Header'
import Button from '../Button'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-bg">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reveiws. Find the job that fits your abilities and
            potential.
          </p>
          <Button>Find Jobs</Button>
        </div>
      </>
    )
  }
}

export default Home
