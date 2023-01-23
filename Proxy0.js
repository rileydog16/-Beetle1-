import axios from 'axios'
import express from 'express'
const app = express()
const port = 3000

const handler = async (req, res) => {
    const data = req.body
    const {path, GoogleAccessId, Expires, Signature} = req.query
    const url = `https://storage.googleapis.com${path}?GoogleAccessId=${GoogleAccessId}&Expires=${Expires}&Signature=${encodeURIComponent(Signature)}`
    console.log('upload url', url)

    try {
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': req.headers['content-type']
            }
        })
        res.end()
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }

}
app.use(express.raw({type: 'application/zip'}))
app.put('/uploadfunctioncontent', handler)

app.listen(port, () => {
    console.log(`Proxy test listening on port ${port}`)
})
