const dropArea = document.getElementById("drop-area");
const csvTable = document.getElementById("csv-table");

function parseCSV(data) {
  const rows = data.split("\n");
  csvTable.innerHTML = "";

  rows.forEach((row, index) => {
    const cols = row.split(",");
    const tr = document.createElement("tr");

    cols.forEach((col) => {
      const cell = index === 0 ? document.createElement("th") : document.createElement("td");
      cell.textContent = col.trim();
      tr.appendChild(cell);
    });

    csvTable.appendChild(tr);
  });
}

function readCSV(file){
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    parseCSV(content);
  };
  reader.readAsText(file);
}

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover");

  const files = event.dataTransfer.files;
  if (files.length > 0){
    const file = files[0];
    if(file.type === "text/csv"){
      readCSV(file);
    }else{
      alert("拡張子がCSVではありません。")
    }
  }
});