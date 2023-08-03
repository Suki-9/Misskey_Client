<script setup lang="ts">
import { ref } from 'vue';

import { read } from './ts/Cookie'
import { UUIDGen } from './ts/UUID';
import { noteGen } from './ts/note'


const props = defineProps<{
    hostName?: string;
    channel?: string;
}>();

const notes = ref<note[]>([])

if (props.hostName !== undefined) { get_note(); stream(); }

function stream() {
    const token = read(`${props.hostName}_token`);
    const uuid = UUIDGen();
    const timeLine = new WebSocket(`wss://${props.hostName}/streaming?i=${token}`);

    timeLine.addEventListener('open', () => {
        timeLine.send(JSON.stringify({
            type: 'connect',
            body: {
                channel: `${(props.channel == undefined) ? 'home' : props.channel}Timeline`,
                id: uuid,
                params: {}
            }
        }));
    });

    timeLine.addEventListener('message', async (event) => {
        notes.value.push(noteGen(JSON.parse(event.data).body.body))
    });
}

async function get_note() {
    const token = read(`${props.hostName}_token`);
    const channel = (props.channel == undefined) ? 'home' : props.channel
    const res: noteData[] = await fetch(`https://${props.hostName}/api/notes/${channel}-timeline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            i: token,
            limit: 30,
        }),
    }).then((response) => response.json()).then((data) => data );

    res.forEach(note => {
        notes.value.push(noteGen(note))
    });
}
</script>

<template>
    <div :class="$style.root">
        <div
            :class="$style.note"
            v-for="note in notes"
        >
            <div 
                :class="$style.renote"
                v-if="!(note.renote == undefined)"
            >
                <img :class="$style.renoterAvatar" :src="note.renote.avatar">
                <p v-html="note.renote.userName"></p>
                <p>さんがリノート</p>
            </div>
            <div :class="$style.row">
                <img :class="$style.avatar" :src="note.avatar">
                <article>
                    <header :class="$style.noteHead">
                        <a :class="$style.userName" v-html="note.userName"></a>
                        <p :class="$style.userId">@{{ note.userId }}</p>
                    </header>
                    <div :class="$style.text" v-html="note.text"></div>
                    <div v-if="!(note.files == undefined)">
                        <img v-for="file in note.files" :src="file.thumbnailUrl" :class="$style.media">
                    </div>
                </article>
                <p :class="$style.noteId">{{ note.id }}</p>
            </div>
        </div>
    </div>
</template>

<style module lang="postcss">
.root {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}
.note {
    display: flex;
    flex-direction: column;

    position: relative;

    width: 95%;
    margin-top: 2%;

    padding: 2%;

    border-radius: 7px;

    background-color: var(--secondary-bg-color);
    .renote {
        display: flex;
        align-items: center;

        margin: 0 0 1% 0;
        padding-bottom: 1%;

        font-size: 60%;
        color: var(--secondary-text-color);

        border-bottom: solid 1px var(--secondary-border-color) ;

        .renoterAvatar {
            height: 1.5em;
            width: 1.5em;

            margin: 0 1% 0 0;

            border-radius: 5px;
        }

        p {
            display: flex;
            align-items: center;

            overflow: hidden; 
            white-space: nowrap;
        }
    }
    .avatar {
        height: 2em;
        width: 2em;

        border-radius: 10px;
    }
    article {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        padding-left: 2%;

        width: calc(91% - 2em);

        font-size: 60%;

        header {
            display: flex;
            align-items: flex-end;

            width: 100%;

            font-size: 90%;
            a { font-weight: 500; }
            a,p { overflow: hidden; white-space: nowrap; }
        }
        .text {
            padding: 2%;

            width: 96%;
            overflow: hidden;
        }

        .media,.medias {
            border-radius: 7px;

            object-fit: cover;
            aspect-ratio: 16 / 9;
        }
        .media { width: 100%; }
        .medias { width: 50%; }
    }
    .noteId {
        position: absolute;
        bottom: 2%;
        right: 2%;

        font-size: 40%;
        color: var(--secondary-text-color);
    }
}
.row {
    display: flex;
    flex-direction: row;
}
</style>