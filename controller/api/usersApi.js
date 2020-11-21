function index (req, res) {
  return res.status(200).json({
    success: false
  });
}

module.exports = {
  index
}