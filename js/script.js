// Assignment Code
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  // passwordText.value = password;
}

function generatePassword() {
  // Set All Character Arrays
  // Letters
  var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  // Special Chars
  var specChar = ["!","#","%","&","*","?",";","<","=","@","^","|"]
  // Numbers
  var numList = [0,1,2,3,4,5,6,7,8,9]
  // various Char types (numbers hard coded) others potential added later
  var charType = ["someNumber"]
  // placeholder array for the password to be created
  var workingPassword = []
  // /get form data from page for the length of the PW
  var pwLength = document.querySelector("#pwLength").value

    // set intial status bar and message
  updateStatus("Getting started on your new password")
  updateStatusBar(1 + "%")
  // show progressbar
  $("#progressBarContainer").css("background-color", "#7ff03e44")
  
  // ******vaildation step 1 of 4 - is the length valid?**********
  // first make sure the length is a number and not less then 4
  if (Number(pwLength) == 0) {
    // tell user that's not a number
    updateStatus("That's not a valid number.")
    // stop the routine
    return
  } else if (pwLength < 6) {
    // tell user it's too short
    updateStatus("That password is too short!")
    // stop the routine
    return
  }else{
    // nothing, all is well  ***// update the status and progress bar
    updateStatus("Length, checks out. . .")
    updateStatusBar(15 + "%")//get form info
  }
  
  // now gather other user entries from the DOM to store as boolean var(s)
  // Uppercase y/n
  var pwContainsUpperCase = document.querySelector("#includeUpperC").checked
  // Lowercase y/n
  var pwContainsLowerCase = document.querySelector("#includeLowerC").checked
  // Spec Char y/n
  var pwContainsSpecialChar = document.querySelector("#includeSpecialC").checked
  // update the status's
  updateStatusBar(25 + "%")
  updateStatus("Validating your configuration")


     // update the status and progress bar
    updateStatus("Checking selections")
    updateStatusBar(5 + "%")//get form info

  // uppercase check
  if (pwContainsUpperCase == false) {
    // update status
    updateStatus("this password won't contain uppercase letters")
  } else {
    // this password will contain uppercase letters
    // add uppercase to the list of possible  Chars
    charType.push("someUpper")
  }

  // lowercase check
  if (pwContainsLowerCase == false) {
    console.log("this password won't contain lowercase letters")
  } else {
    // console.log("this password will contain lowercase letters")
    charType.push("someLower")
  }
  // spec char check
  if (pwContainsSpecialChar == false) {
    console.log("this password won't contain special characters")
  } else {
    // console.log("this password will contain special characters")
    charType.push("someSpecial")
  }
   // update the status and progress bar
  updateStatus("Selections confirmed")
  updateStatusBar(40 + "%")
      // loop for length of password for each character
      for (i = 0; i < pwLength; i++) {
        // pick a random char type
        currentChar = charType[Math.floor(Math.random()*charType.length)]
        // if it's a number - pick a random number from 0 to 9
        if (currentChar == "someNumber"){
          // pick random number
          currentChar = numList[Math.floor(Math.random()*numList.length)]
        } 
        // if it's to contain uppercase, pick random letter (then make upperc)
        else if (currentChar == "someUpper" && pwContainsUpperCase == true) {
          currentChar = letters[Math.floor(Math.random()*letters.length)].toUpperCase()
        } // if it's to contain lowercase, pick random letter
        else if (currentChar == "someLower" && pwContainsLowerCase == true) {
          currentChar = letters[Math.floor(Math.random()*letters.length)].toLowerCase()
        }// if it's to contain spec chars, pick random spec char
        else if (currentChar == "someSpecial" && pwContainsSpecialChar == true) {
          currentChar = specChar[Math.floor(Math.random()*specChar.length)]
        }

        // add current char to working password Array
        workingPassword.push(currentChar);
      }
        
        // console.log("so far the pw is " + workingPassword)
        updateStatus("Building you a new password")
        // update prog bar to 60%
        updateStatusBar( 60 + "%")
      
      updateStatus("Almost done. . . ")
      // produce the password join the array that's been build
      var thePassword = workingPassword.join("")
      
      // more validation steps next
      // counters for each potential char type
      var totalUpper = 0
      var totalLower = 0
      var totalSpecl = 0
      // update prog bar to 70%
      updateStatusBar( 70 + "%")

      // loop for length of PW
      for (i = 0; i < pwLength; i++) {
        var charBeingChecked = thePassword.charAt(i)
        
        // letters check (loop for each alpha letter)
        for (j = 0; j < letters.length; j++) {
          
          if (charBeingChecked.includes(letters[j]) == false) {
            // console.log("this char is not a lowercase letter")
            
          } else {
            // console.log("there is a lowercase letter in the password") add to count
            totalLower++
          }
          
          if (charBeingChecked.includes(letters[j].toUpperCase()) == false) {
            // console.log("this char is not an uppercase letter")
          } else {
            // console.log("there is a uppercase letter in the password!") add to count
            totalUpper++
          } 
        }
  
        // special character check
        for (k = 0; k < specChar.length; k++) {
          if (charBeingChecked.includes(specChar[k]) == false) {
            // console.log("this is not a special char")
          } else{
            // console.log("this is a specail char")
            // add to count
            totalSpecl++
          }
        }         
      }    
                    updateStatus("Everything is looking good!")
                      // update prog bar to 80%
                      updateStatusBar( 80 + "%")
      // if any to be included selections equal true and total with count of 0
      // then re-run the generator ... just incase somehow math.ran betryed us....
      if (pwContainsUpperCase == true && totalUpper < 1 || pwContainsLowerCase == true && totalLower < 1 || pwContainsSpecialChar == true && totalSpecl < 1) {
          // generate a new PW (start over)
          generatePassword()
      } else {
        // do nothing as the password is decent
        // console.log("this password is type decent")
                        
        // update prog bar to 90%              
        updateStatusBar( 95 + "%")
        updateStatus("She's clean m8")
      }
      // update status msg and status bar
      updateStatus("Here you go")
      updateStatus("Your new password is: " + '<form><div class="form-row"><div class="col"><input type="text" id="password" class="form-control" value=' + thePassword + '></div><button onclick="copyToClip()" class="btn btn-primary ">Copy</button></div></div></form>')
      //
      updateStatusBar( 100 + "%")
}

// Functions below:
//called when you want to change the message displayed to the DOM
function updateStatus(msg) {
  // var currentStatusMsg = msg
  console.log(msg)
  document.getElementById("statusMessage").innerHTML = msg
}
// called to update the progress bar %
function updateStatusBar(newProgress) {
  // update the progress bar with correct percentage
  $(".progress-bar").css("width", newProgress);
  // log the current status to the console
  console.log(newProgress)
}

// copys the created password to clipboard
function copyToClip() {
  var copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");  
}