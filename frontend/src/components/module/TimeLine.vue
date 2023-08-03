<script setup lang="ts">
import { ref } from 'vue'

import { read } from './ts/Cookie'
import { UUIDGen } from './ts/UUID'
import { noteGen } from './ts/note'

import Note from './Note.vue'

const props = defineProps<{
    hostName?: string;
    channel?: string;
}>();

const notes = ref<note[]>([])
const maxIndexSize: number = 10

let scrollIndex: number = 0

if (props.hostName !== undefined) {
    get_note();
    stream();
}

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
        (maxIndexSize < notes.value.length)
            ? notes.value.shift()
            : (scrollIndex < 100)
                ? notes.value.push(noteGen(JSON.parse(event.data).body.body))
                : console.log('lost Note!')
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
            limit: maxIndexSize,
        }),
    }).then((response) => response.json()).then((data) => data );

    res.forEach(note => {
        notes.value.push(noteGen(note))
    });
}

window.addEventListener('scroll',() => {
    scrollIndex = window.scrollY;
    console.log(scrollIndex)
});
</script>

<template>
    <Note
        v-for="note in notes"
        :note="note"/>
</template>

<style module lang="postcss">

</style>