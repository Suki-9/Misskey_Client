const fs = require('fs');

const get = async(host) => {
    const emo = await fetch(`https://${host}/api/emojis`)
    .then((response) => response.json())
    .then((data) => {return data.emojis});

    fs.writeFile(`./emoji_index/${host}_emojis.json`, JSON.stringify(emo), (err) => {
        if (err) {
            return;
        }
    });

    let categorys = [];
    let emoji_index = [];
    for (let i = 0;i < emo.length;i++) {
        let category = emo[i].category;
        const search = categorys.indexOf(category);
        if (search == -1) {
            categorys.push(category);
            emoji_index.push([emo[i]])
        } else {
            emoji_index[search].push(emo[i])
        }
    }

    fs.writeFile(`./emoji_index/${host}_index_key.json`, JSON.stringify(categorys), (err) => {
        if (err) {
            return;
        }
    });

    fs.writeFile(`./emoji_index/${host}_index.json`, JSON.stringify(emoji_index), (err) => {
        if (err) {
            return;
        }
    });
    return;
}

const search = async(query,host) => {
    const querys = query.match(/\:.*?\:/g);
    const results = {}

    try{
        const index = await JSON.parse(fs.readFileSync(`./emoji_index/${host}_emojis.json`, 'utf8'));
        for (let i = 0;i < index.length;i++) {
            for (let j = 0;j < querys.length;j++) {
                if (index[i].name == querys[j].replace(/:/g,"")) {
                    const key = querys[j];
                    results[key] = index[i].url;
                }
            }
        }
    } catch(e) {
        await get(host);
        results.msg = "index error!";
        return results;
    }

    results.msg = "success!";
    return results;
}

exports.get = get
exports.search = search