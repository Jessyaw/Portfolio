import { Constant } from "./Constant";

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
    if (e.key >= '0' && e.key <= '9' || e.key == 'Backspace' || e.key == 'Tab' || e.key == 'Delete' || e.key == 'ArrowLeft' || e.key == 'Control' || e.key == 'ArrowRight') {
        return true;
    }
    else {
        e.preventDefault();
    }
}
export const handleOnKeyAmount = (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key == 'Backspace' || e.key == '.' || e.key == 'Delete' || e.key == 'ArrowLeft' || e.key == 'Control' || e.key == 'ArrowRight' || e.key == 'Tab') {
        return true;
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
export const passwordValidation = (val) => {
    let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?&]{8,}$/
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
export const amountValidation = (val) => {//
    let regEx = /^\d{1,10}(\.\d{1,2})?$/

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

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

export const ValidateField = (field, value, compareValue = null) => {
    if (value === null || value === undefined || value.toString().trim() === "") {
        return Constant.required;
    }

    if (field === "name" || field === "title" || field === "fullName" || field === "role" || field === "report") {
        if (!/^[A-Za-z ]*$/.test(value)) {
            return "Only letters allowed";
        }
    }

    if (field === "email") {
        if (!emailValidation(value)) {
            return "Invalid email";
        }
    }

    if (field === "mobile") {
        if (!mobileValidation(value)) {
            return "Invalid mobile";
        }
    }
    if (field === "amount") {
        if (!amountValidation(value)) {
            return "Invalid amount";
        }
    }
    if (field === "password") {
        if (!passwordValidation(value)) {
            return "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character.";
        }
    }
    if (field === "confirmPassword") {
        if (!passwordValidation(value)) {
            return "Password must be strong";
        }

        if (compareValue !== null && value !== compareValue) {
            return "Passwords do not match";
        }
    }

    return "";
}