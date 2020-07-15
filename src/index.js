const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./data.json");

const response = chalk.bold.blue;
const TYPE = {
  PAGEHEADING: {
    I: "PAGEHEADING",
    R: chalk.white.bold
  },
  HEADING: {
    I: "HEADING",
    R: chalk.bgWhite.black
  },
  SUBHEADING: {
    I: "SUBHEADING",
    R: chalk.bold.red
  },
  CONTENT: {
    I: "CONTENT",
    R: chalk.cyanBright
  },
  TIMELINE: {
    I: "TIMELINE",
    R: chalk.grey
  },
  SEPERATOR: {
    I: "SEPERATOR",
    R: chalk.white
  }
};

const resumeOptions = {
    type: "list",
    name: "resumeOptions",
    message: "Please select an option from the list below...",
    choices: [...Object.keys(data), "Exit"]
};

function showResume() {
    log("\nHello! Welcome to my interactive npm resume", TYPE.HEADING.I);
    emptyLine(1);
    log("Pranshu Agrawal\nSenior Software Engineer, Paytm", TYPE.SEPERATOR.I);
    emptyLine(1);
    handleResume();
}

function log(message, type){
  if(!message) return;
  const r = TYPE[type].R;
  console.log(r(message));
}

function emptyLine(count=1){
  console.log(new Array(count).fill("").join("\n"));
}
  
function handleResume() {
    inquirer.prompt(resumeOptions).then(answer => {
      if (answer.resumeOptions == "Exit") return;
  
      const options = data[`${answer.resumeOptions}`];
      if (options) {
        emptyLine(2);
        log(answer.resumeOptions.toUpperCase(), TYPE.PAGEHEADING.I);
        log(new inquirer.Separator(), TYPE.SEPERATOR.I)
        options.forEach(info => {
          emptyLine(1);
          log(info.label, TYPE.HEADING.I);
          if(Array.isArray(info.timeline)){
            log(info.timeline.join(" - "), TYPE.TIMELINE.I);
          }
          const value = Array.isArray(info.value) ? info.value.join("\n") : info.value;
          log( value, TYPE.CONTENT.I);
        });
        emptyLine(2);
        log(new inquirer.Separator()+new inquirer.Separator(), TYPE.SEPERATOR.I)
      }
  
      inquirer
        .prompt({
          type: "list",
          name: "exitBack",
          message: "Go back or Exit?",
          choices: ["Back", "Exit"]
        }).then(choice => {
          if (choice.exitBack == "Back") {
            handleResume();
          } else {
            return;
          }
        });
    }).catch(err => console.log('Ooops,', err))
}
  
showResume();
