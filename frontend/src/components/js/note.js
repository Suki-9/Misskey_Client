//import emoji from '@/components/js/emoji.js';

export default {
    async Gen(data){
        const GetNote = JSON.parse(data).body.body;
        return {
            user_name: (GetNote.user.name == null) ? GetNote.user.username : GetNote.user.name,
            //user_id: GetNote.user.username,
            user_icon: GetNote.user.avatarUrl,
            //note_id: GetNote.id,
            date: GetNote.createdAt,
            note_text: GetNote.text,
            //cw: GetNote.cw,
            //renote_count: 0,
            //reactions: {},
        }
    }
}