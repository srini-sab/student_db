const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());


const FULL_NAME = "srinidhi_s";  
const DOB = "04042004";         
const EMAIL = "srinidhi.s2022c@vitstudent.ac.in";
const ROLL_NUMBER = "22BLC1020";

function alternatingCapsReverse(str) {
  let chars = str.split("").reverse();
  return chars.map((ch, i) =>
    i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    let odd = [], even = [], alphabets = [], special = [];
    let sum = 0;
    let alphaConcat = "";

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even.push(item);
        } else {
          odd.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
      
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        special.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(alphaConcat)
    };

    res.status(200).json(response);

  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
