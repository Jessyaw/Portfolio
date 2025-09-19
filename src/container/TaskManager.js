import React, { Component, createRef } from 'react'
import { db } from '../dexie/DB'
import { Color } from '../Colors'
import { IoAddSharp } from 'react-icons/io5'
import { MdSettings } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { BiNotification } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import { BiLeftArrow } from 'react-icons/bi'
import WithRouter from '../navigate/WithRouter'
import { BiUpArrow } from 'react-icons/bi'
import { BiArrowFromBottom } from 'react-icons/bi'
import DropDownMenu from '../component/DropDownMenu'
import { BiCloset } from 'react-icons/bi'
import { CgRemove, CgRemoveR, CgRedo } from 'react-icons/cg'
import DeletePopup from '../component/DeletePopup'
import { BiSolidPencil } from 'react-icons/bi'
import { MdToday } from 'react-icons/md'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { MdAccessTime } from 'react-icons/md'
import { MdPriorityHigh } from 'react-icons/md'
import { MdCalendarToday } from 'react-icons/md'
import { MdDeleteSweep } from 'react-icons/md'
import { MdBarChart } from 'react-icons/md'
import { decryption, encryption } from '../dexie/EncodeDecode'
import { generateRandonID } from '../Common'


class TaskManager extends Component {
  constructor(props) {
    super(props)
    const today = new Date();
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.state = {
      taskList: [],
      taskListClone: [],
      menu: [
        { id: 1, menu: 'All', isHover: false, isSelect: true },
        { id: 2, menu: 'Completed', isHover: false, isSelect: false },
        { id: 3, menu: 'Pending', isHover: false, isSelect: false },
      ],
      isMenuOpen: true,
      task: '',
      updateID: null,
      date: '',
      isAll: true,
      isCompleted: false,
      isPending: false,
      completedTask: [],
      completedTaskClone: [],
      pendingTask: [],
      pendingTaskClone: [],
      leftMenuList: [
        { id: 1, data: [], icon: <MdToday size={25} />, list: "Today's Tasks", isSelected: false, isHover: false },
        { id: 2, data: [], icon: <MdOutlineCheckBoxOutlineBlank size={25} />, list: "Undone Tasks", isSelected: false, isHover: false },
        { id: 3, data: [], icon: <MdAccessTime size={25} />, list: "Overdue Tasks", isSelected: false, isHover: false },
        { id: 4, data: [], icon: <MdPriorityHigh size={25} />, list: "Priority", isSelected: false, isHover: false },
        { id: 5, data: [], icon: <MdCalendarToday size={25} />, list: "Calendar View Link", isSelected: false, isHover: false },
        { id: 6, data: [], icon: <MdDeleteSweep size={25} />, list: "Remove Completed Task", isSelected: false, isHover: false },
        { id: 7, data: [], icon: <MdBarChart size={25} />, list: "Task Stats Summary", isSelected: false, isHover: false },
      ],
      isAdd: false,
      isUpdate: false,
      days: [
        { id: 1, day: 'Sun', isMarked: false },
        { id: 2, day: 'Mon', isMarked: false },
        { id: 3, day: 'Tue', isMarked: false },
        { id: 4, day: 'Wed', isMarked: false },
        { id: 5, day: 'Thu', isMarked: false },
        { id: 6, day: 'Fri', isMarked: false },
        { id: 7, day: 'Sat', isMarked: false },
      ],
      height: window.innerHeight,


      priorityList: [],
      isPriorityList: true,
      todaysTasks: [],
      unDoneTasks: [],
      overDueTasks: [],
      isTodaysTasks: false,
      isUndonetasks: false,
      isOverDueTasks: false,
      isTaskMenuOpen: false,
      dates: [
        { id: 1, menu: 1, isSelected: false, isHover: false },
        { id: 2, menu: 2, isSelected: false, isHover: false },
        { id: 3, menu: 3, isSelected: false, isHover: false },
        { id: 4, menu: 4, isSelected: false, isHover: false },
        { id: 5, menu: 5, isSelected: false, isHover: false },
        { id: 6, menu: 6, isSelected: false, isHover: false },
        { id: 7, menu: 7, isSelected: false, isHover: false },
        { id: 8, menu: 8, isSelected: false, isHover: false },
        { id: 9, menu: 9, isSelected: false, isHover: false },
        { id: 10, menu: 10, isSelected: false, isHover: false },
        { id: 11, menu: 11, isSelected: false, isHover: false },
        { id: 12, menu: 12, isSelected: false, isHover: false },
        { id: 13, menu: 13, isSelected: false, isHover: false },
        { id: 14, menu: 14, isSelected: false, isHover: false },
        { id: 15, menu: 15, isSelected: false, isHover: false },
        { id: 16, menu: 16, isSelected: false, isHover: false },
        { id: 17, menu: 17, isSelected: false, isHover: false },
        { id: 18, menu: 18, isSelected: false, isHover: false },
        { id: 19, menu: 19, isSelected: false, isHover: false },
        { id: 20, menu: 20, isSelected: false, isHover: false },
        { id: 21, menu: 21, isSelected: false, isHover: false },
        { id: 22, menu: 22, isSelected: false, isHover: false },
        { id: 23, menu: 23, isSelected: false, isHover: false },
        { id: 24, menu: 24, isSelected: false, isHover: false },
        { id: 25, menu: 25, isSelected: false, isHover: false },
        { id: 26, menu: 26, isSelected: false, isHover: false },
        { id: 27, menu: 27, isSelected: false, isHover: false },
        { id: 28, menu: 28, isSelected: false, isHover: false },
        { id: 29, menu: 29, isSelected: false, isHover: false },
        { id: 30, menu: 30, isSelected: false, isHover: false },
        { id: 31, menu: 31, isSelected: false, isHover: false },
      ],
      months: [
        { id: 1, menu: 'Jan', isSelected: false, isHover: false },
        { id: 2, menu: 'Feb', isSelected: false, isHover: false },
        { id: 3, menu: 'Mar', isSelected: false, isHover: false },
        { id: 4, menu: 'Apr', isSelected: false, isHover: false },
        { id: 5, menu: 'May', isSelected: false, isHover: false },
        { id: 6, menu: 'Jun', isSelected: false, isHover: false },
        { id: 7, menu: 'July', isSelected: false, isHover: false },
        { id: 8, menu: 'Aug', isSelected: false, isHover: false },
        { id: 9, menu: 'Sep', isSelected: false, isHover: false },
        { id: 10, menu: 'Oct', isSelected: false, isHover: false },
        { id: 11, menu: 'Nov', isSelected: false, isHover: false },
        { id: 12, menu: 'Dec', isSelected: false, isHover: false },
      ],
      years: [
        { id: 1, menu: 2025, isSelected: false, isHover: false },
        { id: 2, menu: 2026, isSelected: false, isHover: false },
        { id: 3, menu: 2027, isSelected: false, isHover: false },
        { id: 4, menu: 2028, isSelected: false, isHover: false },
        { id: 5, menu: 2029, isSelected: false, isHover: false },
        { id: 6, menu: 2030, isSelected: false, isHover: false },
        { id: 7, menu: 2031, isSelected: false, isHover: false },
        { id: 8, menu: 2032, isSelected: false, isHover: false },
        { id: 9, menu: 2033, isSelected: false, isHover: false },
        { id: 10, menu: 2034, isSelected: false, isHover: false },
      ],
      hours: [
        { id: 1, menu: 1, isSelected: false, isHover: false },
        { id: 2, menu: 2, isSelected: false, isHover: false },
        { id: 3, menu: 3, isSelected: false, isHover: false },
        { id: 4, menu: 4, isSelected: false, isHover: false },
        { id: 5, menu: 5, isSelected: false, isHover: false },
        { id: 6, menu: 6, isSelected: false, isHover: false },
        { id: 7, menu: 7, isSelected: false, isHover: false },
        { id: 8, menu: 8, isSelected: false, isHover: false },
        { id: 9, menu: 9, isSelected: false, isHover: false },
        { id: 10, menu: 10, isSelected: false, isHover: false },
        { id: 11, menu: 11, isSelected: false, isHover: false },
        { id: 12, menu: 12, isSelected: false, isHover: false },
        { id: 13, menu: 13, isSelected: false, isHover: false },
        { id: 14, menu: 14, isSelected: false, isHover: false },
        { id: 15, menu: 15, isSelected: false, isHover: false },
        { id: 16, menu: 16, isSelected: false, isHover: false },
        { id: 17, menu: 17, isSelected: false, isHover: false },
        { id: 18, menu: 18, isSelected: false, isHover: false },
        { id: 19, menu: 19, isSelected: false, isHover: false },
        { id: 20, menu: 20, isSelected: false, isHover: false },
        { id: 21, menu: 21, isSelected: false, isHover: false },
        { id: 22, menu: 22, isSelected: false, isHover: false },
        { id: 23, menu: 23, isSelected: false, isHover: false },
        { id: 24, menu: 24, isSelected: false, isHover: false },
      ],
      mins: [
        { id: 1, menu: 5, isSelected: false, isHover: false },
        { id: 2, menu: 10, isSelected: false, isHover: false },
        { id: 3, menu: 15, isSelected: false, isHover: false },
        { id: 4, menu: 20, isSelected: false, isHover: false },
        { id: 5, menu: 25, isSelected: false, isHover: false },
        { id: 6, menu: 30, isSelected: false, isHover: false },
        { id: 7, menu: 35, isSelected: false, isHover: false },
        { id: 8, menu: 40, isSelected: false, isHover: false },
        { id: 9, menu: 45, isSelected: false, isHover: false },
        { id: 10, menu: 50, isSelected: false, isHover: false },
        { id: 11, menu: 55, isSelected: false, isHover: false },
        { id: 12, menu: 60, isSelected: false, isHover: false },
      ],
      summary: [
        { id: 1, menu: 'Total Tasks', count: 0, isHover: false },
        { id: 2, menu: 'UnDone Tasks', count: 0, isHover: false },
        { id: 3, menu: 'Priority Tasks', count: 0, isHover: false },
        { id: 4, menu: 'Completed Tasks', count: 0, isHover: false },
        { id: 5, menu: 'OverDue Tasks', count: 0, isHover: false },
      ],
      isDateMenu: false,
      isMonthMenu: false,
      isYearMenu: false,
      isHoursMenu: false,
      isMinuteMenu: false,
      isAM: true,


      isSummary: false,

      currentDate: Date().slice(8, 10),
      currentMonth: monthName[today.getMonth()],
      currentYear: today.getFullYear(),
      currentHour: today.getHours(),
      currentMin: today.getMinutes(),
      taskError: false,
      taskErrorMessage: '',
      isPriority: false,
      isChecked: false,
      isDelete: false,
      deleteID: null,
      itemToBedelete: null,
      isEditable: false,
      screenWidth: window.innerWidth,
      showSidebar: true,
    }
    this.dayMenuRef = createRef();
    this.monthMenuRef = createRef();
    this.yearMenuRef = createRef();
    this.hoursMenuRef = createRef();
    this.minMenuRef = createRef();
    this.summaryRef = createRef();
  }
  componentDidMount() {
    //this.clearDataBase();
    this.fetchData();
    this.markdate();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    document.addEventListener('mousedown', this.handleClickOutside);
    document.body.style.backgroundColor = Color.whiteFont;
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = "";
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };
  handleClickOutside = (e) => {
    if (this.dayMenuRef.current && !this.dayMenuRef.current.contains(e.target.value)) {
      this.setState({
        isDateMenu: false,
      })
    }
    if (this.monthMenuRef.current && !this.monthMenuRef.current.contains(e.target.value)) {
      this.setState({
        isMonthMenu: false,
      })
    }
    if (this.yearMenuRef.current && !this.yearMenuRef.current.contains(e.target.value)) {
      this.setState({
        isYearMenu: false,
      })
    }
    if (this.hoursMenuRef.current && !this.hoursMenuRef.current.contains(e.target.value)) {
      this.setState({
        isHoursMenu: false,
      })
    }
    if (this.minMenuRef.current && !this.minMenuRef.current.contains(e.target.value)) {
      this.setState({
        isMinuteMenu: false,
      })
    }
  }

  fetchData = async () => {
    var tasks = [];

    await db.Tasks.toArray().then(async i => {
      i?.map(async j => {
        let decoded = await decryption(j.data)
        decoded = { ...decoded, id: j.id }
        tasks.push(decoded);
      })
    })
    var complete = [];
    var pending = [];
    var priority = [];
    const today = Date().slice(4, 15);
    var todayTask = [];
    var overDue = [];
    var unDone = [];
    var all = [];

    tasks?.map(i => {
      let currDate = new Date(i.date);//
      let newDay = new Date(today);
      let sameDate = (currDate.getFullYear() == newDay.getFullYear() &&
        currDate.getMonth() == newDay.getMonth() && currDate.getDate == newDay.getMonth());
      if (currDate.toDateString() == newDay.toDateString()) {
        i.isActive && todayTask.push(i)

      }


      i.isActive && all.push(i);
      i.isActive && i.isDone && complete.push(i);
      i.isActive && !i.isDone && pending.push(i);

      i.isActive && i.isPriority && priority.push(i);
      let time = i?.time?.slice(0, 5);
      let inputDate = i?.date + " " + time;
      let dueTime = new Date(inputDate)

      let now = new Date();
      if (dueTime < now) {
        i.isActive && !i.isDone && overDue.push(i);
      }
      else if (dueTime >= now) {
        i.isActive && !i.isDone && unDone.push(i);
      }
      else if (dueTime == now) {
      }
      else {
      }
    })
    todayTask.map(it => {
      it.ref = 'Today'
    })

    tasks = all.reverse()
    this.setState(prevState => {
      const updatedList = prevState.leftMenuList.map(i => {

        if (i.list === "Today's Tasks") {
          return {
            ...i,
            data: todayTask
          }
        }
        else if (i.list === 'Priority') {
          return {
            ...i,
            data: priority,
          }
        }
        else if (i.list == 'Overdue Tasks') {
          return {
            ...i, data: overDue
          }
        } else if (i.list == 'Undone Tasks') {
          return { ...i, data: unDone }
        }
        else {
          return i
        }

      })
      return { leftMenuList: updatedList }
    })
    pending = pending.reverse()


    this.setState({
      taskList: tasks,
      taskListClone: tasks,
      completedTask: complete.reverse(),
      completedTaskClone: complete.reverse(),
      pendingTask: pending,
      pendingTaskClone: pending,
      priorityList: priority.reverse(),
      overDueTasks: overDue.reverse(),
    }, () => {

    })


  }

  componentDidUpdate() {

  }

  addTask = async () => {

    if (this.state.task != '') {
      if (this.state.currentMonth) {

        let zone = this.state.currentHour ? "PM" : "AM";
        try {

          if (this.state.updateID != null) {
            try {


              let encrypt = await encryption({
                task: this.state.task,
                date: this.state.currentDate + " " + this.state.currentMonth + " " + this.state.currentYear, time: this.state.currentHour + ":" + this.state.currentMin + " " + zone, isPriority: this.state.isPriority,
              })

              await db.Tasks.update(this.state.updateID, { data: encrypt })
            } catch (e) {
            }
          }
          else {
            try {

              let encrypt = await encryption({ task: this.state.task, date: this.state.currentDate + " " + this.state.currentMonth + " " + this.state.currentYear, time: this.state.currentHour + ":" + this.state.currentMin + " " + zone, isPriority: this.state.isPriority, isDone: false, isActive: true })
              await db.Tasks.add({ data: encrypt });
              window.alert('Added')
            } catch (e) {
            }


          }
          this.setState({
            isAdd: false,
            isUpdate: false,
            updateID: null,
            task: '',
          })

          this.fetchData()
        } catch (e) {
        }
      }


    }
    else {
      this.setState({
        taskError: true,
        taskErrorMessage: 'Kindly add the task before Submit!!'
      })
    }
  }
  switchMenu = (item) => {
    this.setState({
      menu: this.state.menu.map(i => {
        return { ...i, isSelect: i.id == item.id }
      }),
      isAll: item.menu == 'All' ? true : false,
      isCompleted: item.menu == 'Completed' ? true : false,
      isPending: item.menu == 'Pending' ? true : false,

    })
  }

  hoverMenu = (item) => {
    this.setState({
      menu: this.state.menu.map(i => {
        return { ...i, isHover: i.id == item.id }
      })
    })
  }

  handleTask = (e) => {
    if (e.target.value != '') {
      this.setState({
        task: e.target.value != '' ? e.target.value : '',
        taskError: false,
        taskErrorMessage: ''
      })
    } else {
      this.setState({
        task: '',
        taskError: true,
        taskErrorMessage: 'Kindly add the task before Submit!!'
      })
    }
  }
  handleDate = (e) => {
    this.setState({
      date: e.target.value != '' ? e.target.value : '',
    })
  }

  mouseLeave = (item) => {
    this.setState({
      menu: this.state.menu.map(i => {
        return { ...i, isHover: false }
      })
    })
  }

  handleCheckBox = async (e, id) => {
    const checked = e.target.checked;

    await db.task.update(id, { isDone: checked, })

    const updated = this.state.taskList.map(i =>
      id == i.id ? { ...i, isDone: checked } : i
    )
    this.setState({
      taskList: updated
    })
    this.fetchData();
  }
  openDeleteMenu = (i) => {
    this.setState({
      isDelete: true,
      itemToBedelete: i.task,
      deleteID: i.id
    })
    //await db.task.update(i, { isActive: false })
  }
  deleteTask = async (v, i) => {
    try {
      await db.task.update(i, { isActive: false })
      this.setState({
        isDelete: false
      })
      this.fetchData();
    } catch (e) {

    }

  }
  closeMenu = () => {
    this.setState({
      isDelete: false
    })
  }
  handleHoverOnMenu = (item) => {

    this.setState({
      leftMenuList: this.state.leftMenuList.map(i => {
        return { ...i, isHover: i.id == item.id }
      })
    })
  }
  handleClickOnMenu = (item) => {
    if (item.id == 1 || item.id == 2 || item.id == 3 || item.id == 4) {
      this.state.isTaskMenuOpen = true
    }
    else if (item.id == 7) {
      this.setState({
        isSummary: this.state.isSummary ? false : true,
      })
    }
    else if (item.id == 5) {
      this.props.navigate('/calender');
    }
    else {
      this.state.isTaskMenuOpen = false
    }
    this.setState({
      leftMenuList: this.state.leftMenuList.map(i => {
        return { ...i, isSelected: i.id == item.id }
      })
    })
  }
  handleLeaveMenu = (item) => {
    this.setState({
      leftMenuList: this.state.leftMenuList.map(i => {
        return { ...i, isHover: false }
      })
    })
  }

  redirectToDashBoard = () => {
    this.props.navigate('/');
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
  handleSearch = (e) => {
    this.setState({
      taskList: this.state.taskListClone.filter(i =>
        i.task.toLowerCase().includes(e.target.value.toLowerCase())
      ),
      completedTask: this.state.completedTaskClone.filter(i =>
        i.task.toLowerCase().includes(e.target.value.toLowerCase())
      ),
      pendingTask: this.state.pendingTaskClone.filter(i =>
        i.task.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
  }
  openMenu = (e) => {
    if (e === 'Date') {
      this.setState({
        isDateMenu: true,
        isMonthMenu: false,
        isYearMenu: false,
        isHoursMenu: false,
        isMinuteMenu: false,
      })
    }
    if (e === 'Month') {
      this.setState({
        isDateMenu: false,
        isMonthMenu: true,
        isYearMenu: false,
        isHoursMenu: false,
        isMinuteMenu: false,
      })
    }
    if (e === 'Years') {
      this.setState({
        isDateMenu: false,
        isMonthMenu: false,
        isYearMenu: true,
        isHoursMenu: false,
        isMinuteMenu: false,
      })
    }
    if (e === 'Hours') {
      this.setState({
        isDateMenu: false,
        isMonthMenu: false,
        isYearMenu: false,
        isHoursMenu: true,
        isMinuteMenu: false,
      })
    }
    if (e === 'Minutes') {
      this.setState({
        isDateMenu: false,
        isMonthMenu: false,
        isYearMenu: false,
        isHoursMenu: false,
        isMinuteMenu: true,
      })
    }
  }
  handleDateValue = (val) => {

    this.setState({
      currentDate: val,
      isDateMenu: false,
    })
  }
  handleMonthValue = (val) => {

    this.setState({
      currentMonth: val,
      isMonthMenu: false,
    })
  }
  handleYearValue = (val) => {

    this.setState({
      currentYear: val,
      isYearMenu: false,
    })
  }
  handleHourValue = (val) => {

    this.setState({
      currentHour: val,
      isHoursMenu: false,
    })
  }
  handleMinuteValue = (val) => {

    this.setState({
      currentMin: val,
      isMinuteMenu: false,
    })
  }
  handlePriorityCheck = (e) => {
    this.setState({ isPriority: e.target.checked })
  }
  handlEdit = (i) => {
    this.setState({ isUpdate: true, task: i.task, updateID: i.id })
  }
  render() {
    const today = new Date().getDate();
    //document.body.style.backgroundColor = "#FFF"
    document.body.style.fontFamily = ""
    const daysInMonth = this.getDaysINMonth(new Date().getMonth(), this.state.currentYear)
    const startDay = this.getStartDay(new Date().getMonth(), this.state.currentYear)
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'thu', 'Fri', 'Sat'];

    const days = []
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`}> </div>)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(<div key={d}>{d}</div>)
    }

    return (
      <div >
        {/* left menu bar */}
        {this.state.screenWidth <= 768 && (
          <div
            onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
            style={{
              position: 'fixed',
              top: 10,
              left: 10,
              zIndex: 200,
              cursor: 'pointer',
              backgroundColor: 'gray',
              color: 'white',
              padding: '8px',
              borderRadius: '5px',
            }}
          >
            ☰
          </div>
        )}

        <div className='sidebar'
          style={{
            backgroundColor: Color.whiteFont,
            height: this.state.height,
            width: this.state.screenWidth > 768 ? '20%' : this.state.showSidebar ? '80%' : '0',
            position: 'fixed',
            zIndex: 100,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            display: 'flex',              // <-- ADD THIS
            flexDirection: 'column',     // <-- ADD THIS
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', margin: '4% 12%', alignItems: 'center', fontWeight: 'bold', fontSize: '25px' }}>
            LOGO
          </div>
          <div>
            {this.state.leftMenuList.length > 0 && this.state.leftMenuList.map(i =>
            (
              <div
                onMouseOver={() => this.handleHoverOnMenu(i)}
                onClick={() => this.handleClickOnMenu(i)}
                onMouseLeave={() => this.handleLeaveMenu(i)}
                style={{ display: 'flex', justifyContent: '', alignItems: 'center', backgroundColor: i.isSelected ? Color.blackFont : i.isHover ? Color.yellow : '', cursor: 'pointer', borderRadius: '0px 7px 12px 0px', color: i.isSelected ? Color.yellow : Color.blackFont, padding: '20px 12px', }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '0px 12px 0px 25px', }}>{i.icon}</div>
                <div

                  style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px' }}>
                  {i.list}
                </div>
              </div>
            )
            )}
          </div>
          <div style={{ position: 'fixed', left: 25 }}>
            {this.state.isSummary &&
              <DropDownMenu
                ref={this.summaryRef}
                option={this.state.summary}
                Row={1}
                isSummary={true}
              //onSelect={this.handleDateValue}
              />}
          </div>
          <div
            onClick={() => { this.props.navigate('/settings') }}
            style={{ cursor: 'pointer', backgroundColor: 'yellow', borderRadius: '7px', padding: '12px 4%', margin: '12px 1%', }}>
            settings/Preferences
          </div>
        </div>

        {this.state.isDelete && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
          <DeletePopup
            onClose={this.closeMenu}
            item={this.state.itemToBedelete}
            onDelete={(v, id) => { this.deleteTask(v, id) }}
            ID={this.state.deleteID}
          />
        </div>}

        <div className='cards-container'>
          {/* card */}
          <div className="middle-card "
            style={{ marginLeft: this.state.screenWidth > 768 ? '20%' : this.state.showSidebar ? '80%' : '0', }}
          >

            {!this.state.isTaskMenuOpen ?
              <div style={{ width: '100%' }} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: 'grey', fontSize: '16px', margin: '7px 0px' }}>Heyy, Jessy!</div>
                    <div style={{ fontWeight: 'bold', fontSize: '25px', margin: '7px 0px' }}>you've got</div>
                    <div style={{ fontWeight: 'bold', fontSize: '25px', margin: '7px 0px' }}>
                      {` ${this.state.pendingTask.length} tasks today `}
                    </div>
                  </div>
                  <div
                    onClick={this.redirectToDashBoard}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.blackFont, padding: '12px', borderRadius: '7px', color: Color.whiteFont }}>
                    <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                    <div> Back To Dashboard</div>

                  </div>
                </div>
                <div style={{ position: 'relative', width: '70%', margin: '12px 0px' }}>
                  <BsSearch color='grey' style={{
                    position: 'absolute',
                    top: '50%',
                    left: '16px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none', // Allows click to pass through to input
                  }} />
                  <input
                    onChange={this.handleSearch}
                    placeholder='Search something...'
                    style={{ border: 'none', borderRadius: '7px', width: '70%', background: Color.lineColor, padding: '20px 0px 20px 43px', margin: '12px 0px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                  <div className='heading'>My task</div>


                </div>
                <div className='line' style={{ height: '0.2px', width: '100%', backgroundColor: Color.lineColor, margin: '1% 0%' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', }}>
                  {this.state.menu?.map(i => (
                    <div
                      onClick={() => this.switchMenu(i)}
                      onMouseOver={() => this.hoverMenu(i)}
                      onMouseLeave={() => this.mouseLeave(i)}
                      style={{ color: i.isSelect || i.isHover ? 'yellow' : Color.disableColor, margin: '5px 12px', cursor: 'pointer', border: i.isSelect ? '5px solid yellow' : '', borderBottom: i.isSelect ? '5px solid yellow' : i.isHover ? '5px solid yellow' : '', padding: '12px' }}>{i.menu}</div>
                  ))}

                </div>
                <div className='line' style={{ height: '0.2px', width: '100%', backgroundColor: Color.lineColor, margin: '1% 0%' }}></div>
                {this.state.isAll ? this.state.taskList.length > 0 ? this.state.taskList.slice(0, 5).map(i =>
                (<div style={{ padding: '12px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '52%' }}>

                      <label style={{ display: 'inline-flex', fontWeight: 'bold' }}>
                        <input checked={i.isDone} type="checkbox" style={{ margin: '0px 12px', cursor: 'pointer', border: 'none', outline: 'none' }}
                          onChange={(e) => this.handleCheckBox(e, i.id)} /> {i.task}
                      </label>
                    </div>
                    <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.date}</div>
                    <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.time}</div>
                  </div>

                  <div><BiSolidPencil size={20} color={Color.grey} style={{ margin: '0px 2px', cursor: 'pointer' }} onClick={() => this.handlEdit(i)} /></div>
                  <div style={{ width: '8%' }}><MdDeleteSweep size={25} color='red' onClick={() => this.openDeleteMenu(i)} style={{ cursor: 'pointer' }} /></div>
                </div>)) : <div>No task</div> : <div />}

                {this.state.isCompleted ? this.state.completedTask.length > 0 ? this.state.completedTask.slice(0, 5).map(i =>
                (<div style={{ padding: '12px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '70%' }}> <label style={{ display: 'inline-flex', fontWeight: 'bold' }}>
                      <input checked={i.isDone} type="checkbox" style={{ margin: '0px 12px', cursor: 'pointer', }} onChange={(e) => this.handleCheckBox(e, i.id)} /> {i.task}
                    </label></div>
                    <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.date}</div>
                    <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.time}</div>
                  </div>

                  <div><BiSolidPencil size={20} color={Color.grey} style={{ margin: '0px 2px', cursor: 'pointer' }} onClick={() => this.handlEdit(i)} /></div>
                  <div><MdDeleteSweep size={25} color='red' onClick={() => this.openDeleteMenu(i)} style={{ cursor: 'pointer' }} /></div>
                </div>)) : <div>No task completed yet!!</div> : <div />}

                {this.state.isPending ? this.state.pendingTask.length > 0 ? this.state.pendingTask.slice(0, 5).map(i => (
                  <div style={{ padding: '12px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>

                      <div style={{ width: '70%' }}> <label style={{ display: 'inline-flex', fontWeight: 'bold' }}>
                        <input checked={i.isDone} type="checkbox" style={{ margin: '0px 12px', cursor: 'pointer', }} onChange={(e) => this.handleCheckBox(e, i.id)} /> {i.task}
                      </label></div>
                      <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.date}</div>
                      <div style={{ width: '20%', fontSize: '12px', color: Color.grey }}>{i?.time}</div>
                    </div>

                    <div><BiSolidPencil size={20} color={Color.grey} style={{ margin: '0px 2px', cursor: 'pointer' }} onClick={() => this.handlEdit(i)} /></div>
                    <div><MdDeleteSweep size={25} color='red' style={{ cursor: 'pointer' }} onClick={() => this.openDeleteMenu(i)} /></div>



                  </div>
                )) : <div>No pending task</div> : <div />}


              </div>
              :
              <div style={{ width: '100%' }}>
                <div>
                  <div>
                    {<div
                      onClick={() => {
                        this.setState({
                          isTaskMenuOpen: false
                        })
                      }}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '12px', borderRadius: '7px', }}>
                      <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                      <div> Back </div>
                    </div>}
                  </div>

                  <div>

                    {this.state.leftMenuList.length > 0 &&
                      this.state.leftMenuList.slice(0, 10).map(i => {
                        (<div style={{ fontWeight: 'bold', margin: '12px', color: Color.theme, fontSize: '25px' }}>{i.list}</div>)
                        if (i?.isSelected) {
                          return i?.data
                            ? i.data.map(j =>
                            (<div style={{ display: 'flex', width: '88%', alignItems: 'center', backgroundColor: Color.whiteFont, boxShadow: '2px 12px 16px rgba(183, 163, 183, 0.47)', margin: '12px', padding: '12px', borderRadius: '7px' }}>
                              <div style={{ width: '85%' }}>{j.task}</div>
                              <div style={{ fontSize: '12px', color: Color.grey, width: '15%', margin: '7px' }}>{j.date}</div>
                              <div><CgRemoveR color='red' /></div>
                            </div>)
                            ) : <div>No data</div>
                        }


                      })
                    }
                  </div>
                </div>
              </div>}
          </div>
          {/* task add menu */}

          <div style={{
            width: '100%',
            maxWidth: '430px',
            margin: '0 auto'
          }}>
            {/* Top profile */}
            <div style={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '34px 20px' }}>
              <div style={{ width: '15%' }}>
                <div className='center' style={{ fontWeight: '500', width: '50px', borderRadius: '25px', height: '50px', backgroundColor: Color.yellow }}>
                  J
                </div>
              </div>
              <div style={{ width: '55%' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: Color.blackFont }}>Jessy Angel</div>
                <div style={{ fontSize: '12px', margin: '7px 0px 0px 0px', color: Color.grey }}>UI Developer</div>
              </div>
              <div style={{ display: 'flex', width: '15%', alignItems: 'center', justifyContent: 'space-between' }}>
                <div><BiNotification /></div>
                <div><MdEmail /></div>
              </div>
            </div>
            {/* Add task colm */}
            <div style={{ margin: '35px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: Color.grey, fontSize: '16px', margin: '12px 0px' }}>{Date().slice(4, 15)}</div>
                <div className='heading' style={{ fontSize: '34px' }}>Today</div>
              </div>
              <div>
                {!this.state.isAdd && !this.state.isUpdate ?
                  <button
                    onClick={() => { this.setState({ isAdd: this.state.isAdd ? false : true }) }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', borderRadius: '12px', backgroundColor: Color.darkTheme, color: Color.whiteFont, padding: '16px 30px' }}>
                    <div style={{ fontWeight: 'bold', color: Color.whiteFont, margin: '0px 7px', fontSize: '16px' }}>+</div>
                    <div>Add task</div>
                  </button> :
                  <div style={{ cursor: 'pointer', fontSize: '25px', margin: '0px 12px' }}
                    onClick={() => { this.setState({ isAdd: this.state.isAdd ? false : true }) }}
                  >x</div>}
              </div>
            </div>
            {this.state.isAdd || this.state.isUpdate ?
              <div>


                <div style={{ margin: '0px 20px', }}>
                  <input
                    maxlength={50}
                    value={this.state.task}
                    onChange={this.handleTask}
                    style={{
                      border: this.state.taskError ? '1px solid red' : '1px solid #FFF',
                      boxShadow: '#b7b7a75c 7px 7px 34px',
                      //border: 'none',
                      outline: 'none', padding: '16px', borderRadius: '12px', width: '90%'
                    }}
                    placeholder='Task' />
                </div>
                {this.state.taskErrorMessage && <span style={{ fontSize: '12px', marginLeft: '30px', color: 'red' }}>{this.state.taskErrorMessage}</span>}
                <div style={{ margin: '25px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ margin: '12px' }}>Day</div>
                    <input
                      contentEditable={false}
                      style={{
                        cursor: 'pointer',
                        //border: '1px solid grey', 
                        boxShadow: '#75756e5c 7px 7px 34px',
                        border: 'none',
                        outline: 'none', padding: '12px', borderRadius: '12px', width: '43%',
                        textAlign: 'center'
                      }}
                      value={this.state.currentDate}
                      onClick={() => this.openMenu('Date')}
                    />
                    <div style={{ position: 'absolute', display: 'flex', zIndex: 10, }}>
                      {this.state.isDateMenu &&
                        <DropDownMenu
                          ref={this.dayMenuRef}
                          option={this.state.dates}
                          Row={7}
                          onSelect={this.handleDateValue}
                        />}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div style={{ margin: '12px' }}>Month</div>
                    <input contentEditable={false} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      // border: '1px solid grey',
                      boxShadow: '#75756e5c 7px 7px 34px',
                      border: 'none',
                      outline: 'none', padding: '12px', borderRadius: '12px', width: '43%'
                    }} value={this.state.currentMonth}
                      onClick={() => this.openMenu('Month')} />
                    <div style={{ position: 'absolute', display: 'flex', zIndex: 10, }}>
                      {this.state.isMonthMenu &&
                        <DropDownMenu
                          ref={this.monthMenuRef}
                          option={this.state.months}
                          Row={4}
                          onSelect={this.handleMonthValue}
                        />}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div style={{ margin: '12px' }}>Year</div>
                    <input contentEditable={false} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      // border: '1px solid grey', 
                      boxShadow: '#75756e5c 7px 7px 34px',
                      border: 'none',
                      outline: 'none', padding: '12px', borderRadius: '12px', width: '43%'
                    }} value={this.state.currentYear}
                      onClick={() => this.openMenu('Years')} />
                    <div style={{ position: 'absolute', display: 'flex', zIndex: 10, }}>
                      {this.state.isYearMenu &&
                        <DropDownMenu
                          ref={this.yearMenuRef}
                          option={this.state.years}
                          Row={2}
                          onSelect={this.handleYearValue}
                        />}
                    </div>
                  </div>

                </div>

                <div style={{ margin: '25px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ margin: '12px' }}>Hours</div>
                    <input contentEditable={false} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      // border: '1px solid grey', 
                      boxShadow: '#75756e5c 7px 7px 34px',
                      border: 'none',
                      outline: 'none', padding: '12px', borderRadius: '12px', width: '43%'
                    }} value={this.state.currentHour}
                      onClick={() => this.openMenu('Hours')}
                    />
                    <div style={{ position: 'absolute', display: 'flex', zIndex: 10, }}>
                      {this.state.isHoursMenu &&
                        <DropDownMenu
                          ref={this.hoursMenuRef}
                          option={this.state.hours}
                          Row={4}
                          onSelect={this.handleHourValue}
                        />}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <div style={{ margin: '12px' }}>Minutes</div>
                    <input style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      //border: '1px solid grey', 
                      boxShadow: '#75756e5c 7px 7px 34px',
                      border: 'none',
                      outline: 'none', padding: '12px', borderRadius: '12px', width: '43%'
                    }} value={this.state.currentMin}
                      onClick={() => this.openMenu('Minutes')}
                    />
                    <div style={{ position: 'absolute', display: 'flex', zIndex: 10, }}>
                      {this.state.isMinuteMenu &&
                        <DropDownMenu
                          ref={this.minMenuRef}
                          option={this.state.mins}
                          Row={3}
                          onSelect={this.handleMinuteValue}
                        />}
                    </div>
                  </div>

                  <div>
                    <div style={{ margin: '12px' }}>Zone</div><input contentEditable={false} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      //border: '1px solid grey',
                      boxShadow: '#75756e5c 7px 7px 34px',
                      border: 'none',
                      outline: 'none', padding: '12px', borderRadius: '12px', width: '43%'
                    }}
                      value={this.state.currentHour > 12 ? 'PM' : 'AM'} />
                  </div>
                </div>



                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 25px' }}>
                  <label><input onClick={this.handlePriorityCheck} value={this.state.isPriority} style={{ margin: '12px 10px' }} type='checkbox' />
                    Add task this task to priority</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 20px' }}>
                  <button
                    onClick={() => this.addTask()}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', borderRadius: '12px', backgroundColor: Color.darkTheme, color: Color.whiteFont, padding: '16px 30px' }}>
                    {this.state.isUpdate ? <div>Update</div> : <div>Add task</div>}
                  </button>
                </div>
              </div> :
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px', textAlign: 'center' }}>
                  {this.state.days.length > 0 && this.state.days.map(i =>
                    <div style={{
                      width: '80%', margin: '3px', color: i.isMarked ? Color.yellow : Color.grey, padding: '5px', fontSize: '14px'
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
                  {days.map((i, index) => {

                    return (
                      <div
                        key={index}
                        style={{
                          color: today == i.key ? Color.yellow : Color.blackFont, fontSize: '12px'

                        }}>
                        {i}
                      </div>)
                  })}
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'yellow', borderRadius: '7px', padding: '12px 4%', margin: '12px 1%', position: 'fixed', bottom: 0, right: 0 }}>

                  <div style={{ margin: '2px 12px 0px 0px' }}> <BiUpArrow /></div>
                  <div>Show priorities</div>
                </div> */}
                <div style={{ fontWeight: 'bold', margin: '12px', color: Color.theme, fontSize: '25px' }}>Top Priorities</div>
                {this.state.priorityList.length > 0 && this.state.priorityList.slice(0, 3).map(i =>
                  <div style={{ display: 'flex', width: '88%', alignItems: '', backgroundColor: Color.whiteFont, boxShadow: '2px 12px 16px rgba(183, 163, 183, 0.47)', margin: '12px', padding: '12px', borderRadius: '7px' }}>
                    <div style={{ width: '75%', fontWeight: 'bold' }}>{i.task}</div>
                    <div style={{ fontSize: '12px', color: Color.grey, width: '25%', margin: '7px' }}>{i.date}</div>
                  </div>
                )}
                <div>

                </div>
              </div>
            }
          </div>

        </div>

      </div>


    )
  }
}

export default WithRouter(TaskManager);
