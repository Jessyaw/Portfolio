import { BsSearch } from 'react-icons/bs'
import { FaPlaneDeparture } from 'react-icons/fa6'
import { FaRegFolderOpen } from 'react-icons/fa6'
import { FaClipboardCheck } from 'react-icons/fa6'
import { FaUserAlt } from 'react-icons/fa'
import { FaAddressBook } from 'react-icons/fa6'
import { FaPlane } from 'react-icons/fa6'
import { db } from './dexie/DB'
import { encryption } from './dexie/EncodeDecode'


export const TopMenu = [
    { id: 1, menu: 'Listings', isSelect: false, isHover: false },
    { id: 2, menu: 'Dispatch', isSelect: false, isHover: false },
    { id: 3, menu: 'Billing', isSelect: false, isHover: false },
    { id: 4, menu: 'Reports', isSelect: false, isHover: false },
]

export const RecentBooking = [
    { id: 1, from: 'chennai', to: 'Bangalore', date: '12 Mar 2025', isSelect: false },
    { id: 1, from: 'chennai', to: 'Bangalore', date: '12 Mar 2025', isSelect: false },
    { id: 1, from: 'chennai', to: 'Bangalore', date: '12 Mar 2025', isSelect: false },
    { id: 1, from: 'chennai', to: 'Bangalore', date: '12 Mar 2025', isSelect: false },
]

export const LeftMenu = [
    { id: 1, icon: FaPlaneDeparture, menu: 'Book Flight', isHover: false, isSelect: true },
    { id: 2, icon: FaRegFolderOpen, menu: 'Manage Bookings', isHover: false, isSelect: false },
    { id: 3, icon: FaClipboardCheck, menu: 'Check In', isHover: false, isSelect: false },
    { id: 4, icon: FaUserAlt, menu: 'Passanger Details', isHover: false, isSelect: false },
    { id: 5, icon: FaAddressBook, menu: 'Update Contacts', isHover: false, isSelect: false },
    { id: 6, icon: FaPlane, menu: 'Flight Details', isHover: false, isSelect: false },
]

export const InitializeLeftMenu = async () => {
    let count = await db.leftMenu?.count();
    if (count === 0) {
        let list = [
            { id: 1, icon: 'FaPlaneDeparture', menu: 'Book Flight', isHover: false, isSelect: true },
            { id: 2, icon: 'FaRegFolderOpen', menu: 'Manage Bookings', isHover: false, isSelect: false },
            { id: 3, icon: 'FaClipboardCheck', menu: 'Check In', isHover: false, isSelect: false },
            { id: 4, icon: 'FaUserAlt', menu: 'Passanger Details', isHover: false, isSelect: false },
            { id: 5, icon: 'FaAddressBook', menu: 'Update Contacts', isHover: false, isSelect: false },
            { id: 6, icon: 'FaPlane', menu: 'Flight Details', isHover: false, isSelect: false },
        ]
        // if (Array.isArray(list)) {
        //     let encode = await Promise.all(list.map(async (item) => {
        //         return await encryption(item)
        //     }))

        //     await db.leftMenu.bulkAdd([{ id: 1, data: encode }])
        // }
    }
    else {
        //await db.leftMenu.clear();
    }
}

export const Gender = [
    { id: 1, menu: 'Male', isSelect: false, isHover: false },
    { id: 2, menu: 'Female', isSelect: false, isHover: false },
    { id: 3, menu: 'Other', isSelect: false, isHover: false },
    { id: 4, menu: 'Prefer not to say', isSelect: false, isHover: false },
]



export const Meal = [
    { id: 1, menu: 'Vegitarian Meal', isSelect: false },
    { id: 2, menu: 'Non-Vegitarian Meal', isSelect: false },
    { id: 3, menu: 'Asian Veg Meal', isSelect: false },
    { id: 4, menu: 'Low Fat Meal', isSelect: false },
    { id: 5, menu: 'Gluten-Free Meal', isSelect: false },
    { id: 6, menu: 'Child Meal', isSelect: false },
    { id: 7, menu: 'Baby Meal', isSelect: false },
]