const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'practical.html'));
});

let courses = [
  { Id: 101, Coursename: "Full Stack Development", Coursecode: "FSD201", Department: "CSE DS"},
  { Id: 102, Coursename: "Data Structures", Coursecode: "DSA202", Department: "CSE DS" }
];

app.get('/courses', (req, res) => {
  let html = `
    <link rel="stylesheet" href="/practical.css">
    <div class="box">
      <h2>All Courses</h2>
      <table>
        <tr>
          <th>Id</th>
          <th>Course Name</th>
          <th>Course Code</th>
          <th>Department</th>
        </tr>`;

  for (let c of courses) {
    html += `
        <tr>
          <td>${c.Id}</td>
          <td>${c.Coursename}</td>
          <td>${c.Coursecode}</td>
          <td>${c.Department}</td>
        </tr>`;
  }

  html += `
      </table>
      <br>
      <a href="/">+ Add New Course</a>
    </div>`;

  res.send(html);
});


app.post('/add', (req, res) => {
  courses.push({
    Id: req.body.Id,
    Coursename: req.body.Coursename,
    Coursecode: req.body.Coursecode,
    Department: req.body.Department
  });
  res.redirect('/courses');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});