export const compareTwoDate = (originalDate: string, date2: Date) => {
    const [day1, month1] = originalDate.split('.').map(Number);
    if (date2.getMonth() + 1 === month1 && date2.getDate() === day1) return true

    return false

}

