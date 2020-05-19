import * as LEX from './lexicon';
import stadiums from './stadiums';
import { store } from 'react-notifications-component';

export const timestamp = (tag = null) => {
    const d = new Date();
    const date = d.toLocaleDateString(),
        time = d.toLocaleTimeString();

    const weekday = d.getDay() === 0 ? 6 : d.getDay() === 1 ? 0 : d.getDay();

    let res = {
        date,
        time
    };

    if (tag && typeof tag === 'string') {
        res.tag = tag;
    }

    return res;
};

export const updatedStamp = ({ user, tag = '' }) => {
    tag = typeof tag === 'string' ? tag : tag.join(' ');
    return {
        at: timestamp(),
        by: user,
        tag
    };
};

export const userTemplate = user => ({
    _id: user.uid,
    username: user.username,
    email: user.email,
    roles: user.roles
});

export const roundStatus = ({ active, ended }) =>
    ended ? 'Avslutad' : active ? 'Aktiv' : 'Inaktiv';

//counting players in team.players.pitch or team.players.bench
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

export const toSwe = (word, chapter, form = 'sing') => {
    //console.log('chapter', chapter, 'word', word, 'form', form);
    if (LEX[chapter]) {
        if (LEX[chapter][word]) {
            if (LEX[chapter][word][form]) return LEX[chapter][word][form];
        }
    }
    console.log(word, 'could not be translated');
    return word;
};

export const toEng = (word, chapter, form = 'sing') => {
    if (LEX[chapter]) {
        if (LEX[chapter][word]) {
            if (LEX[chapter][word][form]) return LEX[chapter][word][form];
        }
    }
    console.log(word, 'could not be translated');
    return word;
};

export const homePitch = club => (!stadiums[club] ? '' : stadiums[club].url);

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

export const errMsg = (msg = 'Något gick fel!', duration = 2000) =>
    userMsg({
        message: msg,
        dismiss: { duration },
        type: 'danger'
    });

export const updateMsg = (msg = 'Uppdaterad!', duration = 2000) =>
    userMsg({
        message: msg,
        dismiss: { duration },
        type: 'success'
    });
