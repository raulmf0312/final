// standard event listener for Firebase auth... use instead of DOMContentLoaded
firebase.auth().onAuthStateChanged(async function(user) {

    // check to see if user is logged-in (i.e. user exists)
    if (user) {
      // write the user Object to the JavaScript console
      console.log(user)
  
      // Build the markup for the sign-out button and set the HTML in the header
      document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
  
      // get a reference to the sign out button
      let signOutButton = document.querySelector(`.sign-out`)
  
      // handle the sign out button click
      signOutButton.addEventListener(`click`, function(event) {
        // sign out of firebase authentication
        firebase.auth().signOut()
  
        // redirect to the home page
        document.location.href = `index.html`
      })

  
// OUR Team's code
  
      // get a reference to the "Submit" button
      let submitButton = document.querySelector(`#submitButton`)
  
      // handle the clicking of the "Post" button
      submitButton.addEventListener(`click`, async function(event) {
        // prevent the default behavior (submitting the form)
        event.preventDefault()
  
        
// get a reference and store each input as a variable in memory
        
        
        // get a reference to the input holding the listing title
        let titleInput = document.querySelector(`#title`)
        let title = titleInput.value
  

        // get a reference to the input holding the listing subtitle
        let subtitleInput = document.querySelector(`#subtitle`)
        let subtitle = subtitleInput.value
  
        // get a reference to the input holding the listing's image URl
        let imageUrlInput = document.querySelector(`#imageUrl`)
        let imageUrl = imageUrlInput.value
  
        // get a reference to the input holding the property address
        let addressInput = document.querySelector(`#address`)
        let address = addressInput.value
  
        // get a reference to the input holding the description of the property
        let propertyDescriptionInput = document.querySelector(`#propertyDescription`)
        let propertyDescription = propertyDescriptionInput.value
  
        // get a reference to the input holding the description of the landlord
        let landlordDescriptionInput = document.querySelector(`#landlordDescription`)
        let landlordDescription = landlordDescriptionInput.value
  
        // get a reference to the input holding how much money the landlord seeks to raise
        let capitalAskAmountInput = document.querySelector(`#capitalAskAmount`)
        let capitalAskAmount = capitalAskAmountInput.value
  
        // get a reference to the input holding the value of the property
        let propertyValueInput = document.querySelector(`#propertyValue`)
        let propertyValue = propertyValueInput.value
  
        // get a reference to the input holding the expected monthtly rent
        let holdingTimeYearsInput = document.querySelector(`#holdingTimeYears`)
        let holdingTimeYears = holdingTimeYearsInput.value

        // get a reference to the input holding the expected monthtly rent
        let expectedMonthlyRentInput = document.querySelector(`#expectedMonthlyRent`)
        let expectedMonthlyRent = expectedMonthlyRentInput.value


        // create the URL for our "create post" lambda function
        let url = `/.netlify/functions/create_New_Listing?fundraiserName=${user.displayName}&fundraiserId=${user.uid}&title=${title}&subtitle=${subtitle}&imageUrl=${imageUrl}&address=${address}&propertyDescription=${propertyDescription}&landlordDescription=${landlordDescription}&capitalAskAmount=${capitalAskAmount}&propertyValue=${propertyValue}&holdingTimeYears=${holdingTimeYears}&expectedMonthlyRent=${expectedMonthlyRent}`
  
        // fetch the URL, wait for the response, store the response in memory
        let response = await fetch(url)

        // refresh the page
        //location.reload()
      })
  // End of OUR Team's code

    } else {
      // user is not logged-in, so show login
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: `index.html` // where to go after we're done signing up/in
      }
  
      // Starts FirebaseUI Auth
      ui.start(`.sign-in-or-sign-out`, authUIConfig)
    }
  })