import React from 'react'
import WithRouter from '../context/WithRouter'
import WithToaster from '../context/WithToaster'
import CalendarView from './CalendarView'
import { ApiUrl } from '../Api'
import { Color } from '../Colors'

class CRMCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarData: [],
        }
    }
    componentDidMount() {
        this.fetchCurrentMonthTask();
    }
    fetchCurrentMonthTask = async () => {
        try {
            await fetch(`${ApiUrl.url}/CRM/FetchCurrMonthTasks`)
                .then(res => res.json())
                .then(json => {
                    if (json.data) {
                        this.setState({
                            calendarData: json.data,
                        })
                    }
                });
        } catch (e) {

        }
    }
    render() {
        return (
            <CalendarView
                data={this.state.calendarData}
                bgColor={Color.crmPrimary}
                color={Color.whiteFont}
            />
        )
    }
}

export default WithRouter(WithToaster(CRMCalendar))
