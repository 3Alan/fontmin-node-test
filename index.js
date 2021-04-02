const express = require('express');
const Fontmin = require('fontmin');

const app = express();
app.use(express.static('build'));

function generateTFF(text) {
    const fontmin = new Fontmin();
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
    res.send(`
    <div>在URL中输入text参数可以生成对应内容的svg内容</div>
    <a href="/fonts/a.svg" download="a.svg">download</a>
    `);
});

app.listen(3000, () => {
    console.log('示例应用正在监听 3000 端口!');
});
