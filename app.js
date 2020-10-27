"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", chars,['yes','no']).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = traits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function traits(people){
  let traits = ["gender","eye color","dob","occupation","height","weight"];
  let moreTraits = "yes";
  let searchResults = people;
  while(moreTraits == "yes"){
    let promptTrait = promptFor("What trait do you know of the person? Enter one of the following: " + traits.join(", "),chars,traits).toLowerCase();
    searchResults = searchByTrait(searchResults, promptTrait);
    displayPeople(searchResults);
    moreTraits = promptFor("Do you know any other traits? Enter 'yes' or 'no'", chars,['yes','no']).toLowerCase();
    let indexTrait = traits.indexOf(promptTrait);
    traits.splice(indexTrait, 1);
  }
  
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
      let descendantsArray = [""];
      descendantsArray = findDescendants(id, people, count, descendantsArray);//(Jack Pafoy) (Annie Pafoy[13], Dave Pafoy [14], amii [15])
      console.log(descendantsArray[0])
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

//STILL NEEDS A LOT OF WORK
function findDescendants (id, people, count, descendantsArray){
// need another way to re-define people.parents.includes(id)
  
for(let i = 0; i<people.length; i++){
  if(people[i].parents.includes(id) === false && i === people.length){
      return descendantsArray;
    }
    else{
        //descendantsArray[count] = people.filter(function(person){ //got rid of descendantsArray[count] = at beginning of statement;
        //for(let j = 0; j < people.length; j++){
        
          if(people[i].parents.includes(id)){
            descendantsArray[count] = people[i];
            count++;
            people.splice(i, 1)
            console.log(descendantsArray[count-1]);
            
            findDescendants(id, people, count, descendantsArray);
          }
      //}
    
    }
  }
} 

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
  let foundPerson;
  do{
    let firstName = prompt("What is the person's first name?").toLowerCase();
    let lastName = prompt("What is the person's last name?").toLowerCase();

    foundPerson = people.filter(function(person){
      if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
        return true;
      }
      else{
        return false;
      }
    });
  }while(foundPerson.length==0);
  
  return foundPerson;
}

function searchByTrait(people, trait){
  let foundPerson;
  do{
    let search = prompt("What is the person's " + trait).toLowerCase;
    if(search == "eye color"){
      search = "eyeColor";
    }
    foundPerson = people.filter(function(person){
      if(person[trait] == search){
        return true;
      }
      else{
        return false;
      }
    });
  }while(foundPerson.length==0);
  
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
function promptFor(question, valid, options){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response,options));
  return response;
}

function promptDetails(question, options){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response,options));
  return response;
}


// helper function to pass in as default promptFor validation
function chars(input,options){ 
  let inputLow = input.toLowerCase();
  
  if(options.includes(inputLow)){
    return inputLow;
  }
}
//'info', 'family', or 'descendants'
//"gender","eyeColor","dob","occupation","height","weight"