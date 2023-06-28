<template>
    <div class="loginpage">
        <div class="pagehead">
            <p>MiAuth認証</p>
        </div>
        <p class="pageattention">
            MiAuth認証を使ってトークンを取得します。<br>
            もしアクセストークンでログインしたい場合は下のスイッチから切り替えてください。
        </p>
        <div class="form_attention">
            <p>{{ form_attention }}</p>
            <p class="form_alert">{{ form_alert }}</p>
        </div>
        <input :value="host" @input="hostInput" class="loginform_textinput" autocomplete="off" placeholder="hogehoge.com"/>
        <input :value="token" @input="tokenInput" v-show="!login_type.bool" class="loginform_textinput" autocomplete="off" placeholder="32文字の英数字"/>
        <a id="loginswitch" @click="login_switch" class="loginswitch">{{ login_type.text }}</a>
        <a class="button" @click="Miauth">Login!</a>
    </div>
</template>
<script>
import Cookie from '@/components/js/Cookie.js'
import UUID from '@/components/js/UUID.js'

export default {
    data() {
        return {
            form_attention: "サーバーのホスト名を入力",
            form_alert: '',
            login_type: {
                text: "トークンでログイン",
                bool: true,
            },
            token: '',
            host: '',
        }
    },
    methods: {
        hostInput(e) {
            this.host = e.target.value
        },
        tokenInput(e) {
            this.token = e.target.value
        },
        Miauth() {
            if (this.login_type.bool) {
                if (this.host !== ""){
                    let hosts = Cookie.lead("hosts")
                    if (hosts == null) {
                        document.cookie = `hosts=[${this.host}]`;
                    } else {
                        //正規表現できれいにしておけ1
                        if ( hosts.indexOf(this.host) == -1) {
                            document.cookie = `hosts=[${this.host},${hosts.replace("[","").replace("]","")}]`;
                        }
                    }
                    const uuid = UUID.Gen();
                    document.cookie = `uuid=${uuid}`;
                    const MiAauthURL = `https://${this.host}/miauth/${uuid}`;
                    alert(MiAauthURL)
                    //document.location = MiAauthURL;
                    this.host = "";
                } else {
                    this.form_alert = "ホスト名を入力してください!"
                }
            } else {
                if (this.host !== "" && this.token !== "") {
                    document.cookie = `${this.host}_token=${this.token},${this.host}`
                } else {
                    this.form_alert = "入力してください!"
                }
            }
        },
        login_switch() {
            this.login_type.text = (this.login_type.bool) ? "トークンでログイン" : "MiAuthでログイン";
            this.form_attention = (this.login_type.bool) ? "トークンを入力" : "サーバーのホスト名を入力";
            this.login_type.bool = !this.login_type.bool;
        }
    }
}
</script>

<style scoped>
@import '../components/css/pc/login.css';
</style>