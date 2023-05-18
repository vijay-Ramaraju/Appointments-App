// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, starStatusChange} = props
  const {id, title, date, isStar} = appointmentDetails
  const dateType = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starImage = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onSelectStart = () => {
    starStatusChange(id)
  }

  return (
    <li className="card-style">
      <div className="card-title-star-style">
        <p className="title-text-style">{title}</p>
        <button
          data-testid="star"
          onClick={onSelectStart}
          className="star-button"
          type="button"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date-text-style">{dateType}</p>
    </li>
  )
}

export default AppointmentItem
