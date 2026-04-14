const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost:27017/studentDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be greater than 18']
    }
});
const Student = mongoose.model('Student', studentSchema);


const student1 = new Student({
    name: 'Rahul',
    age: 19
});

student1.save()
    .then(() => console.log('Student saved'))
    .catch(err => console.error('Validation Error:', err.message));