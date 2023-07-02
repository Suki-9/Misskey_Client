<template>
    <p>callback</p>
</template>
<script setup>
import Cookie from '@/components/js/Cookie.js'

const session = Cookie.read("session")
check(session.split(","))
async function check(session){
    if (session != null) {
        const token = await fetch(`https://${session[0]}/api/miauth/${session[1]}/check`,{
            method: 'POST'
        }).then((response) => response.json()).then(async(data) => {return await data.body.i});
        document.Cookie = `${host}_token=${token}`
        alert(token)
        if (Cookie.read("mainhost") == null) {
            document.Cookie = `mainhost=${session[0]}`
        }
        document.location = "/";
    } else {
        document.location = "./login";
    }
}
</script> 