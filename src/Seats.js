import { FaLinesLeaning } from "react-icons/fa6";
import { db } from '../src/dexie/DB';
import { encryption } from "./dexie/EncodeDecode";




export const initializeSeat = async () => {
    let count = await db.seats?.count();
    if (count <= 0) {

        let data = [

            { id: 1, seatNo: "1A", isAvailable: true },
            { id: 2, seatNo: "1B", isAvailable: true },
            { id: 3, seatNo: "1C", isAvailable: true },
            { id: 4, seatNo: "  ", isAvailable: false },
            { id: 5, seatNo: "1D", isAvailable: true },
            { id: 6, seatNo: "1E", isAvailable: true },
            { id: 7, seatNo: "1F", isAvailable: true },


            { id: 8, seatNo: "2A", isAvailable: true },
            { id: 9, seatNo: "2B", isAvailable: true },
            { id: 10, seatNo: "2C", isAvailable: true },
            { id: 11, seatNo: "  ", isAvailable: false },
            { id: 12, seatNo: "2D", isAvailable: true },
            { id: 13, seatNo: "2E", isAvailable: true },
            { id: 14, seatNo: "2F", isAvailable: true },

            { id: 15, seatNo: "3A", isAvailable: true },
            { id: 16, seatNo: "3B", isAvailable: true },
            { id: 17, seatNo: "3C", isAvailable: true },
            { id: 18, seatNo: "  ", isAvailable: false },
            { id: 19, seatNo: "3D", isAvailable: true },
            { id: 20, seatNo: "3E", isAvailable: true },
            { id: 21, seatNo: "3F", isAvailable: true },

            { id: 22, seatNo: "4A", isAvailable: true },
            { id: 23, seatNo: "4B", isAvailable: true },
            { id: 24, seatNo: "4C", isAvailable: true },
            { id: 25, seatNo: "  ", isAvailable: false },
            { id: 26, seatNo: "4D", isAvailable: true },
            { id: 27, seatNo: "4E", isAvailable: true },
            { id: 28, seatNo: "4F", isAvailable: true },

            { id: 29, seatNo: "5A", isAvailable: true },
            { id: 30, seatNo: "5B", isAvailable: true },
            { id: 31, seatNo: "5C", isAvailable: true },
            { id: 32, seatNo: "  ", isAvailable: false },
            { id: 33, seatNo: "5D", isAvailable: true },
            { id: 34, seatNo: "5E", isAvailable: true },
            { id: 35, seatNo: "5F", isAvailable: true },

            { id: 36, seatNo: "6A", isAvailable: true },
            { id: 37, seatNo: "6B", isAvailable: true },
            { id: 38, seatNo: "6C", isAvailable: true },
            { id: 39, seatNo: "  ", isAvailable: false },
            { id: 40, seatNo: "6D", isAvailable: true },
            { id: 41, seatNo: "6E", isAvailable: true },
            { id: 42, seatNo: "6F", isAvailable: true },

            { id: 43, seatNo: "7A", isAvailable: true },
            { id: 44, seatNo: "7B", isAvailable: true },
            { id: 45, seatNo: "7C", isAvailable: true },
            { id: 46, seatNo: "  ", isAvailable: false },
            { id: 47, seatNo: "7D", isAvailable: true },
            { id: 48, seatNo: "7E", isAvailable: true },
            { id: 49, seatNo: "7F", isAvailable: true },

            { id: 50, seatNo: "8A", isAvailable: true },
            { id: 51, seatNo: "8B", isAvailable: true },
            { id: 52, seatNo: "8C", isAvailable: true },
            { id: 53, seatNo: "  ", isAvailable: false },
            { id: 54, seatNo: "8D", isAvailable: true },
            { id: 55, seatNo: "8E", isAvailable: true },
            { id: 56, seatNo: "8F", isAvailable: true },

            { id: 57, seatNo: "9A", isAvailable: true },
            { id: 58, seatNo: "9B", isAvailable: true },
            { id: 59, seatNo: "9C", isAvailable: true },
            { id: 60, seatNo: "  ", isAvailable: false },
            { id: 61, seatNo: "9D", isAvailable: true },
            { id: 62, seatNo: "9E", isAvailable: true },
            { id: 63, seatNo: "9F", isAvailable: true },

            { id: 64, seatNo: "10A", isAvailable: true },
            { id: 65, seatNo: "10B", isAvailable: true },
            { id: 66, seatNo: "10C", isAvailable: true },
            { id: 67, seatNo: "  ", isAvailable: false },
            { id: 68, seatNo: "10D", isAvailable: true },
            { id: 69, seatNo: "10E", isAvailable: true },
            { id: 70, seatNo: "10F", isAvailable: true },


        ]

        // if (Array.isArray(data)) {

        //     let bulkData = await Promise.all(data.map(async (i) => {
        //         return await encryption(i)
        //     }))
        //     await db.seats.bulkAdd([{ id: 1, data: bulkData }])
        // }

    }
    else {
        // await db.seats.clear();
    }

}

