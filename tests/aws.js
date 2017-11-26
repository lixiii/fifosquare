var awsController = require("../routes/aws")

// awsController.initAttributes(function(data){
//   console.log(data);
// });

var num = ["+447756778027", "+447756778027"]

num.forEach(num => {
  awsController.publish(num, "Thank you very much", function(data) {
    if (data !== null) {
      console.log('sent');
      console.log(data)
    }
  });
}); 
