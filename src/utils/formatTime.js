import moment from 'moment-timezone'

const formatTimeSinceUnits = (timeFrame, unit) => {
  if (timeFrame < 1) { return `Just now` }
  let formattedUnit = (timeFrame > 2) ? `${unit}s` : unit
  // console.log(formattedUnit)
  return `${Math.floor(timeFrame)} ${formattedUnit} ago`
}

const formatTimeSince = (time) => {
  const then = moment(time)
  const now = moment()
  const timeSince = moment.duration(now.diff(then))
  // TODO: today and yesterday
  if (timeSince.asMinutes() < 60) {
    return `${formatTimeSinceUnits(timeSince.asMinutes(), 'minute')}`
  } else if (24 > timeSince.asHours() && timeSince.asHours() >= 1) {
    return `${formatTimeSinceUnits(timeSince.asHours(), 'hour')}`
  } else if (7 > timeSince.asDays() && timeSince.asDays() >= 1) {
    return `${formatTimeSinceUnits(timeSince.asDays(), 'day')} at ${then.format('LT')}`
  } else if (5 > timeSince.asWeeks() && timeSince.asWeeks() >= 1) {
    return `${formatTimeSinceUnits(timeSince.asWeeks(), 'week')} at ${then.format('LT')}`
  } else if (12 > timeSince.asMonths() && timeSince.asMonths() >= 1) {
    return `${formatTimeSinceUnits(timeSince.asMonths(), 'month')} at ${then.format('LT')}`
  } else if (timeSince.asYears() > 10) {
    return `a long time ago in a galaxy far far away...`
  } else if (timeSince.asYears() > 1) {
    return `${formatTimeSinceUnits(timeSince.asYears(), 'year')} at ${then.format('LT')}`
  } else {
    console.log(`no time format`)
    return `at ${then.format()}`
  }
}

const formatTime = (time) => {
  return moment(time).format("DD MM YY, hh:mm")
}

// toggle between different exports to change time formatting accross front end
export default formatTimeSince
// export default formatTime