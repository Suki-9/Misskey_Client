<template>
    <div claaa="mobile">
        <v-toolbar 
            density="compact"
        >
            <v-app-bar-nav-icon
                @click="menu = !menu"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>{{ login_type.text }}でログイン</v-toolbar-title>
        </v-toolbar>
        <v-sheet>
            <v-expand-transition>
                <v-col
                    class="pa-0 ma-0"
                    v-show="menu"
                    @click="menu = !menu"
                >
                    <v-btn
                        variant="text"
                        width="100%"
                        @click="login_type.text = 'MiAuth',login_type.bool = false"
                    >MiAuthでログイン</v-btn>
                    <v-divider></v-divider>
                    <v-btn
                        variant="text"
                        width="100%"
                        @click="login_type.text = 'Token',login_type.bool = true"
                    >Tokenでログイン</v-btn>
                    <v-divider></v-divider>
                </v-col>
            </v-expand-transition>
        </v-sheet>
        <v-card 
            class="mx-auto"
            elevation="0"
        >
            <v-form>
                <v-text-field 
                    v-model="host"
                    label="Host URL"
                    placeholder="hogehoge.com"
                    hint="Enter use host URL"
                    class="px-5 pt-5"
                    variant="underlined"
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="token"
                    v-show="login_type.bool"
                    label="Your Token"
                    placeholder="32 alphanumeric characters."
                    class="px-5"
                    variant="underlined"
                    clearable
                ></v-text-field>
                <v-card-actions> 
                <v-row 
                    justify="end"
                    class="px-5"
                >
                    <v-btn
                        :loading="loading"
                        @click="login"
                        variant="flat"
                        size="large"
                        class="px-5"
                    >Login!</v-btn>
                </v-row>
                </v-card-actions>
            </v-form>
        </v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
            hostを入力してください!
            <template v-slot:actions>
                <v-btn
                    color="red"
                    variant="text"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
  </div>
</template>
<script>
// import Cookie from '@/components/js/Cookie.js'
import UUID from '@/components/js/UUID.js'

export default {
    data() {
        return {
            menu: false,
            login_type: {
                bool: false,
                text: "MiAuth",
            },
            token: null,
            host: null,
            loading: false,
            snackbar: false,
            server_url: "",
        }
    },
    methods: {
        login() {
            this.Miauth();
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000);
        },
        Miauth() {
            if (this.host !== null) {
                const host = this.host;

                if (!this.login_type.bool) {
                    const session = UUID.Gen()
                    const MiAuth_URL = `https://${host}/miauth/${session}?name=Mive&callback=${this.server_url}/callback&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes`
                    document.cookie = `session=${host},${session}`
                    document.location = MiAuth_URL;
                } else {
                    const token = this.token;
                }
            } else {
                this.snackbar = true;
            }
        }
    }
}
</script>

<style scoped>
</style>