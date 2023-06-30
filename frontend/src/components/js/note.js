import emoji from '@/components/js/emoji.js';

export default {
    async Gen(data,host){
        const GetNote = JSON.parse(data).body.body;
        console.log(GetNote.text)
        const UserData = GetNote.user;

        const Username = UserData.name.replace(/\:.*?\:/g,"{emo}");
        const username_emozi = UserData.name.match(/\:.*?\:/g);
        const userId = `@${UserData.username}`;

        const text_emozi = (GetNote.text == null) ? "" : GetNote.text.match(/\:.*?\:/g);
        const text_emozi_len = (text_emozi !== null) ? text_emozi.length : 0;
        let text = (GetNote.text == null) ? "" : GetNote.text.replace(/\n/g,'</p><br><p class="text">');
        console.log(text)
        if (text_emozi_len !== 0) {
            for (let i = 0;i < text_emozi_len;i++) {
                const emoji_url = await emoji.search(text_emozi[i],host)
                text = text.replace(text_emozi[i],`<img class="emoji" src="${emoji_url[text_emozi[i]]}">`)
            }
        }

        const media_len = (GetNote.files.length >= 4) ? 4 : GetNote.files.length;
        let media = ""
        if (media_len !== 0) {
            for (let i = 0;i < media_len;i++) {
                media += `<img class="media${(media_len == 1) ? "" : "s"}" src="${GetNote.files[i].thumbnailUrl}">`
            }
        }

        document.getElementById("TL").innerHTML += `
            <div class="note" id="${GetNote.id}">
                <div class="article">
                    <img class="user_icon" src="${UserData.avatarUrl}"></a>
                    <div class="note_contents">
                        <div class="note_head">
                            <p class="name">${Username}</p>
                            <p class="name">${userId}</p>
                        </div>
                        ${(GetNote.text == null) ? "" : `<div class='note_text'><p class="text">${text}</p></div>`}
                        ${(media_len == 0) ? "" : ` <div class="note_media">${media}</div>`}
                        <div class="note_reaction">
                        </div>
                        <div class="note_footer">

                        </div>
                    <div>
                </div>
            </div>
            `
    }
}
