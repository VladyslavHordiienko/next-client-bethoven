export const fullNameValidation = (value) => {
    const fullNameRegExp = /[A-Za-zа-яА-Я]/
    if (fullNameRegExp.test(value) && value.length>=3){
        return true
    }
    return false
}
export const mailValidation = (value) => {
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegExp.test(value)){
        return true
    }
    return false
}
export const phoneNumberValidation = (value) => {
    const phoneNumberRegExp = /(039|067|068|096|097|098|050|066|095|099|063|073|093)\d{2}\d{2}\d{3}$/gi
    if (phoneNumberRegExp.test(value)){
        return true
    }
    return false
}
export const notEmptyValidation = (value) => {
    if (value.length){
        return true
    }
    return false
}
