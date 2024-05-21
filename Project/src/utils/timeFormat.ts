export const timeFormat = (time: number, seconds = false) => {
    const hour = Math.floor(time / (1000 * 60 * 60) % 60)
    const munites = Math.floor(time / (1000 * 60) % 60)
    // return `${hour} час ${munites} мин`
    return `${hour > 0 ? hour + '\u00A0' + 'час' : ''}\u00A0${munites > 0 ? munites + '\u00A0' + 'мин' : ''} ${(seconds && munites <= 0 && hour <= 0) ? time % 60 + ' сек' : ''}`
}


