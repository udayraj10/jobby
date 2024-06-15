import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobList from '../JobList'
import FilterGroup from '../FilterGroup'
import FailureComponent from '../FailureComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsData: [],
    searchInput: '',
    salary: '',
    employmentList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {salary, employmentList, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentList.join(
      ',',
    )}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const updatedData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsData} = this.state

    const shouldshowJobsList = jobsData.length > 0

    return shouldshowJobsList ? (
      <div className="jobs-section">
        {jobsData.map(job => (
          <JobList jobDetails={job} key={job.id} />
        ))}
      </div>
    ) : (
      <div className="no-jobs-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-head">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return <FailureComponent />
      default:
        return null
    }
  }

  employmentItem = employmentValue => {
    const {employmentList} = this.state
    if (!employmentList.includes(employmentValue)) {
      this.setState(
        prevState => ({
          employmentList: [...prevState.employmentList, employmentValue],
        }),
        this.getJobs,
      )
    }
  }

  unCheckEmploymentItem = unCheckEmploymentValue => {
    const {employmentList} = this.state
    const updateList = employmentList.filter(
      item => item !== unCheckEmploymentValue,
    )

    this.setState({employmentList: updateList}, this.getJobs)
  }

  salaryItem = salaryValue => {
    this.setState({salary: salaryValue}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    this.getJobs()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="input-container">
        <input
          type="search"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
          className="search-input"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearchInput}
        >
          <BsSearch className="search-icon" />j
        </button>
      </div>
    )
  }

  render() {
    const {employmentList} = this.state
    console.log(employmentList)
    return (
      <>
        <Header />
        <div className="all-jobs-section">
          <FilterGroup
            salaryRangesList={salaryRangesList}
            salaryItem={this.salaryItem}
            employmentTypesList={employmentTypesList}
            employmentItem={this.employmentItem}
            unCheckEmploymentItem={this.unCheckEmploymentItem}
          />
          <div className="search-jobs-container">
            {this.renderSearchInput()}
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
