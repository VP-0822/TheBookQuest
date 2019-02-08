# The Book Quest
This solution is built to enhance the library system by allowing users to pre book the literatures and also to review and rate the desired book.This application is user friendly and gives users an expirence to read and validate the reviews before lending the books.

## Key Features
- check the avaliability of the desired literatures online.
- check reviews of the books
- rate the books
- pre book the literatures
- Search books across following fields
    - Book title
    - Authors
    - Tags (Book category)
    - Publisher name
    - Across all above fields

## Why to use this application
- Makes easy for the users to search their literatures avaliablity.
- To have a small glimpse about the books with help of our review features.
- platform to convey users thoughts about the literatures.
- Saves users time.

## Target Users
- Universities
- Offices and Industries.

## Technology used
- Nodejs (for implementation of logic)
- VueJs (framework for user interfaces)
- Mongo DB (for database management)

## Installation Guide
1. Install Node Js
2. install following node packages
```
npm install async bcryptjs body-parser ejs express express-flash express-messages express-session express-validator mongoose nodemailer passport passport-local randomstring
```
3. install Mongo DB
4. Run mongo.exe as administrator
5. Create database using command:
```
use thebook
```
6. create following collections:
```
db.createCollection('issues')
db.createCollection('literatureTypes')
db.createCollection('literatures')
db.createCollection('reviews')
db.createCollection('users')
db.createCollection('literatureRequests')
db,createCollection('tokens')
```
7. Now run 
```
npm start
```

## Authors
### VirajKumar Patel (11011755)
    Worked on Controller, routes, Model (Using mongoose), UI design
### Akansha Pandey (11011758)
    Worked on views, vue.js, UI design




