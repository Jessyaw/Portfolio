import React from 'react';
import WithRouter from '../context/WithRouter';
import { Color } from '../Colors';

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            calendar: [],
            screenWidth: window.innerWidth,
        };
    }

    componentDidMount() {
        this.buildCalendar(this.props?.data || []);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.buildCalendar(this.props?.data || []);
        }
    }

    buildCalendar = (data) => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        // ✅ Create actual days
        let days = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            tasks: [],
            isOpen: false
        }));

        // ✅ Add empty slots at start (NO unshift bug)
        const emptySlots = Array.from({ length: startDay }, () => ({
            empty: true,
            day: null,
            tasks: []
        }));

        let calendar = [...emptySlots, ...days];

        // ✅ Assign tasks correctly
        data.forEach(task => {
            const rawDate = task.date ?? task.dueDate;
            if (!rawDate) return;

            const d = new Date(rawDate);

            if (
                d.getFullYear() === year &&
                d.getMonth() === month
            ) {
                const taskDay = d.getDate();

                calendar = calendar.map(item => {
                    if (item.day === taskDay) {
                        return {
                            ...item,
                            tasks: [...item.tasks, task]
                        };
                    }
                    return item;
                });
            }
        });

        this.setState({ calendar });
    };

    handleClick = (clicked) => {
        if (!clicked.tasks.length) return;

        this.setState(prev => ({
            calendar: prev.calendar.map(d => ({
                ...d,
                isOpen: d.day === clicked.day ? !d.isOpen : false
            }))
        }));
    };

    render() {
        const today = new Date().getDate();

        return (
            <>
                <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                    Calendar View
                </div>

                {/* Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    textAlign: 'center',
                    marginBottom: 10
                }}>
                    {this.state.headerDays.map((d, i) => (
                        <div key={i} style={{ color: Color.grey }}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    gap: 6
                }}>
                    {this.state.calendar.map((item, index) => (
                        <div key={index} className='calendar-container center'>

                            {/* Popup */}
                            {item.isOpen && item.tasks.length > 0 && (
                                <div className="calendar-popup">
                                    {item.tasks.map((t, i) => (
                                        <div key={i} className="calendar-menu">
                                            {t.task ?? t.title}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Day Cell */}
                            <div
                                onClick={() => this.handleClick(item)}
                                className='center day-cell'
                                style={{
                                    width: this.state.screenWidth <= 892 ? item.tasks.length && 35 : item.tasks.length && 45,
                                    height: this.state.screenWidth <= 892 ? item.tasks.length && 35 : item.tasks.length && 45,
                                    borderRadius: item.tasks.length && '50%',
                                    background: item.tasks.length
                                        ? (this.props.bgColor || Color.yellow)
                                        : undefined,
                                    color: item.tasks.length
                                        ? (this.props.color || Color.blackFont)
                                        : item.day === today ? 'red' : 'none',
                                    cursor: item.tasks.length && 'pointer',
                                }}
                            >
                                {item.empty ? '' : item.day}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default WithRouter(CalendarView);