var express = require('express');
var bodyParser = require('body-parser');

var db = require('mysql');
var connection = db.createConnection({
    user: 'dirgepye',
    host: '127.0.0.1',
    database: 'addressbook'
});

var app = express();
app.use(bodyParser.json());

app.use(function(request, response, next) {
    request.accountId = 1;
    next();
});


// Exercise 8



// PHONES
app.get('/Phone/:id', function(request, response) {

    //console.log(request.body.entryId);
    connection.query('SELECT * FROM Phone JOIN Entry ON Phone.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Phone.id = ' + request.params.id, function(err, result) {
        // console.log(result[0]);
        // console.log(err);
        if (err) {
            response.status(404).send("Sorry this address can't be retrieved");
        }
        else {
            response.json(result[0]);
        }
    });
});


app.put('/Phone/:id', function(request, response) {
    connection.query('SELECT * FROM Phone JOIN Entry ON Phone.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Phone.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.sendStatus(402);
        }
        else if (result.length === 0) {
            response.send("length is 0");

        }
        else {
            connection.query('UPDATE Phone SET type ="' + request.body.type + '", subtype = "' + request.body.subtype + '", phoneNumber = "' + request.body.phoneNumber + '" where id =' + request.params.id, function(err, res) {
                console.log(err);
                if (err) {
                    response.sendStatus(402);
                }

                else if (res.affectedRows === 0) {
                    response.sendStatus(404);
                }
                else {
                    connection.query('SELECT * FROM Phone WHERE id = ' + request.params.id, function(err, res) {
                        if (err) {
                            response.send("error");
                        }
                        else {
                            response.json(res[0]);
                        }
                    });
                }
            });
        }
    });
});


app.delete('/Phone/:id', function(request, response) {
    connection.query('SELECT * FROM Phone JOIN Entry ON Phone.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Phone.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.send("error at first query");
        }
        else if (result.length === 0) {
            response.send("result is 0");
        }
        else {
            connection.query('DELETE FROM Phone WHERE id = ' + request.params.id, function(err, result) {
                console.log(err);
                if (err) {
                    response.send("error at second query");
                }
                else if (result.length === 0) {
                    response.send("result is 0 at second query");
                }
                else {

                    response.json({
                        success: true
                    });
                }
            });
        }
    });
});


app.post('/Phone', function(request, response) {
    console.log(request.body);
    if (request.body) {

        connection.query('SELECT * FROM Email JOIN Entry ON Email.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId, function(err, result) {
            //  response.json(row);
            if (err) {
                response.sendStatus(402);
            }

            else if (result.affectedRows === 0) {
                response.sendStatus(404);
            }

            else /*(result[0].accountId === request.accountId) */ {
                connection.query('INSERT INTO Phone (entryId, type, subtype, phoneNumber) VALUES ("' + request.body.entryId + '", "' + request.body.type + '", "' + request.body.subtype + '", "' + request.body.phoneNumber + '")', function(err, res) {
                    // connection.query('INSERT INTO Email set type="' + request.body.type + '", address="' + request.body.address + '" FROM Entry JOIN Email ON Email.entryId = Entry.id WHERE Entry.addressbookI =' + request.accountId, function(err, res) {
                    console.log(err);
                    if (err) {
                        response.send("errorrororo");
                    }
                    else {
                        response.json({
                            success: true
                        });
                    }
                });

            }

        });

    }
});

// ADDRESS

app.get('/Address/:id', function(request, response) {

    //console.log(request.body.entryId);
    connection.query('SELECT * FROM Address JOIN Entry ON Address.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Address.id = ' + request.params.id, function(err, result) {
        // console.log(result[0]);
        // console.log(err);
        if (err) {
            response.status(404).send("Sorry this address can't be retrieved");
        }
        else {
            response.json(result[0]);
        }
    });
});

app.put('/Address/:id', function(request, response) {
    connection.query('SELECT * FROM Address JOIN Entry ON Address.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Address.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.sendStatus(402);
        }
        else if (result.length === 0) {
            response.send("length is 0");

        }
        else {
            connection.query('UPDATE Address SET type ="' + request.body.type + '", line1 = "' + request.body.line1 + '", line2 = "' + request.body.line2 + '", city = "' + request.body.city + '", state = "' + request.body.state + '", zip = "' + request.body.zip + '", country = "' + request.body.country + '" where id =' + request.params.id, function(err, res) {
                console.log(err);
                if (err) {
                    response.sendStatus(402);
                }

                else if (res.affectedRows === 0) {
                    response.sendStatus(404);
                }
                else {
                    connection.query('SELECT * FROM Address WHERE id = ' + request.params.id, function(err, res) {
                        if (err) {
                            response.send("error");
                        }
                        else {
                            response.json(res[0]);
                        }
                    });
                }
            });
        }
    });
});


app.delete('/Address/:id', function(request, response) {
    connection.query('SELECT * FROM Address JOIN Entry ON Address.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Address.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.send("error at first query");
        }
        else if (result.length === 0) {
            response.send("result is 0");
        }
        else {
            connection.query('DELETE FROM Address WHERE id = ' + request.params.id, function(err, result) {
                console.log(err);
                if (err) {
                    response.send("error at second query");
                }
                else if (result.length === 0) {
                    response.send("result is 0 at second query");
                }
                else {

                    response.json({
                        success: true
                    });
                }
            });
        }
    });
});


app.post('/Address', function(request, response) {
    console.log(request.body);
    if (request.body) {

        connection.query('SELECT * FROM Address JOIN Entry ON Address.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId, function(err, result) {
            //  response.json(row);
            if (err) {
                response.sendStatus(402);
            }

            else if (result.affectedRows === 0) {
                response.sendStatus(404);
            }

            else /*(result[0].accountId === request.accountId) */ {
                connection.query('INSERT INTO Address (entryId, type, line1, line2, city, state, zip, country) VALUES ("' + request.body.entryId + '", "' + request.body.type + '", "' + request.body.line1 + '", "' + request.body.line1 + '", "' + request.body.city + '", "' + request.body.state + '", "' + request.body.zip + '", "' + request.body.country + '")', function(err, res) {                 
                    
                    console.log(err);
                    if (err) {
                        response.send("errorrororo");
                    }
                    else {
                        response.json({
                            success: true
                        });
                    }
                });

            }

        });

    }
});


// EMAILS 



app.delete('/Email/:id', function(request, response) {
    connection.query('SELECT * FROM Email JOIN Entry ON Email.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Email.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.send("error at first query");
        }
        else if (result.length === 0) {
            response.send("result is 0");
        }
        else {
            connection.query('DELETE FROM Email WHERE id = ' + request.params.id, function(err, result) {
                console.log(err);
                if (err) {
                    response.send("error at second query");
                }
                else if (result.length === 0) {
                    response.send("result is 0 at second query");
                }
                else {

                    response.json({
                        success: true
                    });
                }
            });
        }
    });
});



app.put('/Email/:id', function(request, response) {
    connection.query('SELECT * FROM Email JOIN Entry ON Email.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Email.id = ' + request.params.id, function(err, result) {
        console.log(err);
        if (err) {
            response.sendStatus(402);
        }
        else if (result.length === 0) {
            response.send("length is 0");

        }
        else {
            connection.query('UPDATE Email SET type ="' + request.body.type + '", address = "' + request.body.address + '" where id = ' + request.params.id, function(err, res) {
                console.log(err);
                if (err) {
                    response.sendStatus(402);
                }

                else if (res.affectedRows === 0) {
                    response.sendStatus(404);
                }
                else {
                    connection.query('SELECT * FROM Email WHERE id = ' + request.params.id, function(err, res) {
                        if (err) {
                            response.send("error");
                        }
                        else {
                            response.json(res[0]);
                        }
                    });
                }
            });
        }
    });
});



app.get('/Email/:id', function(request, response) {

    console.log(request.body.entryId);
    connection.query('select * From Email JOIN Entry on Entry.id = Email.entryId JOIN AddressBook ON Entry.addressbookId = AddressBook.id where Email.id = ' + request.params.id, function(err, row) {
        console.log(err);
        if (err) {
            response.sendStatus(402);
        }
        else(row[0].accountId === request.accountId)
        response.send(row);
    });
});


app.post('/Email', function(request, response) {
    // console.log(request.body);
    // if (request.body) {

    connection.query('SELECT * FROM Email JOIN Entry ON Email.entryId = Entry.id JOIN AddressBook ON Entry.addressbookId = AddressBook.id WHERE AddressBook.accountId = ' + request.accountId + ' AND Email.id = ' + request.params.id, function(err, result) {
        //  response.json(row);
        if (err) {
            response.sendStatus(402);
        }
        else if (result[0].accountId === request.accountId) {
            connection.query('INSERT INTO Email (entryId, type, address) VALUES ("' + request.body.entryId + '", "' + request.body.type + '", "' + request.body.address + '")', function(err, res) {
                // connection.query('INSERT INTO Email set type="' + request.body.type + '", address="' + request.body.address + '" FROM Entry JOIN Email ON Email.entryId = Entry.id WHERE Entry.addressbookI =' + request.accountId, function(err, res) {
                console.log(err);
                if (err) {
                    response.send("errorrororo");
                }
                else if (res.affectedRows === 0) {
                    response.sendStatus(404);
                }
                else {
                    response.json({
                        id: res.insertId,
                        type: request.body.type,
                        address: request.body.address
                    });
                }
            });

        }

    });
});

// Exercise 7

app.post('/Entries', function(request, response) {
    console.log(request.body);
    if (request.body) {
        connection.query('INSERT INTO Entry set firstName="' + request.body.firstName + '", lastName="' + request.body.lastName + '", birthday="' + request.body.birthday + '", addressbookId=' + request.accountId, function(err, res) {
            console.log(err);
            if (err) {
                response.send(402);
            }
            else if (res.affectedRows === 0) {
                response.sendStatus(404);
            }
            else {
                response.json({
                    id: res.insertId,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    birthday: request.body.birthday
                });
            }
        });
    }
    else {
        response.sendStatus(404);
    }
});
// Exercise 6

app.put('/AddressBook/:id', function(request, response) {
    if (request.body) {
        connection.query('UPDATE AddressBook SET name ="' + request.body.name + '" where id = ' + request.params.id + " AND accountId = " + request.accountId, function(err, res) {
            console.log(err);
            if (err) {
                response.sendStatus(402);
            }

            else if (res.affectedRows === 0) {
                response.sendStatus(404);
            }
            else {
                response.json({
                    id: request.params.id,
                    newName: request.body.name
                });
            }
        });
    }
})


// Exercise 5

app.delete('/AddressBook/:id', function(request, response) {
    if (request.body) {
        connection.query('DELETE FROM AddressBook WHERE id ="' + request.params.id + '" AND accountId =' + request.accountId, function(err, res) {
            console.log(res);
            if (err) {
                response.send("error");
            }
            else if (res.affectedRows === 0) {
                response.sendStatus(404);

            }
            else {
                response.json({
                    success: true
                });
            }
        });
    }
});


//Exercise 4

app.post('/AddressBook', function(request, response) {
    console.log(request.body);
    if (request.body) {
        connection.query('INSERT INTO AddressBook set name="' + request.body.name + '", accountId =' + request.accountId, function(err, res) {
            if (err) {
                response.send("error");
            }
            else {
                response.json({
                    id: res.insertId,
                    name: request.body.name
                });
            }
        });
    }
    else {
        response.sendStatus(404);
    }
});

// EXERCISE 3

app.get('/AddressBook/:id', function(request, response) {

    connection.query('SELECT * FROM AddressBook WHERE id =' + request.params.id + ' and accountId =' + request.accountId, function(err, res) {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else if (res.length === 0) {
            response.send("404 Not Authorized");
        }
        else {
            response.send(res);
        }
    });
});




// app.get('...


var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
