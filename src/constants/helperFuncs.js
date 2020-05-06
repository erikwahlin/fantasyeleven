import * as LEX from './lexicon';
import stadiums from './stadiums';
import { store } from 'react-notifications-component';

//counting players in team.pitch or team.bench
export const countPlayers = arrOfObj => {
    let count = 0;
    Object.values(arrOfObj).forEach(elem => (count += elem.length));
    return count;
};

export const shortenName = fullName => {
    if (fullName.split(' ')[1] === undefined) return fullName;

    const afterSpace = fullName.indexOf(' ') + 1;

    let lastName = fullName.substring(afterSpace);

    let midName = '';

    const firstName = lastName.length < 9 ? fullName[0] + '.' : '';

    if (lastName.includes('-')) {
        const afterHyphen = lastName.indexOf('-') + 1;

        midName = lastName[0] + '-';

        lastName = lastName[afterHyphen].toUpperCase() + lastName.substring(afterHyphen + 1);
    }

    return `${firstName} ${midName}${lastName}`;
};

export const clone = (obj, keyName) => {
    // if level bottom or key is 'ref' return val
    if (obj === null || typeof obj !== 'object' || keyName === 'ref') {
        return obj;
    }

    const copy = obj.constructor();

    for (var key in obj) {
        copy[key] = clone(obj[key], key);
    }
    return copy;
};

export const toSwe = (word, chapter, form = 'sing') => LEX[chapter][word][form];

export const toEng = (word, chapter, form = 'singular') => LEX[chapter][word][form];

export const homePitch = club => stadiums[club].url;

export const afterWinResize = (callback, timeout = 300) => {
    let doWhenDone;

    window.onresize = () => {
        clearTimeout(doWhenDone);

        doWhenDone = setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
        }, timeout);
    };
};

export const getRefSize = ref => {
    let res = {
        w: undefined,
        h: undefined
    };

    if (ref) {
        if (ref.current) {
            res.w = ref.current.clientWidth;
            res.h = ref.current.clientHeight;
        }
    }

    return res;
};

export const firstCap = word => {
    return word[0].toUpperCase() + word.substring(1);
};

export const userMsg = props => {
    const self = {};

    const def = {
        className: 'userMsg',
        title: '',
        message: '...',
        type: 'default',
        insert: 'top',
        container: 'bottom-center',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut', 'slow'],
        dismiss: {
            duration: 10000,
            waitForAnimation: true,
            pausOnHover: true
        }
    };

    self.notif = {
        ...def,
        ...props
    };

    self.add = () => {
        if (!self.notif) return console.error('No notif props were set.');

        self.id = store.addNotification(self.notif);
    };

    self.remove = () => {
        if (!self.id) return console.error('Notification has no id.');

        store.removeNotification(self.id);
    };

    return self;
};
