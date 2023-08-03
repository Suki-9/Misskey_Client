import './types'
import { emojiPerth, emojiSearch } from './emoji'


export const noteGen = (noteData: noteData): note => {
    const note: noteData = (noteData.renote == undefined) ? noteData : noteData.renote
    
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

    let renoter = undefined;
    if (noteData.renote !== undefined) {
        renoter = {
            name: emojiPerth(noteData.user.name),
            username: noteData.user.username,
            avatarUrl: noteData.user.avatarUrl,
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
        date: note.createdAt,
        text: (note.text !== undefined) ? emojiPerth(note.text) : '',
        cw: note.cw,
        user: {
            name: emojiPerth(note.user.name),
            username: note.user.username,
            avatarUrl: note.user.avatarUrl,
        },
        files: files,
        reactions: reactions,
        renoter: renoter,
    }
}