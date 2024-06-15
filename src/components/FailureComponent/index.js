import Button from '../Button'
import './index.css'

const FailureComponent = () => (
  <div className="failure-section">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-view"
    />
    <h1 className="failure-head">Oops! Something Went Wrong</h1>
    <p className="failure-para">
      We cannot seem to find the page you are looking for.
    </p>
    <Button>Retry</Button>
  </div>
)

export default FailureComponent
