import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobList = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    id,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-list-container">
      <div className="company-logo-section">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-section">
          <h1 className="title">{title}</h1>
          <div className="rating-section">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-details-section">
        <div className="location-type">
          <div className="icon-section">
            <FaMapMarkerAlt className="icons" />
            <p className="location-job-type">{location}</p>
          </div>
          <div className="icon-section">
            <BsBriefcaseFill className="icons" />
            <p className="location-job-type">{employmentType}</p>
          </div>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="line" />
      <h1 className="description-head">Description</h1>
      <p className="description">{jobDescription}</p>
    </Link>
  )
}

export default JobList
