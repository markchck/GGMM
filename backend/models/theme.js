const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

// mongoDB에 제시어를 저장할 스키마를 
const Theme_Animal = new mongoose.Schema({
    name: String
  });

// 제시어 모델정의
const Animal = mongoose.model('Animal', Theme_Animal)
module.exports = Animal
