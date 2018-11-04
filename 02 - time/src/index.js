require('normalize.css/normalize.css');
require('./styles/index.scss');
import moment from 'moment';

const dayEl = document.querySelector('.date');
const clockEl = document.querySelector('.clock')
dayEl.innerHTML = `${moment().format('D')} <span>${moment().format('MMM')}</span>`

const setDate = () => {
    const now = new Date();

    const minutes = now.getMinutes();
    const hours = now.getHours();

    const minutesDeg = ((minutes / 60) * 360) + 90;
    const hoursDeg = ((hours / 12) * 360) + 90;
    clockEl.style.setProperty('--minuteRad', `${minutesDeg}deg`);
    clockEl.style.setProperty('--hourRad', `${hoursDeg}deg`);
}
setInterval(() => {
    setDate();
}, 1000);
