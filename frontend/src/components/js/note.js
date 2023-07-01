import emoji from '@/components/js/emoji.js';

export default {
    async Gen(data){
        const mainhost = "misskey.io";
        const GetNote = await JSON.parse(data).body.body;

        return {
            user_name: (GetNote.user.name == null) ? GetNote.user.username : await emoji.parse(GetNote.user.name,mainhost,"user_name"),
            user_id: GetNote.user.username,
            user_icon: GetNote.user.avatarUrl,
            note_id: GetNote.id,
            date: GetNote.createdAt,
            note_text: (GetNote.text == null) ? "" : await emoji.parse(GetNote.text,mainhost,"note_text"),
            cw: GetNote.cw,
            renote_count: 0,
            reactions: {},
        }
    }
}