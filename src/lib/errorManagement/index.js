const mongoError_DuplicatedEmail = {
    errorCode: "MongoError",
    message: "E11000 duplicate key error collection: Users_DB.users index: email_1 dup key",
    statusCode: 500,
    type: "DB"
}

const emailAlreadyInUse = {
    "type": "APPLICATION", 
    "message": "Email is already in use", 
    "errorCode": "ERR_EMAIL_ALREADY_IN_USE", 
    "statusCode": 409
}

module.exports = {
    mongoError_DuplicatedEmail,
    emailAlreadyInUse
}