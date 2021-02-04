require("dotenv").config();
const program = "-- create-users-from-csv --";
const argv = require("yargs").argv;
const fs = require("fs");
const csv = require("csv-parser");
const fetch = require("node-fetch");

// Parse .env
let baseUrl = process.env.CODER_ENDPOINT;
let createUserEndpoint = `${baseUrl}/v0/users`;
let sessionToken = process.env.CODER_TOKEN;
let inputBaseFolder = process.env.INPUT_FOLDER;
let userCsv = `${inputBaseFolder}/${argv.csv}`;

const csvPipe = fs.createReadStream(userCsv).pipe(csv());
const rowArray = [];

let email = "";
let loginType = "";
let givenName = "";
let tempPassword = "";
let username = "";

// Parse the CSV
csvPipe
  .on("data", async (row) => {
    try {
      const rowData = {
        Email: row.Email,
        LoginType: row.LoginType,
        GivenName: row.GivenName,
        TempPassword: row.TempPassword,
        Username: row.Username,
      };
      rowArray.push(rowData);
    } catch (err) {
      console.log(err);
    }
  })
  .on("end", async () => {
    for (const row in rowArray) {
      email = rowArray[row].Email;
      loginType = rowArray[row].LoginType;
      givenName = rowArray[row].GivenName;
      tempPassword = rowArray[row].TempPassword;
      username = rowArray[row].Username;

      // Set headers and body
      let options = {
        method: "POST",
        headers: {
          "Session-Token": `${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: `{"email":"${email}","login_type":"${loginType}","name":"${givenName}","password":"${tempPassword}","temporary_password":true,"username":"${username}"}`,
      };

      // Create user on Coder
      await fetch(createUserEndpoint, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => {
          throw err;
        });
    }
  });
