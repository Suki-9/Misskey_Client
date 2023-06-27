<template>
    <div>
        <div>
            <p>ようこそ(借)へ</p>
        </div>
        <div>
            <input type="text" id="host" list="hostlist" autocomplete="off" placeholder=""/>
            <datalist id="hostlist">
                <option v-for="host in  hosts" :key="host.id" :value="host.text"></option>
            </datalist>
            <a class="button" @click="Miauth">Lets Go!</a>
        </div>
        <div>
            <p>追加されているインスタンス一覧</p>
            <p v-for="host in  hosts" :key="host.id">{{ host.text }}</p>
        </div>
    </div>
</template>

<script>
import Cookie from '@/components/js/Cookie.js'

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
        },
        loadlist() {
            //正規表現できれいにしておけ2
            const host = Cookie.lead("hosts").replace("[","").replace("]","").split(",")
            for (let i = 0;i < host.length;i++){
                let addhost = []
                addhost.push(`id: id++`)
                addhost.push(`host: ${host[i]}`)
                console.log(addhost)
                this.hosts.push(addhost)
            }
        },
    },
    mounted() {
        this.loadlist();
  },
}
</script>


<style scoped>
@import '../components/css/pc/login.css';
</style>