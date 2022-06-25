let selectedRow = null
//start with selection as null as a default

//wait for form info to be entered and validated@, then reset once form is submitted
function onFormSubmit() {
    if (validate()) {
        let songValues = getSongValues();
        if (selectedRow == null)
            addSong(songValues);
        else
            updateSong(songValues);
        resetForm();
    }
}

//create a function to get the input values for each song/setlist item
function getSongValues() {
    let songInfo = {};
    songInfo["songName"] = document.getElementById("songName").value;
    songInfo["key"] = document.getElementById("key").value;
    songInfo["length"] = document.getElementById("length").value;
    return songInfo;
}


//add the songs to our setlist <table>
function addSong(data) {
    let setlist = document.getElementById("setlist").getElementsByTagName('tbody')[0];
    let newRow = setlist.insertRow(setlist.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.songName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.key;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.length;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="edit-button" onClick="onEdit(this)">Edit</button>
                       <button class="delete-button" onClick="onDelete(this)">Delete</button>`;
}

//clear the values in the input form and set back to null
function resetForm() {
    document.getElementById("songName").value = "";
    document.getElementById("key").value = "";
    document.getElementById("length").value = "";
    selectedRow = null;
}

//in order to update and item, we'll select the row of the table the Edit button 
//is located on, and edit it back up in our form, then reset the values for the selected row
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("songName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("key").value = selectedRow.cells[1].innerHTML;
    document.getElementById("length").value = selectedRow.cells[2].innerHTML;
}


function updateSong(songValues) {
    selectedRow.cells[0].innerHTML = songValues.songName;
    selectedRow.cells[1].innerHTML = songValues.key;
    selectedRow.cells[2].innerHTML = songValues.length;
}

//when delete is clicked, remove row and reset the input form
function onDelete(td) {
    row = td.parentElement.parentElement;
    document.getElementById("setlist").deleteRow(row.rowIndex);
    resetForm();
}

//check if there is a song name in the song name field. If not, display an error.
function validate() {
    isValid = true;
    if (document.getElementById("songName").value == "") {
        isValid = false;
        document.getElementById("songNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("songNameValidationError").classList.contains("hide"))
            document.getElementById("songNameValidationError").classList.add("hide");
    }
    return isValid;
}