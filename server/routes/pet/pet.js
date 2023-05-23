const express = require('express');
const router = express();
const { getConnection, doRelease } = require('../../db/db');

router.post('/getallpet', async function (req, res) {
  const { nickname } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.execute(
      'select p.name, p.imageurl FROM member m JOIN pet p ON m.member_id = p.member_id WHERE m.nickname = :nickname',
      [nickname]
    );
    
    const pets = [];
    for (let row of result.rows) {
      const pet = {
        name: row[0],
        image: row[1]
      };
      pets.push(pet);
    }

    if (pets.length > 0) {
      res.set('Content-Type', 'application/json');
      res.status(200).json(pets);
    } else {
      // 등록된 펫이 없을 경우
      res.status(401).send();
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

router.post('/petregister', async function (req, res) {
  const petInfo = req.body;
  let connection;
  
  const nickname = petInfo.user;

  try {
    connection = await getConnection();

    const resultID = await connection.execute(
      'select member_id from member where nickname = :nickname',
      [nickname]
    )

    const petInfoBinds = {
      name: petInfo.petName,
      gender: petInfo.petGender,
      ntlz: petInfo.petNtlz,
      birth: petInfo.petBirth,
      breed: petInfo.petBreed,
      imageurl: petInfo.petImageSrc,
      weight: parseFloat(petInfo.petWeight),
      member_id: resultID.rows[0][0]
    }


    await connection.execute(
      'insert into pet (name, gender, ntlz, birth, breed, member_id, imageurl, weight, pet_id) VALUES (:name, :gender, :ntlz, :birth, :breed, :member_id, :imageurl, :weight, pet_id_seq.nextval)',
      [
        petInfoBinds.name,
        petInfoBinds.gender,
        petInfoBinds.ntlz,
        petInfoBinds.birth,
        petInfoBinds.breed,
        petInfoBinds.member_id,
        petInfoBinds.imageurl,
        petInfoBinds.weight
      ]
    );  

    res.status(200).send('pet 등록 성공');
    console.log('펫 등록 성공');
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/updatedbti', async function (req, res) {
  const { user, petName, step1, step2, step3, step4, ...remaining } = req.body;
  let connection;

  const dbti = Object.values(remaining).join("");

  try {
    connection = await getConnection();
    await connection.execute(
      'update pet set dbti = :dbti, d = :d, b = :b, t = :t, i = :i where member_id in (select member_id from member where nickname = :nickname) and name=:name',
      {nickname: user, name: petName, dbti: dbti, d: step1, b: step2, t: step3, i: step4}
    );

    res.status(200).send();
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    if (connection) {
      doRelease(connection);
    }
  }
})


router.post('/getPetDetail', async function (req, res) {
  const { nickname, petName } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const memberIdResult = await connection.execute(
      'select member_id from member where nickname = :nickname',
      { nickname }
    );
    const memberId = memberIdResult.rows[0][0];

    const result = await connection.execute(
      'select name, breed, birth, gender, ntlz, weight, imageurl from pet where member_id = :member_id and name = :name',
      { member_id: memberId, name: petName }
    );

    const petDetail = {
      petName: result.rows[0][0],
      petBreed: result.rows[0][1],
      petBirth: result.rows[0][2],
      petGender: result.rows[0][3],
      petNtlz: result.rows[0][4],
      petWeight: result.rows[0][5],
      petImage: result.rows[0][6],
    }

    // console.log(result.rows[0]);
    res.status(200).send({petInfo: petDetail})

    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/deletePet', async function (req, res) {
  const { name, memberId } = req.body;
  let connection;

  try {
    connection = await getConnection();
    
    await connection.execute(
      'delete from pet where member_id = :member_id and name = :name',
      {name, member_id: memberId}
    )

    res.status(200).send("삭제 성공");
    doRelease(connection);

  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})

module.exports = router;