// Write your JavaScript code here!
const randomPlanet = Math.floor((Math.random() * 6));
window.addEventListener("load", function () {
   
   let form = document.querySelector("form");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then( function(json) {
         const destination = json[randomPlanet];
         console.log(destination);
         let missionTarget = document.querySelector("#missionTarget")
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${destination.name}</li>
            <li>Diameter: ${destination.diameter}</li>
            <li>Star: ${destination.star}</li>
            <li>Distance from Earth: ${destination.distance}</li>
            <li>Number of Moons: ${destination.moons}</li>
         </ol>
         <img src="${destination.image}">
`
      });
   });
   form.addEventListener("submit", function(event) {
      event.preventDefault();
       let pilotName = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass= document.querySelector("input[name=cargoMass]");

      let launchStatus = document.querySelector("#launchStatus");
      let faultyItems = document.querySelector("#faultyItems");
      let fuelStatus = document.querySelector("#fuelStatus");
      let cargoStatus = document.querySelector("#cargoStatus");
      let pilotStatus = document.querySelector("#pilotStatus");
      let copilotStatus = document.querySelector("#copilotStatus");
      

     
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "" ){
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            alert("Fuel Level and Cargo Mass need to be a number!");
            event.preventDefault();
      } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
         alert("The pilot and copilot's name should not be a number...");
         event.preventDefault();
      } else {
            pilotStatus.innerHTML = `${pilotName.value} Ready.`
            copilotStatus.innerHTML = `${copilotName.value} Ready.` 
         if (Number(cargoMass.value) < 10000 && Number(fuelLevel.value) > 10000) {
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
            faultyItems.style.visibility = "visible";
         } else {
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
            if (Number(fuelLevel.value) < 10000) {
               fuelStatus.innerHTML = "Fuel Level Too Low for Launch";
            } 
            if (Number(cargoMass.value) > 10000){
               cargoStatus.innerHTML = "Cargo mass too high for launch";
            }
         } 
      }
    //this keeps it from resetting... why does it reset without?
   });

});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${destination.name}</li>
   <li>Diameter: ${destination.diameter}</li>
   <li>Star: ${destination.star}</li>
   <li>Distance from Earth: ${destination.distance}</li>
   <li>Number of Moons: ${destination.moons}</li>
</ol>
<img src="${destination.image}">
*/
