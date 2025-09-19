import { db } from "./dexie/DB";
import { encryption } from "./dexie/EncodeDecode";
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentDate = new Date().getDate();
const currentMonth = month[new Date().getMonth()];
const currentYear = new Date().getFullYear();
const today = currentDate + " " + currentMonth + " " + currentYear;
export const seedInitialFlightDetails = async () => {
    let count = await db.availableFlights?.count();
    if (count === 0) {
        let data = [
            { id: 1, flightID: 'AI-643', date: today, isBooked: false, airLine: 'Air India', from: 'Tirunelveli (TCR)', to: 'Chennai (MAA)', departure: '05:30 AM', arrival: '07:10 AM', duration: '1h 40m', stops: 'Non-stop', baggage: '25kg Check-in + 8kg Cabin', class: 'Economy', price: 'INR 4,250' },
            { id: 2, flightID: 'UK-742', date: today, isBooked: false, airLine: 'Vistara', from: 'Kolkata (CCU)', to: 'Delhi (DEL)', departure: '08:20 AM', arrival: '10:50 AM', duration: '2h 30m', stops: '1 Stop', baggage: '20kg Check-in + 7kg Cabin', class: 'Economy', price: 'INR 5,800' },
            { id: 3, flightID: 'SG-407', date: today, isBooked: false, airLine: 'SpiceJet', from: 'Madurai (IXM)', to: 'Chennai (MAA)', departure: '07:15 AM', arrival: '08:25 AM', duration: '1h 10m', stops: 'Non-stop', baggage: '15kg Check-in + 7kg Cabin', class: 'Economy', price: 'INR 3,450' },
            { id: 4, flightID: 'IX-216', date: today, isBooked: false, airLine: 'Air India Express', from: 'Bengaluru (BLR)', to: 'Chennai (MAA)', departure: '09:00 AM', arrival: '10:00 AM', duration: '1h 00m', stops: 'Non-stop', baggage: '20kg Check-in + 7kg Cabin', class: 'Economy', price: 'INR 2,999' },
            { id: 5, flightID: '6E-554', date: today, isBooked: false, airLine: 'IndiGo', from: 'Kovai (CJB)', to: 'Chennai (MAA)', departure: '10:30 AM', arrival: '11:40 AM', duration: '1h 10m', stops: 'Non-stop', baggage: '15kg Check-in + 7kg Cabin', class: 'Economy', price: 'INR 3,899' },
            { id: 6, flightID: 'AK-127', date: today, isBooked: false, airLine: 'Akasa Air', from: 'Tuti (TCR)', to: 'Chennai (MAA)', departure: '06:45 AM', arrival: '08:15 AM', duration: '1h 30m', stops: 'Non-stop', baggage: '20kg Check-in + 7kg Cabin', class: 'Economy', price: 'INR 4,150' },
            { id: 7, flightID: 'BA-138', date: today, isBooked: false, airLine: 'British Airways', from: 'Tirunelveli (TCR)', to: 'America (JFK)', departure: '03:00 PM', arrival: '08:00 AM', duration: '21h 30m', stops: '1 Stop (London)', baggage: '2 x 23kg Check-in + 10kg Cabin', class: 'Economy', price: 'INR 82,000' }
        ]
        // if (Array.isArray(data)) {
        //     let bulkdata = await Promise.all(data.map(async (i) => {
        //         return await encryption(i);
        //     }))

        //     await db.availableFlights.bulkAdd([{ id: 1, data: bulkdata }]);
        // }
    }
    else {
        //await db.availableFlights.clear();
    }
}