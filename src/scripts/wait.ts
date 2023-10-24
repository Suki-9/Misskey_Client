export const wait = async (waitTime: number, callBack: () => any): Promise<void> => {
  let suspend = 0;
  setInterval(() => {
    suspend++;
    if (suspend == waitTime) {
      callBack();
      return;
    }
  }, 10);
};
