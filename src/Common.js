export const generateRandonID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const getFirstLetter = (name) => {
    let first = name.slice(0, 1).toUpperCase();
    return first;
}

export const getTime = (time) => {
    const past = new Date(time).getTime(); // ms
    const now = Date.now();
    const sec = Math.floor((now - past) / 1000);

    if (sec < 60) {
        return `${sec} sec${sec !== 1 ? "s" : ""} ago`;
    }

    const min = Math.floor(sec / 60);
    if (min < 60) {
        return `${min} min${min !== 1 ? "s" : ""} ago`;
    }

    const hour = Math.floor(min / 60);
    if (hour < 24) {
        return `${hour} hr${hour !== 1 ? "s" : ""} ago`;
    }

    const day = Math.floor(hour / 24);
    if (day < 7) {
        return `${day} day${day !== 1 ? "s" : ""} ago`;
    }

    const week = Math.floor(day / 7);
    if (week < 4) {
        return `${week} week${week !== 1 ? "s" : ""} ago`;
    }

    const month = Math.floor(week / 4);
    if (month < 12) {
        return `${month} mon${month !== 1 ? "s" : ""} ago`;
    }

    const year = Math.floor(month / 12);
    if (month >= 12) {
        return `${year} yr${year !== 1 ? "s" : ""} ago`;
    }
};

