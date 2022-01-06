const {Router} = require('express');
const {getGames, getGame, addGameToBacklog, deleteFromBacklog} = require('./games.controller');


const router = Router()

router.route('/backlog')
  .get(getGames)
  .post(addGameToBacklog)

router.route('/backlog/:id')
  .delete(deleteFromBacklog)
  .get(getGame)
// router.get('/wishlist', getGames)
// router.get('/videos/:id', videoCtrl.getVideo)
// router.post('/wishlist', videoCtrl.addGame)
// router.delete('/videos/:id', videoCtrl.deleteVideo)
// router.put('/videos/:id', videoCtrl.updateVideo)

module.exports = router