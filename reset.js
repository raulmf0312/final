// Goal: Adds data to a Firestore database with listings – deletes existing!

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_posts
exports.handler = async function(event) {
  let db = firebase.firestore()
  
  // query for all existing posts, wait for the response, store in memory
  let listingsQuery = await db.collection('listings').get()

  // get the docs from the query
  let listings = listingsQuery.docs

  // loop through all the docs
  for (let i=0; i < listings.length; i++) {
    // delete the doc
    db.collection('listings').doc(listings[i].id).delete()
  }

  // query for all existing fundraisers, wait for the response, store in memory
  let fundraisersQuery = await db.collection('fundraiser').get()

  // get the docs from the query
  let fundraiser = fundraisersQuery.docs

  // loop through all the docs
  for (let i=0; i < fundraiser.length; i++) {
    // delete the doc
    db.collection('fundraiser').doc(fundraiser[i].id).delete()
  }

  // query for all existing fundraiser reviews, wait for the response, store in memory
  let fundraiserReviewsQuery = await db.collection('fundraiserReviews').get()

  // get the docs from the query
  let fundraiserReviews = fundraiserReviewsQuery.docs

  // loop through all the docs
  for (let i=0; i < fundraiserReviews.length; i++) {
    // delete the doc
    db.collection('fundraiserReviews').doc(fundraiserReviews[i].id).delete()
  }

  // Create new listings
  let listing1 = await db.collection('listings').add({ 
    title: `Perfect investing opportunity! Luxury apartment in Chicago at discounted price.`,
    subtitle: `Experienced landlord with over 5 properties under management looking for coinvestors.`,
    imageURL: ``,
    address: `3900  N Lake Shore Dr, Apt 3A, Chicago IL, 60613`,
    description: `2 bedrooms, 2 bathrooms, 1,250 sqft. Multiple ammenities.`,
    capitalAskAmount: 100000.00,
    capitalRaisedAmount: 90000.00,
    communityOwnership: 0.40,
    propertyValue: 250000.00,
    capRate: 0.07,
    holdingTimeYears: 5,
    expectedMonthlyRent: 1460.00,
    backers: 98, // will probably need to be it's own collection (similar to likes)
    // equityHolderName: `Jake Green`,
    created: firebase.firestore.FieldValue.serverTimestamp() 
  })
  // Create new fundraisers
  let fundraiser1 = await db.collection('fundraisers').add({ 
    fundraiserName: `Jake Green`,
    fundraiserId: ``, // we may need to create these beforehand. Not sure we can generate random values.
    created: firebase.firestore.FieldValue.serverTimestamp() 
  })

  // Create new reviews for fundraisers
  let fundraiserReview1 = await db.collection('fundraiserReviews').add({ 
    fundraiserId: `Jake Green`,
    body: `Great landlord`,
    rating: 5,
    created: firebase.firestore.FieldValue.serverTimestamp() 
  })


//   // Create new fundraiser
//   let comment1 = await db.collection('comments').add({ userName: `Anonymous User`, postId: post1.id, body: `#tacotuesday`, created: firebase.firestore.FieldValue.serverTimestamp() })
//   let comment2 = await db.collection('comments').add({ userName: `Anonymous User`, postId: post1.id, body: `This looks yummy!`, created: firebase.firestore.FieldValue.serverTimestamp() })
//   let comment3 = await db.collection('comments').add({ userName: `Anonymous User`, postId: post2.id, body: `Tacos al pastor`, created: firebase.firestore.FieldValue.serverTimestamp() })
//   let comment4 = await db.collection('comments').add({ userName: `Anonymous User`, postId: post3.id, body: `Tacos, obviously 🙄`, created: firebase.firestore.FieldValue.serverTimestamp() })

  return {
    statusCode: 200,
    body: `listings and comments created!`
  }
}