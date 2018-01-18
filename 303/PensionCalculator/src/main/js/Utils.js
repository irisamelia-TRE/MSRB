import moment from 'moment';

function PreprocessDateForCallback(date) {
  if (date.target !== undefined) {
    date = date.target.value;
    const dateMS = Date.parse(date);
    if (Number.isNaN(dateMS)) {
      date = null;
    } else {
      let dateMoment = moment(dateMS);
      dateMoment = dateMoment.add(1, 'd');
      date = dateMoment.toDate();
    }
  }
  return date;
}

export default PreprocessDateForCallback;
