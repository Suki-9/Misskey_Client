import '../types'

import { read } from '../Cookie';
import { noteGen } from '../note';

export const getNote = async (host: string, channel?: string, token?: string, maxIndexSize?: number): Promise<note[]> => {
    
    const res: noteData[] = await fetch(`https://${host}/api/notes/${(channel == undefined) ? 'home' : channel}-timeline`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            i: (token == undefined) ? read(`${host}_token`) : token,
            limit: (maxIndexSize == undefined) ? 10 : maxIndexSize,
        }),
    }).then((response) => response.json()).then((data) => data );

    return res.map(note => noteGen(note));
}