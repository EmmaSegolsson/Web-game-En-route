# En Route

This game is inspired by the board game Ticket to Ride.
A project by Emma Segolsson, Victor Lindquist and Jacob Molin.

### Create game

- A person can create a game and becomes Game Creator
- GC can share a generated join-link for other people to join the game
- GC decides when game begins after 1-4 people have joined the game

### Join game

- A person (not GC) can join a game via a join-link (shared by the GC)
- Once a person has joined a game, they will be waiting in the Game Lounge until the GC starts the game

### Game prep - deal Ticket cards

- Each player gets 4 random Tickets to choose from
- Each player has to keep at least 2 Ticket cards

### The Track Deck

- Shuffle and refill deck
- Deal cards to players and keep track of actions

### Make a move (the player have two options)

1. Pick two cards from the open Track cards or Track cards deck
2. Build a Route with Tracks

### Keep track (and show) each players points

- Routes built by a player
- (Route between the cities on the Ticket(s))
- (Current Longest Route)
- (Train stations kept at end of game)

### The games ending

- (When a player has less than 3 Tracks left, the final round begins)

## Technologies

### Frontend

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Material UI](https://material-ui.com/)

### Backend

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/)

### Technical specification

The user interface is built using `React` and `Material UI`. This is done in `Typescript`. `Redux` is used to keep track of the game state, player state and the different deck states.

`Socket.io` is used as an bidirectional communication channel between the server and the user interface.

The server is built using `Express.js` and `Node.js`.

## Code Standards

The code in this repository will mostly follow the [`Airbnb JavaScript Style Guide`](https://github.com/airbnb/javascript#readme), except for their function declarations, where this repository uses arrow functions instead of the keyword
`function`.

## Authors

Emma Segolsson, Victor Lindquist, Jacob Molin
