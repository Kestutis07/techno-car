// Model - atsakingas uz duomenu bazes operacijas
const fs = require('fs');
const filePath = './database/reviews.json';
const { v4: uuidv4 } = require('uuid');

const getAllReviews = () => {
  const data = fs.readFileSync(filePath);

  // JSON.parse - konvertuoja JSON string i Javascript Objekta
  return JSON.parse(data);
};

const createReview = (reviewData) => {
  const reviews = getAllReviews();

  const newReview = {
    id: uuidv4(),
    ...reviewData,
    date: new Date().toISOString(),
  };

  reviews.push(newReview);
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

  return newReview;
};

module.exports = {
  getAllReviews,
  createReview,
};
