import React from 'react'
import WithRouter from '../context/WithRouter'
import WithToaster from '../context/WithToaster'
import CalendarView from './CalendarView'
import { ApiUrl } from '../Api'
import { Color } from '../Colors'
import { ApiCall } from '../ApiCall'


class CRMCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarData: [],
        }
    }
    componentDidMount() {
        let i = JSON.parse(sessionStorage.getItem("data"))
        let data = {
            roleID: i?.roleID,
            userID: i?.id,
            teamID: i?.teamID
        }
        this.fetchCurrentMonthTask(data);
    }
    fetchCurrentMonthTask = async (data) => {
        try {
            const json = await ApiCall(`${ApiUrl.url}/CRM/FetchCurrMonthTasks`, 'POST', data);
            if (json.status === 'S') {
                this.props.toast.show('S', json.message);
                this.setState({
                    calendarData: json.data,
                })
            }
            else {
                this.props.toast.show('F', json.message);
            }

        } catch (e) {
            this.props.toast.show('F', e.message);
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
