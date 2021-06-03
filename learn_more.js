// Goal: Provide a function to fill learnmore.html
// allows us to use firebase
let firebase = require(`./netlify/functions/firebase`)

exports.handler = async function(event) {

  // get the single querystring parameter for listing id and store in memory
  let idparam = event.queryStringParameters.listingId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  //get the listing with the relevent ID from the listings colelction
  let listingData = await db.collection('listings').doc(idparam).get()
  
  //set all of the values for use on learnmore.html
  let returnValue = {
    id: listingData.id,
    address: listingData.address,
    capRate: listingData.capRate,
    capitalAskAmount: listingData.capitalAskAmount,
    communityOwnership: listingData.communityOwnership,
    description: listingData.description,
    expectedMonthlyRent: listingData.expectedMonthlyRent,
    holdingTimeYears: listingData.holdingTimeYears,
    propertyValue: listingData.propertyValue,
    title: listingData.title,
    subtitle: listingData.subtitle,
    imageUrl: listingData.imageUrl,
  }

  console.log(returnValue)

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
