export default {
    async search(query,host) {
        const res = await fetch("http://localhost:3000/req/emojis/search",{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                host: host,
            }),
        }).then((response) => response.json()).then((data) => {return data});

        if (res.msg !== "success!") {
            await this.get(host);
            await this.search(query,host);
        }
        return res
    },
    async get(host) {
        await fetch("http://localhost:3000/req/emojis/get",{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                host: host,
            })
        })
    },
}