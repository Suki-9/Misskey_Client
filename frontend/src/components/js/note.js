import emoji from '@/components/js/emoji.js';

export default {
    async Gen(data,h){
        const host = h;
        const GetNote = data;

        const time = ["年前","ヶ月前","日前","時間前","分前","秒前","未来"];
        const nowDate = new Date().toISOString().replace("Z","").split(/:|-|T/);
        const note_date = GetNote.createdAt.replace("Z","").split(/:|-|T/);
        let date = null
        for (let i = 0;i < 6;i++) {
            if (nowDate[i] - note_date[i] !== 0) {
                date = `${(nowDate[i] - note_date[i] < 1 && i > 4) ? 0 : Math.round(nowDate[i] - note_date[i])}${time[i]}`
                break
            }
        }

        return {
            user_name: (GetNote.user.name == null) ? GetNote.user.username : await emoji.parse(GetNote.user.name,host,"user_name"),
            user_id: `@${GetNote.user.username}`,
            user_url: `/user?@${GetNote.user.username}`,
            user_icon: GetNote.user.avatarUrl,
            note_id: GetNote.id,
            date: date,
            note_text: (GetNote.text == null) ? "" : await emoji.parse(GetNote.text,host,"note_text"),
            cw: GetNote.cw,
            renote_count: 0,
            reactions: {},
        }
    }
}