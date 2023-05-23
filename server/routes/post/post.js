const express = require('express');
const router = express();
const { getConnection, doRelease } = require('../../db/db');
const auth = require('../../auth');

router.use(auth);

router.post('/createpost', async function (req, res) {
  const { content, imageUrl, memberId, petId } = req.body;
  let connection;

  const now = new Date();
  const year = now.getFullYear().toString().padStart(4, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const createdDate = year + month + day + hours + minutes + seconds;

  try {
    connection = await getConnection();
    await connection.execute(
      'insert into post(content, imageurl, member_id, pet_id, post_id, created_date) values(:content, :imageUrl, :member_id, :pet_id, post_id_seq.nextval, :created_date)',
      {content, imageUrl, member_id: memberId, pet_id: petId, created_date: createdDate}
    );

    res.status(200).send('등록 성공');
    doRelease(connection);

  } catch (err) {
    console.log(err.message);
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/getallpost', async function (req, res) {
  const { nickname } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.execute(
      `select p.content, p.imageurl, p.member_id, p.pet_id, p.post_id, p.created_date, 
      m.nickname, pt.name, pt.dbti, pt.imageurl
      from post p 
      join member m ON p.member_id = m.member_id 
      join pet pt on p.pet_id = pt.pet_id 
      order by post_id desc`
    )
    const memberIdResult = await connection.execute(
      'select member_id from member where nickname = :nickname', { nickname }
    );
    const memberId = memberIdResult.rows[0][0];

    const posts = [];
    for (let row of result.rows) {     
      const like = await connection.execute(
        'select member_id from like_table where post_id = :post_id',
        { post_id: row[4] }
      )
      const isInclude = like.rows.some(item => JSON.stringify(item) === JSON.stringify([memberId]));
      const post = {
        content: row[0],
        image: row[1],
        memberId: row[2],
        petId: row[3],
        postId: row[4],
        createdDate: row[5],
        userName: row[6],
        petName: row[7],
        petDbti: row[8],
        petImg: row[9],
        like: like.rows.length,
        clickedLike: isInclude
      };
      posts.push(post);
    }

    if (posts.length > 0) {
      res.set('Content-Type', 'application/json');
      res.status(200).json(posts);
    } else {
      res.status(200).send("등록된 펫 없음");
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


router.post('/clickLike', async function (req, res) {
  const { postId, user } = req.body;
  let connection;

  try {
    connection = await getConnection();

    // user로 member_id 가져오기
    const memberIdResult = await connection.execute(
      'select member_id from member where nickname = :nickname', { nickname: user }
    );
    const memberId = memberIdResult.rows[0][0];

    // 좋아요 정보 업데이트
    await connection.execute(
      'insert into like_table(post_id, member_id) values(:post_id, :member_id)',
      {member_id: memberId, post_id: postId}
    )

    // 수정된 좋아요 수 가져오기
    const result = await connection.execute(
      'select count(*) as count from like_table where post_id = :post_id',
      {post_Id: postId}
    )
    res.status(200).send({like: result.rows[0][0]});

  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/cancelLike', async function (req, res) {
  const { postId, user } = req.body;
  let connection;

  try {
    connection = await getConnection();

    // user로 member_id 가져오기
    const memberIdResult = await connection.execute(
      'select member_id from member where nickname = :nickname', { nickname: user }
    );
    const memberId = memberIdResult.rows[0][0];

    // 좋아요 정보 삭제
    await connection.execute(
      'delete from like_table where member_id = :member_id and post_id = :post_id',
      {member_id: memberId, post_id: postId}
    )

    // 수정된 좋아요 수 가져오기
    const result = await connection.execute(
      'select count(*) as count from like_table where post_id = :post_id',
      {post_Id: postId}
    )
    res.status(200).send({like: result.rows[0][0]});
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/updatePost', async function (req, res) {
  const { postId, content } = req.body;
  let connection;

  try {
    connection = await getConnection();
    await connection.execute(
      'update post set content = :content where post_id = :post_id',
      { content, post_id: postId }
    )

    res.status(200).send();
    doRelease(connection);
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
    if (connection) {
      doRelease(connection);
    }
  }
})

router.post('/deletePost', async function (req, res) {
  const { postId } = req.body;
  let connection;

  try {
    connection = await getConnection();
    await connection.execute(
      'delete from post where post_id = :post_id',
      { post_id: postId }
    )

    res.status(200).send();
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