
//Funktion för att hämta API-datan.
async function getAPI(){
    try{
        //Användardatan hämtas från API:et.
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        //Om datan hämtas korrekt omvandlas svaret till Json.
        let data = await response.json();

        //Funktion för att skriva ut datan på min webbsida.
        logOutData(data);

    //Ett errormeddelande visas om datan inte skulle gå att hämta från API:et.
    }
    catch(error){
        console.error("Ett fel inträffade när datan skulle hämtas: ", error);
        alert("Något gick fel när datan skulle hämtas!");
    };
}

//Funktionen körs.
getAPI();


//".card" från HTML:en definieras i JS utanför nedanstående funktioner
//eftersom variabeln ska användas i båda funktionerna.
const personCards = document.querySelectorAll(".card");

//Funktion för att logga ut datan på min webbsida.
function logOutData(data){

    //En loop går igenom varje användare (objekt) i datan, samt varje card i HTML:en.
    data.forEach(function(item, index){
        //En osorterad lista skapas här, och styleas.
        const infoList = document.createElement("ul");
        infoList.style.listStyleType = "none";
        infoList.style.color = "white";
        infoList.style.marginTop = "1em";

        //Den första listpunkten i listan skapas och styleas.
        const listItem1 = document.createElement("li"); 
        listItem1.style.paddingBottom = "1em";
        listItem1.style.fontSize = "1.5em";
        listItem1.style.fontWeight = "700";
        //Listpunkten består av objektens namn.
        listItem1.textContent = item.name;
        //Listpunkten läggs till i den osorterade listan.
        infoList.appendChild(listItem1);

        //Den andra listpunken består av objektens användarnamn.
        //Den läggs också till i den osorterade listan.
        const listItem2 = document.createElement("li");
        listItem2.style.paddingBottom = "1em";
        listItem2.textContent = "Username: " + item.username;
        infoList.appendChild(listItem2);

        //Den tredje listpunkten består av objektens email.
        //Den läggs till i listan.
        const listItem3 = document.createElement("li");
        listItem3.style.paddingBottom = "3em";
        listItem3.textContent = item.email;
        infoList.appendChild(listItem3);

        //Listan läggs till på varje card. Det första objektet i datan
        //hamnar på card 1 och nästa objekt hamnar på card 2 o.s.v.
        personCards[index].appendChild(infoList);
        

        //Ytterligare en lista skapas och styleas.
        const infoListMore = document.createElement("ul");
        infoListMore.style.listStyleType = "none";
        infoListMore.style.color = "white";
        infoListMore.style.marginTop = "1em";
        //Listans normalläge är att den är gömd.
        infoListMore.style.visibility = "hidden";

        //På denna lista skapas tre nya listpunkter som utgörs
        //av objektens adress, telefonnummer och företag.
        //Listan styleas också nedan.
        const listItem4 = document.createElement("li");
        listItem4.style.paddingBottom = "1em";
        listItem4.textContent = item.address.city;
        infoListMore.appendChild(listItem4);

        const listItem5 = document.createElement("li");
        listItem5.style.paddingBottom = "1em";
        listItem5.textContent = item.phone;
        infoListMore.appendChild(listItem5);

        const listItem6 = document.createElement("li");
        listItem6.style.paddingBottom = "4em";
        listItem6.textContent = item.company.name;
        infoListMore.appendChild(listItem6);

        //Den nya listan läggs också till på varje card.
        //Objekt 1 hamnar på card 1 o.s.v.
        personCards[index].appendChild(infoListMore);

        //Varje lista kopplas till ett personkort, så att funktionen
        //nedanför ska fungera.
        personCards[index].infoList = infoList;
        personCards[index].infoListMore = infoListMore;
});
}

//En funktion för knapptryck skapas. Funktionen tar html:ens knappar och
//cards som argument.
document.querySelectorAll(".show-info-btn").forEach(function(button, index){
button.addEventListener("click", function() {
    
    //Vid knapptryck blir lista nr 2 är synlig om den är osynlig, och osynlig
    //om den är synlig. Koden för grid-layouten ändras också så att listan ska
    //rymmas på kortet när den visas.
        if (personCards[index].infoListMore.style.visibility === "visible"){
        personCards[index].infoListMore.style.visibility = "hidden";
        personCards[index].style.gridTemplateRows = "10em 0 4em";
        personCards[index].style.height = "17em";
        }else{
        personCards[index].infoListMore.style.visibility = "visible";
        personCards[index].infoListMore.style.gridRow = "2";
        personCards[index].style.gridTemplateRows = "10em 7em 4em";
        personCards[index].style.height = "25em";
    }
    })
});