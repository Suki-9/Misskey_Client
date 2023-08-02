export const Get = () => {
    const Cookie = document.cookie.split("; ");
    const Cookies = [];
    const index = [];
    for (let i = 0; i < Cookie.length; i++) {
        let elem = Cookie[i].split("=");
        Cookies.push(elem);
        index.push(elem[0]);
    }
    return [Cookies, index];
}

export const read = (key: string) => {
    const index = Get()[1];
    const Cookie = Get()[0];
    let i = index.indexOf(key as string[] & string);
    if (i !== -1) { return Cookie[i][1]; }
    else { return undefined; }
}