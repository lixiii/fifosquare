var awsController = require("../routes/aws")

// awsController.initAttributes(function(data){
//   console.log(data);
// });

awsController.publish("+447543279250", "test", function(data) {
  if (data !== null) {
    console.log('congrats');
    console.log(data)
  }
});