const mongoose = require('mongoose');
const axios = require('axios');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers.js');
const Campground = require('../models/campgrounds.js');

mongoose.connect('mongodb://localhost:27017/camp-advisor');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seeDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const r = Math.floor(Math.random() * 1000);
        const p = Math.floor(Math.random() * 3000) + 100;
        const camp = new Campground({
            author: '63b303330397022211dc1a00',
            location: `${cities[r].city}, ${cities[r].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum ad error sapiente omnis ratione asperiores veritatis nesciunt placeat, cumque recusandae deserunt quod veniam dolore fugit ipsam est odit voluptas provident?',
            price: p,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[r].longitude,
                    cities[r].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/datngbkbq/image/upload/v1672746850/CampAdvisor/eknb2vn6ltpbfv9wpwtj.jpg',
                    filename: 'CampAdvisor/eknb2vn6ltpbfv9wpwtj'
                },
                {
                    url: 'https://res.cloudinary.com/datngbkbq/image/upload/v1672746749/CampAdvisor/yu0cmbrjpb8xktzvamea.jpg',
                    filename: 'CampAdvisor/yu0cmbrjpb8xktzvamea'
                }
            ]
        });
        await camp.save();
    }
}

seeDB().then(() => {
    mongoose.connection.close();
});