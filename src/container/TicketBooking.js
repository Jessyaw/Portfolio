import React, { Component } from 'react'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import { BsSearch } from 'react-icons/bs'
import { BiLeftArrow } from 'react-icons/bi'
import DatePicker from '../component/DatePicker'
import { alphaVAlidation, emailValidation, mobileValidation, BookingIDValidation } from '../Validation'
import { handleOnKeyAlpha } from '../Validation'
import { handleOnKeyNumber } from '../Validation'
import DropDownMenu from '../component/DropDownMenu'
import { countries } from '../Countries'
import { db } from '../dexie/DB'
import { generateRandonID } from '../Common'
import { seedInitialFlightDetails } from '../FlightData'
import { TopMenu, RecentBooking, LeftMenu, Gender, Meal } from '../TicketBookingJson'
import { FaRegCalendar } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { FaChevronRight } from 'react-icons/fa'
import { InitializeLeftMenu } from '../TicketBookingJson'
import { FaPlaneDeparture } from 'react-icons/fa6'
import { FaRegFolderOpen } from 'react-icons/fa6'
import { FaClipboardCheck } from 'react-icons/fa6'
import { FaUserAlt } from 'react-icons/fa'
import { FaAddressBook } from 'react-icons/fa6'
import { FaPlane } from 'react-icons/fa6'
import travel from '../../src/image/jpg/travel.jpg'
import flight from '../../src/image/jpg/flight.jpg'
import { initializeSeat } from '../Seats';
import { decryption, encryption } from '../dexie/EncodeDecode'
import { data } from 'react-router-dom'
import AlertPopup from '../component/AlertPopup'
import { Constant } from '../Constant'


class TicketBooking extends Component {
    constructor(props) {
        super(props)
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date().getDate();
        const currentMonth = month[new Date().getMonth()];
        const currentYear = new Date().getFullYear();
        const today = currentDate + " " + currentMonth + " " + currentYear;
        this.state = {
            topMenu: TopMenu,
            recentBooking: [],
            leftMenu: [],
            isFlightDetails: false,
            isUpdateContacts: false,
            isPassangerDetails: false,
            isCheckIn: false,
            isManageBookings: false,
            isBookTickets: true,
            flightDetailsClone: [],
            flightDetails: [],
            isDatePicker: false,
            bookingDate: '',
            from: '',
            to: '',
            isError: '',
            recentBookingList: [],
            recentBookingListClone: [],
            seeMore: false,
            showBooking: true,
            firstName: '',
            firstNameError: '',
            middleName: '',
            middleNameError: '',
            lastName: '',
            lastNameError: '',
            genderMenu: [],
            gender: '',
            genderError: '',
            isGenderMenuOpen: false,
            isDOB: false,
            DOB: '',
            DOBError: '',
            selectedCountry: null,
            countryError: '',
            countries: countries,
            filteredCountry: [],
            isMealMenu: false,
            mealError: '',
            selectedMeal: null,
            mealMenu: [],
            seats: [],
            seatError: '',
            contactError: '',
            emailError: '',
            isSeatMenu: false,
            SelectedSeat: '',
            contactNumber: '',
            emailAddress: '',
            emergencyContactNumber: '',
            emergencyContactError: '',
            frequentFlyerNumber: '',
            frequentFlyerError: '',
            address: '',
            addressError: '',
            specialAssistence: '',
            specialAssistenceError: '',
            updatedID: null,
            passangerData: [],
            passangerDataClone: [],
            flightID: null,
            manageBookingID: '',
            manageBookingError: '',
            ManageMobile: '',
            manageMobileError: '',
            checkInBookingID: null,
            checkInError: '',
            isUpdate: false,
            bookingID: null,
            manageBooking: [],
            manageBookingClone: [],
            checkInList: [],
            checkInListClone: [],
            isCheckedIn: false,
            isActive: true,
            bookFlightID: 1,
            manageBookingRouterID: 2,
            checkInID: 3,
            passangerDetailsID: 4,
            updateContactID: 5,
            flightDetailsID: 6,
            isPassangerAvailable: false,
            manageNoData: '',
            isCheckInEmpty: '',
            selectedFlight: [],
            screenWidth: window.innerWidth,
            showSidebar: true,
            genderID: null,
            SeatID: null,
            MealID: null,
            isFlightIDMissing: false,
            isAdded: false,
            isUpdated: false,
            isCancelBooking: false,
            BID: null,


        }
    }
    async componentDidMount() {
        document.body.style.backgroundColor = Color.whiteFont;

        await this.fetchFilghtData();
        await this.fetchRecentBookingData();
        await this.fetchPassangerDetails();
        // // InitializeLeftMenu();
        this.fetchLeftMenu();
        this.initializeSeat();
        this.fetchMealMenu();
        this.fetchGender();
        this.fetchManageBooking();
        this.fetchCheckinData();

    }
    componentWillUnmount() {
        document.body.style.backgroundColor = "";
    }
    fetchCheckinData = async () => {
        try {
            let list;
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/checkin')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        list = data;
                        this.setState({
                            checkInListClone: data
                        })
                    }

                })

            return list;
        } catch (e) {

        }
    }
    fetchManageBooking = async () => {
        try {
            let list;
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/managebookings')
                .then(res => res.json())
                .then(data => {
                    list = data.map(i => {
                        let date = new Date(i?.DepartureDate);
                        let convert = date.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })
                        return {
                            ...i, DepartureDate: convert
                        }
                    })
                    this.setState({
                        manageBookingClone: list,
                    })
                })
            return list;
        } catch (e) {

        }
    }
    initializeSeat = async () => {
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/test')
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        seats: data.seats[0]
                    })
                })

        }
        catch (e) {

        }

    }
    fetchMealMenu = async () => {
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/test')
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        mealMenu: data.meals[0]
                    })
                })

        }
        catch (e) {

        }

    }
    fetchGender = async () => {
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/test')
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        genderMenu: data.gender[0]
                    })
                })

        }
        catch (e) {

        }

    }
    fetchPassangerDetails = async () => {
        const data = [];
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/test')
                .then(res => res.json())
                .then(data => {
                    let passangerData = [];
                    data.passengerDetails[0].map(i => {
                        if (i?.FlightID) {
                            passangerData.push(i);
                        }
                    })
                    this.setState({
                        passangerData: passangerData,
                        passangerDataClone: passangerData,
                    })
                })

        }
        catch (e) {

        }
        // Promise.all(await db.passangerDetails?.toArray().then(async result => {
        //     result.map(async i => {
        //         let decode = await decryption(i?.data);
        //         data.push(decode);
        //         let manageData = [];
        //         data?.forEach(i => {
        //             if (i?.isActive) {
        //                 manageData.push(i);

        //             }
        //         })
        //         manageData.reverse()

        //     })
        // }))
    }
    fetchSeatData = async () => {
        try {
            let decodeData = [];
            await db.seats.toArray()?.then(result => {
                Promise.all(result[0].data?.map(async (i) => {
                    let decode = await decryption(i);
                    decodeData.push(decode)
                }))
                if (decodeData) {
                    this.setState({
                        seats: decodeData,
                    })
                }
            })
        } catch (e) {

        }

    }

    fetchLeftMenu = async () => {
        this.setState({
            leftMenu: LeftMenu,
        })
        const iconMap = {
            FaPlaneDeparture: FaPlaneDeparture,
            FaRegFolderOpen: FaRegFolderOpen,
            FaClipboardCheck: FaClipboardCheck,
            FaUserAlt: FaUserAlt,
            FaAddressBook: FaAddressBook,
            FaPlane: FaPlane,
        }
        let list = [];
        // await db.leftMenu.toArray()?.then(result => {
        //     Promise.all(result[0].data?.map(async (i) => {
        //         let data = await decryption(i);
        //         list.push(data);
        //         const update = list?.map(item => ({
        //             ...item,
        //             icon: iconMap[item.icon] ? iconMap[item.icon] : null
        //         }))
        //         this.setState({
        //             leftMenu: LeftMenu,
        //         })

        //     }))
        // });



    }

    fetchFilghtData = async () => {
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/test')
                .then((res) => res.json())
                .then((data) => {


                    this.setState({
                        countries: countries,
                        flightDetails: data.flights[0],
                        flightDetailsClone: data.flights[0],
                    })
                })

        } catch (e) {
        }

        seedInitialFlightDetails();

        // let flightData = await db.availableFlights.toArray();
        // let flightDecode = [];
        // Promise.all(flightData[0].data.map(async (i) => {
        //     let data = await decryption(i);
        //     flightDecode.push(data)
        // }))
        // this.setState({
        //     countries: countries,
        //     flightDetails: flightDecode,
        //     flightDetailsClone: flightDecode,
        // })



    }


    handleHover = (item) => {
        this.setState({
            topMenu: this.state.topMenu.map(i => {
                return {
                    ...i, isHover: i?.id == item.id
                }
            })
        })
    }
    handleMouseLeave = (item) => {
        this.setState({
            topMenu: this.state.topMenu.map(i => {
                return {
                    ...i, isHover: false,
                }
            })
        })
    }
    handleSelect = (item) => {
        this.setState({
            topMenu: this.state.topMenu.map(i => {
                return {
                    ...i, isSelect: i?.id == item.id
                }
            })
        })
    }
    handleLeftMenuHover = (item) => {
        this.setState({
            leftMenu: this.state.leftMenu.map(i => {
                return {
                    ...i, isHover: i?.id == item.id
                }
            })
        })
    }
    handleLeftMenuMouseLeave = (item) => {
        this.setState({
            leftMenu: this.state.leftMenu.map(i => {
                return {
                    ...i, isHover: false,
                }
            })
        })
    }

    redirectToTaskManager = () => {
        this.props.navigate('/');

    }

    handleSearch = () => {
        if ((this.state.from && this.state.to) || this.state.bookingDate) {
            const data = this.state.flightDetailsClone.filter(i =>
                i?.from.toLowerCase().includes(this.state.from?.toLowerCase()) &&
                i?.to.toLowerCase().includes(this.state.to?.toLowerCase()) &&
                i?.date.toLowerCase().includes(this.state.bookingDate?.toLowerCase())
            )
            this.setState({
                isFlightDetails: true,
                isUpdateContacts: false,
                isPassangerDetails: false,
                isCheckIn: false,
                isManageBookings: false,
                isBookTickets: false,
                isError: '',
                from: '',
                to: '',
                flightDetails: data,
            }, () => this.handleRouter(this.state.flightDetailsID),)


        }
        else {
            this.setState({
                isError: 'Select before search'
            })
        }

    }

    handleDate = (date, month, year) => {

        this.setState({
            isDatePicker: false,
            bookingDate: date + " " + month + " " + year,
            isError: ''
        })

    }
    handleDOB = (date, month, year) => {

        this.setState({
            isDOB: false,
            DOB: date + " " + month + " " + year,
            isDOBError: ''
        })

    }
    handleOnChangeOFFrom = (e) => {
        this.setState({
            from: e.target.value,
            isError: '',
        })
    }
    handleOnChangeOFTo = (e) => {
        this.setState({
            to: e.target.value,
            isError: ''
        })
    }

    handleBooking = async (item) => {

        try {
            this.setState({
                flightID: item?.FlightID || this.state.flightID,
                isFlightIDMissing: false,
                selectedFlight: item ? item : this.state.selectedFlight
            }, () => this.handleRouter(this.state.passangerDetailsID))
            if (this.state.isPassangerAvailable) {
                let data = {
                    ID: this.state.bookingID,
                    departure: this.state.selectedFlight.Departure,
                    arrival: this.state.selectedFlight.Arrival,
                    departureDate: this.state.selectedFlight.DepartureDate
                }

                let res = await fetch('https://ticket-booking-omega-sand.vercel.app/api/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'Application/json' },
                    body: JSON.stringify(data)
                })

                await this.fetchRecentBookingData();
                this.setState({
                    isPassangerAvailable: false,
                })
            }
        }
        catch (error) {

        }
    }


    fetchRecentBookingData = async () => {
        try {

            await fetch('https://ticket-booking-omega-sand.vercel.app/api/booking')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        let list = data.map(i => {

                            let convert = new Date(i?.BookingDate)

                            let date = convert.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                year: 'numeric',
                                month: 'short',
                            })

                            return {
                                ...i,
                                BookingDate: date
                            }
                        })

                        this.setState({
                            recentBookingList: list,
                            recentBookingListClone: list,
                        })
                    }
                })



        } catch (e) {

        }
    }

    handleSeeMore = () => {
        this.setState({
            seeMore: true,
        })
    }
    handleSeeLess = () => {
        this.setState({
            seeMore: false,
        })
    }


    handleFirstName = (e) => {

        if (alphaVAlidation(e.target.value)) {
            this.setState({
                firstName: e.target.value,
                firstNameError: '',
            })
        }
        else {
            this.setState({
                firstName: e.target.value,
            })
        }


    }
    handleMiddleName = (e) => {

        if (alphaVAlidation(e.target.value)) {
            this.setState({
                middleName: e.target.value
            })
        }
        else {
            this.setState({
                middleName: e.target.value,
            })
        }

    }
    handleLastName = (e) => {
        if (alphaVAlidation(e.target.value)) {
            this.setState({
                lastName: e.target.value
            })
        }
        else {
            this.setState({
                lastName: e.target.value,
            })
        }

    }
    handleNumberOnly = (e) => {
        if (handleOnKeyNumber(e.target.value)) {
        }
        else {
            this.setState({
                firstNameError: 'Alphabets'
            })
        }
    }

    handleKeyForAlpha = (e) => {
        handleOnKeyAlpha(e);
    }
    handleSelectGender = (e) => {

        try {
            this.setState({
                gender: e.Gender,
                genderError: '',
                genderID: e.ID
            })
            this.handleGenderMenuOpen();
        } catch (e) {

        }

    }
    handleGenderMenuOpen = () => {
        this.setState({
            isGenderMenuOpen: this.state.isGenderMenuOpen ? false : true,
            isMealMenu: false,
            isDOB: false,
            isSeatMenu: false,
        })
    }
    handleSearchCountry = (e) => {
        let val = e.target.value;
        let filter = [];
        if (val.length > 0) {
            filter = this.state.countries?.filter(c =>
                c.menu.toLowerCase().includes(val.toLowerCase())
            )

        }
        this.setState({
            filteredCountry: filter,
            selectedCountry: val,
            countryError: '',
            isMealMenu: false,
            isGenderMenuOpen: false,
            isDOB: false,
            isSeatMenu: false,
        })
    }

    handleSelectCountry = (val) => {
        let filter = [];
        this.setState({
            filteredCountry: filter,
            selectedCountry: val.menu,
        })
    }

    handleEmailValidation = (e) => {
        this.setState({
            emailAddress: e.target.value,
            emailError: '',
        })
    }

    handleEmailOnKeyUp = (e) => {
        let val = e.target.value;
        if (emailValidation(val)) {
            this.setState({
                emailAddress: val,
            })
        }
        else {
            this.setState({
                emailError: 'Enter a proper Email'
            })
        }
    }
    handleMobileValidation = (e) => {
        this.setState({
            contactNumber: e.target.value,
            contactError: '',
        })

    }
    handleEmergencyContactValidation = (e) => {
        this.setState({
            emergencyContactNumber: e.target.value,
            emergencyContactError: ''
        })

    }

    handlekeyMoveOnContact = (e) => {
        let val = e.target.value;
        if (mobileValidation(val)) {
            this.setState({
                contactNumber: e.target.value
            })
        }
        else {
            this.setState({
                contactNumberError: 'Enter a proper mobile'
            })
        }
    }
    handlekeyMoveOnEmerContact = (e) => {
        let val = e.target.value;
        if (mobileValidation(val)) {
            this.setState({
                emergencyContactNumber: e.target.value
            })
        }
        else {
            this.setState({
                emergencyContactError: 'Enter a proper mobile'
            })
        }
    }
    handleOpenMealMenu = () => {
        this.setState({
            isMealMenu: this.state.isMealMenu ? false : true,
            isGenderMenuOpen: false,
            isDOB: false,
            isSeatMenu: false,

        })
    }

    handleSelectMeal = (val) => {
        this.setState({
            selectedMeal: val.Meal,
            isMealMenu: this.state.isMealMenu ? false : true,
            mealError: '',
            MealID: val.ID,
        })
    }
    handleSelectSeat = async (val) => {
        try {


            this.setState({
                SelectedSeat: val.SeatNo,
                isSeatMenu: this.state.isSeatMenu ? false : true,
                seatError: '',
                SeatID: val.ID,
            })
        } catch (e) {

        }

        // await db.seats.update(val.id, { isAvailable: false })
        // this.fetchSeatData();
    }
    handleOpenSeatsMenu = () => {
        this.setState({
            isSeatMenu: this.state.isSeatMenu ? false : true,
            isMealMenu: false,
            isGenderMenuOpen: false,
            isDOB: false,

        })
    }
    handleFrequentNumber = (e) => {
        this.setState({
            frequentFlyerNumber: e.target.value,
            frequentFlyerError: ''
        })
    }
    handleSpecialAssistence = (e) => {
        this.setState({
            specialAssistence: e.target.value
        })
    }
    handleClear = () => {
        this.setState({
            firstName: '', middleName: '', lastName: '', gender: '', DOB: '', selectedCountry: '', contactNumber: '', emailAddress: '',
            SelectedSeat: '', selectedMeal: '', emergencyContactNumber: '', frequentFlyerNumber: '', specialAssistence: '', address: ''
        })
    }
    handleSave = async () => {
        let isValid = true;
        let { updatedID, isActive, bookingID, isCheckedIn, flightID, firstName, middleName, lastName, specialAssistence,
            address, gender, DOB, selectedCountry, contactNumber, emailAddress, SelectedSeat, selectedMeal, SeatID, MealID,
            emergencyContactNumber, frequentFlyerNumber, genderID } = this.state;
        if (firstName) {
            isValid = true;
            this.setState({
                firstNameError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                firstNameError: 'Fill this field'
            })
        }
        if (gender) {
            isValid = true;
            this.setState({
                genderError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                genderError: 'Fill this field'
            })
        }
        if (DOB) {
            isValid = true;
            this.setState({
                DOBError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                DOBError: 'Fill this field'
            })
        }
        if (selectedCountry) {
            isValid = true;
            this.setState({
                countryError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                countryError: 'Fill this field'
            })
        }
        if (contactNumber) {
            isValid = true;
            this.setState({
                contactError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                contactError: 'Fill this field'
            })
        }
        if (emailAddress) {
            isValid = true;
            this.setState({
                emailError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                emailError: 'Fill this field'
            })
        }
        if (SelectedSeat) {
            isValid = true;
            this.setState({
                seatError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                seatError: 'Fill this field'
            })
        }
        if (selectedMeal) {
            isValid = true;
            this.setState({
                mealError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                mealError: 'Fill this field'
            })
        }
        if (emergencyContactNumber) {
            isValid = true;
            this.setState({
                emergencyContactError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                emergencyContactError: 'Fill this field'
            })
        }
        if (frequentFlyerNumber) {
            isValid = true;
            this.setState({
                frequentFlyerError: ''
            })
        }
        else {
            isValid = false;
            this.setState({
                frequentFlyerError: 'Fill this field'
            })
        }

        if (isValid) {
            if (this.state.updatedID) {
                try {
                    let passangerData = {
                        updatedID,
                        flightID,
                        bookingID,
                        isCheckedIn,
                        firstName,
                        middleName,
                        lastName, specialAssistence, address,
                        genderID, DOB, selectedCountry, contactNumber, emailAddress,
                        SeatID, MealID, emergencyContactNumber,
                        frequentFlyerNumber, isActive
                    }

                    const res = await fetch('https://ticket-booking-omega-sand.vercel.app/api/test', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(passangerData)
                    })
                    await fetch('https://ticket-booking-omega-sand.vercel.app/api/seat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'Application/json' },
                        body: JSON.stringify(SeatID)
                    })


                    const data = await res.json();
                    this.setState({
                        isSeatMenu: false,
                        isUpdated: true,
                    }, () => this.initializeSeat())
                } catch (error) {
                }
                this.setState({
                    updatedID: null,
                    isFlightDetails: false,
                    isUpdateContacts: true,
                    isPassangerDetails: false,
                    isCheckIn: false,
                    isManageBookings: false,
                    isBookTickets: false,
                }, () => this.handleClear())
                this.setState({
                    isUpdate: false,
                })
            }
            else {
                if (flightID) {
                    this.setState({
                        isFlightIDMissing: false,

                    })
                    bookingID = generateRandonID();

                    let passangerData = {
                        flightID,
                        bookingID,
                        isCheckedIn,
                        firstName,
                        middleName,
                        lastName, specialAssistence, address,
                        genderID, DOB, selectedCountry, contactNumber, emailAddress,
                        SeatID, MealID, emergencyContactNumber,
                        frequentFlyerNumber, isActive
                    }
                    await fetch('https://ticket-booking-omega-sand.vercel.app/api/test', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(passangerData)
                    })
                    await fetch('https://ticket-booking-omega-sand.vercel.app/api/seat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'Application/json' },
                        body: JSON.stringify(SeatID)
                    })
                    this.setState({
                        isPassangerAvailable: true,
                        bookingID,
                        isSeatMenu: false,
                        isAdded: true,
                    }, () => {
                        this.handleBooking()
                        this.initializeSeat()
                    })

                }
                else {
                    this.setState({
                        isFlightIDMissing: true
                    })
                }
            }
            this.fetchFilghtData();
            this.fetchPassangerDetails();
        }


    }

    // addPassangerDetails = async (flightID,
    //     bookingID,
    //     isCheckedIn,
    //     firstName,
    //     middleName,
    //     lastName, specialAssistence, address,
    //     gender, DOB, selectedCountry, contactNumber, emailAddress,
    //     SelectedSeat, selectedMeal, emergencyContactNumber,
    //     frequentFlyerNumber, isActive) => {

    //     try {
    //         bookingID = generateRandonID();
    //         this.setState({
    //             isPassangerAvailable: true,
    //             bookingID,
    //         }, () => { this.handleBooking() })

    //         let encode = await encryption({
    //             flightID,
    //             bookingID,
    //             isCheckedIn,
    //             firstName,
    //             middleName,
    //             lastName, specialAssistence, address,
    //             gender, DOB, selectedCountry, contactNumber, emailAddress,
    //             SelectedSeat, selectedMeal, emergencyContactNumber,
    //             frequentFlyerNumber, isActive
    //         })
    //         let book = await encryption(bookingID);
    //         await db.passangerDetails.add({ bID: book, data: encode })
    //     } catch (error) {
    //         if (error.name === 'ConstraintError') {
    //             bookingID = generateRandonID();
    //             this.addPassangerDetails(flightID,
    //                 bookingID,
    //                 isCheckedIn,
    //                 firstName,
    //                 middleName,
    //                 lastName, specialAssistence, address,
    //                 gender, DOB, selectedCountry, contactNumber, emailAddress,
    //                 SelectedSeat, selectedMeal, emergencyContactNumber,
    //                 frequentFlyerNumber, isActive)
    //         }
    //     } window.alert('Added Successfully!!')
    //     this.setState({
    //         flightID: null,
    //         isFlightDetails: false,
    //         isUpdateContacts: true,
    //         isPassangerDetails: false,
    //         isCheckIn: false,
    //         isManageBookings: false,
    //         isBookTickets: false,
    //     }, () => this.handleClear())

    // }

    handleManageBooking = (e) => {
        this.setState({
            manageBookingID: e.target.value,
            manageBookingError: '',
        })
    }
    handleManageMobile = (e) => {
        this.setState({
            ManageMobile: e.target.value,
            manageMobileError: ''
        })
    }
    handleOnView = () => {
        let isValid;
        if (this.state.manageBookingID) {
            if (BookingIDValidation(this.state.manageBookingID)) {
                isValid = true
                this.setState({
                    manageBookingError: ''
                })
            }
            else {
                isValid = false
                this.setState({
                    manageBookingError: 'Please enter a valid BookingID'
                })
            }
        }
        else {
            isValid = false
            this.setState({
                manageBookingError: 'Please fill the field'
            })
        }
        if (this.state.ManageMobile) {
            if (mobileValidation || emailValidation) {
                isValid = true;
                this.setState({
                    manageMobileError: ''
                })
            }
            else {
                isValid = false
                this.setState({
                    manageMobileError: 'Enter a proper mobile or email'
                })
            }

        }
        else {
            isValid = false
            this.setState({
                manageMobileError: 'Please fill the field'
            })
        }

        if (isValid) {
            this.handleFilterMangeBooking(this.state.manageBookingID);
        }
    }
    handleFilterMangeBooking = async (bookingID) => {
        let clone = await this.fetchManageBooking()

        let data = clone?.filter(i =>

            i?.BookingID?.toLowerCase().includes(bookingID?.toLowerCase())
            //   && i?.passangerDetails.emailAddress.toLowerCase().includes(this.state.ManageMobile.toLowerCase())
            //  || i?.passangerDetails.contactNumber.toLowerCase().includes(this.state.ManageMobile.toLowerCase())
        )

        if (data[0]) {
            //     let flightData = await db.availableFlights.get({ flightID: data[0]?.flightID })

            //     const combined = [{
            //         ...data[0],
            //         ...flightData
            //     }]
            let filter = [];
            filter.push(data[0])
            this.setState({
                manageBooking: filter
            })
        }
        else {
            this.setState({
                manageBooking: [],
                manageNoData: ''
            })
        }


    }
    handleFilterCheckIn = async (bookingID) => {
        let clone = await this.fetchCheckinData();
        let data = clone?.filter(i =>
            i?.BookingID?.toLowerCase().includes(bookingID?.toLowerCase())
        )


        if (data) {
            // let flightData = await db.availableFlights.get({ flightID: data[0]?.flightID })
            // const combined = [{
            //     ...data[0],
            //     ...flightData
            // }]
            this.setState({
                checkInList: data
            })
        }
        else {
            this.setState({
                checkInList: [],
                isCheckInEmpty: ''
            })
        }


    }
    handleSearchCheckIn = () => {
        let isValid;
        if (this.state.checkInBookingID) {
            if (BookingIDValidation(this.state.checkInBookingID)) {
                isValid = true
                this.setState({
                    checkInError: ''
                })
            }
            else {
                isValid = false
                this.setState({
                    checkInError: 'Please enter a valid BookingID'
                })
            }
        }
        else {
            isValid = false
            this.setState({
                checkInError: 'Please fill the field'
            })
        }
        if (isValid) {
            this.handleFilterCheckIn(this.state.checkInBookingID);
        }
    }

    handleUpdateClick = (item) => {
        this.setState({
            isFlightDetails: false,
            isUpdateContacts: false,
            isPassangerDetails: true,
            isCheckIn: false,
            isManageBookings: false,
            isBookTickets: false,
            isUpdate: true,
            updatedID: item.ID,
            flightID: item.FlightID,
            bookingID: item.BookingID,
            firstName: item.FirstName,
            middleName: item.MiddleName,
            lastName: item.LastName,
            specialAssistence: item.SpecialAssistence,
            address: item.Address,
            gender: item.Gender,
            genderID: item?.GenderID,
            SeatID: item?.SeatID,
            MealID: item?.MealID,
            DOB: item.DOB,
            selectedCountry: item.Country,
            contactNumber: item.Contact,
            emailAddress: item.Email,
            SelectedSeat: item.Seat,
            selectedMeal: item.Meal,
            emergencyContactNumber: item.EmergencyContactNo,
            frequentFlyerNumber: item.FrequentFlyer,
        }, () => { this.handleRouter(this.state.passangerDetailsID) })
    }
    handleCheckInBookingID = (e) => {
        this.setState({
            checkInBookingID: e.target.value
        })
    }

    handleConfirmCheckIn = async (i) => {

        // const record = await db.passangerDetails.where('bookingID').equals(i?.bookingID)?.toArray();
        // await db.passangerDetails.where('bookingID').equals(i?.bookingID).modify({ isCheckedIn: true }).then(updated => {
        //     if (updated) {
        //         this.fetchFilghtData();
        //         this.handleFilterCheckIn(i?.bookingID);
        //     }
        //     else {
        //     }
        // })

        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/checkin', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ BID: i.BookingID })
            })
            this.handleFilterCheckIn(i.BookingID);
        } catch (e) {

        }




    }


    handleAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleTopSearch = (e) => {
        let value = e.target.value;
        let data = this.state.recentBookingListClone.filter(i =>
            i?.from.toLowerCase().includes(value.toLowerCase()) ||
            i?.to.toLowerCase().includes(value.toLowerCase())
        )
        this.setState({
            recentBookingList: data,

        })
    }

    handleConfirmCancel = (i) => {
        this.setState({
            isCancelBooking: true,
            BID: i?.BookingID
        })
    }

    handleCancel = async () => {
        try {
            await fetch('https://ticket-booking-omega-sand.vercel.app/api/managebookings', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ BID: this.state.BID })
            }).then(res => res.json())

            this.setState({
                isCancelBooking: false,
            })

            await this.handleFilterMangeBooking(this.state.BID)
            this.setState({
                manageBookingID: '',
                ManageMobile: ''
            })

        } catch (e) {
        }

        //  const record = await db.passangerDetails.where('bookingID').equals(i?.bookingID).toArray();

        // await db.passangerDetails.where('bookingID').equals(this.state.manageBookingID).modify({ isActive: false }).then(res => {
        //     let data = db.passangerDetails?.toArray();
        //     let decode = decryption(data);
        //     this.updateManageBooking();
        // }).then(() => { this.handleFilterMangeBooking(this.state.manageBookingID) });

    }
    updateManageBooking = async () => {
        let data = await db.passangerDetails?.toArray();
        let decode = decryption(data);
        let activeData = [];
        decode.forEach(i => {
            if (i?.isActive) {
                activeData.push(i);
            }
        })
        activeData.reverse();
        this.setState({
            manageBookingClone: activeData,
        })

    }
    handleRouter = (id) => {
        let updated = this.state.leftMenu.map(i => {
            return {
                ...i,
                isSelect: id == i?.id
            }
        })

        this.setState({
            leftMenu: updated
        })
    }



    render() {

        return (
            <div>
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
                <div style={{ display: 'flex' }}>
                    {/* Menu */}
                    <div style={{ flex: 1, backgroundColor: Color.whiteFont, display: 'flex', flexDirection: 'column', gap: '34px', }}>
                        <div style={{
                            display: 'flex', position: 'fixed', zIndex: 100,
                            transition: 'width 0.3s ease',
                            overflowX: 'hidden',
                        }}>
                            <div className='sidebar' style={{
                                width: this.state.screenWidth > 768 ? '20%' : this.state.showSidebar ? '80%' : '0',
                                flex: 1, backgroundColor: Color.whiteFont, display: 'flex', flexDirection: 'row',
                            }}>
                                <div className='center' style={{

                                    backgroundColor: Color.lineColor,
                                    borderRadius: '49px', padding: '49px 12px',
                                    flex: 2, display: 'flex', flexDirection: 'column',
                                    gap: '70px', margin: '25px 34px',
                                }}>
                                    {this.state?.leftMenu?.map(i =>
                                        <div
                                            onClick={() => this.handleRouter(i?.id)}
                                            onMouseOver={() => this.handleLeftMenuHover(i)}
                                            onMouseLeave={() => this.handleLeftMenuMouseLeave(i)}
                                            style={{
                                                cursor: 'pointer', fontSize: '14px', fontWeight: '500',
                                                color: i?.isSelect ? Color.flightBG : i?.isHover ? Color.blackFont : Color.lightGrey
                                            }}
                                        >{i.icon && <i.icon size={25} />}</div>
                                    )}
                                </div>

                                <div style={{ padding: '49px 12px', flex: 4, display: 'flex', flexDirection: 'column', gap: '70px', margin: '25px 0px', }}>
                                    {this.state?.leftMenu?.map(i =>
                                        <div
                                            onClick={() => this.handleRouter(i?.id)}
                                            onMouseOver={() => this.handleLeftMenuHover(i)}
                                            onMouseLeave={() => this.handleLeftMenuMouseLeave(i)}
                                            style={{
                                                cursor: 'pointer', fontSize: '14px', fontWeight: '500',
                                                color: i?.isSelect ? Color.flightBG : i?.isHover ? Color.blackFont : Color.lightGrey
                                            }}
                                        >{i?.menu}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div style={{
                        flex: 5, backgroundColor: Color.whiteFont,
                        //marginLeft: this.state.screenWidth > 768 ? '20%' : this.state.showSidebar ? '80%' : '0',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>
                            {/* Header */}
                            <div style={{}}>
                                <div style={{ display: 'flex', position: 'fixed', right: 0, left: '255px', backgroundColor: Color.whiteFont, zIndex: 1000 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0px', width: '100%', gap: '12px' }}>
                                        <div className='heading' style={{ display: 'flex', flex: 1, fontSize: '34px', color: Color.flightBG }}>IndiGo</div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 3, }}>
                                            <div style={{ position: 'relative', width: '88%', }}>
                                                <BsSearch color={Color.grey} style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '16px',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none', // Allows click to pass through to input
                                                }} />
                                                <input
                                                    onChange={(e) => this.handleTopSearch(e)}
                                                    placeholder='Search something...'
                                                    style={{ border: 'none', borderRadius: '7px', width: '88%', background: Color.lineColor, padding: '20px 0px 20px 43px', margin: '0px', outline: 'none' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 2, }}>
                                            {this.state.topMenu.length > 0 && this.state.topMenu.map(i =>
                                                <div
                                                    onClick={() => this.handleSelect(i)}
                                                    onMouseOver={() => this.handleHover(i)}
                                                    onMouseLeave={() => this.handleMouseLeave(i)}
                                                    style={{
                                                        padding: '5px', margin: '10px',
                                                        borderBottom: i?.isSelect && '3px solid #200377',
                                                        color: i?.isSelect ? Color.flightBG : i?.isHover ? Color.flightBG : Color.lightGrey,
                                                        borderRadius: '2px',
                                                        cursor: 'pointer'
                                                    }}>
                                                    {i?.menu}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '70px' }}>
                                {this.state.leftMenu?.map(i =>
                                    i?.id == 1 && i?.isSelect ?
                                        <div style={{ display: 'flex', gap: '34px', flexDirection: 'column' }}>
                                            {/* Form */}
                                            <div style={{
                                                // backgroundImage: `url(${flight})`,
                                                //backgroundPosition: 'center',
                                                //backgroundSize: 'cover',
                                                backgroundColor: Color.FlightTheme,
                                                borderRadius: '25px', height: '250px', margin: '0px 12px'
                                            }}>
                                                <div style={{ display: 'flex', }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div className='heading' style={{
                                                            color: Color.flightBG, textAlign: 'right', fontSize: '34px', margin: '0px 34px',
                                                            height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                                        }}>
                                                            PLAN YOUR TRIP
                                                        </div>

                                                    </div>
                                                    <div style={{ flex: 4, }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '250px' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                                                <div style={{ display: 'flex', width: '100%' }}>
                                                                    <div style={{ flex: 2, margin: '0px 16px', color: Color.blackFont }}>From</div>
                                                                    <div style={{ flex: 2, margin: '0px 16px', color: Color.blackFont }}>To</div>
                                                                    <div style={{ flex: 2, margin: '0px 16px', color: Color.blackFont }}>On</div>
                                                                    <div style={{ flex: 1 }}></div>
                                                                </div>
                                                                <div style={{
                                                                    display: 'flex', justifyContent: 'space-around',
                                                                    alignItems: 'center', minHeight: '70px',
                                                                    width: '100%',
                                                                    borderRadius: '34px',
                                                                    backgroundColor: Color.whiteFont, gap: '12px'
                                                                }}>
                                                                    <div style={{ flex: 1 }}></div>
                                                                    <div style={{ flex: 4, }}>
                                                                        <input
                                                                            value={this.state.from}
                                                                            onChange={(e) => this.handleOnChangeOFFrom(e)}
                                                                            placeholder='Tirunelveli'
                                                                            style={{ borderRadius: '7px', border: 'none', outline: 'none', background: 'none', padding: '12px' }} />
                                                                    </div>
                                                                    <div style={{ flex: 1 }}><HiSwitchHorizontal size={16} /></div>
                                                                    <div style={{ flex: 2, }}>
                                                                        <input
                                                                            value={this.state.to}
                                                                            onChange={(e) => this.handleOnChangeOFTo(e)}
                                                                            placeholder='Chennai'
                                                                            style={{ borderRadius: '7px', border: 'none', outline: 'none', background: 'none', padding: '12px' }} />
                                                                    </div>
                                                                    <div style={{ flex: 1 }}> {"|"}</div>
                                                                    <div
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isDatePicker: this.state.isDatePicker ? false : true,
                                                                            })
                                                                        }} style={{ flex: 4, }}>
                                                                        <input
                                                                            value={this.state.bookingDate}
                                                                            placeholder='Select date'
                                                                            style={{
                                                                                borderRadius: '7px', border: 'none', outline: 'none',
                                                                                background: 'none', padding: '12px',
                                                                                position: 'relative',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        />
                                                                        {this.state.isDatePicker &&
                                                                            <div style={{ position: 'absolute' }}>
                                                                                <DatePicker
                                                                                    onSave={(d, m, y) => this.handleDate(d, m, y)}
                                                                                />
                                                                            </div>}
                                                                    </div>
                                                                    <div onClick={() => {
                                                                        this.setState({
                                                                            isDatePicker: this.state.isDatePicker ? false : true,
                                                                        })
                                                                    }} style={{ flex: 1 }}><FaRegCalendar /></div>
                                                                    <div style={{ flex: 3 }}>
                                                                        <button
                                                                            style={{ border: 'none', backgroundColor: Color.flightBG, color: Color.whiteFont, borderRadius: '34px', padding: '16px 25px', marginRight: '16px' }}
                                                                            onClick={this.handleSearch}>Search</button>
                                                                    </div>
                                                                </div>
                                                                <span style={{ fontSize: '12px', color: Color.red }}>
                                                                    {this.state.isError ? this.state.isError : ''}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* recentBooking */}
                                            <div>
                                                <div style={{ display: 'flex', color: Color.disableColor, margin: '12px' }}>
                                                    <div className='heading' style={{ flex: 3, color: Color.lightGrey, }} >Recent Bookings</div>
                                                    {!this.state.seeMore && <div className='heading' style={{ flex: 1, color: Color.lightGrey }} >Seasonal Offers</div>}
                                                </div>
                                                {this.state.seeMore ?
                                                    <div>
                                                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                                            {
                                                                this.state.recentBookingList?.map(i =>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: Color.recentCardBG, width: '300px', borderRadius: '25px', boxShadow: Color.shadowColor }}>
                                                                        <div style={{ margin: '25px 25px 0px' }}>
                                                                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', wordWrap: 'break-word', whiteSpace: 'normal' }} className='heading'>
                                                                                <div style={{ flex: 3, color: Color.flightBG, fontSize: '25px' }}>{i?.Departure}</div>
                                                                                <div style={{ flex: 1, color: Color.flightBG, fontSize: '25px' }}>{'->'}</div>
                                                                            </div>
                                                                            <div style={{ color: Color.flightBG, fontSize: '25px' }} className='heading'>{i?.Arrival}</div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0px 0px 0px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', }}>
                                                                            <div style={{ backgroundColor: Color.recentDateBadgeBG, borderRadius: '12px', padding: '7px', margin: '16px', color: Color.dateText }}>{i?.BookingDate}</div>
                                                                            <div className='center' style={{
                                                                                cursor: 'pointer',
                                                                                fontWeight: 'bold', backgroundColor: Color.flightBG,
                                                                                borderTopLeftRadius: '25px', borderBottomRightRadius: '25px',
                                                                                padding: '25px'
                                                                            }}><FaChevronRight color={Color.whiteFont} /></div>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    : <div style={{ display: 'flex' }}>
                                                        <div style={{ flex: 3, display: 'flex', gap: '25px', alignItems: 'center', justifyContent: !this.state.recentBookingList?.length > 0 && 'center' }}>
                                                            <div style={{ display: 'flex', gap: '25px' }}>
                                                                {this.state.recentBookingList.length > 0 ?
                                                                    this.state.recentBookingList?.slice(0, 2).map(i =>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: Color.recentCardBG, width: '300px', borderRadius: '25px', boxShadow: Color.shadowColor }}>
                                                                            <div style={{ margin: '25px 25px 0px' }}>
                                                                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', wordWrap: 'break-word', whiteSpace: 'normal' }} className='heading'>
                                                                                    <div style={{ flex: 3, color: Color.flightBG, fontSize: '25px' }}>{i?.Departure}</div>
                                                                                    <div style={{ flex: 1, color: Color.flightBG, fontSize: '25px' }}><IoIosArrowForward /></div>
                                                                                </div>
                                                                                <div style={{ color: Color.flightBG, fontSize: '25px' }} className='heading'>{i?.Arrival}</div>
                                                                            </div>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 0px 0px 0px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px' }}>
                                                                                <div style={{ backgroundColor: Color.recentDateBadgeBG, borderRadius: '12px', padding: '7px', margin: '16px', color: Color.dateText }}>{i?.BookingDate}</div>
                                                                                <div
                                                                                    onClick={() => { this.handleRouter(this.state.manageBookingRouterID) }}
                                                                                    className='center' style={{
                                                                                        cursor: 'pointer',
                                                                                        fontWeight: 'bold', backgroundColor: Color.flightBG,
                                                                                        borderTopLeftRadius: '25px', borderBottomRightRadius: '25px',
                                                                                        padding: '25px'
                                                                                    }}><FaChevronRight color={Color.whiteFont} /></div>
                                                                            </div>
                                                                        </div>

                                                                    ) : <div className='center' >
                                                                        <div>No recent bookings
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            {this.state.recentBookingList.length > 2 &&
                                                                <div
                                                                    onClick={this.handleSeeMore}
                                                                    className='center'
                                                                    style={{ height: '50px', width: '50px', borderRadius: '25px', backgroundColor: Color.disableColor, cursor: 'pointer' }}>
                                                                    <div className='heading'>{this.state.recentBookingList.length - 2}+</div>
                                                                </div>}
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{
                                                                padding: '12px', gap: '70px', display: 'flex', flexDirection: 'column',
                                                                //backgroundImage: `url(${travel})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                                                backgroundColor: Color.lineColor,
                                                                flex: 1, margin: '0px 12px', borderRadius: '25px', height: '171px'
                                                            }}>
                                                                <div>
                                                                    <div className='heading' style={{ color: Color.flightBG, fontSize: '30px' }}>Travel across</div>
                                                                    <div className='heading' style={{ color: Color.flightBG, fontSize: '30px' }}>World</div>
                                                                    <div style={{ display: 'flex', gap: '12px ' }}>
                                                                        <div className='heading' style={{ fontSize: '34px', color: Color.red, }}>80%</div>
                                                                        <div className='heading' style={{ display: 'flex', alignItems: 'flex-end', color: Color.red, }}>Off</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                            </div>
                                            {/* back */}
                                            <div style={{ display: 'flex', justifyContent: this.state.seeMore ? 'space-between' : 'flex-end' }}>

                                                {this.state.seeMore &&
                                                    <div
                                                        onClick={this.handleSeeLess}
                                                        className='center' style={{ cursor: 'pointer' }}>
                                                        <div style={{ margin: '0px 16px', fontWeight: 'bold', fontSize: '16px', color: Color.grey }}> See less</div>
                                                    </div>}
                                                <div
                                                    onClick={this.redirectToTaskManager}
                                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.flightBG, margin: '7px', padding: '7px', borderRadius: '7px', color: Color.whiteFont }}>
                                                    <div style={{ margin: '0px 12px 0px 0px' }}><BiLeftArrow /></div>
                                                    <div> Back</div>

                                                </div>
                                            </div>
                                        </div> :
                                        i?.id == 2 && i?.isSelect ?
                                            <div>
                                                <div style={{ display: 'flex', gap: '23px', flexDirection: 'row', justifyContent: 'space-between', margin: '25px' }}>
                                                    <div style={{ display: 'grid', gap: '70px', gridTemplateColumns: 'repeat(2,1fr)' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <input maxLength={10} onChange={(e) => this.handleManageBooking(e)} value={this.state.manageBookingID} className='passanger-input' placeholder='BookingID / PNR' />
                                                            {this.state.manageBookingError && <span className='field-error'>{this.state.manageBookingError}</span>}
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}><input onChange={(e) => this.handleManageMobile(e)} value={this.state.ManageMobile} className='passanger-input' placeholder='Email / Mobile' />
                                                            {this.state.manageMobileError && <span className='field-error'>{this.state.manageMobileError}</span>}
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '22%' }}>
                                                        <button onClick={this.handleOnView} style={{ border: 'none', background: 'none', borderRadius: '12px', color: Color.whiteFont, backgroundColor: Color.flightBG, padding: '12px', }}>View</button>
                                                    </div>

                                                </div>
                                                {this.state.showBooking &&
                                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '34px', margin: '12px 0px' }}>
                                                        {this.state.isCancelBooking && <div style={{ height: '70%', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                                                            <AlertPopup
                                                                btn={Constant.yep}
                                                                msg={Constant.cancelAlert}
                                                                onRedirect={() => this.handleCancel(this.state.bookingID)}
                                                                alert={true}
                                                                onClose={() => {
                                                                    this.setState({
                                                                        isCancelBooking: false,
                                                                    })
                                                                }}
                                                            />
                                                        </div>}
                                                        {this.state.manageBooking?.length > 0 ?
                                                            this.state.manageBooking?.map(i =>
                                                                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px', width: '300px', backgroundColor: Color.whiteFont, padding: '12px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>

                                                                        <div style={{ display: 'flex', }}>

                                                                            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>

                                                                                <div style={{ fontWeight: 'bold' }}>{i?.BookingID}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ fontSize: '12px', fontWeight: '500' }}>{i?.Contact}</div>

                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                                                            <div style={{ flex: 2, fontSize: '25px', fontWeight: 'bold' }}>{i?.Name}</div>
                                                                            <div style={{ flex: 1, gap: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', backgroundColor: Color.FlightTheme, borderRadius: '7px' }}>
                                                                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Seat: </div>
                                                                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{i?.SeatNo}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <div style={{ flex: 1, color: Color.grey, fontSize: '12px', }}>{i?.Gender}</div>
                                                                            <div style={{ flex: 0.5, color: Color.grey }}>{"|"}</div>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>DOB: </div>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>{i?.DOB}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Flight : </div>
                                                                                <div style={{ fontWeight: 'bold' }}>{i?.AirLine}</div>
                                                                                <div style={{ fontWeight: 'bold' }}>{i?.FlightID}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ gap: '12px', display: 'flex', alignItems: 'center', borderRadius: '3px', flexWrap: 'wrap', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                                                            <div style={{ color: Color.grey }}>Route: </div>
                                                                            <div style={{ display: 'flex', gap: '7px' }}>
                                                                                <div style={{ flex: 1, }}>{i?.Arrival}</div>
                                                                                <div className='center' style={{ flex: 1, color: Color.grey }}>{' ->'}</div>
                                                                                <div style={{ flex: 2, textAlign: 'right' }}>{i?.Departure}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>Departure: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.DepartureTime}</div>
                                                                            </div>
                                                                            <div style={{ flex: 0.5, color: Color.grey }}>{"|"}</div>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>Arrival: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.ArrivalTime}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Class: </div>
                                                                                <div style={{ fontWeight: 'bold' }}>{i?.Class}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Date: </div>
                                                                                <div>{i?.DepartureDate}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Baggage: </div>
                                                                                <div>{i?.Baggage}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Meal: </div>
                                                                                <div>{i?.Meal}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey, fontSize: '15px', }}>Emergency Contact No: </div>
                                                                                <div style={{ fontSize: '15px', fontWeight: '500', }}>{i?.EmergencyContactNo}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                                                        {/* <button onClick={() => this.handleManage(i)} style={{ border: 'none', backgroundColor: Color.flightBG, color: Color.whiteFont, padding: '12px', borderRadius: '7px' }}>Manage</button> */}
                                                                        <button onClick={() => this.handleConfirmCancel(i)} style={{ border: 'none', backgroundColor: Color.red, color: Color.whiteFont, padding: '12px', borderRadius: '7px' }}>Cancel</button>
                                                                    </div>

                                                                </div>
                                                            ) :
                                                            <div className='center' style={{ width: '100%' }}>{this.state.manageNoData}</div>
                                                        }
                                                    </div>
                                                }
                                            </div> :
                                            i?.id == 3 && i?.isSelect ?
                                                <div>
                                                    <div style={{ display: 'flex', gap: '23px', flexDirection: 'row', justifyContent: 'space-between', margin: '25px' }}>
                                                        <div style={{ display: 'flex', gap: '23px', }}>
                                                            <div>
                                                                <input value={this.state.checkInBookingID} onChange={(e) => this.handleCheckInBookingID(e)} className='passanger-input' placeholder='BookingID / PNR' />
                                                                {this.state.checkInBookingID && <span className='field-error'>{this.state.checkInError}</span>}
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <button onClick={this.handleSearchCheckIn} style={{ border: 'none', background: 'none', borderRadius: '12px', color: Color.whiteFont, backgroundColor: Color.flightBG, padding: '12px', }}>Search</button>
                                                        </div>

                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '34px', margin: '12px 0px' }}>

                                                        {this.state.checkInList?.length > 0 ?
                                                            this.state.checkInList?.map(i =>
                                                                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px', width: '300px', backgroundColor: Color.whiteFont, padding: '12px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>

                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                                                            <div style={{ flex: 1, gap: '7px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '2px', borderRadius: '7px' }}>
                                                                                <div style={{ fontSize: '16px', fontWeight: '' }}>Passanger: </div>
                                                                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{i?.firstName}</div>
                                                                            </div>
                                                                            <div style={{ flex: 1, gap: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', backgroundColor: Color.FlightTheme, borderRadius: '7px' }}>
                                                                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Seat: </div>
                                                                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{i?.SeatNo}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                            <div style={{ color: Color.grey }}>Booking ID : </div>
                                                                            <div style={{ fontWeight: 'bold' }}>{i?.BookingID}</div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Flight : </div>
                                                                                <div style={{ fontWeight: 'bold' }}>{i?.AirLine}</div>
                                                                                <div style={{ fontWeight: 'bold' }}>{i?.FlightID}</div>
                                                                            </div>
                                                                        </div>


                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>From: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.Departure}</div>
                                                                            </div>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>To: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.Arrival}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>Departure: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.DepartureTime}</div>
                                                                            </div>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                                <div style={{ fontSize: '12px', color: Color.grey }}>Arrival: </div>
                                                                                <div style={{ fontSize: '12px', }}>{i?.ArrivalTime}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', }}>
                                                                            <div style={{ flex: 2, display: 'flex', gap: '7px', }}>
                                                                                <div style={{ color: Color.grey }}>Status: </div>
                                                                                <div style={{ fontWeight: 'bold', color: i?.IsCheckedIn ? Color.green : Color.red }}>{i?.IsCheckedIn ? 'Checked In' : 'Not Cheked-In'}</div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                                                        <button onClick={() => this.handleConfirmCheckIn(i)} style={{ border: 'none', backgroundColor: Color.green, color: Color.whiteFont, padding: '12px', borderRadius: '7px' }}>Confirm Check-In</button>
                                                                    </div>

                                                                </div>
                                                            )
                                                            : <div>{this.state.isCheckInEmpty}</div>
                                                        }
                                                    </div>
                                                </div> :
                                                i?.id == 4 && i?.isSelect ?
                                                    <div>
                                                        {this.state.isAdded && <div style={{ height: '70%', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                                                            <AlertPopup
                                                                btn={Constant.ok}
                                                                msg={Constant.added}
                                                                onRedirect={() => {
                                                                    this.handleRouter(this.state.updateContactID)
                                                                    this.setState({
                                                                        isAdded: false,
                                                                        flightID: null,
                                                                    }, () => this.handleClear())
                                                                }}
                                                                onClose={() => {
                                                                    this.setState({
                                                                        isAdded: false,
                                                                    })
                                                                }}
                                                            />
                                                        </div>}
                                                        {this.state.isUpdated && <div style={{ height: '70%', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                                                            <AlertPopup
                                                                btn={Constant.ok}
                                                                msg={Constant.updated}
                                                                onRedirect={() => {
                                                                    this.handleRouter(this.state.updateContactID)
                                                                    this.setState({
                                                                        isUpdated: false,
                                                                    })
                                                                }}
                                                                onClose={() => {
                                                                    this.setState({
                                                                        isUpdated: false,
                                                                    })
                                                                }}
                                                            />
                                                        </div>}
                                                        {this.state.isFlightIDMissing && <div style={{ height: '70%', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 100 }}>
                                                            <AlertPopup
                                                                btn={Constant.SelectFlight}
                                                                msg={Constant.flightIDMissing}
                                                                onRedirect={() => this.handleRouter(this.state.flightDetailsID)}
                                                                alert={true}
                                                                onClose={() => {
                                                                    this.setState({
                                                                        isFlightIDMissing: false,
                                                                    })
                                                                }}
                                                            />
                                                        </div>}
                                                        <div style={{ display: 'grid', gap: '43px', gridTemplateColumns: 'repeat(4,1fr)', margin: '25px' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <input style={{ border: this.state.firstNameError && '1px solid red' }} value={this.state.firstName} maxLength={10} onKeyDown={handleOnKeyAlpha} onChange={(e) => this.handleFirstName(e)} className='passanger-input' placeholder='First Name' />
                                                                {this.state.firstNameError && <span className='field-error'>{this.state.firstNameError}</span>}
                                                            </div>
                                                            <div >
                                                                <input value={this.state.middleName} maxLength={10} onKeyDown={handleOnKeyAlpha} onChange={(e) => this.handleMiddleName(e)} className='passanger-input' placeholder='Middle Name' />
                                                            </div>
                                                            <div>
                                                                <input value={this.state.lastName} maxLength={10} onKeyDown={handleOnKeyAlpha} onChange={(e) => this.handleLastName(e)} className='passanger-input' placeholder='Last Name' />
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', }}>
                                                                <input onClick={this.handleGenderMenuOpen}
                                                                    value={this.state.gender} style={{ cursor: 'pointer', border: this.state.genderError && '1px solid red' }} onChange={(e) => this.handleFirstName(e)} className='passanger-input' placeholder='Gender' />
                                                                {this.state.isGenderMenuOpen &&
                                                                    < div style={{ position: 'absolute', top: '52px', zIndex: 1 }}>
                                                                        <DropDownMenu
                                                                            option={this.state.genderMenu}
                                                                            isGender={true}
                                                                            onSelect={(v) => this.handleSelectGender(v)}
                                                                        />
                                                                    </div>
                                                                }
                                                                {this.state.genderError && <span className='field-error'>{this.state.genderError}</span>}</div>

                                                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', }}>
                                                                <input value={this.state.DOB} onClick={(e) =>
                                                                    this.setState({
                                                                        isDOB: this.state.isDOB ? false : true,
                                                                        isMealMenu: false,
                                                                        isGenderMenuOpen: false,
                                                                        isSeatMenu: false,
                                                                    })
                                                                } style={{ border: this.state.DOBError && '1px solid red' }} className='passanger-input' placeholder='Date Of Birth' />
                                                                {this.state.isDOB &&
                                                                    <div style={{ position: 'absolute', margin: '0px', top: '52px', zIndex: 1 }}>
                                                                        <DatePicker
                                                                            onSave={(d, m, y) => this.handleDOB(d, m, y)}
                                                                            isDOB={true}
                                                                        />
                                                                    </div>}
                                                                {this.state.DOBError && <span className='field-error'>{this.state.DOBError}</span>}
                                                            </div>

                                                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                                                <input style={{ border: this.state.countryError && '1px solid red' }} value={this.state.selectedCountry} onChange={(e) => this.handleSearchCountry(e)} className='passanger-input' placeholder='Select Country' />
                                                                < div style={{ position: 'absolute', top: '52px', zIndex: 1 }}>
                                                                    <DropDownMenu
                                                                        option={this.state.filteredCountry}
                                                                        isGender={true}
                                                                        onSelect={(v) => this.handleSelectCountry(v)}
                                                                    />
                                                                </div>
                                                                {this.state.countryError && <span className='field-error'>{this.state.countryError}</span>}
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <input style={{ border: this.state.contactError && '1px solid red' }} value={this.state.contactNumber} maxLength={10} onKeyDown={handleOnKeyNumber} onKeyUp={(e) => this.handlekeyMoveOnContact(e)} onChange={(e) => this.handleMobileValidation(e)} className='passanger-input' placeholder='Contact Number' />
                                                                {this.state.contactError && <span className='field-error'>{this.state.contactError}</span>}
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <input maxLength={25} style={{ border: this.state.emailError && '1px solid red' }} value={this.state.emailAddress} onChange={(e) => this.handleEmailValidation(e)} className='passanger-input' placeholder='Email Address' />
                                                                {this.state.emailError && <span className='field-error'>{this.state.emailError}</span>}
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                                                <input style={{ border: this.state.seatError && '1px solid red' }} value={this.state.SelectedSeat} onClick={(e) => this.handleOpenSeatsMenu(e)} className='passanger-input' placeholder='Seat Preference' />
                                                                {this.state.isSeatMenu &&
                                                                    < div style={{ position: 'absolute', top: '52px', zIndex: 1, cursor: 'pointer' }}>
                                                                        <DropDownMenu
                                                                            option={this.state.seats}
                                                                            isSeat={true}
                                                                            onSelect={(v) => this.handleSelectSeat(v)}
                                                                        />
                                                                    </div>
                                                                }
                                                                {this.state.seatError && <span className='field-error'>{this.state.seatError}</span>}
                                                            </div>

                                                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                                                <input style={{ border: this.state.mealError && '1px solid red' }} value={this.state.selectedMeal} onClick={(e) => this.handleOpenMealMenu(e)} className='passanger-input' placeholder='Meal Preference' />
                                                                {this.state.isMealMenu &&
                                                                    < div style={{ position: 'absolute', top: '52px', zIndex: 1 }}>
                                                                        <DropDownMenu
                                                                            meals={true}
                                                                            option={this.state.mealMenu}
                                                                            isGender={true}
                                                                            onSelect={(v) => this.handleSelectMeal(v)}
                                                                        />
                                                                    </div>
                                                                }
                                                                {this.state.mealError && <span className='field-error'>{this.state.mealError}</span>}
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <input style={{ border: this.state.emergencyContactError && '1px solid red' }} value={this.state.emergencyContactNumber} maxLength={10} onKeyDown={handleOnKeyNumber} onChange={(e) => this.handleEmergencyContactValidation(e)}
                                                                    onKeyUp={(e) => this.handlekeyMoveOnEmerContact(e)} className='passanger-input' placeholder='Emergency Contact Number' />
                                                                {this.state.emergencyContactError && <span className='field-error'>{this.state.emergencyContactError}</span>}
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <input style={{ border: this.state.frequentFlyerError && '1px solid red' }} value={this.state.frequentFlyerNumber}
                                                                    maxLength={8} onChange={(e) => this.handleFrequentNumber(e)} className='passanger-input' placeholder='Frequent Flyer Number' />
                                                                {this.state.frequentFlyerError && <span className='field-error'>{this.state.frequentFlyerError}</span>}
                                                            </div>
                                                            <div><textarea maxLength={200} value={this.state.specialAssistence} onChange={(e) => this.handleSpecialAssistence(e)} className='passanger-input textarea' placeholder='Special Assistence Needed' /></div>
                                                            <div><textarea maxLength={200} value={this.state.address} onChange={(e) => this.handleAddress(e)} className='passanger-input textarea' placeholder='Address' /></div>

                                                        </div>


                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '97%' }}>
                                                            <button style={{ color: Color.whiteFont, border: 'none', background: 'none', borderRadius: '12px', backgroundColor: Color.red, padding: '12px', margin: '0px 12px' }}
                                                                onClick={this.handleClear}
                                                            >Clear</button>
                                                            <button style={{ color: Color.whiteFont, border: 'none', background: 'none', borderRadius: '12px', backgroundColor: Color.flightBG, padding: '12px', }} onClick={this.handleSave}>{this.state.isUpdate ? 'Update' : 'Save'}</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    i?.id == 5 && i?.isSelect ?
                                                        this.state.passangerData?.length > 0 ?
                                                            <div>
                                                                <div>

                                                                    <div className='heading'>Passanger Details</div>
                                                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '34px', margin: '12px 0px' }}>

                                                                        {this.state.passangerData?.map(i =>
                                                                            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', margin: '20px', width: '300px', backgroundColor: Color.whiteFont, padding: '12px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', }}>
                                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                                                                        <div style={{ flex: 2, fontSize: '25px', fontWeight: 'bold' }}>{i?.FirstName}</div>
                                                                                        <div style={{ flex: 1, gap: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', backgroundColor: Color.yellow, borderRadius: '7px' }}>
                                                                                            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Seat: </div>
                                                                                            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{i?.Seat}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <div style={{ flex: 1, color: Color.grey, fontSize: '12px', }}>{i?.Gender}</div>
                                                                                        <div style={{ flex: 0.5, color: Color.grey }}>{"|"}</div>
                                                                                        <div style={{ flex: 2, display: 'flex', gap: '7px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                                            <div style={{ fontSize: '12px', color: Color.grey }}>DOB: </div>
                                                                                            <div style={{ fontSize: '12px', color: Color.grey }}>{i?.DOB}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', }}>

                                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                            <div style={{ color: Color.grey }}>Booking ID: </div>
                                                                                            <div style={{ fontWeight: 'bold' }}>{i?.BookingID}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', }}>
                                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                            <div style={{ color: Color.grey }}>Frequent Flyer: </div>
                                                                                            <div>{i?.FrequentFlyer}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', }}>
                                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                            <div style={{ color: Color.grey }}>Country: </div>
                                                                                            <div>{i?.Country}</div>
                                                                                        </div>
                                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-end', gap: '7px', }}>
                                                                                            <div style={{ color: Color.grey }}>Meal: </div>
                                                                                            <div>{i?.Meal}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', gap: '7px', }}>
                                                                                            <div style={{ color: Color.grey, fontSize: '15px', }}>Emergency Contact No: </div>
                                                                                            <div style={{ fontSize: '15px', fontWeight: '500', }}>{i?.EmergencyContactNo}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                                    <button onClick={() => this.handleUpdateClick(i)} style={{ border: 'none', backgroundColor: Color.flightBG, color: Color.whiteFont, padding: '12px', borderRadius: '7px' }}>Update</button>
                                                                                </div>

                                                                            </div>
                                                                        )}
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='center' style={{ width: '100%' }}>No data available!!</div> :
                                                        i?.id == 6 && i?.isSelect &&
                                                        <div>
                                                            <div>

                                                                {this.state?.flightDetails?.length > 0 ?
                                                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '34px', margin: '12px 0px' }}>
                                                                        {this.state?.flightDetails?.map(i =>
                                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '250px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', backgroundColor: Color.whiteFont, borderRadius: '12px', padding: '16px' }}>
                                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', }}>
                                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{i?.AirLine}</div>
                                                                                        <div style={{ fontSize: '14px', textAlign: 'right', color: Color.grey, fontWeight: 'bold' }}>{i?.FlightID}</div>
                                                                                    </div>
                                                                                    <div style={{ fontSize: '18px', color: Color.green, fontWeight: 'bold' }}>{i?.Price}</div>
                                                                                    <div style={{ display: 'flex', backgroundColor: Color.FlightTheme, alignItems: 'center', borderRadius: '3px', flexWrap: 'wrap', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                                                                        <div style={{ flex: 3, }}>{i?.Departure}</div>
                                                                                        <div className='center' style={{ flex: 1, color: Color.grey }}>{' ->'}</div>
                                                                                        <div style={{ flex: 3, textAlign: 'right' }}>{i?.Arrival}</div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', }}>
                                                                                        <div style={{ flex: 3, fontSize: '12px', fontWeight: '400', }}>{i?.DepartureTime}</div>
                                                                                        <div className='center' style={{ flex: 1, color: Color.grey }}>{' ->'}</div>
                                                                                        <div style={{ flex: 3, fontSize: '12px', fontWeight: '400', textAlign: 'right' }}>{i?.ArrivalTime}</div>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                        <div style={{ color: Color.blackFont, fontSize: '14px', fontWeight: 'bold' }}>{i?.Duration}</div>
                                                                                        <div style={{ textAlign: 'right', color: i?.stops == 'Non-stop' ? Color.green : Color.red }}>{i?.Stops}</div>
                                                                                    </div>
                                                                                    <div style={{ fontSize: '15px', color: Color.grey }}>{i?.Baggage}</div>
                                                                                </div>
                                                                                <div
                                                                                    onClick={() => this.handleBooking(i)}
                                                                                    style={{ backgroundColor: Color.flightBG, cursor: 'pointer', color: Color.whiteFont, textAlign: 'center', borderRadius: '12px', padding: '12px', marginTop: '12px' }}>{'Book now'}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    : <div className='center'>No flight found!</div>}
                                                            </div>
                                                        </div>



                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default WithRouter(TicketBooking)
