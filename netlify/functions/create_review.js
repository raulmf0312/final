// Goal: Provide a function to create a new like in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_review?fundraiserId=xxxxxxxxx&userName=Brian&body=Great!&rating=5&userId=xxxxxxxx
exports.handler = async function(event) {
  // get the five querystring parameters and store in memory
  let fundraiserId = event.queryStringParameters.fundraiserId
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body
  let rating = event.queryStringParameters.rating
  let userId = event.queryStringParameters.userId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // query for an existing like, wait for it to return, store the query in memory
  let reviewsQuery = await db.collection('fundraiserReviews')
                           .where('fundraiserId', '==', fundraiserId)
                           .where('userId', '==', userId)
                           .get()

  // get the current number of likes for the post/user combination                           
  let numberOfReviews = reviewsQuery.size

  // if there isn't already a like for the post/user combination, create one
  if (numberOfReviews == 0 && fundraiserId!==userId) {
    await db.collection('fundraiserReviews').add({
      fundraiserId: fundraiserId,
      userName: userName,
      body: body,
      rating: rating,
      userId: userId,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
  } 

  return {
    statusCode: 200
  }
}