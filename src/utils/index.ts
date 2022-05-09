export const setLocaleInfo = (list: ArrayStorage[]) => {
  console.log(list);
  if (list && list.length > 0) {
    //
    for (let i = 0; i < list.length; i++) {
      let { name, value } = list[i];
      localStorage.setItem(name, value);
    }
  }
};

interface ArrayStorage {
  name: string;
  value: string;
}
