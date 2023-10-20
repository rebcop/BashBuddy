const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// Entrypoint of application, runs when the page loads
function buildDropDown() {

    // get all the events that we know about
    let currentEvents = getEvents();

    // get a list of unique city names, using lambda expression
    // take this array of objects, .map makes new array with just 
    // value of city in each one, for each event in the array 
    // take out the city property for just that event
    let eventCities = currentEvents.map(event => event.city);

    // Class constructor, take array of event cities which has dups and store only unique values as a set
    let uniqueCities = new Set(eventCities);

    // spread operator [...], takes the set and spreads it out into an array with 'All' added at index 0
    let dropdownChoices = ['All', ...uniqueCities];

    // Get template for dropdown before looping over each item
    const dropdownTemplate = document.getElementById('dropdown-item-template');

    const dropdownMenu = document.getElementById('city-dropdown');

    // Clear out what's already in the menu before adding
    dropdownMenu.innerHTML = '';

    // for each of those city names:
    for ( let i=0; i < dropdownChoices.length; i++) {

        let cityName = dropdownChoices[i];

    //  make a dropdown item HTML element
        let dropdownItem = dropdownTemplate.content.cloneNode(true);
        dropdownItem.querySelector('a').innerText = cityName;
    
    //  add that element to the dropdown menu
        dropdownMenu.appendChild(dropdownItem);

    }
    
    displayEvents(currentEvents);

    displayStats(currentEvents);

    // reset table header name
    document.getElementById('stats-location').textContent = 'All';

}

function getEvents() {
    // get events from local storage
    let eventsJson = localStorage.getItem('rpc-events');

    // initialize stored events if someone hasn't been to the page before
    let storedEvents = events;

    // check if user has events in local storage
    if (eventsJson == null) {
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }

    return storedEvents;
}

// Save event added in modal to local storage
function saveEvents(events) {

    let eventsJson = JSON.stringify(events);

    // storaged in the browser for undetermined amount of time, can be seen and modified by anyone
    localStorage.setItem('rpc-events', eventsJson);

}

function displayEvents(events) {

    // get the table to put the events in
    const eventTable = document.getElementById('eventsTable');

    // clear the table
    eventTable.innerHTML = '';

    // loop through events
    for (let i = 0; i < events.length ; i++) {

        let event = events[i];

        // make a <tr></tr>
        let eventRow = document.createElement('tr');

        // make a <td> for each property
        // put the data into each <td> & append to row
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');

        let date = new Date(event.date);

        eventDate.innerText = date.toLocaleDateString();
        eventRow.appendChild(eventDate);
        
        // append the row to the <tbody>
        eventTable.appendChild(eventRow);

    }

}


function calculateStats(events) {

    let sum = 0;
    let min = events[0].attendance;
    let max = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;

        // Checks for the min attendance
        if ( event.attendance < min ) {
            min = event.attendance;
        }

        // Checks for the max attendance
        if ( event.attendance > max ) {
            max = event.attendance;
        }
    }

    let avg = sum / events.length;

    // Shorter way to type objects if the properties are the same as the variable values
    let stats = {
        sum,
        avg,
        min,
        max
    }

    return stats;
}

function displayStats(events) {

    let stats = calculateStats(events);
    // calculating and displaying the total attendance
    document.getElementById('total-attendance').innerText = stats.sum.toLocaleString();

    // calculating and displaying the avg attendance
    document.getElementById('avg-attendance').innerText = stats.avg.toLocaleString();

    // calculating and displaying and displaying the max attendance
    document.getElementById('max-attended').innerText = stats.max.toLocaleString();

    // // calculating and displaying and displaying the min attendance
    document.getElementById('min-attended').innerText = stats.min.toLocaleString();

}

function filterByCity(element) {

    // get all the events
    let cityName = element.textContent;

    // revise table header name
    document.getElementById('stats-location').textContent = cityName;

    // get all the events
    let allEvents = getEvents();

    // filter those events to just one city
    let filteredEvents = [];

    for (let i = 0; i < allEvents.length; i++) {
        let event = allEvents[i];

        if ( cityName == event.city || cityName == 'All' ) {
            filteredEvents.push(event);
        }

        // OTHER OPTION TYPE 1: Anonymous function with the filter method can be used to filter the array
        // filteredEvents = allEvents.filter(function(event) {
        //     if (event.city == cityName || cityName == 'All') {
        //         return event;
        //     } 
        // })

        // OTHER OPTION TYPE 2: Lambda expression with the filter method can be used to filter the array below is the same as the for loop 
        // if (cityName == 'All') {
        //     filteredEvents = allEvents;
        // } else {
        //     filteredEvents = allEvents.filter(event => event.city == cityName)
        // }
    
        // OTHER OPTION TYPE 3: Ternary statement
        // let filteredEvents = cityName = 'All' ? allEvents : allEvents.filter(e => e.city == cityName);
    }

    // call displayStats with the events for that city
    displayStats(filteredEvents);

    // call displayEvents with the events for that city
    displayEvents(filteredEvents);

}

function saveNewEvent() {

    // Get HTML form element
    let newEventForm = document.getElementById('newEventForm');
    let formData = new FormData(newEventForm);

    // Creates an object from the <input>s
    // value of the property is the value of the input and the property is the name
    // <input name="city" value="kernersville" />
    // let newEvent = { city: 'Kernersville}
    let newEvent = Object.fromEntries(formData.entries());

    // change text to number for attendance
    newEvent.attendance = parseInt(newEvent.attendance);

    // make sure all dates recieved are consistent in the way they're recieved
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    // Grab the list of events
    let allEvents = getEvents();

    // Add new event to list
    allEvents.push(newEvent);

    // Save updated list of events
    saveEvents(allEvents);

    // Resets the form so it goes back to how it was when page loaded
    newEventForm.reset();

    displayEvents(allEvents);

    // hide the Bootstrap Modal
    let modalElement = document.getElementById('addEventModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    // display all events
    buildDropDown();
}


// calculate the sum of attendance and return it
function sumAttendance(events) { // for reference
    let sum = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    return sum;
}

// Calculate the avg attendance and return it
function avgAttendance(events) { // for reference

    let sum = 0;
    let avg = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    avg = Math.round(sum / events.length);

    return avg;
}

// Alternative maxAttendance
// function maxAttendance(events) {

//     // Returns array of all attendance from event objects in event array
//     let attendanceArray = events.map(event => event.attendance );

//     // get max number and used spread operator to take array
//     let max = Math.max(...attendanceArray);

//     return max;

// }

// Calculate the max attendance and return it
function maxAttendance(events) { // for reference

    // Declare variable with 
    let max = 0;

    // Returns array of all attendance from event objects in event array
    for( let i = 0; i < events.length; i++) {

        if ( events[i].attendance > max ) {

            max = events[i].attendance;
        }
    }

    return max;

}

// Alternative minAttendance
// function minAttendance(events) {

//     // returns array of all attendance from event objects in event array
//     let attendanceArray = events.map(event => event.attendance );

//     // get min number and use spread operator to take array
//     let min = Math.min(...attendanceArray);

//     return min;
// }

// Calculate the max attendance and return it
function minAttendance(events) { // for reference

    // Declare variable with quantity from events to start with
    let min = events[0].attendance; // Could use infinity to initialize and have for loop start at 0

    // Returns array of all attendance from event objects in event array
    for( let i = 1; i < events.length; i++ ) {

        if ( events[i].attendance < min ) {

            min = events[i].attendance;
        }
    }

    return min;

}