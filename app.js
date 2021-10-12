"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;

  // this is a comment
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      promptFor(
        "Would you like to search by a trait? Enter 'yes' or 'no' ",
        yesNo
      ).toLowerCase();
    case "yes":
      let searchOption = promptFor(
      "What traits would you like to search by? \n" +
        "Eye Color \n" +
        "Gender \n" +
        "DOB \n" +
        "Occupation \n" +
        "Age (not yet working)\n",
      chars
      );
      
      let filteredSearch = people;


      searchOption.split(' ');

      switch (searchOption) {
        case 'eye color':
          filteredSearch = searchByEyeColor(filteredSearch);
          break;
        case 'gender': 
          filteredSearch = searchByGender(filteredSearch);
          break;
        case 'dob':
          filteredSearch = searchByDob(filteredSearch);
          break;
        case 'occupation':
          filteredSearch = searchByOccupation(filteredSearch);
          break;
        case 'age':
          filteredSearch = searchByAge(filteredSearch); // not working yet
          break;
        default:
          app(people)

      }

      displayPeople(filteredSearch);
      return
    case "no":
      app(people);
      break;

    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  app(people)
}


// function to get the age from the DOB of the person being searched for
const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear();
  let daysUntilBirthday = today.getMonth() - birthDate.getMonth()
  if (daysUntilBirthday < 0 || daysUntilBirthday === 0 
    && today.getDate() < birthDate.getDate()) {
      age--
    }
    return age
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



// ! filter functions

// function searchByName(people){
//   let firstName = promptFor("What is the person's first name?", chars);
//   let lastName = promptFor("What is the person's last name?", chars);

//   let foundPerson = people.filter(function(person){
//     if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
//       return true;
//     }
//     else{
//       return false;
//     }
//   })
//   return foundPerson;
// }

const searchByName = (people) => {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  return people.filter((person) => {
    return person.firstName.toLowerCase() === firstName 
    && person.lastName.toLowerCase() === lastName
  })

}

const searchByEyeColor = (people) => {
  let eyeColor = promptFor("What is the person's eye color?", chars);

  return people.filter((person) => {
    return person.eyeColor === eyeColor
  })
}

const searchByGender = (people) => {
  let gender = promptFor('What is their gender?', chars);

  return people.filter((person) => {
    return person.gender === gender
  })
}

const searchByDob = (people) => {
  let dob = promptFor('What is their date of birth?' +'\n'+
  'Please enter in this format: MM/DD/YYYY', chars)

  return people.filter((person) => {
    return person.dob === dob
  })
} // 4/1/1947

const searchByOccupation = (people) => {
  let occupation = promptFor('What is their occupation?', chars)

  return people.filter((person) => {
    return person.occupation === occupation
  })
}






// TODO : fix this so it actually does something
const searchByAge = (people) => {
  let age = promptFor('How old are they?', chars)

  return people.filter((person) => {
    return getAge(person.age) === age
  })
}
// TODO plz fix me



const displayPeople = (people) => {
  alert(people.map( (person) => {
        return person.firstName + " " + person.lastName;
      }).join("\n")
  );
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





// ! find parents

const findParents = (person, people) => {
  alert('find parents')
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

