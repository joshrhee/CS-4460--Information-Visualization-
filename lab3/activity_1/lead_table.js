d3.csv('NetflixOriginals.csv').then((data) => {
    const tableBody = document.getElementById("netflix-table-body");

    data.map((d) => {
        const title = d.Title;
        const premiere = d.Premiere;
        const premierYear = premiere.substring(premiere.length-4, premiere.length)
        const imdbScore = d["IMDB Score"]
    

        const childTitle = document.createElement("td");
        childTitle.textContent = title;

        const childIMDBScore = document.createElement("td");
        childIMDBScore.textContent = imdbScore;

        const childPremiere = document.createElement("td");
        childPremiere.textContent = premierYear;
        
        const childTableRow = document.createElement("tr");
        childTableRow.appendChild(childTitle);
        childTableRow.appendChild(childIMDBScore);
        childTableRow.appendChild(childPremiere);

        tableBody.appendChild(childTableRow);
    })

    data.sort((a, b) => {
        return parseFloat(b["IMDB Score"]) - parseFloat(a["IMDB Score"]);
    })

    idNetflixDom = document.getElementById("netflix");
    pTagsDiv = document.createElement("div");
    data.map((d, i) => {
        const title = d.Title;
        const premiere = d.Premiere;
        const imdbScore = d["IMDB Score"];
    
        const info = title + " premiered on " + premiere + "," + " receiving an IMDB Score of: " + imdbScore;
        const pTag = document.createElement("p");
        pTag.textContent = info;

        if (i == 0) {
            pTag.setAttribute("style", "color: red");
        }
        
        pTagsDiv.appendChild(pTag);
    })
    idNetflixDom.appendChild(pTagsDiv);
})
