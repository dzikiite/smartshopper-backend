import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import brands from './db-model/dbBrands.js';
import products from './db-model/dbProducts.js';
import users from './db-model/dbUsers.js'

// const
const CONNECTION_URL = 'mongodb+srv://admin:qOxEYxq3YgbEGfe2@cluster0.kdjl9.mongodb.net/smartshopper?retryWrites=true&w=majority';

//app cfg
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

//db cfg
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

//endpoints
app.get('/', (req, res) => res.status(200).send('api'));

app.get('/v1/brands', (req, res) => {
    brands.find((err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get('/v1/products', (req, res) => {
    products.find((err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get('/v1/users', (req, res) => {
    users.find((err, data) => {
        console.log(data);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/v2/brands', (req, res) => {
    const dbBrands = req.body;
    brands.create(dbBrands, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.post('/v2/products', (req, res) => {
    const dbProducts = req.body;
    products.create(dbProducts, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.post('/v2/users', (req, res) => {
    const dbUsers = req.body;
    users.create(dbUsers, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.delete('/v3/brands', (req, res) => {
    console.log(req);
    const deleteBrand = req.body.id;
    brands.findOneAndRemove({id: deleteBrand}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

// app.delete('/v3/products', (req, res) => {
//     const deleteProduct = req.body.map(product => product.id);
//     products.findOneAndRemove({id: deleteProduct}, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(201).send(data);
//         }
//     })
// })

//listen
app.listen(port, () => console.log(`test listening on local:${port}`));
