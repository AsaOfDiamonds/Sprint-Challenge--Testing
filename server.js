const express = require('express');
const configureMiddleware = require('./config/middleware');
const games = require('./gamesModel');

const server = express();

//middleware 
configureMiddleware(server);


// Games routes 

server.get('/', (req, res) => {
  res.send('And God saw all that He had made, and found it very good');
});

server.get('/games', (req, res) => {
  games.get()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err))
});

server.post('/games', (req, res) => {
  const { title, genre } = req.body
  if (title && genre) {
    games.unique(title)
      .then(duplicates => {
        if (duplicates === 0) {
          games.insert(req.body)
            .then(game => res.status(201).json(game))
            .catch(err => res.status(500).json(err))
        } else {
          res.status(405).json({ message: 'We already have this game listed' })
        }
      })
  } else {
    res.status(422).json({ message: 'Game title and genre are required.' })
  }
});



module.exports = server; 
