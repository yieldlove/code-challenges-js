const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const bid = require('./bid.js')

const app = express()
const port = 20457

app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'sample-pages')))

app.post('/bids', function (req, res) {
    console.log(`Received bids request.`, req.body)

    res.setHeader('Access-Control-Allow-Origin', `*`)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    
    if (req.body.imp) {
        const bids = []

        for (const request of req.body.imp) {
            bids.push(bid.newBid({
                requestId: request.id,
                placementId: request.placementId,
                width: request.banner.format[0].w, 
                height: request.banner.format[0].h
            }))
        }

        res.json({
            version: '0.0.1',
            bids
        })
    }
    res.end()
})

app.listen(port, () => {
    console.log(`Web app listening at ${port} port.`)
})