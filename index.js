// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// Array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
            validate: async (answer) => {
                if (answer.length < 1) {
                    return console.log("Your GitHub username is required.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
            validate: async (answer) => {
                if (answer.length < 1) {
                    return console.log("Your email address is required.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is your project\'s name?',
            validate: async (answer) => {
                if (answer.length < 1) {
                    return console.log("You must provide a title for your project.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a short description of your project?',
            validate: async (answer) => {
                if (answer.length < 1) {
                    return console.log("You must provide a description of your project.");
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ['None', 
                'Apache', 
                'GNU', 
                'MIT', 
                'Mozilla'],
        },
        {
            type: 'input',
            name: 'install',
            message: 'What command should be run to install dependencies?',
            default: 'npm i',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What command should be run to run tests',
            default: 'npm test',
        },
        {
            type: 'input',
            name: 'information',
            message: 'What does the user need to know about this repo?',
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'What does the user need to know about contributing to this repo?',
        },
    ]);
};

// Function to write README file
const generateMD = (answers) =>
  `# ${answers.title}

![badge](https://img.shields.io/badge/License-${answers.license}-brightgreen)

## Description
${answers.description}

## Table of Contents
  * [Installation](#installation)

  * [Usage](#usage)

  * [Contributing](#contributing)

  * [Tests](#tests)

  * [Questions](#questions)

## Installation
To install necessary dependencies run the following command:
\`\`\`bash
${answers.install}
\`\`\`

## Usage
${answers.information}

## Contributing
${answers.contribute}

## Tests
\`\`\`bash
${answers.tests}
\`\`\`

## Questions
If you have questions about this repo, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.github}](https://github.com/${answers.github}).

## License
${answers.license}`;

// Function to initialize app
const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('./utils/README.md', generateMD(answers)))
      .then(() => console.log('Successfully created README.md'))
      .catch((err) => console.error(err));
  };
  
// Function call to initialize app
init();