import moment from 'moment'


const frequency = ['Weekly', 'Monthly', 'Quarterly', 'Annual']

export const getFrequencies = () => {
  return frequency
}

const calculateWeeklyDueDate = (lastUpdated) => {
  let retVal = moment().day(5)
  if (lastUpdated) {
    retVal = moment(lastUpdated, 'MM/DD/YYYY').add(1, 'week').day(5)
  }
  return retVal.format('MM/DD/YYYY')
}

const calculateMonthlyDueDate = (lastUpdated) => {
  let retVal = moment.add(1, 'month').subtract(1, 'day')
  if (lastUpdated) {
    retVal = moment(lastUpdated, 'MM/DD/YYYY').add(2, 'month').subtract(1, 'day')
  }
  return retVal.format('MM/DD/YYYY')
}

const calculateQuarterlyDueDate = (lastUpdated) => {
  let retVal = moment.add(1, 'quarter').subtract(1, 'day')
  if (lastUpdated) {
    retVal = moment(lastUpdated, 'MM/DD/YYYY').add(2, 'quarter').subtract(1, 'day')
  }
  return retVal.format('MM/DD/YYYY')
}


const calculateAnnualDueDate = (lastUpdated) => {
  let retVal = moment.add(1, 'year').subtract(1, 'day')
  if (lastUpdated) {
    retVal = moment(lastUpdated, 'MM/DD/YYYY').add(2, 'year').subtract(1, 'day')
  }
  return retVal.format('MM/DD/YYYY')
}

const frequencyBasedCalculator = {
  'Weekly': calculateWeeklyDueDate,
  'Monthly': calculateMonthlyDueDate,
  'Quarterly': calculateQuarterlyDueDate,
  'Annual': calculateAnnualDueDate
}

export const calculateDueDate = (frequency, lastUpdated) => {
  return frequencyBasedCalculator[frequency](lastUpdated)
}
