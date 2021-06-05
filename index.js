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


    // create a "Submit a New Listing" button to connect to New_Listing.html
    let newListingButton = document.querySelector(`.newListing`)
    
    newListingButton.innerHTML = ` <button id="new-listing" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none"><a href="New_Listing.html">Submit a New Listing</a></button>`
    
    // create a "Submit a Review" button to connect to New_Listing.html
    let newReviewButton = document.querySelector(`.newReview`)
    
    newReviewButton.innerHTML = ` <button id="new-review" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none"><a href="New_Review.html">Submit a New Review</a></button>`



    //let seeAllButton = document.querySelector(`.seeAll`)
    
    //seeAllButton.innerHTML = ` <button id="see-all" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none">See All Listings</button>`

    // handle the clicking of the "Learn More" button
    //seeAllButton.addEventListener(`click`, async function(event) {
    //  event.preventDefault()
    
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

    listingDiv.innerHTML = ``

    // Loop through the JSON data, for each Object representing a listing:
    for (let i=0; i < json.length; i++) {
          // Store each object ("listing") in memory
          let listing = json[i]
    
          // Create some markup using the listing data, insert into the "listings" element
          listingDiv.insertAdjacentHTML(`beforeend`, `
            <div class="m-8">
              <div class="text-center">
                <span class="text-5x1 font-serif italic text-gray-600">${listing.title}</span>
              </div>
          
              <div class="ml-16 mr-16 w-100 h-100">
                <img src="${listing.imageUrl}" class="w-full">
              </div>
    
              <div class="text-3xl md:mx-0 mx-4 mb-4">

              <div class="text-center">
                <button id="learn-more-about-${listing.id}">Learn more about ${listing.address}!</button>
               </div>

              </div>
              
            </div>
            `)
    
    // Create an empty string for the comments
    let reviews = ``

    // Loop through the post's comments
    for (let i=0; i < listing.reviews.length; i++) {
      // Create a variable for each comment
      let review = listing.reviews[i]

      // Add HTML markup for the comment to the comment string
      reviews = reviews + `<div><strong>${review.userName}: </strong> ${review.body} (${review.rating} out of 5 stars)</div>`
    }


    // get a reference to the "Learn More" button        
    let learnMoreButton = document.querySelector(`#learn-more-about-${listing.id}`)

    // handle the clicking of the "Learn More" button
    learnMoreButton.addEventListener(`click`, async function(event) {
      event.preventDefault()

      // build the HTML for the reutn to homepage as well as all the details appearing for the learn more button
      listingDiv.innerHTML = `
      <div class="md:mt-16 mt-8">

      <div class="underline font-bold text-blue-700"><a href="index.html">Back to Homepage!</a></div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">${listing.title}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">${listing.subtitle}</span>
        </div>
    
        <div class="my-8">
          <img src="${listing.imageUrl}" class="w-full">
        </div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">Address: ${listing.address}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">Holding Time Years: ${listing.holdingTimeYears}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">Current Property Value: ${listing.propertyValue}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">Expected Monthly Rent: ${listing.expectedMonthlyRent}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8">
        <span class="font-bold text-xl">Property Description: ${listing.propertyDescription}</span>
        </div>

        <div class="md:mx-0 mx-4 mt-8 bg-gray-300">

          <div class="md:mx-0 mx-4 mt-8 pt-2">
          <span class="font-bold text-xl">Fundraiser Name: ${listing.fundraiserName}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8 pb-2">
          <span class="font-bold text-xl">Fundraiser Description: ${listing.landlordDescription}</span>
          </div>

          <div class="md:mx-0 mx-4 mt-8 pb-2">
          <span class="font-bold text-2xl pb-3">Reviews:</span>
          ${reviews}
          </div>

        </div>

      </div>
    `
      
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
