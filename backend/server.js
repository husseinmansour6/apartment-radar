let express = require("express")
const MongoClient = require("mongodb").MongoClient
const url = "mongodb://habibi:habibi123@ds155150.mlab.com:55150/apartment-radar"
let dbs = undefined
let bodyParser = require("body-parser")
let app = express()
let cors = require("cors")
let sessions = {}

let generateId = () => {
  return Math.floor(Math.random() * 10000000000)
}

//
const exphbs = require("express-handlebars")
const nodemailer = require("nodemailer")

let ObjectID = require("mongodb").ObjectID
app.use(cors({ credentials: true, origin: "http://localhost:8080" }))

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err
  dbs = db.db("apartment-radar")
})

// // picss

let imagesData = []
let fs = require("fs")
let multer = require("multer")
app.use(cors())
let upload = multer({ dest: __dirname + "/images/" })
app.use(express.static(__dirname + "/images"))

app.post("/addImages", upload.array("imgs[]", 3), (req, res) => {
  console.log("********************* Add Images *****************")
  console.log(req.files)
  console.log("new file location", req.files.path)
  const itemToStore = {
    id: req.body.apartmentId,
    paths: []
  }
  req.files.forEach(file => {
    let extension = file.originalname.split(".").pop()
    fs.rename(file.path, file.path + "." + extension, () => {})
    // console.log("body", req.body)

    const path = "/" + file.filename + "." + extension

    itemToStore.paths.push(path)
    // console.log("updated imagesData:", imagesData)
  })
  console.log("item to store: ", itemToStore)
  console.log("paths to display: ", itemToStore.paths)
  dbs.collection("images").insertOne(itemToStore)
  res.send(JSON.stringify(itemToStore.paths))
})

app.use(bodyParser.raw({ type: "*/*" }))

app.post("/signup", (req, res) => {
  console.log("************************ Sign Up *****************")
  let parsedBody = JSON.parse(req.body)
  console.log("body after: ", parsedBody)

  let fname = parsedBody.firstName
  console.log("first name: ", fname)

  let lname = parsedBody.lastName
  console.log("last name: ", lname)

  let phn = parsedBody.phoneNumber
  console.log("phone number: ", phn)

  let typedEmail = parsedBody.email
  console.log("email: ", typedEmail)

  let pwd = parsedBody.password
  console.log("password: ", pwd)

  let generatedSessionId = generateId()
  sessions[typedEmail] = generatedSessionId
  console.log("sesssionId: ", generatedSessionId)

  console.log({ email: typedEmail })
  let newSignUp = {
    firstName: fname,
    lastName: lname,
    phoneNumber: phn,
    email: typedEmail,
    password: pwd
  }
  console.log("stored body: ", newSignUp)
  dbs
    .collection("accounts")
    .find({ email: typedEmail })
    .toArray((err, result) => {
      console.log("result: ", result)
      if (result.length === 0) {
        console.log("No result found")
        dbs.collection("accounts").insertOne(newSignUp)
        res.send({
          success: true,
          result: newSignUp,
          sessionId: generatedSessionId
        })
      } else {
        console.log("found: ", result)
        res.send({ success: false })
      }
    })
})

app.post("/login", (req, res) => {
  console.log("************************ login *****************")
  let parsedBody = JSON.parse(req.body)
  console.log("body after: ", parsedBody)

  let typedEmail = parsedBody.email
  console.log("email: ", typedEmail)

  let typedPassword = parsedBody.password
  console.log("password: ", typedPassword)

  let generatedSessionId = generateId()
  sessions[typedEmail] = generatedSessionId
  console.log("sessions: ", sessions)

  dbs
    .collection("accounts")
    .find({ email: typedEmail, password: typedPassword })
    .toArray((err, result) => {
      if (result.length === 0) {
        console.log("no result found")
        res.send(JSON.stringify({ success: false }))
      } else {
        console.log("result: ", result)
        res.send(
          JSON.stringify({
            success: true,
            sessionId: generatedSessionId,
            result: result[0]
          })
        )
      }
    })
})

app.post("/getOwnerId", (req, res) => {
  console.log("************************ get owner id *****************")
  let parsedBody = JSON.parse(req.body)
  console.log("body after: ", parsedBody)

  dbs
    .collection("accounts")
    .find({ _id: ObjectID(parsedBody) })
    .toArray((err, result) => {
      if (result.length === 0) {
        console.log("no result found")
        // res.send(JSON.stringify({ success: false }))
      } else {
        console.log("result: ", result)
        res.send(
          JSON.stringify({
            success: true,
            result: result
          })
        )
      }
    })
})

app.get("/viewApartments", (req, res) => {
  console.log("******************* im in View Item *****************")

  dbs
    .collection("apartments")
    .find({})
    .toArray((err, result) => {
      console.log("error: ", err)
      console.log("result: ", result)
      res.send(JSON.stringify({ items: result }))
    })
})

app.post("/deleteApartment", (req, res) => {
  console.log("************************ delete apartment *****************")
  let reqBody = JSON.parse(req.body)
  console.log("requested: ", reqBody.id)
  dbs.collection("apartments").deleteOne({ _id: ObjectID(reqBody.id) })
  res.send(JSON.stringify({ success: true }))
})

app.post("/viewApartmentData", (req, res) => {
  console.log("************************ view apart *****************")
  let apartmentId = JSON.parse(req.body)
  console.log("id: ", apartmentId)
  dbs
    .collection("apartments")
    .find({ _id: ObjectID(apartmentId.id) })
    .toArray((err, result) => {
      if (err) throw err
      console.log("result: ", result)
      res.send(JSON.stringify(result))
    })
})

app.post("/searchByName", (req, res) => {
  console.log("******************* im in search *****************")
  let reqBody = JSON.parse(req.body)
  console.log("req Body: ", reqBody.toString())
  dbs
    .collection("apartments")
    .find({})
    .toArray((err, result) => {
      //console.log(result)
      let array = []
      result.map(apt => {
        let str = apt.address

        if (str.includes(reqBody)) {
          array.push(apt)
          console.log("array: ", array)
        }
        //
      })
      res.send(JSON.stringify({ apartments: array }))
    })
})

app.post("/filterApartments", (req, res) => {
  console.log("************************ filter *****************")
  // console.log("before: ", req.body)
  let filterOptions = JSON.parse(req.body)
  console.log("filtered: ", filterOptions)

  if (
    filterOptions !== "" ||
    filterOptions !== {} ||
    filterOptions !== undefined
  ) {
    console.log("price: ", filterOptions.price) //convert it
    if (filterOptions.price) {
      console.log("yes")
    } else console.log("nooo")
    let conditions = []
    if (filterOptions.price)
      conditions.push({ price: { $lt: parseInt(filterOptions.price) } })
    if (filterOptions.parking)
      conditions.push({ parking: filterOptions.parking })
    if (filterOptions.apartmentRooms)
      conditions.push({ apartmentRooms: filterOptions.apartmentRooms })
    if (filterOptions.rentalType)
      conditions.push({ rentalType: filterOptions.rentalType })
    if (filterOptions.bedrooms)
      conditions.push({ bedrooms: filterOptions.bedrooms })
    if (filterOptions.ownerId)
      conditions.push({ ownerId: filterOptions.ownerId })
    // let query = { conditions }
    let query = { $and: conditions }
    console.log("query: ", query)
    // dbs.apartments.find(query)
    dbs
      .collection("apartments")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err
        console.log("result: ", result)
        res.send(JSON.stringify(result))
      })
  }
})

app.post("/getPics", (req, res) => {
  console.log("************************ get pics *****************")
  let reqBody = JSON.parse(req.body)
  console.log("reqBody: ", reqBody)
  dbs
    .collection("images")
    .find({ id: reqBody })
    .toArray((err, result) => {
      console.log("result: ", result)
      res.send(JSON.stringify(result))
    })
})

app.post("/addApartment", (req, res) => {
  console.log("******************* im in Add Apartment *****************")
  let parsedBody = JSON.parse(req.body)
  console.log("parsed body: ", parsedBody)
  let reqAddress = parsedBody.address
  let reqOwnerId = parsedBody.ownerId
  let reqOwner = parsedBody.owner
  let reqRentalType = parsedBody.rentalType
  let reqApartmentRooms = parsedBody.apartmentRooms
  let reqBedRooms = parsedBody.bedrooms
  let reqBathRooms = parsedBody.bathrooms
  let reqLaudryType = parsedBody.laundryType
  let reqParking = parsedBody.parking
  let reqAnimalFriendly = parsedBody.animalFriendly
  let reqPrice = parseInt(parsedBody.price)

  let storedData = {
    address: reqAddress,
    ownerId: reqOwnerId,
    owner: reqOwner,
    ownerId: reqOwnerId,
    rentalType: reqRentalType,
    apartmentRooms: reqApartmentRooms,
    bedrooms: reqBedRooms,
    bathrooms: reqBathRooms,
    laundryType: reqLaudryType,
    parking: reqParking,
    animalFriendly: reqAnimalFriendly,
    price: reqPrice
  }
  console.log("stored body: ", storedData)
  dbs.collection("apartments").insertOne(storedData)
  res.send(JSON.stringify({ success: true, resData: storedData }))
})

//
// View engine setup
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/send", (req, res) => {
  console.log("im in send ")
  let reqBody = JSON.parse(req.body)
  console.log("reqBody: ", reqBody)
  console.log("owner email: ", reqBody.ownerEmail)

  const output = `
    <p>Apartment address : ${reqBody.apartmenAddress}</p>
    <p>${reqBody.message}</p>
  `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // service: "hotmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: reqBody.senderEmail, // sender email
      pass: reqBody.senderPassword // sender password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: reqBody.name, // sender address
    to: reqBody.ownerEmail.toString(), // owner email
    // to: "hussein.mansour6@hotmail.com", // owner email
    subject: "More Information about your apartment", // Subject line
    html: output // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(JSON.stringify({ success: false }))
      return console.log(error)
    } else {
      console.log("Message sent: %s", info.messageId)
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      res.send(JSON.stringify({ success: true }))
    }
  })
})

app.listen(4000)
