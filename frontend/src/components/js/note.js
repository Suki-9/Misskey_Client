import emoji from '@/components/js/emoji.js';

export default {
    async Gen(data){
        const mainhost = "misskey.io";
        const GetNote = JSON.parse(data).body.body;

        let user_name = (GetNote.user.name == null) ? GetNote.user.username : GetNote.user.name
        const user_name_emoji = (GetNote.user.name == null) ? null : GetNote.user.name.match(/:.*?:/g)
        if (user_name_emoji !== null) {
            const user_name_emoji_url = await emoji.search(user_name_emoji.join(''),mainhost)
            for (let i = 0;i < user_name_emoji.length;i++)
                user_name = user_name.replace(user_name_emoji[i],`<img class='emoji' src='${user_name_emoji_url[user_name_emoji[i]]}'>`)
        }
        console.log(user_name)

        return {
            user_name: user_name,
            user_id: GetNote.user.username,
            user_icon: GetNote.user.avatarUrl,
            note_id: GetNote.id,
            date: GetNote.createdAt,
            note_text: GetNote.text,
            cw: GetNote.cw,
            renote_count: 0,
            reactions: {},
        }
    }
}