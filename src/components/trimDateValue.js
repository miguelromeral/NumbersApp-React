function trimDateValue(value) {
    var date = value.split('-')
    return date[1] + "/" + date[2]
}

export default trimDateValue