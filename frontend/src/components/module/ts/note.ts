import './types'
import { emojiPerth } from './emoji'

export const noteGen = (noteData: any) => {
    const note = (noteData.renote == undefined) ? noteData : noteData.renote
    let renoter = undefined;
    if (noteData.renote !== undefined) {
        renoter = {
            userId: noteData.user.username,
            userName: emojiPerth(noteData.user.name),
            avatar: noteData.user.avatarUrl,
        }
    }

    let files = undefined
    if (note.files !== undefined) {
        files = []
        note.files.forEach(file => { 
            files.push({
                thumbnailUrl: file.thumbnailUrl,
                url: file.url,
            })
        })
    }
    return {
        id: note.id,
        userId: note.user.username,
        userName: emojiPerth(note.user.name),
        avatar: note.user.avatarUrl,
        files: files,
        text: emojiPerth(note.text),
        renote: renoter
    }
}