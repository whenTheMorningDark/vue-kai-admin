/* eslint-disable eol-last */
/* eslint-disable indent */
// 获取数组对象的并集
export const union = (sourceArr, targetArr) => {
    // sourceArr.concat()
    const arr = sourceArr.concat(targetArr)
        // console.log(arr)
    return arr.filter((item, index) => {
        const len = arr.length
        while (++index < len) {
            if (item.id === arr[index].id) {
                return false
            }
        }
        return true
    })
}