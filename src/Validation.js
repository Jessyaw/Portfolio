
export const alphaVAlidation = (value) => {
    let regEx = /^[A-Za-z]+$/
    if (regEx.test(value)) {
        return true;
    }


}

export const NumberVAlidation = (value) => {
    let regEx = /^[0-9]+$/
    if (regEx.test(value)) {
        //return true;
    }
}
export const handleOnKeyAlpha = (e) => {

    if (e.key >= 'a' && e.key <= 'z' || e.key >= 'A' && e.key <= 'Z' || e.key == 'Backspace') {
        return true;
    }
    else {
        e.preventDefault();
    }
}
export const handleOnKeyNumber = (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key == 'Backspace') {

    }
    else {
        e.preventDefault();
    }
}


export const emailValidation = (val) => {
    let regEx = /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regEx.test(val)) {
        return true;
    }
    else {
        return false;
    }
}
export const userNameValidation = (val) => {
    let regEx = /^[a-z0-9._]+$/i
    if (regEx.test(val)) {
        return true;
    }
    else {
        return false;
    }
}

export const mobileValidation = (val) => {//
    let regEx = /^[6-9][0-9]{9}$/

    if (regEx.test(val)) {
        return true;
    }
    else {
        return false;
    }
}


export const BookingIDValidation = (val) => {
    let regEx = /^[A-Z0-9]{10}$/
    if (regEx.test(val)) {
        return true;
    }
    else {
        return false;
    }
}