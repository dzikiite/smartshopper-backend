import express from 'express';
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import cors from 'cors';
import { CONNECTION_URL } from './constants';

import brands from './db-model/dbBrands.js';
import products from './db-model/dbProducts.js';
import users from './db-model/dbUsers.js'

//app cfg
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

export const handler = serverless(app);

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
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get('/v1/products', (req, res) => {
    products.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.get('/v1/users', (req, res) => {
    users.find((err, data) => {
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
    const deleteBrand = req.body.id;
    brands.findOneAndRemove({id: deleteBrand}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.delete('/v3/products', (req, res) => {
    const deleteProduct = req.body.id;
    products.findOneAndRemove({id: deleteProduct}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.put('/v4/brands', (req, res) => {
    const editedBrand = req.body;
    brands.updateOne({id: editedBrand.id}, editedBrand, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})

app.put('/v4/products', (req, res) => {
    const editedProduct = req.body;
    products.updateOne({id: editedProduct.id}, editedProduct, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})


//listen
app.listen(port, () => console.log(`test listening on local:${port}`));
