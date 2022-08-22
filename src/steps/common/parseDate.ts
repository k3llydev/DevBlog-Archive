import * as moment from 'moment';

export default (date: string, format: string) => moment(date).format(format);
