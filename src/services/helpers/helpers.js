import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
dayjs.extend(relativeTime);
// Personalizar los mensajes
dayjs.locale('es', {
    relativeTime: {
        future: 'en %s',
        past: '%s',
        s: 'unos segundos',
        m: '1min',
        mm: '%dmin',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1m',
        MM: '%dm',
        y: '1a',
        yy: '%da',
    },
});
// Funcion que recibe la fecha de creacion y usa dayJs para formatearla
export const formatDate = (date) => {
    return dayjs(date).fromNow();
};