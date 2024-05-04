# URL-shortener
 
URL Shortener with Express.js and MongoDB
This project is a simple URL shortener implemented using Express.js for the backend and MongoDB for data storage. It provides a web service that takes long URLs and converts them into short, easily shareable links.

# Features

Shortening URLs: Convert long URLs into short, unique identifiers. 

Redirection: Redirect users seamlessly from short URLs to the original long URLs.

Statistics: Track the number of times each short URL has been accessed.

Customizable Short URLs: Ability to provide custom aliases for short URLs.

RESTful API: Exposes a simple REST API for URL shortening and redirection.

# Tech Stack

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: NoSQL database used for storing URL mappings and visit statistics.

Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.

Shortid: Library to generate unique, short IDs for short URLs.
