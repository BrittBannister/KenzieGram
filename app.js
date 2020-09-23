const express = require('express')
const multer = require('multer')
const fs = require('fs')

const publicPath = 'public/'
const uploadPath = './public/uploads'
const upload = multer({ dest: uploadPath })
const feed = []

const app = express()

app.use(express.static(publicPath))
app.set('view engine', 'pug')

app.post('/public/upload', upload.single('myPhoto'), (req, res, next) => {
  console.log(`Uploaded ${req.file.filename}`)
  feed.push(req.file.filename)

  fs.readdir(uploadPath, (err, items) => {
    // console.log(items);
    res.send(`<h1>File Uploaded Successfully!!</h1>
       <a href= '/'>Back To Feed</a>`)
  })
})
app.get('/', (req, res) => {
  let feedArr = []
  fs.readdir(uploadPath, (err, items) => {
    console.log(items)
    for (let i = 0; i < items.length; i++) {
      feed.push(items)
    }
    console.log(feedArr)

    res.render('index', { title: 'Kenzie Gram', photos: items })
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
