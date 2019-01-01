#!/usr/bin/env node

const HummusRecipe = require('hummus-recipe');
const { prompt } = require("inquirer");
const fs = require("fs");
const cli = require("commander");
const path = require("path");

const stringToAddPrompt = [
    {
        type: "editor",
        name: "stringToAdd",
        message: "Enter a string to add to your pdfs."
    },
    {
        type: "input",
        name: "pdfPath",
        message: "Enter the path to the pdfs.",
        default: "/pdfsToParse"
    },
    {
        type: "input",
        name: "x",
        message: "Enter the x coordinate to place the text.",
        default: 300
    },
    {
        type: "input",
        name: "y",
        message: "Enter the y coordinate to place the text.",
        default: 30
    },
    {
        type: "input",
        name: "fontSize",
        message: "Enter a font size.",
        default: 10
    }
];

const processPdf = async (pdfPath, stringToAdd, xCoord, yCoord, fontSize) => {
    if (!fs.existsSync(path.join(pdfPath,`/parsed`))){
        await fs.mkdirSync(path.join(pdfPath,`/parsed`));
    }
    console.log(`Coordinates: ${xCoord},${yCoord} (x,y) \r\n`);
    fs.readdir(pdfPath, (err, files) => {
        err ? console.log(err) : console.log(`Target Files: ${files} \r\n`);
        files.forEach((file) => {
            if (path.extname(file) === ".pdf") {
                try{
                    let newPdf = new HummusRecipe(path.join(pdfPath,file), path.join(pdfPath,`/parsed/${file}.parsed.pdf`));
                    newPdf
                        .editPage(1)
                        .text(stringToAdd, parseInt(xCoord), parseInt(yCoord),{
                            color: "#000000",
                            size: parseInt(fontSize)
                        })
                        .endPage()
                        .endPDF();
                }
                catch(err){
                    console.log(`Error occurred on file: ${file}\r\n${err}\r\n\r\n`);
                }
            }
        });
    });
}

cli
    .command("insert")
    .description("Inserts a specified string into the pdfs of a specified directory")
    .action(() => {
        prompt(stringToAddPrompt).then(answers => {
            console.log(`String being added to the PDFs: ${answers.stringToAdd} \r\n`);
            processPdf(answers.pdfPath, answers.stringToAdd, answers.x, answers.y, answers.fontSize)
        });
    });

cli.parse(process.argv);

