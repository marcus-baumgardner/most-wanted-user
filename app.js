"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  let promptTrait;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      promptTrait = prompt("What trait do you know of the person? 'gender', 'eyeColor', 'dob', or 'occupation");
      searchResults = searchByTrait(people, promptTrait);
      displayPeople(searchResults);
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
  let id;
  switch(displayOption){
    case "info":
    alert(person[0].firstName + " " + person[0].lastName +"'s info: \n" + displayInfo(person));
    break;
    case "family":
      id = person[0].id;
    alert(displayInfo(findSpouse(id, people)));
    break;
    case "descendants":
      id = person[0].id;
      let count = 0;
      console.log(findDescendants(id, people, count));//(Jack Pafoy) (Annie Pafoy[13], Dave Pafoy [14], amii [15])

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

/* STILL NEEDS A LOT OF WORK
function findDescendants (id, people, count){
  let descendantsArray = [];
// need another way to re-define people.parents.includes(id)
  

  if(people[].parents.includes(id) === false && i === people.length -1 ){
      return descendantsArray;
    }
    else{
        //descendantsArray[count] = people.filter(function(person){ //got rid of descendantsArray[count] = at beginning of statement;
        for(let j = 0; j < people.length; j++){
        
          if(people[j].parents.includes(id)){
            descendantsArray.push(people[j]) ;
            count++;
            people.splice(j, 1)
            
            
            findDescendants(id, people, count);
          }
      }
    
    }

} */

function findSpouse (id, people){

  let foundPerson = people.filter(function(person){
    if(person.currentSpouse === id){
    return true
    }
    else{
      return false
    }
  });
  return foundPerson;
}

function displayInfo(person){
    let info = ("First Name: " + person[0].firstName + "\n" + "Last Name: " + person[0].lastName + "\n" + "Gender: " + person[0].gender + "\n" + "Date of Birtn: " + person[0].dob + "\n" + "Height: " + person[0].height + "\n" + "Weight: " + person[0].weight + "\n" + "Occupation: " + person[0].occupation);
  return info; 
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

function searchByTrait(people, trait){
  let search = promptFor("What is the person's " + trait, chars);

  let foundPerson = people.filter(function(person){
    if(person[trait] == search){
      return true;
    }
    else{
      return false;
    }
  });
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
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
