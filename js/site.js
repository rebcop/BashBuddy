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
}

function getEvents() {
    // TODO: get events from local storage

    return events;
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
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);
        
        // append the row to the <tbody>
        eventTable.appendChild(eventRow);

    }

}

// calculate the sum of attendance and return it
function sumAttendance(events) {
    let sum = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    return sum;
}

// Calculate the avg attendance and return it
function avgAttendance(events) {

    let sum = 0;
    let avg = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    avg = sum / events.length;

    return avg;
}


function displayStats(events) {
    // calculating and displaying the total attendance
    let total = sumAttendance(events);
    document.getElementById('total-attendance').innerText = total.toLocaleString();

    // calculating and displaying the avg attendance
    let avg = avgAttendance(events);
    document.getElementById('avg-attendance').innerText = avg;

    // calculating and displaying and displaying the min attendance
    // calculating and displaying and displaying the max attendance
}