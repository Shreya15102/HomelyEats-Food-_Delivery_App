const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shreyagarwal152:shreya@cluster0.ue77ogm.mongodb.net/gofood?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("Connected");
      const fetched_data = await mongoose.connection.db.collection("foodItems");
      fetched_data.find({}).toArray(async (err, data)=> {
        const categoryData= await mongoose.connection.db.collection("foodCategory");
        categoryData.find({}).toArray(function(err,catdata){
          if (err) console.log(err);
        else
          global.food_items=data;
          global.category_data=catdata;
        });
        
      })
    }
  });
}
module.exports = mongoDB;