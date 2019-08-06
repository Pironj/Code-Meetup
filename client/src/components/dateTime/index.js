import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import  React from 'react';
import { Component } from 'react';
import './index.css';




class Date extends Component {
  render() {
    return <DateTimePickerComponent id="datetimepicker" placeholder="Select a date and time"/>;
    
}
}

export default Date;