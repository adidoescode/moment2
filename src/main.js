// Moment 2, Löst av Adam Sjögren

"use strict";

// DOM 

const firstHeaderEl = document.getElementById("firstHeader");
const secondHeaderEl = document.getElementById("secondHeader");
const thirdHeaderEl = document.getElementById("thirdHeader");
const searchBarEl = document.getElementById("searchBar");



// Starta javascripten när hemsidan laddas in

async function init() {
    try {
        const schedules = await getSchedule();
        handleCourses(schedules);
        searchBarEl.addEventListener('input', function () {
            filterLiItems(searchBarEl.value.trim().toLowerCase());
        });
    }
    catch (error) {
        console.error('Error with initializing:', error);
    }
}

window.onload = init;

async function getSchedule() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht23.json');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error with fetch:', error);
        throw error;
    }
}

async function handleCourses(schedules) {

    schedules.forEach(courseCode => {
        const firstColEl = document.getElementById('firstCol');
        let newLiEl1 = document.createElement("li");
        newLiEl1.classList.add("code")
        let newLiText1 = document.createTextNode(courseCode.code);

        newLiEl1.appendChild(newLiText1);
        firstColEl.appendChild(newLiEl1);

    });

    schedules.forEach(courseName => {
        const secondColEl = document.getElementById('secondCol');

        let newLiEl2 = document.createElement("li");
        newLiEl2.classList.add("name")
        let newLiText2 = document.createTextNode(courseName.coursename);

        newLiEl2.appendChild(newLiText2);
        secondColEl.appendChild(newLiEl2);

    });

    schedules.forEach(courseProg => {
        const thirdColEl = document.getElementById('thirdCol');

        let newLiEl3 = document.createElement("li");
        newLiEl3.classList.add("prog")
        let newLiText3 = document.createTextNode(courseProg.progression);

        newLiEl3.appendChild(newLiText3);
        thirdColEl.appendChild(newLiEl3);

    });

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
/*
function sortCode(schedules) {

    let codeArray = [];

    schedules.forEach(sortCode => {
        codeArray.push(sortCode.code);
    })
    codeArray.sort();

    document.getElementById('firstCol').innerHTML = '';

    codeArray.forEach(newCode => {
        const firstColEl = document.getElementById('firstCol');
        let newLiEl1 = document.createElement("li");
        newLiEl1.classList.add("code")
        let newLiText1 = document.createTextNode(newCode);

        newLiEl1.appendChild(newLiText1);
        firstColEl.appendChild(newLiEl1);
    })
    console.log(codeArray);
}

function sortName(schedules) {

    let nameArray = [];

    schedules.forEach(sortName => {
        nameArray.push(sortName.coursename);
    })
    nameArray.sort();

    document.getElementById('secondCol').innerHTML = '';

    nameArray.forEach(newName => {
        const secondColEl = document.getElementById('secondCol');
        let newLiEl2 = document.createElement("li");
        newLiEl2.classList.add("name")
        let newLiText2 = document.createTextNode(newName);

        newLiEl2.appendChild(newLiText2);
        secondColEl.appendChild(newLiEl2);
    })

    console.log(nameArray);
}

function sortProg(schedules) {
    let progArray = [];

    schedules.forEach(sortProg => {
        progArray.push(sortProg.progression);
    })
    progArray.sort();

    document.getElementById('thirdCol').innerHTML = '';

    progArray.forEach(newProg => {
        const thirdColEl = document.getElementById('thirdCol');

        let newLiEl3 = document.createElement("li");
        newLiEl3.classList.add("prog")
        let newLiText3 = document.createTextNode(newProg);

        newLiEl3.appendChild(newLiText3);
        thirdColEl.appendChild(newLiEl3);
    })

    console.log(progArray);
}
*/
function sortCode(schedules) {
    // Sort the schedules array by code
    schedules.sort((a, b) => a.code.localeCompare(b.code));
    renderColumns(schedules);
}

function sortName(schedules) {
    // Sort the schedules array by coursename
    schedules.sort((a, b) => a.coursename.localeCompare(b.coursename));
    renderColumns(schedules);
}

function sortProg(schedules) {
    // Sort the schedules array by progression
    schedules.sort((a, b) => a.progression.localeCompare(b.progression));
    renderColumns(schedules);
}

function renderColumns(schedules) {
    // Clear existing content
    document.getElementById('firstCol').innerHTML = '';
    document.getElementById('secondCol').innerHTML = '';
    document.getElementById('thirdCol').innerHTML = '';

    // Re-render all items based on the sorted schedules
    schedules.forEach(schedule => {
        const firstColEl = document.getElementById('firstCol');
        let newLiEl1 = document.createElement("li");
        newLiEl1.classList.add("code");
        let newLiText1 = document.createTextNode(schedule.code);
        newLiEl1.appendChild(newLiText1);
        firstColEl.appendChild(newLiEl1);

        const secondColEl = document.getElementById('secondCol');
        let newLiEl2 = document.createElement("li");
        newLiEl2.classList.add("name");
        let newLiText2 = document.createTextNode(schedule.coursename);
        newLiEl2.appendChild(newLiText2);
        secondColEl.appendChild(newLiEl2);

        const thirdColEl = document.getElementById('thirdCol');
        let newLiEl3 = document.createElement("li");
        newLiEl3.classList.add("prog");
        let newLiText3 = document.createTextNode(schedule.progression);
        newLiEl3.appendChild(newLiText3);
        thirdColEl.appendChild(newLiEl3);
    });
}



async function filterLiItems(searchTerm) {
    const courseCodes = document.querySelectorAll('.code');
    const courseNames = document.querySelectorAll('.name');
    const courseProgs = document.querySelectorAll('.prog');

    courseCodes.forEach((codeEl, index) => {
        const nameEl = courseNames[index];
        const progEl = courseProgs[index];

        // Check if any of the texts include the search term
        const codeText = codeEl.textContent.toLowerCase();
        const nameText = nameEl.textContent.toLowerCase();
        const progText = progEl.textContent.toLowerCase();

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
