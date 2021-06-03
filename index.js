firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    
    // write the user Object to the JavaScript console
    //console.log(user)

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

    // Build the URL for our posts API
    let url = `/.netlify/functions/listings`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Grab a reference to the element with class name "listings" in memory
    let listingDiv = document.querySelector(`.listings`)

    // Loop through the JSON data, for each Object representing a listing:
    for (let i=0; i < json.length; i++) {
          // Store each object ("listing") in memory
          let listing = json[i]

          // Store the listing's ID in memory
          // let listingId = listing.id
          // let listingTitle = listing.title
          // let listingImage = listing.imageUrl
          // let listingAddress = listing.address
          // let listingDescription = listing.description
          // let listingAsk = listing.capitalAskAmount
          // let listingRaised = listing.capitalRaisedAmount
          // let listingComOwn = listing.communityOwnership
          // let listingValue = listing.propertyValue
          // let listingRate = listing.capRate
          // let listingHoldTime = listing.holdingTimeYears  
          // let listingRent = listing.expectedMonthlyRent
          // let listingBackers = listing.backers
    
          // Create some markup using the listing data, insert into the "listings" element
          listingDiv.insertAdjacentHTML(`beforeend`, `
            <div class="md:mt-16 mt-8">
              <div class="md:mx-0 mx-4 mt-8">
                <span class="font-bold text-xl">${listing.title}</span>
              </div>
          
              <div class="my-8">
                <img src="${listing.imageUrl}" class="w-full">
              </div>
    
              <div class="text-3xl md:mx-0 mx-4 mb-4">

              <div class="text-2xl md:mx-0 mx-4 mb-4">
                <button id="learn-more-about-${listing.id}">Learn more about ${listing.address}!</button>
               </div>

              </div>
              
            </div>
            `)
    
    // get a reference to the "Learn More" button        
    let learnMoreButton = document.querySelector(`#learn-more-about-${listing.id}`)

    // handle the clicking of the "Learn More" button
    learnMoreButton.addEventListener(`click`, async function(event) {
      event.preventDefault()
      
      //switch the user to the learn more page
      document.location.href = `learnmore.html?listingId=${listing.id}`

      //create the URL for our learn_more lambda function and give it the listing.id parameter from the button
      let url = `/.netlify/functions/learn_more?listingId=${listing.id}`

      // fetch the URL for our learn_more lambda function
      response = await fetch(url)

      //log the response to see what we are being returned
      console.log(response)

      //still need to set innerHTML of an element on learnmore.html so that the page has content
      //this will have to wait until the response is ironed out
      })

    }

  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
