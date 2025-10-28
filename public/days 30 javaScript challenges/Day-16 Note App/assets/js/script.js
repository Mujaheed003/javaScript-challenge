const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to load notes from localStorage
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}
showNotes();

// Function to update the localStorage with the current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener to create a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "assets/images/delete.png";  // Correct the path
    notesContainer.appendChild(inputBox).appendChild(img);
});

// Event listener for note actions (edit or delete)
notesContainer.addEventListener("click", function (e) {
    // Delete note
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    // Update storage when note is edited
    else if (e.target.tagName === "P") {
        let notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        });
    }
});

// Prevent Enter key default behavior (Insert Line Break)
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});