const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// getting localstorage notes if exist and parsing them
// to js object else passing an empty array to notes

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a New Note";
  popupBox.classList.remove("show");
});

//showing local data

const showNotes = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `
    <li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span
        >${note.decription}.
      </span>
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
        <ul class="menu">
          <li onclick ="updateNote('${index}','${note.title}','${note.decription}')"><i class="uli uil-pen"></i>Edit</li>
          <li onclick="deleteNote(${index})"><i class="uli uil-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>
    `;

    addBox.insertAdjacentHTML("afterend", liTag);
    console.log(note);
  });
};

showNotes();

//for Edit buttons and delete
const showMenu = (elem) => {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      // removing show class from the settings menu on document click
      elem.parentElement.classList.remove("show");
    }
  });
  //     console.log(elem.parentElement);
  //     console.log(e.target.tagName);

  //     if (e.target.tagName != "I" || e.target != e) {
  //       console.log("in side if");
  //       console.log(elem.parentElement);
  //       // removing show class from the settings menu on document click
  //       elem.classList.remove("show");
  //     }
  //   });
  console.log(elem);
  console.log(elem.parentElement);
};

// delete note

const deleteNote = (noteId) => {
  let confirmDel = confirm("Are you sure you want to delete this note ?");
  if (!confirmDel) return;
  //removing selected note from array/ tasks
  notes.splice(noteId, 1);
  //saving updated notes to localstorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  console.log(noteId);
};

//edit note

const updateNote = (noteId, title, decription) => {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = decription;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
  console.log(noteId, title, decription);
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear(),
      time = dateObj.toUTCString();

    let noteInfo = {
      title: noteTitle,
      decription: noteDesc,
      date: `${month} ${day}, ${year},${time}`,
    };

    if (!isUpdate) {
      //adding new note to notes
      notes.push(noteInfo);
    } else {
      //updating specified note
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    //saving notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
    console.log(noteInfo);
  }
});
