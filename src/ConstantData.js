import { MdToday } from 'react-icons/md'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { MdAccessTime } from 'react-icons/md'
import { MdPriorityHigh } from 'react-icons/md'
import { MdCalendarToday } from 'react-icons/md'
import { MdDeleteSweep } from 'react-icons/md'
import { MdBarChart } from 'react-icons/md'

export const Days = [
    { id: 1, day: 'Sun', isMarked: false },
    { id: 2, day: 'Mon', isMarked: false },
    { id: 3, day: 'Tue', isMarked: false },
    { id: 4, day: 'Wed', isMarked: false },
    { id: 5, day: 'Thu', isMarked: false },
    { id: 6, day: 'Fri', isMarked: false },
    { id: 7, day: 'Sat', isMarked: false },
]

export const LeftMenuList = [
    { id: 1, data: [], icon: <MdToday size={25} />, list: "Today's Tasks", isSelected: false, isHover: false },
    { id: 2, data: [], icon: <MdOutlineCheckBoxOutlineBlank size={25} />, list: "Undone Tasks", isSelected: false, isHover: false },
    { id: 3, data: [], icon: <MdAccessTime size={25} />, list: "Overdue Tasks", isSelected: false, isHover: false },
    { id: 4, data: [], icon: <MdPriorityHigh size={25} />, list: "Priority", isSelected: false, isHover: false },
    { id: 5, data: [], icon: <MdCalendarToday size={25} />, list: "Calendar View Link", isSelected: false, isHover: false },
    { id: 6, data: [], icon: <MdDeleteSweep size={25} />, list: "Remove Completed Task", isSelected: false, isHover: false },
    { id: 7, data: [], icon: <MdBarChart size={25} />, list: "Task Stats Summary", isSelected: false, isHover: false },

]

export const Summary = [
    { id: 1, menu: 'Total Tasks', count: 0, isHover: false },
    { id: 2, menu: 'UnDone Tasks', count: 0, isHover: false },
    { id: 3, menu: 'Priority Tasks', count: 0, isHover: false },
    { id: 4, menu: 'Completed Tasks', count: 0, isHover: false },
    { id: 5, menu: 'OverDue Tasks', count: 0, isHover: false },
]

export const TaskMenu = [
    { id: 1, menu: 'All', isHover: false, isSelect: true },
    { id: 2, menu: 'Completed', isHover: false, isSelect: false },
    { id: 3, menu: 'Pending', isHover: false, isSelect: false },
]

export const Mins = [
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
]

export const Hours = [
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
]

export const Years = [
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
]

export const Months = [
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

]

export const Dates = [
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

]
