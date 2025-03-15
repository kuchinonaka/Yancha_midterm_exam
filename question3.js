const express = require('express');
//import fs to read git-basic.txt file
const fs = require('fs');
const path = require('path');

//express app
const app = express();

//define '/test' that returns a JSON
app.get('/test', (req, res) => {
  try {
    //read the content of git-basic.txt file
    const filePath = path.join(__dirname, '..', 'git-basic.txt');
    let name = '';
    
    if (fs.existsSync(filePath)) {
      name = fs.readFileSync(filePath, 'utf8').trim();
      console.log(`Found name in file: "${name}"`);
    } else {
      console.log('git-basic.txt not found at:', filePath);
      //try alt locations
      const altPaths = [
        path.join(__dirname, 'git-basic.txt'),
        path.join(process.cwd(), 'git-basic.txt')
      ];
      
      for (const altPath of altPaths) {
        if (fs.existsSync(altPath)) {
          name = fs.readFileSync(altPath, 'utf8').trim();
          console.log(`Found name in alternative location: "${name}"`);
          break;
        }
      }
      
      //placeholder if not found
      if (!name) {
        name = "YOUR NAME HERE";
        console.log('File not found in any location. Using placeholder name.');
      }
    }
    
    //return JSON response with name
    res.json({ message: `Express is working! ${name}` });
  } catch (error) {
    //err message
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Could not read name',
      details: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('http://localhost:3000/test');
});