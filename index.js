firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    
    // write the user Object to the JavaScript console
    //console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-gray-500 underline sign-out">Sign Out</button>
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


    // create a "Submit a New Listing" button to connect to New_Listing.html
    let newListingButton = document.querySelector(`.newListing`)
    
    newListingButton.innerHTML = ` <button id="new-listing" class="m-4 py-2 px-4 rounded-md shadow-lg font-light text-gray-500 ring-1 font-serif ring-gray-600 ring-opacity-25 focus:outline-none"><a href="New_Listing.html">Submit a New Listing</a></button>`
    
    // create a "Submit a Review" button to connect to New_Listing.html
    
    // Build the URL for our listings API
    let url = `/.netlify/functions/listings`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Grab a reference to the element with class name "listings" in memory
    let listingDiv = document.querySelector(`.listings`)

    listingDiv.innerHTML = ``

    // Loop through the JSON data, for each Object representing a listing:
    for (let i=0; i < json.length; i++) {
          // Store each object ("listing") in memory
          let listing = json[i]
    
          // Create some markup using the listing data, insert into the "listings" element
          listingDiv.insertAdjacentHTML(`beforeend`, `
            <div class="mb-10 bg-gray-100 bg-opacity-75">
              <div class="pt-6 text-center">
                <span class="font-ultralight text-2xl text-gray-600 font-serif">${listing.title}</span>
              </div>
          
              <div class="m-8 flex justify-center">
                <img src="${listing.imageUrl}" class="shadow-xl text-center w-200 h=200">
              </div>
    
              <div class="m-4">

              <div class="text-center">
                <button id="learn-more-about-${listing.id}" class="text-xl animate-bounce text-gray-600 font-serif">Learn more about ${listing.address}!</button>
               </div>

              </div>
              
            </div>
            `)
    
    // Create an empty string for the reviews
    let reviews = ``

    // Loop through the post's reviews
    for (let i=0; i < listing.reviews.length; i++) {
      // Create a variable for each review
      let review = listing.reviews[i]

      // Add HTML markup for the review to the review string
      reviews = reviews + `<div><strong>${review.userName}: </strong> ${review.body} (${review.rating} out of 5 stars)</div>`
    }


    // get a reference to the "Learn More" button        
    let learnMoreButton = document.querySelector(`#learn-more-about-${listing.id}`)

    // handle the clicking of the "Learn More" button
    learnMoreButton.addEventListener(`click`, async function(event) {
      event.preventDefault()

      // build the HTML for the reutn to homepage as well as all the details appearing for the learn more button
      listingDiv.innerHTML = `
      <div class="text-center font-serif underline text-gray-500"><a href="index.html">Back to Homepage!</a></div>
      
      <div class="p-4 m-4 bg-gray-100 bg-opacity-75 font-serif font-light text-gray-600 text-center">
        <div class="text-center">
          <span class="text-4xl">${listing.title}</span>
        </div>

        <div class="text-center md:mx-0 mx-4 mt-4">
          <span class="text-xl italic">${listing.subtitle}</span>
        </div>
    
        <div class="my-8 flex justify-center">
          <img src="${listing.imageUrl}" class="w-200 h-200">
        </div>

        <div class="md:mx-0 mx-4 mt-4">
          <span class="text-l font-bold">Address:</span>
          <span class="text-l italic">${listing.address}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-4">
          <span class="text-l font-bold">Holding Time Years:</span>
          <span class="text-l italic">${listing.holdingTimeYears}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-4">
          <span class="text-l font-bold">Current Property Value:</span>
          <span class="text-l italic">${listing.propertyValue}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-4">
          <span class="text-l font-bold">Expected Monthly Rent:</span>
          <span class="text-l italic">${listing.expectedMonthlyRent}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-4">
          <span class="text-l font-bold">Property Description:</span>
          <span class="text-l italic">${listing.propertyDescription}</span>
        </div>

        <button id="fund-now" class="m-4 py-4 px-8 rounded-md shadow-lg font-light text-green-500 ring-1 font-serif ring-gray-600 ring-opacity-25 focus:outline-none">Fund now!</a></button>

        <div class=" mx-4 mt-8 bg-gray-300">

          <div class="md:mx-0 mx-4 mt-16 pt-2">
            <span class="text-l font-bold">Fundraiser Name:</span>
            <span class="text-l italic">${listing.fundraiserName}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-4 pb-2">
            <span class="text-l font-bold">Fundraiser Description:</span>
            <span class="text-l italic">${listing.landlordDescription}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-4 pb-2">
          <span class="font-bold text-xl pb-3">Reviews:</span>
          ${reviews}

          <form class="mt-4">
            <input type="text" id="review-body-${listing.fundraiserId}" class=" mr-2 rounded-lg border px-2 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Add a review...">
            <input type="number" id="review-rating-${listing.fundraiserId}" class="mr-2 rounded-lg border px-2 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Out of 5 stars">
            <button id="listing-review-button-${listing.fundraiserId}" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none">Post</button>
          </form>

        </div>

        </div>

      </div>
    `
      
      // get a reference to the newly created post review button
      let listingReviewButton = document.querySelector(`#listing-review-button-${listing.fundraiserId}`)

      // event listener for the listing review button
      listingReviewButton.addEventListener(`click`, async function(event) {
        // ignore the default behavior
        event.preventDefault()

        // get a reference to the newly created review input
        let reviewBody = document.querySelector(`#review-body-${listing.fundraiserId}`).value

        // get a reference to the newly created review input
        let reviewRating = document.querySelector(`#review-rating-${listing.fundraiserId}`).value

        // Build the URL for our listings API
        let url = `/.netlify/functions/create_review?fundraiserId=${listing.fundraiserId}&userName=${user.displayName}&body=${reviewBody}&rating=${reviewRating}&userId=${user.uid}`

        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
        
        // refresh the page
        location.reload()
      })

    })

    
    
  }
    
//})

  

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
