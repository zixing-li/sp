module.exports = (req, res, next) => {
  if (req.user.credits < 1) { // if credit less than 1 
    return res.status(403).send({ error: 'Not enough credit' }) // http status code that engineers can refer to. See all status code on www.w3.org/Protocols
  }

  next(); // if logged in, everything's good, let's proceed
}