const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require('body-parser');
app.use(express.static('public'));

//Connection a changer avec la version Sqlite
let db = new sqlite3.Database('./blog', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to blog database.');
});
//Utilisation de body-parser par le serveur
app.use(bodyparser.urlencoded({
    extended: false
}));

// Définition du moteur de template
app.set('view engine', 'slm');

// Définition de la route racine
app.get("/", function (req, res) {
    //recup de la liste des posts changé
    let sqlListPost = "SELECT titre,corps, date_Post AS date_formated,id_Post FROM Post ORDER BY id_Post DESC";
    db.serialize(() => {
        db.all(sqlListPost, (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row.length > 0) {
                //console.log(results);
                res.render("index", {
                    listPost: row
                });
            } else {
                console.log("Pas de données");
                res.render('index');
            }
        });
    });
});

// Suppression des posts changé
app.post("/", function (req, res) {
    console.log('del: ' + req.body.del);
    if (req.body.del) {
        let sqlDeleteComm = 'DELETE FROM Commentaire WHERE id_Post=' + req.body.del + ';';
        let sqlDeletePost = 'DELETE FROM Post WHERE id_Post=' + req.body.del + ';';

        db.serialize(() => {
            db.all(sqlDeleteComm, (err, row) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                db.serialize(() => {
                    db.all(sqlDeletePost, (err, row) => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        res.redirect("/");
                    });
                });
            });
        });
    }
});

// Définition de la route 'ajout post'
app.get("/addpost", function (req, res) {
    res.render("addpost");
});

// Ajout d un post ( a changer)

app.post("/addpost", function (req, res) {
    let sqlCreatePost = 'INSERT INTO Post (titre,corps,date_Post,id_User) VALUES("' + req.body.titre + '","' + req.body.corps + '",NOW(),1)';
    connection.query(sqlCreatePost, function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/");
    });
});

app.get("/addcomment/:id", function (req, res) {
    console.log(req.params.id)
    res.render("addcomment", {
        id: req.params.id
    });
});
// Morceau pour ajouter un commentaire ( a changer )
app.post("/addcomment/:id", function (req, res) {
    let sqlAddComm = 'INSERT INTO Commentaire (corps_Commentaire, date_Commentaire, id_Post, id_User) VALUES ("' + req.body.corps + '",NOW(),' + req.params.id + ',1);'
    connection.query(sqlAddComm, function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/read/" + req.params.id);
    });
});

//Test unitaire 
/*var gimme = connection.query(function (error, results, fields) {
    return connection.state;
})

module.exports = gimme; */

//Si on clique sur un post, on l'affiche dans la nouvelle page "read" ( a changer )
app.get('/read/:id', function (req, res) {
    console.log(req.params);
    let sqlAffPost = "SELECT titre,corps,date_Post AS date_formated,id_Post FROM Post WHERE id_Post = " + req.params.id;
    let sqlAffComm = "SELECT corps_Commentaire,date_Commentaire AS datec_formated, id_Commentaire FROM Commentaire WHERE id_Post = " + req.params.id;
    db.serialize(() => {
        db.all(sqlAffPost, (err, resultp) => {
            if (err) {
                console.error(err.message);
                return;
            }
            db.serialize(() => {
                db.all(sqlAffComm, (err, resultc) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    if (resultc.length > 0) {
                        res.render("read", {
                            post: resultp,
                            comments: resultc
                        });
                        return (resultc);
                    } else {
                        res.render("read", {
                            post: resultp
                        });
                    }

                });
            });
        });
    });

});

// Ouverture de la connexion mysql
/*connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

// Fermeture de la connexion mysql
connection.end(function (err) {
    if (err) {
        return console.log('error: ' + err.message);
    }
    console.log('Close the database connection.');
});*/

// Lancement du serveur
const server = app.listen(3000, (req, res) =>
    console.log('Server Ready')
);
