const admin = require("../../db.js");


const db = admin.firestore();

const create = async (req, res, next) => {
    try {
        const { displayName, password, email } = req.body
 
        if (!displayName || !password || !email) {
            return res.status(400).send({ message: 'Missing fields' })
        }
 
        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        })
 
        return res.status(201).send({ uid })
    } catch (err) {
        return handleError(res, err)
    }
}

function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` })
}

module.exports = {
    create
}