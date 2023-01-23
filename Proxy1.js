import fs from 'fs'
import express from 'express'
const app = express()
const port = 3001

app.use(express.raw({type: 'application/zip'}))
app.put('/savefile', (req, res) => {
    const data = req.body
    fs.writeFileSync('uploadedFile.zip', data, null)
    res.send()
})

app.listen(port, () => {
    console.log(`Proxy test listening on port ${port}`)
})