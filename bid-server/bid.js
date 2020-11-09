const bidTemplate = {
    "creativeId": 0,
    "cpm": 0.500000,
    "content": `<div class='ad-container'>
                    <h3>Yieldlove ad for test</h3>
                    From bid simulator sever<br>
                    With cpm of $cpm
                </div>
                <style>
                    .ad-container {
                        background-color: #1697fb;
                        color: #ffffff;
                        padding: 10px 25px;
                        box-sizing: border-box;
                    }
                    .ad-container > h3 {
                        margin: 10px 0px;
                    }
                </style>`,
    "width": 0,
    "height": 0
}

module.exports = {
    newBid(options) {
        const newBid = Object.assign({}, bidTemplate, options)

        newBid.cpm = this.randomCpm(0, 65)

        // Generate the creative
        newBid.content = `${newBid.content.replace(/\$cpm/g, newBid.cpm)}
            <style>
                .ad-container {
                    width: ${newBid.width}px;
                    height: ${newBid.height}px;
                }
            </style>
        `
        return newBid
    },
    randomCpm(min, max) {
        return Math.random() * (max - min) + min;
    }
}    

