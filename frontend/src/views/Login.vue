<template>
    <div>
        <div class="pagehead">
            <p>ようこそ(借)へ</p>
        </div>
        <div>
            <input type="text" id="host" list="hostlist" autocomplete="off" placeholder=""/>
            <datalist id="hostlist">
                <option v-for="host in  hosts" :key="host.id" :value="host.text"></option>
            </datalist>
            <a class="button" @click="Miauth">Login!</a>
        </div>
    </div>
</template>

<style scoped>
@import '../components/css/pc/login.css';
.pagehead {
    width: max(100%,1000px);
}

</style>

<script>
import Cookie from '@/components/js/Cookie.js'
import UUID from '@/components/js/UUID.js'

let id = 0
export default {
    data() {
        return {
            hosts: [
            ]
        }
    },
    methods: {
        Miauth() {
            const host = document.getElementById('host').value;
            document.getElementById('host').value = "";
            if (host == ""){
                document.getElementById('host').placeholder = "入力必須";
            } else {
                let hosts = Cookie.lead("hosts")
                if (hosts == null) {
                    document.cookie = `hosts=[${host}]`;
                } else {
                    //正規表現できれいにしておけ1
                    if ( hosts.indexOf(host) == -1) {
                        document.cookie = `hosts=[${host},${hosts.replace("[","").replace("]","")}]`;
                    }
                }
            }
            const uuid = UUID.Gen();
            document.cookie = `uuid=${uuid}`;
            const MiAauthURL = `https://${host}/miauth/${uuid}`;
            document.location = MiAauthURL;
        }
    }
}
</script>