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

gamesCtrl.test = async(req, res) => {
  try {
    console.log(req.body)
    res.json('hola pepe')
  } catch (error) {
    
  }
}
// export const getVideo: RequestHandler = async (req, res) => {
//   const videoFound = await Video.findById(req.params.id)
//   if(!videoFound) return res.status(204).json()
//   return res.json(videoFound)
// };

// export const deleteVideo: RequestHandler = async (req, res) => {
//   const videoFound = await Video.findByIdAndDelete(req.params.id)
//   if(!videoFound) return res.status(204).json()
//   return res.json(videoFound)
// };

// export const createVideo: RequestHandler = async (req, res) => {
//   const videoFound = await Video.findOne({ url: req.body.url });
//   if (videoFound)
//     return res.status(301).json({ message: "The URL already exists" });
//   const video = new Video(req.body);
//   const savedVideo = await video.save();
//   res.json(savedVideo);
// };

// export const updateVideo: RequestHandler = async (req, res) => {
//   const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true})
//   if(!videoUpdated) return res.status(204).json()
//   res.json(videoUpdated)
// };

module.exports = gamesCtrl;