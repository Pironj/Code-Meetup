import React, { Component } from 'react'
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';







class Calendar extends Component {
  constructor(props) {
        super(props) 
          this.state = {
            dateValue: '',
          }
        }
        
  render() {
    return <CalendarComponent id="calendar" value={this.dateValue} />
    
}
}
// import React, { Component } from 'react'
// import ReactLightCalendar from '@lls/react-light-calendar'
// //import '@lls/react-light-calendar/dist/index.css';
// import "./index.css"

// const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// class Calendar extends Component {
//   constructor(props) {
//     super(props)
//     // Get initial startDate and endDate
//     this.state = {
//       startDate: props.startDate,
//       endDate: props.endDate
//     }
//   }

// // Updates state whenever date is changed
//   onChange = (startDate, endDate) =>
//     this.setState({ startDate, endDate })



//   render = () => {
//     const { startDate, endDate } = this.state

//     return (
//       <ReactLightCalendar
//         dayLabels={DAY_LABELS}
//         monthLabels={MONTH_LABELS}
//         onChange={this.onChange}
//         {...this.props} // Add parent's additionnal props
//         startDate={startDate}
      
//       />
//     )
//   }
// }

// export default Calendar


// // import React, { Component } from 'react'
// // import ReactLightCalendar from '@lls/react-light-calendar'
// // import '@lls/react-light-calendar/dist/index.css';

// // const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// // const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// // class Calendar extends Component {
// //   constructor(props) {
// //     super(props)
// //     // Get initial startDate and endDate
// //     this.state = {
// //       startDate: props.startDate,
// //       endDate: props.endDate,
// //       displayTime: props.displayTime
// //     }
// //   }

// //   onChange = (startDate, endDate, displayTime) =>
// //     this.setState({ startDate, endDate, displayTime })

// //   render = () => {
// //     const { startDate, endDate, displayTime } = this.state

// //     return (
// //       <ReactLightCalendar
// //         dayLabels={DAY_LABELS}
// //         monthLabels={MONTH_LABELS}
// //         onChange={this.onChange}
// //         {...this.props} // Add parent's additionnal props
// //         startDate={startDate}
// //         endDate={endDate}
// //         displayTime={displayTime}
// //       />
// //     )
// //   }
// // }

export default Calendar

