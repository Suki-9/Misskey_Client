export default {
    Get() {
        const Cookie = document.cookie.split("; ");
        const Cookies = [];
        const index = [];
        for (let i=0;i<Cookie.length;i++) {
            let elem = Cookie[i].split("=");
            Cookies.push(elem);
            index.push(elem[0]);
        }
        return [Cookies,index];
    },
    lead(key) {
        const index = this.Get()[1];
        const Cookie = this.Get()[0];
        let i = index.indexOf(key);
        if (i !== -1) {
            return Cookie[i][1];
        }else{
            return null;
    }}
  }