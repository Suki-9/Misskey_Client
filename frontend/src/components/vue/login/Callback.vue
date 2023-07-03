<template>
    <p style="text-align: center;">callback</p>
</template>
<script setup>
import Cookie from '@/components/js/Cookie.js'

const session = Cookie.read("session")
check(session.split(","))
async function check(session){
    if (session != null) {
        const res = await fetch(`https://${session[0]}/api/miauth/${session[1]}/check`,{
            method: 'POST'
        }).then((response) => response.json()).then((data) => {return data});
        document.cookie = `${session[0]}_token=${await res.token}`
        console.log(await res.token)
        if (Cookie.read("mainhost") == null)
            document.cookie = `mainhost=${session[0]}`
        document.cookie = `hosts=${(Cookie.read("hosts") == null) ? "" : Cookie.read("hosts")},${session[0]}`
        document.location = "/";
    } else {
        document.location = "./login";
    }
}
</script> 