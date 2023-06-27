let UUID = "";

function GenUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(a) {
        let r = (new Date().getTime() + Math.random() * 16)%16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

function GenMiAuthURL() {
    const host = document.getElementById('host').value;
    const MiAauthURL = `https://${host}/miauth/${UUID}`
    UUID = GenUUID();
    document.getElementById('MiAuthURL').innerHTML = 'MiAuthURL';
    document.getElementById('MiAuthURL').href = MiAauthURL;
}
function test() {
    alert(UUID)
}