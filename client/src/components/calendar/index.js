import React, { Component } from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css';

const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class Calendar extends Component {
  constructor(props) {
    super(props)
    // Get initial startDate and endDate
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate
    }
  }

  onChange = (startDate, endDate) =>
    this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
      <ReactLightCalendar
        dayLabels={DAY_LABELS}
        monthLabels={MONTH_LABELS}
        onChange={this.onChange}
        {...this.props} // Add parent's additionnal props
        startDate={startDate}
        endDate={endDate}
      />
    )
  }
}

export default Calendar