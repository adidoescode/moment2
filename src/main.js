// Moment 2, Löst av Adam Sjögren

"use strict";

// DOM 


// Starta javascripten när hemsidan laddas in

async function init() {
    try {
        const schedule = await getSchedule();
        handleSchedule(schedule);
    }
    catch (error) {
        console.error('Error with initializing:', error);
    }
}
window.onload = init;

async function getSchedule() {
    try {
        const response = await fetch('ramschema_ht23.json');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error with fetch:', error);
        throw error;
    }
}

async function handleSchedule(schedule) {
    console.log(schedule); //Test

    schedule.forEach(item => {
        console.log(item);
    });
}
