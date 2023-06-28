export default {
    Gen(data){
        const GetNote = JSON.parse(data).body.body
        const UserData = GetNote.user

        console.log(GetNote)

        const Username = UserData.name.replace(/\:.*?\:/g,"{emo}")
        const username_emozi = UserData.name.match(/\:.*?\:/g)

        const text = (GetNote.text == null) ? "" : GetNote.text.replace(/\:.*?\:/g,"{emo}")
        const text_emozi = (GetNote.text == null) ? "" : GetNote.text.match(/\:.*?\:/g)
        
        document.getElementById("TL").innerHTML += `
            <div class="note">
                <img class="user_icon" src="${UserData.avatarUrl}">
                <div class="article">
                    <div class="note_head">
                        <p class="name">${Username}</p>
                        <p class="name">@${UserData.username}</p>
                    </div>
                    <div class="note_text">
                        <p>${text}</p>
                    </div>
                    <div class="note_media">
                    
                    </div>
                    <div class="note_reaction">
                    </div>
                    <div class="note_footer">
                    
                    </div>
                </div>
            </div>
            `
    }
}
