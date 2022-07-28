
    // TABLE HEADER
    let array = ["NOM DU PARKING", "PLACE(S)", "STATUT"];
function createHeaderTable(nameOfMyTable) {
    const myTable = document.querySelector("table");
    let headerTable = document.createElement("thead");

    myTable.appendChild(headerTable);
    let rowHeaderTable = document.createElement("tr");
    headerTable.appendChild(rowHeaderTable);

    for (let i = 0; i < nameOfMyTable.length; i++) {
        let cellHeaderTable = document.createElement("td");
        cellHeaderTable.appendChild(document.createTextNode(nameOfMyTable[i]));
                rowHeaderTable.appendChild(cellHeaderTable);
    }
}

let fetchDatas =
async function (){
  let url = "https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&facet=etat_descriptif";   
  let response = await fetch(url);
  let dataJson = await response.json();

  drawBody(dataJson);
}


    // PARKING
function drawBody(datas){
    

    const myTable = document.querySelector("table");
    let bodyTable = document.createElement("tbody");
     

    for (let i = 0; i < datas.records.length; i++) {
        let rowBodyTable = document.createElement("tr");
        let cellBodyTable = document.createElement("td");
        let cellBodyTable2 = document.createElement("td");
        let cellBodyTable3 = document.createElement("td");
        cellBodyTable.textContent=datas.records[i].fields.nom_parking;

        // Spots left in the parking 
        cellBodyTable2.textContent=datas.records[i].fields.libre;
        cellBodyTable2.style.textAlign = "center";
        if (datas.records[i].fields.libre <=30) {
            cellBodyTable2.style.color = "#B62828"
        }

        // Close / Open / Unknown status
        //cellBodyTable3.textContent=datas.records[i].fields.etat_descriptif;
        cellBodyTable3.style.textAlign = "center";
        if (datas.records[i].fields.etat_descriptif == "Ouvert") {
            let open = document.createElement("img");
            open.src = "assets/icons/accept.png";
            cellBodyTable3.appendChild(open);
        } else if (datas.records[i].fields.etat_descriptif == "Fermé") {
            let closed = document.createElement("img");
            closed.src = "assets/icons/cancel.png";
            cellBodyTable3.appendChild(closed);
        } else {
            let unknown = document.createElement("img");
            unknown.src = "assets/icons/unknown.png";
            cellBodyTable3.appendChild(unknown);
        }

        rowBodyTable.appendChild(cellBodyTable);
        rowBodyTable.appendChild(cellBodyTable2);
        rowBodyTable.appendChild(cellBodyTable3);
        bodyTable.appendChild(rowBodyTable);  
    myTable.appendChild(bodyTable);
};
}
