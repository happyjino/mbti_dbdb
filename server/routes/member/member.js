const express = require('express');
const router = express();
const { getConnection, doRelease } = require('../../db/db');
const jwt = require('jsonwebtoken');

router.post('/join', async function (req, res) {
  const { nickname, email, pw } = req.body;
  let connection;

  try {
    connection = await getConnection();
    await connection.execute(
      'insert into MEMBER(nickname, email, pw, member_id) values(:nickname, :email, :pw, member_id_seq.nextval)',
      [nickname, email, pw]
    );
      
    res.status(200).send('Member registered successfully');
    console.log('회원가입 성공');
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    if (connection) {
      doRelease(connection);
    }
  };      
});

router.post('/checkNickname', async function (req, res) {
  const { nickname } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.execute(
      'select nickname from member where nickname = :nickname',
      {nickname: nickname}
    )
    if (result.rows[0] === undefined) {
      res.status(200).send("성공적");
    } else {
      res.status(401).send("이미 존재");
    }

    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})


router.post('/login', async function (req, res) {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.execute(
      'select nickname, member_id from member where email = :email and pw = :password',
      [email, password]
    );

    if (result.rows[0] !== undefined) {

      const user = { nickname: result.rows[0][0], memberId: result.rows[0][1] };
      const token = jwt.sign(user, '1234', { expiresIn: '10h' });

      const userInfo = {
        nickname: result.rows[0][0],
        memberId: result.rows[0][1],
        token: token
      }
      res.status(200).send(userInfo);
    } else {
      res.status(401).send('등록되지 않은 회원이거나 비밀번호가 틀렸습니다.');
    }

    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    if (connection) {
      doRelease(connection);
    }
  }
});

module.exports = router;