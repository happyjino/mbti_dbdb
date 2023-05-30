const express = require('express');
const router = express();
const { getConnection, doRelease } = require('../db/db');
const oracledb = require('oracledb');
const fs = require('fs');
const axios = require('axios');

const memberRoutes = require('./member/member');
const postRoutes = require('./post/post');
const petRoutes = require('./pet/pet');

router.use('/member', memberRoutes);
router.use('/post', postRoutes);
router.use('/pet', petRoutes);

oracledb.autoCommit = true; //자동 커밋
oracledb.fetchAsString = [oracledb.CLOB];

// router.get('/auth/kakao'), (req, res) => {
//   axios.post('https://kauth.kakao.com/oauth/token', {
//     grant_type: 'authorization_code',
//     client_id: 'ef93abe634b47bc062e23cbd5ccd7405',
//     redirect_uri: 'http://localhost:3000/auth',
//     code: req.query.code,
//   })
//     .then(response => {
//       // 로그인 성공
//       console.log(response.data);
//       res.status(200).send(response.data);
//     })
//     .catch(error => {
//       // 로그인 실패
//       console.error(error);
//       res.status(500).send('카카오 로그인 실패');
//     });
// }

router.post('/getPetMemberID', async function (req, res) {
  const mpinfo = req.body;
  let connection;

  const nickname = mpinfo.nickname;
  const petName = mpinfo.petName;

  try {
    connection = await getConnection();

    const memberId = await connection.execute(
      'select member_id from member where nickname = :nickname',
      [nickname]
    )

    const petId = await connection.execute(
      'select pet_id from pet where name = :name and member_id = :member_id',
      { name: petName, member_id: memberId.rows[0][0] }
    )
    
    if (memberId && petId) {
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        memberId: memberId.rows[0][0],
        petId: petId.rows[0][0]
      })
    } else {
      res.status(401).send("member, pet error");
    }
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    if (connection) {
      doRelease(connection);
    }
  }
})

module.exports = router;