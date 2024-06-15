import './index.css'

const Button = props => {
  const {children} = props
  return (
    <button type="button" className="btn-style">
      {children}
    </button>
  )
}

export default Button
