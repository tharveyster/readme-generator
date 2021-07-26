// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is your project\'s name?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a short description of your project?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ['None', 
                'Apache License 2.0', 
                'GNU General Public License v3.0', 
                'MIT License', 
                'BSD 2-Clause "Simplified" License', 
                'BSD 3-Clause "New" or "Revised" License', 
                'Boost Software License 1.0', 
                'Creative Commons Zero v1.0 Universal', 
                'Eclipse Public License 2.0', 
                'GNU Affero General Public License v3.0', 
                'GNU General Public License v2.0', 
                'GNU Lesser General Public License v2.1', 
                'Mozilla Public License 2.0', 
                'The Unlicense'],
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

// TODO: Create a function to write README file
//function writeToFile(fileName, data) { }
const generateMD = (answers) =>
  `# ${answers.title}

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
If you have questions about this repo, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.github}](https://github.com/${answers.github}).`;

// TODO: Create a function to initialize app
//function init() { }
const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateMD(answers)))
      .then(() => console.log('Successfully created README.md'))
      .catch((err) => console.error(err));
  };
  
// Function call to initialize app
init();