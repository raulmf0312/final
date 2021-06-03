// Goal: Provide a function to create a new lisiting in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// url = `/.netlify/functions/create_New_Lisitng?fundraiserName=${user.displayName}&fundraiserId=${user.uid}
//&subtitle=${subtitle}&imageUrl=${imageUrl}&address=${address}&propertyDescription=${propertyDescription}
//&landlordDescription=${landlordDescription}&capitalAskAmount=${capitalAskAmount}&propertyValue=${propertyValue}&=${holdingTimeYears}&expectedMonthlyRent=${expectedMonthlyRent}`
exports.handler = async function(event) {
console.log (event)
  // get all the querystring parameters and store in memory
  let fundraiserName= event.queryStringParameters.fundraiserName
  let fundraiserId= event.queryStringParameters.fundraiserId
  let title=event.queryStringParameters.title
  let subtitle= event.queryStringParameters.subtitle
  let imageUrl= event.queryStringParameters.imageUrl
  let address= event.queryStringParameters.address
  let propertyDescription= event.queryStringParameters.propertyDescription
  let landlordDescription= event.queryStringParameters.landlordDescription
  let capitalAskAmount= event.queryStringParameters.capitalAskAmount
  let propertyValue= event.queryStringParameters.propertyValue
  let holdingTimeYears= event.queryStringParameters.holdingTimeYears
  let expectedMonthlyRent= event.queryStringParameters.expectedMonthlyRent

//calculate the rest of the variables
let communityOwnership=capitalAskAmount/propertyValue
let capRate= expectedMonthlyRent*12/propertyValue

  // establish a connection to firebase in memory
 let db= firebase.firestore()

  // create a new post
await db.collection (`listings`).add({
  fundraiserName: fundraiserName,
  fundraiserId: fundraiserId,
  title: title,
  subtitle: subtitle,
  imageUrl: imageUrl, 
  address: address,
  propertyDescription: propertyDescription,
  landlordDescription: landlordDescription,
  capitalAskAmount:  capitalAskAmount,
  communityOwnership: communityOwnership,
  propertyValue: propertyValue,
  capRate: capRate,
  holdingTimeYears: holdingTimeYears,
  expectedMonthlyRent: expectedMonthlyRent,
  created: firebase.firestore.FieldValue.serverTimestamp()
})


  return {
    statusCode: 200
  }
}

