const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Adjust the limit as per your needs

mongoose.connect("mongodb+srv://userdb:userdb1@mydb.svdyvj5.mongodb.net/");

// Define multer middleware for file uploads
const upload = multer({ 
    dest: 'uploads/', // Adjust the destination directory as needed
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Error fetching users', message: err.message }));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        })
        .catch(err => res.status(500).json({ error: 'Error fetching user', message: err.message }));
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        })
        .catch(err => res.status(500).json({ error: 'Error updating user', message: err.message }));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json({ message: 'User deleted successfully' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Error deleting user', message: err.message }));
});

// POST route for creating a user with file upload
app.post("/createUser", upload.single('image'), (req, res) => {
    const { name, brand, rating, model, price, speed, gps, seatType, carType, desc } = req.body;
    const image = req.file ? req.file.path : null; // Assuming 'path' is the field containing the file path

    UserModel.create({ name, brand, rating, model, price, speed, gps, seatType, carType, desc, image })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: 'Error creating user', message: err.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
