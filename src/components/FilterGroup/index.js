import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Button from '../Button'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {userDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profile = data.profile_details
      const updatedData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }

      this.setState({
        userDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-container">
      <Button>Retry</Button>
    </div>
  )

  renderProfileView = () => {
    const {userDetails} = this.state
    const {profileImageUrl, shortBio, name} = userDetails

    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeEmploymentType = event => {
    const {employmentItem, unCheckEmploymentItem} = this.props
    const employmentValue = event.target.value
    if (event.target.checked) {
      employmentItem(employmentValue)
    } else {
      unCheckEmploymentItem(employmentValue)
    }
  }

  renderEmploymentType = () => {
    const {employmentTypesList} = this.props

    return (
      <>
        <h1 className="salary-employment-head">Type of Employment</h1>
        <div className="salary-employment-container">
          {employmentTypesList.map(each => (
            <div className="salary-employment-item">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                onChange={this.onChangeEmploymentType}
              />
              <label
                htmlFor={each.employmentTypeId}
                className="salary-employment-label"
              >
                {each.label}
              </label>
            </div>
          ))}
        </div>
      </>
    )
  }

  onChangeSalary = event => {
    const {salaryItem} = this.props
    salaryItem(event.target.value)
  }

  renderSalaryView = () => {
    const {salaryRangesList} = this.props

    return (
      <>
        <h1 className="salary-employment-head">Salary Range</h1>
        <div className="salary-employment-container">
          {salaryRangesList.map(each => (
            <div className="salary-employment-item">
              <input
                type="radio"
                name="salary"
                id={each.salaryRangeId}
                onChange={this.onChangeSalary}
                value={each.salaryRangeId}
              />
              <label
                htmlFor={each.salaryRangeId}
                className="salary-employment-label"
              >
                {each.label}
              </label>
            </div>
          ))}
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="filter-container">
        <div className="profile-container">{this.renderProfile()}</div>
        <hr className="filter-seperator" />
        {this.renderEmploymentType()}
        <hr className="filter-seperator" />
        {this.renderSalaryView()}
      </div>
    )
  }
}

export default FilterGroup
