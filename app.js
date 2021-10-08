"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/




// ! search by traits

const searchByTraits = (people) => {

  let search = promptFor(`What would you like to search by?\n First Name:\n Last Name:\n Gender:\n Age:\n Height:\n Weight:\n Eye Color:\n Occupation:\n`, chars).toLowerCase()


  switch (search) {
    case 'first name':
      searchByFirstName(people)
      break;
    case 'last name':
      searchByLastName(people)
      break;
      

  }


  // {
  //   "id": 272822514,
  //   "firstName": "Billy",
  //   "lastName": "Bob",
  //   "gender": "male",
  //   "dob": "1/18/1949",
  //   "height": 71,
  //   "weight": 175,
  //   "eyeColor": "brown",
  //   "occupation": "programmer",
  //   "parents": [],
  //   "currentSpouse": 401222887
  // },

}





// ! filter functions 

const searchByFirstName = (people) => {
  let firstName = prompt("What is their first name?").toLowerCase()
  people.filter((person) => {
    return person.fistName === firstName
  })
}

const searchByLastName = (people) => {
  alert('searching by first name')
}











// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchByTraits()
      break;
      default:
    app(people); // restart app
      break;
  }


  













  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}




// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}







// ! function that displays the found person's information
function displayPerson(person){
  let heightInches = person[0].height
  let heightFeet = Math.round((heightInches / 12) * 10) / 10
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Height: " + heightFeet + "ft" + "\n";
  personInfo += "Weight: " + person[0].weight + "lbs" + "\n";
  personInfo += "Eye color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation;

  alert(personInfo);
}



























// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
