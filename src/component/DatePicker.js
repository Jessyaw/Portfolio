import { forwardRef, useEffect, useState } from 'react';
import { Color } from '../Colors';

const DatePicker = forwardRef((props, ref) => {

    const [week, setWeek] = useState([
        { id: 1, week: 'Sun', isHover: false, isSelect: false },
        { id: 2, week: 'Mon', isHover: false, isSelect: false },
        { id: 3, week: 'Tue', isHover: false, isSelect: false },
        { id: 4, week: 'Wed', isHover: false, isSelect: false },
        { id: 5, week: 'Thu', isHover: false, isSelect: false },
        { id: 6, week: 'Fri', isHover: false, isSelect: false },
        { id: 7, week: 'Sat', isHover: false, isSelect: false },
    ]);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [monthMenu, setMonthMenu] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(month[new Date().getMonth()]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [YearMenu, setYearMenu] = useState(false);
    useEffect(() => {
        initializeDate();
    }, [])
    const getDaysINMonth = (mon, year) => {
        return new Date(year, mon + 1, 0).getDate();
    }
    const getStartDay = (mon, year) => {
        return new Date(year, mon, 1).getDay();
    }

    const initializeDate = () => {
        let Month = new Date().getMonth();
        let Year = new Date().getFullYear();
        const daysInMonth = getDaysINMonth(new Date().getMonth(), new Date().getFullYear())
        const startDay = getStartDay(new Date().getMonth(), new Date().getFullYear())


        var days = Array.from({ length: daysInMonth }, (i, ind) => ({
            day: ind + 1,
            isHover: false,
            isSelect: false,
        }))

        for (let i = 0; i < startDay; i++) {
            days.unshift({ empty: true });
        }
        setDays(days)
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const result = [];
        if (props.isDOB) {
            for (let i = 0; i < 12; i++) {
                let mon = month[i];
                result.push({ id: i + 1, month: mon })
            }
            setMonths(result)
        } else {
            for (let i = 0; i < 12; i++) {
                const date = new Date(Year, Month + i, 1);
                let mon = month[date.getMonth()];
                let year = date.getFullYear();
                result.push({ id: i + 1, month: mon, year: year })
            }
            setMonths(result)
        }
        //Year list
        const yearCurrent = new Date().getFullYear();
        const years = [];
        for (let i = yearCurrent; i >= yearCurrent - 120; i--) {
            years.push(i);
        }
        setYears(years)

    }
    const getDaysInMonth = (month, year) => {
        const daysInMonth = getDaysINMonth(month, year)
        const startDay = getStartDay(month, year)

        var days = Array.from({ length: daysInMonth }, (i, ind) => ({
            day: ind + 1,
            isHover: false,
            isSelect: false,
        }))

        for (let i = 0; i < startDay; i++) {
            days.unshift({ empty: true });
        }
        setDays(days)
    }
    const handleClickDay = (item) => {
        const day = days.map(i => ({
            ...i, isSelect: i.day == item.day
        }))
        setDays(day)
        setCurrentDate(item.day)

    }
    const handleHoverDay = (item) => {
        const day = days.map(i => ({
            ...i, isHover: i.day == item.day
        }))
        setDays(day)
    }
    const handleMouseLeaveDay = (item) => {
        const day = days.map(i => ({
            ...i, isHover: false
        }))
        setDays(day)
    }
    const openMonthMenu = () => {
        setMonthMenu(monthMenu ? false : true);
        setYearMenu(false);
    }
    const openYearMenu = () => {
        setYearMenu(YearMenu ? false : true);
        setMonthMenu(false);
    }
    const handleMonthSelection = (item) => {
        if (props.isDOB) {
            setCurrentMonth(item.month)
            getDaysInMonth(item.id - 1, currentYear);
        } else {
            setCurrentMonth(item.month)
            setCurrentYear(item.year)
            getDaysInMonth(item.id + 5, item.year);
        }
        setMonthMenu(false);
    }


    const handleSave = () => {
        props.onSave(currentDate, currentMonth, currentYear);
    }


    const handleYearSelction = (i) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = months.findIndex(m =>
            m.toLowerCase() === currentMonth.toLowerCase()
        )
        setCurrentYear(i)
        getDaysInMonth(month, i)
        setYearMenu(YearMenu ? false : true);
    }

    return (
        <div style={{ padding: '12px', borderRadius: '7px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: Color.whiteFont, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', }}>
            {/* Month */}
            <div style={{ display: 'flex', fontSize: '12px', }}>

                <div style={{ flex: 2, position: 'relative', }}>
                    <div style={{ display: 'flex', }}>
                        <div style={{ fontWeight: '500', fontSize: '16px', padding: '7px', borderRadius: '7px', color: Color.theme }}>
                            {currentDate}
                        </div>
                        <div
                            onClick={openMonthMenu}
                            style={{ fontWeight: '500', fontSize: '16px', cursor: 'pointer', backgroundColor: Color.FlightTredheme, padding: '7px', borderRadius: '7px', color: Color.theme }}>
                            <div> {currentMonth}</div>

                        </div>
                        <div style={{ position: 'relative', }}>
                            <div
                                onClick={props.isDOB && openYearMenu}
                                style={{ fontWeight: '500', fontSize: '16px', cursor: props.isDOB && 'pointer', padding: '7px', borderRadius: '7px', color: Color.theme }}>
                                {currentYear}
                            </div>
                            {YearMenu &&
                                <div className='year-menu' style={{}}>
                                    {years?.map(i =>
                                        <div className='year-menuOption' onClick={() => handleYearSelction(i)}> {i}</div>
                                    )}
                                </div>

                            }
                        </div>
                    </div>

                    {monthMenu && <div style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'absolute', backgroundColor: Color.whiteFont, borderRadius: '7px' }}>
                        {months?.map(i =>
                            <div
                                onClick={() => handleMonthSelection(i)}
                                style={{ display: 'flex', cursor: 'pointer' }}>
                                <div className='month-menu'>{i.month}</div>
                            </div>
                        )}
                    </div>}
                </div>
                <div
                    onClick={handleSave}
                    style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ border: 'none', backgroundColor: Color.theme, color: Color.whiteFont, borderRadius: '7px', padding: '0px 7px', cursor: 'pointer' }}>save</button>
                </div>
            </div>
            {/* Week */}
            <div className='calendar-grid' style={{ fontSize: '10px', color: Color.grey }}>
                {week?.map(i =>
                    <div>{i.week}</div>
                )}
            </div>
            {/* Days */}
            <div className='calendar-grid' style={{ fontSize: '10px', fontWeight: 'bold', }}>
                {days?.map(i =>
                    <div
                        onClick={() => handleClickDay(i)}
                        onMouseOver={() => handleHoverDay(i)}
                        onMouseLeave={() => handleMouseLeaveDay(i)}
                        style={{
                            color: i.day == new Date().getDate() ? Color.green : i.isSelect ? Color.whiteFont : Color.blackFont,
                            cursor: 'pointer',
                            backgroundColor: i.isSelect ? Color.blackFont : i.isHover ? Color.FlightTheme : Color.whiteFont,
                            padding: '1px', borderRadius: '3px',
                        }}>{i.day}</div>
                )}
            </div>
        </div>
    )
})

export default DatePicker;
