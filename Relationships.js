const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/toplearn')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const Teacher = mongoose.model(
  'teacher',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  }),
);

const Course = mongoose.model(
  'course',
  new mongoose.Schema({
    name: String,
  }),
);

async function createTeacher(name, bio, website) {
  const author = new Teacher({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, teacher) {
  const course = new Course({
    name,
    teacher,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate('teacher', 'name bio -_id')
    .select('name teacher');
  console.log(courses);
}

// createTeacher('mohammad', 'bio', 'website');

// createCourse('NodeJs Api Course', );

listCourses();
