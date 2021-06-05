// Goal: Provide a function to return all listings and their reviews from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/listings
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all listings, wait for it to return, store in memory
  let listingsQuery = await db.collection(`listings`).orderBy(`created`, `desc`)
  .get()

  // retrieve the documents from the query
  let listings = listingsQuery.docs

  // loop through the listing documents
  for (let listingIndex=0; listingIndex < listings.length; listingIndex++) {
    // get the id from the document
    let listingId = listings[listingIndex].id

    // get the data from the document
    let listingData = listings[listingIndex].data()

    // perform a query to get the number of likes for this listing
    //let likesQuery = await db.collection(`likes`).where(`listingId`, `==`, listingId).get()

    // the number of likes is the number of documents returned
    //let numberOfLikes = likesQuery.size

    // create an Object to be added to the return value of our lambda
    let listingObject = {
      id: listingId,
      address: listingData.address,
      capRate: listingData.capRate,
      capitalAskAmount: listingData.capitalAskAmount,
      communityOwnership: listingData.communityOwnership,
      description: listingData.description,
      expectedMonthlyRent: listingData.expectedMonthlyRent,
      fundraiserName: listingData.fundraiserName,
      fundraiserId: listingData.fundraiserId,
      holdingTimeYears: listingData.holdingTimeYears,
      landlordDescription: listingData.landlordDescription,
      propertyDescription: listingData.propertyDescription,
      propertyValue: listingData.propertyValue,
      title: listingData.title,
      subtitle: listingData.subtitle,
      imageUrl: listingData.imageUrl,
      reviews: []
    }

    console.log(listingObject.fundraiserId)

    // get the reviews for this listing, wait for it to return, store in memory
    let reviewsQuery = await db.collection(`fundraiserReviews`).where(`fundraiserId`, `==`, listingObject.fundraiserId).get()

    // get the documents from the query
    let reviews = reviewsQuery.docs

    // loop through the review documents
    for (let reviewIndex=0; reviewIndex < reviews.length; reviewIndex++) {

       // get the id from the review document
       let reviewId = reviews[reviewIndex].id

       // get the data from the review document
       let reviewData = reviews[reviewIndex].data()

       // create an Object to be added to the reviews Array of the listing
       let reviewObject = {
         id: reviewId,
         userName: reviewData.userName,
         body: reviewData.body,
         rating: reviewData.rating
       }

       // add the Object to the listing
       listingObject.reviews.push(reviewObject)
     }

    // add the Object to the return value
    returnValue.push(listingObject)
  }

  console.log(returnValue)

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}