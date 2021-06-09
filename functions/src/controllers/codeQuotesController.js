const admin = require("../../db.js");
const db = admin.firestore();
const CodeQuote = require("../model/codequotes.js")

const createCodeQuotes = async (req, res, next) => {
    try {
      await db.collection("codequotes").doc()
          .create({
              author: req.body.author,
              quote: req.body.quote
            });
      return res.status(200).send({ message: "Code Tweet Has been stored successfully"});
    } catch (error) {
      return res.status(500).send(error);
    }
}

const getAllCodeQuotes = async (req, res, next) => {
    try {
        const codequotes = await db.collection('codequotes');
        const data = await codequotes.get();
        const codeQuoteArray = [];

        if(data.empty) {
            res.status(404).send('No record found');
        }else {
            data.forEach(doc => {
                const codequote = new CodeQuote(
                    doc.id,
                    doc.data().author,
                    doc.data().quote
                );
                codeQuoteArray.push(codequote);
            });
            res.send(codeQuoteArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCodeQuote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const codequotes = await db.collection('codequotes').doc(id);
        const data = await codequotes.get();
        if(!data.exists) {
            res.status(404).send('Code Tweet with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCodeQuote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const codequotes =  await db.collection('codequotes').doc(id);
        await codequotes.set(data, {merge: true});
        res.send('Code tweet record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCodeQuote = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('codequotes').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createCodeQuotes, 
    getAllCodeQuotes, 
    getCodeQuote, 
    updateCodeQuote, 
    deleteCodeQuote
}