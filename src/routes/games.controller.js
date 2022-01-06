const gamesCtrl = {}
const Game = require('./Games');

gamesCtrl.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.json(games);
  } catch (error) {
    res.json(error);
  }
};

gamesCtrl.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    return res.json(game);
  } catch (error) {
    res.json(error);
  }
}

gamesCtrl.deleteFromBacklog = async (req, res) => {
  console.log(req.params)
  const gameFound = await Game.findByIdAndDelete(req.params.id)
  if(!gameFound) return res.status(204).json()
  return res.json(gameFound)
};

gamesCtrl.addGameToBacklog = async (req, res) => {
  try {
    const {id, title, img, system} = req.body.game
  const gameFound = await Game.findOne({title})
  if(gameFound) return res.status(301).json({ msg: 'This game is already added'})
  const game = new Game(req.body.game)
  const savedGame = await game.save()
  res.json(savedGame)
  } catch (error) {
    console.error(error)
  }
  
}

module.exports = gamesCtrl;