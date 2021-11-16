const express = require('express')
const app = express()
const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('public'))
