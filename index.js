const express = require('express');
const Fontmin = require('fontmin');

const app = express();
app.use(express.static('build'));

const fontmin = new Fontmin();
function generateTFF(text) {
    fontmin
        .src('fonts/*.ttf')
        .use(
            Fontmin.glyph({
                text,
            })
        )
        .use(Fontmin.ttf2svg())
        .dest('build/fonts');
    fontmin.run(function (err, files) {
        if (err) {
            throw err;
        }

        console.log(files[0]);
        // => { contents: <Buffer 00 01 00 ...> }
    });
}

app.get('/', function (req, res) {
    const text = req.query.text;
    console.log(text);
    text && generateTFF(text);
    res.send('<a href="/fonts/a.svg" download="a.svg">download</a>')
    // res.sendFile(__dirname+'/index.html')
});

app.listen(3000, () => {
    console.log('示例应用正在监听 3000 端口!');
});
