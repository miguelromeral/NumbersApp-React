
// Converts a date with format YYYY-MM-DD to MM/DD in order to append it to the URL
function trimDateValue(value) {
    var date = value.split('-')
    return date[1] + "/" + date[2]
}

export default trimDateValue