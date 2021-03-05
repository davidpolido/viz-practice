const csv = require("csv-parser");
const fs = require("fs");
const tidy = require("@tidyjs/tidy");
const d3 = require("d3");

let data = [];
const renames = {
  'HALTER_ID': "id",
  ALTER: "humanAge",
  GESCHLECHT: "humanSex",
  STADTKREIS: "cityDistrict",
  RASSE1: "breedMain",
  RASSE2: "breedSecondary",
  GEBURTSJAHR_HUND: "dogBirthyear",
  GESCHLECHT_HUND: "dogSex",
  HUNDEFARBE: "dogColor"
};

const smallTest = (data) => {
  const cleanData = tidy.tidy(data, tidy.rename(renames));
  console.log(cleanData);
};

fs.createReadStream("../data/20200306_hundehalter.csv")
  .pipe(csv())
  .on("data", (row) => {
    data.push(row);
  })
  .on("end", () => {
    smallTest(data);
    console.log("CSV file successfully processed");
  });

// d3.csv("../data/20170308hundehalter.csv", smallTest(data));
