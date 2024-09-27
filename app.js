const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve a form directly from the GET request without an HTML file
app.get("/", (req, res) => {
    res.send(`
        <h1>Enter Student Details</h1>
        <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required /><br /><br />

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required /><br /><br />

            <label for="subject1">Subject 1 Marks:</label>
            <input type="number" id="subject1" name="subject1" required /><br /><br />

            <label for="subject2">Subject 2 Marks:</label>
            <input type="number" id="subject2" name="subject2" required /><br /><br />

            <label for="subject3">Subject 3 Marks:</label>
            <input type="number" id="subject3" name="subject3" required /><br /><br />

            <button type="submit">Submit</button>
        </form>
    `);
});

// Handle form submission, calculate average, and display result
app.post("/submit", (req, res) => {
    const { name, email, subject1, subject2, subject3 } = req.body;

    // Calculate average of the 3 subjects
    const avg = (parseFloat(subject1) + parseFloat(subject2) + parseFloat(subject3)) / 3;

    // Display the result on the same page
    res.send(`
        <h1>Form Submitted Successfully!</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Average Marks:</strong> ${avg.toFixed(2)}</p>
        <a href="/">Go Back to Form</a>
    `);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});