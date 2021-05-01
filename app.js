/*
 * Title: video-streaming-by-node-js
 *  Description: Simple video streaming page by node js
 *  Author: Mohammad Mesbaul Haque
 * Date: 01/05/2021
 *
 */
// Dependencies.
const express = require('express');
const fs = require('fs');


// Module scaffolding.
const app = express();


// main functions or objects.
app.get('/videos', (req, res) =>{
    const range = req.headers.range;
    const videoPath = './videos/Leo_Messi.mp4';
    const videoSize = fs.statSync(videoPath).size;
    //set chunk size because it will be a partial content;
    const chunkSize = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize -1);

    //measuring the content length
    const contentLength = end - start +1;

    //set request header
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Range": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, {start, end});
    stream.pipe(res);


})


//listening app
app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
})

// export the module.