// Libraries
const moment = require('moment');
// utils
const { sort } = require('./sorting');

// TODO CLEAN UP ALL BELOW

// Events Sorting Helpers

const getMonth = event => moment(event.startDate).month();
const getYear = event => moment(event.startDate).year();

const longFormatted = unit => {
  const formats = {
    month: month => moment().month(month).format('MMMM'),
    year: year => moment().year(year).format('YYYY'),
  };
  return {
    getFormatted: event => formats[unit](event),
  };
};

const getLongFormattedMonth = longFormatted('month').getFormatted;
const longFormattedMonth = event => getLongFormattedMonth(getMonth(event));

const monthNameNonCurrentyear = event => `${longFormattedMonth(event)} ${getYear(event)}`;

const getMonthName = event => {
  const currentYear = moment().year();
  return moment(event.startDate).year() === currentYear
    ? longFormattedMonth(event)
    : monthNameNonCurrentyear(event);
};

const findByMonth = (event, arr) => arr.find(item => item.month === getMonthName(event));
const getMonthIdx = (event, arr) => arr.indexOf(findByMonth(event, arr));

const monthFactory = (event, monthName) => {
  const month = moment(event.startDate).month();
  return { month: monthName, events: [event] };
};

// sortByMonth

const sortByMonth = events => {
  const sortedEvents = sort(events).reduce((acc, event) => {
    const monthName = getMonthName(event);
    const monthIdx = getMonthIdx(event, acc);
    const month = monthIdx >= 0 ? acc[monthIdx] : null;
    month ? month.events.push(event) : acc.push(monthFactory(event, monthName));
    return acc;
  }, []);
  return sortedEvents;
};

module.exports = {
  sortByMonth,
};
