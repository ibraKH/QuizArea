const express = require("express");
const router = express.Router();
const db = require("../database/connection");


router.get("/", (req, res) => {
    res.render("mainpage");
});

router.get("/quizzes", (req, res) => {
    db.query('select distinct quiz_name,creator,likes,dislikes,views from quiz order by views DESC', (err, names) => {
        if(err){
            console.log(err);

        }
        res.render("quizzes", { names })
    })
})


router.get('/quiz/create', (req, res) => {
    res.render('create')
})


router.post('/quiz/create/new', (req, res) => {
    let quiz = req.body.quizInputs
    res.render('createNew', { quiz, message: "welcome" })
})

router.post("/create/done", (req, res) => {
    let quiz = req.body.quizInputs;
    let creator = req.body.creator;
    let quizO = parseInt(req.body.quizInputs)
    let name = req.body.name;
    db.query(`SELECT * FROM quiz WHERE quiz_name = '${name}'`, (err, result) => {
        if(err){
            console.log(err);
        }
        if( result.length > 0 ){
            res.render('createNew', { message: "THE NAME ALREADY USED", quiz })
        }else{
            for(let i = 0; i < quizO; i++){
                db.query(`INSERT INTO quiz (quiz_name,question,A,B,C,D,correct,creator,likes,dislikes,views) VALUES ('${name}','${req.body.Q1[i]}','${req.body.A1[i]}','${req.body.B1[i]}','${req.body.C1[i]}','${req.body.D1[i]}','${req.body.correct1[i]}','${creator}', 0, 0, 0); `, (err) => {
                    if(err){
                        console.log(err);
                    }
                })
             }
             db.query('SELECT DISTINCT quiz_name FROM quiz', (err, names) => {
                if(err){
                    console.log(err);
                }
                res.render("quizzes", { names })
            })
        } 
    })
})

router.get("/quiz/:id", (req, res) => {
    db.query(`UPDATE quiz SET views = views + 1 WHERE quiz_name = '${req.params.id}'`, err => {
        if(err){
            console.log(err);
        }

        db.query(`SELECT * FROM quiz where quiz_name = '${req.params.id}' `, (error, result) => {
            if(error){
                console.log(error);
            }
            res.render("quiz", { result, order: 0, score: 0 })
        })
    })
    
})

router.post("/quiz/:id/:Q/:S", (req, res) => {
    let score = parseInt(req.params.S);
    let order = req.params.Q;
    let postion = parseInt(req.params.Q) -1;
    let answer = req.body.q
    db.query(`SELECT * FROM quiz where quiz_name = '${req.params.id}' `, (err, result) => {
        if(err){
            console.log(err);
        }
        if(answer == result[postion].correct){
            score+= 1
            res.render("quiz", { result, order: order, score: score })
        }else{
            res.render("quiz", { result, order: order, score: score })
        }
        //res.render("quiz", { result, order: order })
    })
    
})

router.post("/quiz/:id/:Q/:S/end", (req, res) => {
    let score = parseInt(req.params.S);
    let order = req.params.Q;
    let postion = parseInt(req.params.Q) -1;
    let answer = req.body.q
    db.query(`SELECT * FROM quiz where quiz_name = '${req.params.id}' `, (err, result) => {
        if(err){
            console.log(err);
        }
        if(answer == result[postion].correct){
            score+= 1
            res.render("quizEnd", { result, score: score })
        }else{
            res.render("quizEnd", { result, score: score })
        }
        //res.render("quiz", { result, order: order })
    })
    
})

router.post("/quiz/like", (req,res) => {
    db.query(`UPDATE quiz SET likes = likes + 1 WHERE quiz_name = '${req.body.quizName}'`, err => {
        err ? console.log(err) : res.render("mainpage");
    })
})

router.post("/quiz/dislike", (req,res) => {
    db.query(`UPDATE quiz SET dislikes = dislikes + 1 WHERE quiz_name = '${req.body.quizName}'`, err => {
        err ? console.log(err) : res.render("mainpage")
    })
})


module.exports = router;