var mongoose = require('mongoose');


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
     useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:mydatabase@cluster0.5mygj.mongodb.net/expense-tracker?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
   