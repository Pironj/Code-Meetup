import React, { Component } from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
//import '@lls/react-light-calendar/dist/index.css';
import "./index.css"

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
    // 'rlc-day-selected': !endDate && (startDate === day),

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


// class OnChange extends Component {
//   constructor(props) {
//     super(props)
//     const date = new Date()
//     const startDate = date.getTime()
//     this.state = {
//       startDate,
//       endDate: new Date(startDate).setDate(date.getDate() + 6)
//     }
//   }

//   onChange = (startDate, endDate) => this.setState({ startDate, endDate })

//   render = () => {
//     const { startDate, endDate } = this.state
//     const sDecompose = t.decompose(startDate)
//     const eDecompose = t.decompose(endDate)
//     const sDate = `${sDecompose[0]}/${sDecompose[1]}/${sDecompose[2]} ${sDecompose[3]}:${sDecompose[4]}`
//     const eDate = `${eDecompose[0]}/${eDecompose[1]}/${eDecompose[2]} ${eDecompose[3]}:${eDecompose[4]}`

//     return (
//       <div>
//         <Calendar startDate={startDate} endDate={endDate} onChange={this.onChange} displayTime />
//         <div key='start-date'>START DATE : {startDate && sDate}</div>
//         <div key='end-date'>END DATE : {endDate && eDate}</div>
//       </div>
//     )
//   }
// }