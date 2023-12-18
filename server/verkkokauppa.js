require('dotenv').config()
const axios = require('axios');


const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const bodyParser = require('body-parser');

var express = require('express');
const e = require('cors');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static('images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: false,
    timezone: '+00:00'
}



/**
 * Gets the products
 * Optional category query parameter for filtering only products from that category
 */
app.get('/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf);

        const category_type = req.query.category_type;
        const category = req.query.category;
        const query = req.query.query;

        let result;        

        if(category_type && category){
            // Fetching products by category_type AND category
            result = await connection.execute("SELECT id, product_name productName, price, image_url imageUrl, category, category_type, product_description description FROM product WHERE category_type=? AND category=?", [category_type, category]);
       
        } else if (category_type) {  
            // Fetching products by category type
            result = await connection.execute("SELECT id, product_name productName, price, image_url imageUrl, category, category_type,  product_description description FROM product WHERE category_type=? AND category=?", [category_type]);

        } else if (query) {  
            // Tarkista, onko tuotteen nimi tai kuvaus sisällytetty hakukyselyyn
            result = await connection.execute("SELECT id, product_name AS productName, price, image_url AS imageUrl, category, category_type, product_description description FROM product WHERE product_name LIKE ? OR product_name LIKE ?", [`%${query}%`, `%${query}%`]);

        }else{
            result = await connection.execute("SELECT id, product_name productName, price, image_url imageUrl, category, category_type, product_description description FROM product");
            console.log('else-haara');
        }
        
        //First index in the result contains the rows in an array
        res.json(result[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Yksittäisen tuoteen tietojen haku tuotesivulle

app.get('/product/:productId', async (req, res) => {
    try {
      const connection = await mysql.createConnection(conf);
      const productId = req.params.productId;

      console.log(req.params.productId)
  
      const [rows] = await connection.execute('SELECT * FROM product WHERE id = ?', [productId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        const productDetails = rows[0];
        res.json(productDetails);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


/**
 * Gets all the categories
 */

app.get('/categories', async (req, res) => {

    try {
            const connection = await mysql.createConnection(conf);
    
            const category_type = req.query.category_type;
    
            let result;        
    
            if(category_type){
                result = await connection.execute("SELECT category_type, category_name categoryName, category_description description FROM product_category WHERE category_type=?", [category_type]);
            }else{
                result = await connection.execute("SELECT category_type, category_name categoryName, category_description description FROM product_category");
            }
            
        /*const connection = await mysql.createConnection(conf);

        /*const [rows] = await connection.execute("SELECT category_name categoryName, category_description description FROM product_category");*/

        /*const [rows] = await connection.execute("SELECT category_type, category_name categoryName, category_description description FROM product_category");*/

        //First index in the result contains the rows in an array
        res.json(result[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/customer', async(req,res) => {

    //Get the bearer token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    //Verify the token. Verified token contains username
    try{
        const username = jwt.verify(token, process.env.JWT_KEY).username;
        const connection = await mysql.createConnection(conf);
        const [rows] = await connection.execute('SELECT first_name fname, last_name lname, username, id customer_id FROM customer WHERE username=?',[username]);
        res.status(200).json(rows[0]);
    }catch(err){
        console.log(err.message);
        res.status(403).send('Access forbidden.');
    }
  });

/**
 * Adds new product categories
 */
app.post('/categories', async (req, res) => {

    const connection = await mysql.createConnection(conf);

    try {
        
        connection.beginTransaction();
        const categories = req.body;
        
        for (const category of categories) {
            // Check if the category already exists
            const [existingCategory] = await connection.execute('SELECT * FROM product_category WHERE category_name = ? AND category_type = ?',[category.category_name, category.category_type]
        );

        if (existingCategory.length > 0) {
            // Category with the same name and type already exists, handle accordingly
            // Return error
            connection.rollback();
            return res.status(400).json({ error: 'Tuoteryhmä, jolla on sama tuoteryhmän nimi ja tyyppi on jo olemassa. Tuoteryhmää ei lisätty.' });
        }

        // Insert the new category if it doesn't already exist
        await connection.execute('INSERT INTO product_category (category_name, category_type, category_description) VALUES (?,?,?)',[category.category_name, category.category_type, category.category_description]
        );
        }
    
        connection.commit();
        res.status(200).send("Categories added!");

    } catch (err) {
        connection.rollback();
        res.status(500).json({ error: err.message });
    }
});


/**
 * Adds new products */
app.post('/products', async (req, res) => {

    const connection = await mysql.createConnection(conf);

    try {
        
        connection.beginTransaction();
        const products = req.body;
        

        for (const product of products) {
            await connection.execute("INSERT INTO product (product_name, price, image_url,category) VALUES (?,?,?,?)",[product.productName, product.price, product.imageUrl, product.category]);
        }
    
        connection.commit();
        res.status(200).send("Products added!");

    } catch (err) {
        connection.rollback();
        res.status(500).json({ error: err.message });
    }
});


/**
 * Place an order. 
 */
app.post('/order', async (req, res) => {

    let connection;

    try {
        connection = await mysql.createConnection(conf);
        connection.beginTransaction();

        const order = req.body;
        
        const [info] = await connection.execute("INSERT INTO customer_order (order_date, customer_id) VALUES (NOW(),?)",[order.customerId]);
        
        const orderId = info.insertId;

        for (const product of order.products) {
            await connection.execute("INSERT INTO order_line (order_id, product_id, quantity) VALUES (?,?,?)",[orderId, product.productId, product.quantity]);            
        }

        connection.commit();
        res.status(200).json({orderId: orderId});

    } catch (err) {
        connection.rollback();
        res.status(500).json({ error: err.message });
    }
});


//(Authentication/JWT could be done with middleware also)


/**
 * Registers user. Supports urlencoded and multipart
 */
app.post('/register', upload.none(), async (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const uname = req.body.username;
    const pw = req.body.pw;

    try {
        const connection = await mysql.createConnection(conf);

        const pwHash = await bcrypt.hash(pw, 10);

        const [rows] = await connection.execute('INSERT INTO customer(first_name,last_name,username,pw) VALUES (?,?,?,?)',[fname,lname,uname,pwHash]);

        res.status(200).end();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

/**
 * Checks the username and password and returns jwt authentication token if authorized. 
 * Supports urlencoded or multipart
 */
app.post('/login', upload.none(), async (req, res) => {
    const uname = req.body.username;
    const pw = req.body.pw;


    try {
        const connection = await mysql.createConnection(conf);

        const [rows] = await connection.execute('SELECT pw FROM customer WHERE username=?', [uname]);

        if(rows.length > 0){
            const isAuth = await bcrypt.compare(pw, rows[0].pw);
            if(isAuth){
                const token = jwt.sign({username: uname}, process.env.JWT_KEY);
                res.status(200).json({jwtToken: token});
            }else{
                res.status(401).end('User not authorized');
            }
        }else{
            res.status(404).send('User not found');
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * Gets orders of the customer
 */
app.get('/orders', async (req,res) => {
    
    //Get the bearer token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    //Verify the token. Verified token contains username
    try{
        const username = jwt.verify(token, process.env.JWT_KEY).username;
        const orders = await getOrders(username);
        res.status(200).json(orders);
    }catch(err){
        console.log(err.message);
        res.status(403).send('Access forbidden.');
    }
});

async function getOrders(username){
    try {
        const connection = await mysql.createConnection(conf);
        const [rows] = await connection.execute('SELECT customer_order.order_date AS date, customer_order.id as orderId FROM customer_order INNER JOIN customer ON customer.id = customer_order.customer_id WHERE customer.username=?', [username]);

        let result = [];

        for (const row of rows) {
            const [products] = await connection.execute("SELECT id,product_name productName,price,image_url imageUrl, category, quantity  FROM product INNER JOIN order_line ON order_line.product_id = product.id WHERE order_line.order_id=?", [row.orderId]);

            let order ={
                orderDate: row.date,
                orderId: row.orderId,
                products: products
            }

            result.push(order);
        }


        return result;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: err.message });
    }
}

app.post('/adminlogin', upload.none(), async (req, res) => {
    const uname = req.body.username;
    const pw = req.body.pw;


    try {
        const connection = await mysql.createConnection(conf);

        const [rows] = await connection.execute('SELECT pw FROM adminuser WHERE username=?', [uname]);

        if(rows.length > 0){
            const isAuth = await bcrypt.compare(pw, rows[0].pw);
            if(isAuth){
                const token = jwt.sign({username: uname}, 'mysecretkey');
                res.status(200).json({jwtToken: token});
            }else{
                res.status(401).end('Tarkista käyttäjätunnus ja salasana');
            }
        }else{
            res.status(404).send('Tarkista käyttäjätunnus ja salasana');
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Palaute lomakkeen tietojen tallennus tietokantaan//

app.post('/contact', async (req, res) => {
    try {
      const formData = req.body;
  
      // Tietokantayhteys
      const connection = await mysql.createConnection(conf);
  
      // Tietokantaan tallentaminen ja SQL komennot.
      const [result] = await connection.execute(
        'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)',
        [formData.name, formData.email, formData.message]
      );
  
      // Sulje tietokantayhteys
      connection.end();
  
      console.log('Kiitos palautteestasi! Otamme tarvittaessa yhteyttä sähköpostitse. -Stiilin Soppi:', formData);
      res.sendStatus(200);
      //Virheenkäsittely
    } catch (error) {
      console.error('Virhe lomakkeen tietojen tallennuksessa:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

});

//Palautteiden haku tietokannasta//

app.get('/feedback', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf);

        // Hae kaikki asiakaspalautteet tietokannasta
        const [feedbackRows] = await connection.execute('SELECT * FROM contact_form');

        // Palauta asiakaspalautteet JSON-muodossa
        res.status(200).json(feedbackRows);

    } catch (error) {
        console.error('Virhe asiakaspalautteiden hakemisessa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/feedback/:id', async (req, res) => {
    try {
      // Luodaan tietokantayhteys
      const connection = await mysql.createConnection(conf);
      
      const id = parseInt(req.params.id);
  
      // SQL-kysely asiakaspalautteen poistamiseksi tietokannasta
      const sql = 'DELETE FROM contact_form WHERE id = ?';
  
      // Suoritetaan SQL-kysely
      const [results] = await connection.execute(sql, [id]);
  
      // Tarkistetaan, kuinka monta riviä poistettiin
      console.log('Poistettuja rivejä:', results.affectedRows);
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Asiakaspalautetta ei löytynyt' });
      } else {
        res.status(204).send(); // Onnistunut, ei sisältöä
      }
  
      // Suljetaan tietokantayhteys
      connection.end();
    } catch (error) {
      console.error('Virhe asiakaspalautteen poistamisessa:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Tämä on Katrin tietokantaohjelmointia varten tehty koodi
// Lisää arvostelu tietokantaan
app.post('/reviews', async (req, res) => {
    try {
        // Poimitaan tarvittavat tiedot
        const { name, productId, rating, comment } = req.body;
        console.log(req.body);

        // Luodaan tietokantayhteys
        const connection = await mysql.createConnection(conf);
        // Suoritetaan SQL-kysely arvostelun lisäämiseksi tietokantaan
        await connection.execute('INSERT INTO reviews (name, productId, rating, comment) VALUES (?, ?, ?, ?)',
            [ name, productId, rating, comment]);

        // Lähetetään onnistumisviesti
        res.status(200).json({ message: 'Arvostelu lisätty onnistuneesti' });
    } catch (error) {
        // Käsitellään virheet
        console.error('Virhe arvostelun lisäämisessä:', error);
        res.status(500).json({ error: error.message} );
    }
});

// Tämä on Katrin tietokantaohjelmointia varten tehty koodi
// Hae arvostelut tietylle tuotteelle
app.get('/reviews/:productId', async (req, res) => {
    try {
        // Poimitaan productId
        const productId = req.params.productId;

        // Luodaan tietokantayhteys
        const connection = await mysql.createConnection(conf);
        // Suoritetaan SQL-kysely arvostelujen hakemiseksi tietylle tuotteelle
        const [reviewsRows] = await connection.execute('SELECT * FROM reviews WHERE productId = ?',
            [productId]);

        // Lähetetään onnistunut vastaus arvosteluista
        res.status(200).json({ reviews: reviewsRows });
    } catch (error) {
        // Käsitellään virheet
        console.error('Virhe arvostelujen hakemisessa:', error);
        res.status(500).json({ error: error.message });
    }
});
  