var fs = require('fs');

const get = async(host) => {
    const emo = await fetch(`https://${host}/api/emojis`)
    .then((response) => response.json())
    .then((data) => {return data.emojis});

    fs.writeFile(`./emoji_index/${host}_emojis.json`, JSON.stringify(emo), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('success');
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
          console.error(err);
          return;
        }
        console.log('success');
    });

    fs.writeFile(`./emoji_index/${host}_index.json`, JSON.stringify(emoji_index), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('success');
    });
}

exports.get = get