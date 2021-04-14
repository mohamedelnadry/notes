function getID(id){
    document.getElementById('delete').value = id
}
function getPost(id){
    var title = document.getElementById('title').innerText
    var desc = document.getElementById('desc').innerText
    document.getElementById('inputID').value = id
    document.getElementById('titleInput').value = title
    document.getElementById('descInput').value = desc

}