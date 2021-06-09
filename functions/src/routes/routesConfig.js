const {create} = require('../controllers/userController.js')
const {createCodeQuotes, getAllCodeQuotes, getCodeQuote, updateCodeQuote, deleteCodeQuote} = require('../controllers/codeQuotesController.js');
const {isAuthenticated} = require('../auth/authenticated.js')

exports.routesConfig = (api) => {

    api.get("/hello", (req, res) => {
        console.log("hello");
        res.send("hello from Omotola");
    }); 

    api.post("/users", create);

    api.post('/code-quotes',
        isAuthenticated,
        createCodeQuotes
    );

    api.get('/code-quotes', 
        getAllCodeQuotes
    ); 

    api.get('/code-quote/:id', 
        getCodeQuote
    ); 

    api.put('/code-quote/:id', 
        updateCodeQuote
    ); 

    api.delete('/code-quote/:id',
        deleteCodeQuote
    );
}