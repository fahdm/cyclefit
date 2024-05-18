const Route = require('../../models/route');

module.exports = {
  create,
  index
};

async function create(req, res) {
  try {
    const route = await Route.create({ ...req.body, user: req.user._id });
    res.json(route);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const routes = await Route.find({ user: req.user._id });
    console.log(routes)
    res.json(routes);
  } catch (err) {
    res.status(400).json(err);
  }
}
