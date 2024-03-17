// Moment 2, Löst av Adam Sjögren

"use strict";

// DOM 

const firstHeaderEl = document.getElementById("firstHeader");
const secondHeaderEl = document.getElementById("secondHeader");
const thirdHeaderEl = document.getElementById("thirdHeader");
const searchBarEl = document.getElementById("searchBar");



// Startar javascripten när hemsidan laddas in

async function init() {
    try {
        const schedules = await getSchedule();
        handleCourses(schedules);
        searchBarEl.addEventListener('input', function () {
            filterLiItems(searchBarEl.value.trim().toLowerCase());
        });
    }

    // Catchar felet och loggar det som gick fel i konsolen

    catch (error) {
        console.error('Error with initializing:', error);
    }
}

window.onload = init;


// Funktion som hämtar schemat och gör om det till data 

async function getSchedule() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht23.json');
        const data = await response.json();
        return data;
    }

    // Catchar felet och loggar det som gick fel i konsolen

    catch (error) {
        console.error('Error with fetch:', error);
        throw error;
    }
}

// Funktion som printar ut alla kurskoder, kursnamn och progression i li element. Utskriften ser ut såhär: <ul><li><li>.......</ul>

async function handleCourses(schedules) {

    // li-element för kurskod

    schedules.forEach(courseCode => {
        const firstColEl = document.getElementById('firstCol');
        let newLiEl1 = document.createElement("li");

        // Lägger till klassen 'code' för att lättare kunna targeta li-elementen i den första kolumnen

        newLiEl1.classList.add("code")
        let newLiText1 = document.createTextNode(courseCode.code);

        newLiEl1.appendChild(newLiText1);
        firstColEl.appendChild(newLiEl1);

    });

    // li-element för kursnamn

    schedules.forEach(courseName => {
        const secondColEl = document.getElementById('secondCol');

        let newLiEl2 = document.createElement("li");

        // Lägger till klassen 'name' för att lättare kunna targeta li-elementen i den andra kolumnen

        newLiEl2.classList.add("name")
        let newLiText2 = document.createTextNode(courseName.coursename);

        newLiEl2.appendChild(newLiText2);
        secondColEl.appendChild(newLiEl2);

    });

    // li-element för progression

    schedules.forEach(courseProg => {
        const thirdColEl = document.getElementById('thirdCol');

        let newLiEl3 = document.createElement("li");

        // Lägger till klassen 'prog' för att lättare kunna targeta li-elementen i den tredje kolumnen

        newLiEl3.classList.add("prog")
        let newLiText3 = document.createTextNode(courseProg.progression);

        newLiEl3.appendChild(newLiText3);
        thirdColEl.appendChild(newLiEl3);

    });

    // Lägger till eventlisteners för att sortera kurskoder, kursnamn och progression vid klick

    firstHeaderEl.addEventListener('click', function () {
        sortCode(schedules);
    });
    secondHeaderEl.addEventListener('click', function () {
        sortName(schedules);
    });
    thirdHeaderEl.addEventListener('click', function () {
        sortProg(schedules);
    });

}

function sortCode(schedules) {

    /* Använder mig av sort-funktionen för att sortera kurskoden i unicode-kodpunktsordning. 
    Argumenten jag använder är temporära variabler vid namn a och b. De representerar argumenten som ska jämföras.
    Eftersom jag ska jämföra kursnamnet jämför jag a.code som motsvarar objektet i arrayen jag fått genom API:n med b.code. Jag använder mig dessutom av metoden 'localeCompare'.
    Denna metoden jämför strängvärdena som motsvarar a.code och b.code. Ett plus med denna metoden är att den även kan sortera tecken som inte infattas i ASCII-tabellen.
    */

    schedules.sort((a, b) => a.code.localeCompare(b.code));
    renderColumns(schedules);
}

function sortName(schedules) {
    // Gör samma sak som jag gjorde för sortCode, bara att jag ersätter sortCode med sortName och sorterar namnen i unicode-kodpunktsordning
    schedules.sort((a, b) => a.coursename.localeCompare(b.coursename));
    renderColumns(schedules);
}

function sortProg(schedules) {
    // Gör samma sak som jag gjorde för sortCode, bara att jag ersätter sortCode med sortProg och sorterar progression i unicode-kodpunktsordning
    schedules.sort((a, b) => a.progression.localeCompare(b.progression));
    renderColumns(schedules);
}

function renderColumns(schedules) {

    // För att rendera kolumnerna så de blir sorterade börjar jag med att ta bort de existerande li-elementen. Dessa kommer ersättas med de sorterade li-elementen

    document.getElementById('firstCol').innerHTML = '';
    document.getElementById('secondCol').innerHTML = '';
    document.getElementById('thirdCol').innerHTML = '';

    // Eftersom jag kör renderColumns i sort funktionerna kommer variablerna föras vidare hit till detta blocket också, vilket betyder att jag kan använda dem här då de är definerade

    // Kurskoder

    schedules.forEach(schedule => {
        const firstColEl = document.getElementById('firstCol');
        let newLiEl1 = document.createElement("li");
        newLiEl1.classList.add("code");
        let newLiText1 = document.createTextNode(schedule.code);
        newLiEl1.appendChild(newLiText1);
        firstColEl.appendChild(newLiEl1);

        // Kursnamn

        const secondColEl = document.getElementById('secondCol');
        let newLiEl2 = document.createElement("li");
        newLiEl2.classList.add("name");
        let newLiText2 = document.createTextNode(schedule.coursename);
        newLiEl2.appendChild(newLiText2);
        secondColEl.appendChild(newLiEl2);

        // Kurs-progression

        const thirdColEl = document.getElementById('thirdCol');
        let newLiEl3 = document.createElement("li");
        newLiEl3.classList.add("prog");
        let newLiText3 = document.createTextNode(schedule.progression);
        newLiEl3.appendChild(newLiText3);
        thirdColEl.appendChild(newLiEl3);
    });
}

// Filtrerar listelement baserat på sökterm
async function filterLiItems(searchTerm) {

    // Hämtar klasserna jag tidigare angav till variabler

    const courseCodes = document.querySelectorAll('.code');
    const courseNames = document.querySelectorAll('.name');
    const courseProgs = document.querySelectorAll('.prog');

    // Itererar över listelementen och kontrollerar om de matchar söktermen

    courseCodes.forEach((codeEl, index) => {
        const nameEl = courseNames[index];
        const progEl = courseProgs[index];

        // Omvandlar alla bokstäver till lowercase för att det inte ska bli något fel när man använder stora bokstäver i sökfältet

        const codeText = codeEl.textContent.toLowerCase();
        const nameText = nameEl.textContent.toLowerCase();
        const progText = progEl.textContent.toLowerCase();

        // Kontrollerar om textinnehållet i något element matchar söktermen   

        if (codeText.includes(searchTerm) || nameText.includes(searchTerm) || progText.includes(searchTerm)) {
            codeEl.style.display = 'block';
            nameEl.style.display = 'block';
            progEl.style.display = 'block';
        } else {
            codeEl.style.display = 'none';
            nameEl.style.display = 'none';
            progEl.style.display = 'none';
        }
    });
}
