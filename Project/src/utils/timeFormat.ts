export const timeFormat = (time: number) => {
    const hour = Math.floor(time / (1000 * 60 * 60) % 60)
    const munites = Math.floor(time / (1000 * 60) % 60)
    // return `${hour} час ${munites} мин`
    return `${hour > 0 ? hour + ' час' : ''} ${munites > 0 ? munites + 'мин' : ''}`
}