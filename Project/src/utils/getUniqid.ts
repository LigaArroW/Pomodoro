import { task } from "../store/useTask";

export const getUniqid = (array: task[]) => {
    const idList = new Set(array.map(task => task.id));
    let count = 0;

    for (let i = 1; i <= array.length; i++) {
        if (!idList.has(i)) {
            count = i;
            break;
        }
    }
    if (count === 0) count = array.length + 1
    return count
}
