export const wait = async (waitTime: number, callBack: () => any): void => {
  let suspend = 0
  setInterval(() => {
    suspend++
    if (suspend == waitTime) { callBack(); return }
  }, 10)
}