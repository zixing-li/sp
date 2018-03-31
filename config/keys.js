if (process.env.NODE_ENV === 'production') {
  module.exports = requrie('/prod');
} else {
  module.exports = requrie('/dev');
}