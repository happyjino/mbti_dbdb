const express = require('express');
const router = express();
const { getConnection, doRelease } = require('../db/db');
const oracledb = require('oracledb');
const fs = require('fs');

const memberRoutes = require('./member/member');
const postRoutes = require('./post/post');
const petRoutes = require('./pet/pet');

router.use('/member', memberRoutes);
router.use('/post', postRoutes);
router.use('/pet', petRoutes);

oracledb.autoCommit = true; //자동 커밋
oracledb.fetchAsString = [oracledb.CLOB];

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