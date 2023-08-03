import './types'
import { emojiPerth, emojiSearch } from './emoji'


export const noteGen = (noteData: noteData): note => {
    const note: noteData = (noteData.renote == undefined) ? noteData : noteData.renote
    let renoter = undefined;
    
    const reactions: reaction[] = []
    if (note.reactions !== undefined) {
        Object.keys(note.reactions).forEach(reaction => {
            reactions.push({
                name: reaction,
                count: note.reactions[reaction],
                link: emojiSearch(reaction.replaceAll(':', '').replaceAll('.', '').replaceAll('@', ''))[0],
            })
        })
    }

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

    const res = {
        id: note.id,
        userId: note.user.username,
        userName: emojiPerth(note.user.name),
        date: note.createdAt,
        avatar: note.user.avatarUrl,
        files: files,
        text: emojiPerth(note.text),
        cw: note.cw,
        reactions: reactions,
        renote: renoter
    }

    return res
}