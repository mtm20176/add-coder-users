# create-users-from-csv

A Node script for [Coder](coder.com) admins to mass-add users to a Coder deployment.

_Note: This project is a demo and is not actively maintained. It can be used as a reference however, to start with the Coder API._

# Create Users from CSV for Coder Enterprise

This Node script can be used on Coder Enterprise to add users in bulk to the Coder deployment, based on a csv. It requires the `.csv` file with user data (see example-import.csv). It **requires** a Coder Token for a Site Manager on your Coder deployment.

## How to run

- Install the node modules
  - `npm install`
- Create `.env` with needed variables based on `.env.example`
  - The `INPUT_FOLDER` specified will be where you should store your `import-csv(s)`. This is to allow you to version control them if you prefer and keep an audit of when the imports were done and who was added (similar to a DB Migration)
- Run the script:
  - `node create-users-from-csv.js --csv <filename.csv>`
- You can log the output of the terminal to a file:
  - `node create-users-from-csv.js --csv <filename.csv> | tee output_file`

## Import CSV layout

The script requires you provide a `csv` in the following format and place it in the `/users` directory. There is an `user-import.csv.example` for reference in the `/users` directory:

`Filename: user-import-<epoch_timestamp>.csv`

```csv
Email, LoginType,GivenName,TempPassword,Username
jsmith@company.com,"built-in",John Smith,ch4ng3m3,jsmith
another@company.com,"built-in",Jane Doe,c0d3r1337,another
someEmail,someLoginType,someName,someTempPassword,someUsername
...
```

## Caveats and notes

- This script requires that the `CODER_TOKEN` provided is for a Site Manager account
- The `user-import` csv(s) should live in the directory specified by the `.env`'s `INPUT_FOLDER` value
  - It's recommended that you append a timestamp of some sort to the end of the `csv`'s filename to make note of the date the import was done
- This script adds every member to the default organization, additional organization membership is not currently supported
- This script sets the tempPassword to the value provided in the CSV, but the user is prompted to reset their password automatically the first time they log in
