window.onload = event => {

    firebase.auth().onAuthStateChanged(user => {
        if(user){
            console.log("Signed in as " + user.displayName);
            const googleUserId = user.uid;
            getNotes(googleUserId);
        }
        else{
            window.location = "index.html";
        }
    });
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHtml(data);
    })
}

const renderDataAsHtml = (data) => {
    let cards = ``;
    for (const noteItem in data){
        const note = data[noteItem];
        console.log(`${note.title} ${note.text}`)
    }
}