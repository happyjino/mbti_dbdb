const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/index');
const axios = require('axios');

// JSON 요청 본문 파싱
// app.use(bodyParser.json());

// 최대 크기를 10MB로 변경
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(express.limit(100000000));

// URL-encoded 요청 본문 파싱
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// 멀티파트 요청 본문 파싱
// app.use(bodyParser.multipart());

app.use('/api', api);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`)
})