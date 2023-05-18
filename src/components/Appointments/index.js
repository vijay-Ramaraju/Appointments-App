// Write your code here

import {Component} from 'react'
import './index.css'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilteredList: false,
  }

  onStarFilter = () => {
    const {isFilteredList} = this.state

    this.setState(prevState => ({isFilteredList: !prevState.isFilteredList}))
  }

  starStatusChange = id => {
    const {appointmentList} = this.state
    this.setState(() => ({
      appointmentList: appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  onChangeTitle = event => {
    const {titleInput} = this.state
    this.setState({titleInput: event.target.value})
  }

  onDataChange = event => {
    const {dateInput} = this.state
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput, appointmentList} = this.state

    const newAppointmentList = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isStar: false,
      starFilter: true,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointmentList],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredList = () => {
    const {appointmentList, isFilteredList} = this.state

    if (isFilteredList) {
      return appointmentList.filter(each => each.isStar === true)
    }

    return appointmentList
  }

  render() {
    const {titleInput, dateInput, appointmentList} = this.state
    const filterAppointmentList = this.getFilteredList()

    return (
      <div className="main-container">
        <div className="sub-container">
          <h1>Add Appointment</h1>
          <div className="appoinment-container">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="text-description">
                TITLE
              </label>
              <input
                id="title"
                onChange={this.onChangeTitle}
                className="input-styles"
                type="text"
                placeholder="Title"
                value={titleInput}
              />

              <label htmlFor="date" className="text-description">
                DATE
              </label>
              <input
                id="date"
                onChange={this.onDataChange}
                className="input-styles"
                type="date"
                placeholder="dd/mm/yyyy"
                value={dateInput}
              />
              <div>
                <button className="button1" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              className="appoinment-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="fav-appointments">
            <h1 className="text">Appointments</h1>
            <button
              onClick={this.onStarFilter}
              className="start-button"
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="list-style-type">
            {filterAppointmentList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                starStatusChange={this.starStatusChange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
