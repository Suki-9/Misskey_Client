function GenUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(a) {
        let r = (new Date().getTime() + Math.random() * 16)%16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

function GenMiAuthURL() {
    const instanceURL = document.getElementById('instanceURL').value;
    const UserID = document.getElementById('UserID').value;
    const UUID = GenUUID().replace(/-/g, '');
    const MiAauthURL = `https://${instanceURL}/miauth/${UUID}`
    document.getElementById('MiAuthURL').innerHTML = 'MiAuthURL';
    document.getElementById('MiAuthURL').href = MiAauthURL;

}