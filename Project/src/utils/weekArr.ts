import { DAY, DAYS_WEEK } from "../constants/DAY_AND_WEEK";


// const str = "19.05.2024"
// const DAYS_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// const DAY = 1000 * 60 * 60 * 24


const getWeek = (str: string, week: number) => {
    const date = new Date(str.split('.').reverse().join('-'));
    const dayWeek = date.getTime() - 604800000 * week;
    const day = new Date(dayWeek).getDay();
    const diff = (day === 0) ? -1 : day - 1;
    const thisWeekStart = (dayWeek - diff * DAY) - (day === 0 ? 604800000 : 0);
    return thisWeekStart

}

export const weekArr = (str: string, week: number = 0) => {
    const day1 = getWeek(str, week);
    return new Array(7).fill(1).map((_, i) => {
        const date = new Date(day1 + (DAY * i));

        return {
            date: date.toLocaleDateString(),
            day: DAYS_WEEK[i]
        };
    });
}

// console.log(weekArr(str, 1));
