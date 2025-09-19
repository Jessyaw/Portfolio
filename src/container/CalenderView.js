import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { db } from '../dexie/DB'
import { BiLeftArrow } from 'react-icons/bi'
import { decryption } from '../dexie/EncodeDecode'


class CalenderView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: [
                { id: 1, day: 'Sun', isMarked: false },
                { id: 2, day: 'Mon', isMarked: false },
                { id: 3, day: 'Tue', isMarked: false },
                { id: 4, day: 'Wed', isMarked: false },
                { id: 5, day: 'Thu', isMarked: false },
                { id: 6, day: 'Fri', isMarked: false },
                { id: 7, day: 'Sat', isMarked: false },
            ],
            monthlyTasks: [],
            taskMenu: [
                { id: 1, isOpen: false, },
            ],
        }
    }
    componentDidMount() {
        this.fetchThisMonthData();
    }

    fetchThisMonthData = async () => {
        try {
            var data = await db.Tasks?.toArray();
            let decode = await decryption(data);

            let month = new Date().getMonth();
            let year = new Date().getFullYear();

            let thisMonth = decode?.filter(i => {
                const newDay = new Date(i.date);
                return newDay.getMonth() === month && newDay.getFullYear() === year;
            })

            const daysInMonth = this.getDaysINMonth(new Date().getMonth(), new Date().getFullYear())
            const startDay = this.getStartDay(new Date().getMonth(), new Date().getFullYear())

            var days = Array.from({ length: daysInMonth }, (i, index) => ({
                days: index + 1,
                tasks: [],
                isOpenMenu: false,
                isHover: false,
            }));
            for (let i = 0; i < startDay; i++) {
                days.unshift({ empty: true })
            }
            thisMonth?.map(i => {
                const newDay = new Date(i.date).getDate();
                let dayEntry = days.find(d => d.days === newDay);
                if (dayEntry) {
                    dayEntry.tasks.push(i)
                }
            })

            this.setState({
                monthlyTasks: days,
            })
        } catch (e) {

        }

    }

    markdate = () => {
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let today = day[new Date().getDay()];
        this.setState(prevState => {
            const updatedDays = prevState.days.map(i => {
                return { ...i, isMarked: today === i.day }
            })
            return { days: updatedDays }
        })


    }
    getDaysINMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }
    getStartDay = (month, year) => {
        return new Date(year, month, 1).getDay();
    }
    handleTodaysTask = (item) => {
        if (item.tasks.length > 0) {

            this.setState({
                monthlyTasks: this.state.monthlyTasks.map(i => {
                    return { ...i, isOpenMenu: i.days == item.days }
                })
            })

        }
    }
    redirectToTaskManager = () => {
        this.props.navigate('/taskManager');

    }
    render() {
        const today = new Date().getDate();
        const daysInMonth = this.getDaysINMonth(new Date().getMonth(), new Date().getFullYear())
        const startDay = this.getStartDay(new Date().getMonth(), new Date().getFullYear())

        const days = []
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`}> </div>)
        }
        for (let d = 1; d <= daysInMonth; d++) {
            days.push(<div key={d}>{d}</div>)
        }

        return (
            <div>

                <div style={{ backgroundColor: Color.whiteFont, width: '90%', padding: '3%', margin: '12px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', fontSize: '25px', margin: '0px 0px 25px 0px' }}>Calender View</div>
                        <div
                            onClick={this.redirectToTaskManager}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.blackFont, margin: '7px', padding: '7px', borderRadius: '7px', color: Color.whiteFont }}>
                            <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                            <div> Back</div>

                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px', textAlign: 'center', alignContent: 'center' }}>
                        {this.state.days.length > 0 && this.state.days.map(i =>
                            <div style={{
                                width: '100%', color: i.isMarked ? Color.yellow : Color.grey, fontSize: '14px', margin: '0px 0px 25px'
                            }}>{i.day}</div>
                        )}
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7,1fr)',
                        gap: '4px',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {this.state.monthlyTasks.map((i, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        padding: '34px 0px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}>

                                    {i.isOpenMenu && i?.tasks?.length > 0 &&
                                        <div className='calendar-popup'>
                                            {i?.tasks?.map(j => <div className='calendar-menu'>{j.task}</div>)}
                                        </div>}
                                    <div
                                        key={i.id}
                                        onClick={() => i.tasks?.length > 0 && this.handleTodaysTask(i)}
                                        style={{
                                            background: i.tasks?.length > 0 && Color.yellow,
                                            height: i.tasks?.length > 0 && '50px',
                                            width: i.tasks?.length > 0 && '50px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: i.tasks?.length > 0 && '25px',
                                            cursor: 'pointer',
                                        }}>
                                        {i.empty ? "" : i.days}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default WithRouter(CalenderView)