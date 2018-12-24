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
    }
];

const processPdf = async (pdfPath, stringToAdd) => {
    if (!fs.existsSync(path.join(pdfPath,`/parsed`))){
        await fs.mkdir(path.join(pdfPath,`/parsed`));
    }
    fs.readdir(pdfPath, (err, files) => {
        err ? console.log(err) : console.log(files);
        files.forEach((file) => {
            if (path.extname(file) === ".pdf") {
                let newPdf = new HummusRecipe(path.join(pdfPath,file), path.join(pdfPath,`/parsed/${file}.parsed.pdf`));
                newPdf
                    .editPage(1)
                    .text(stringToAdd, 330, 10,{
                        color: "#000000",
                        size: 10,
                        align: "top right",
                    })
                    .endPage()
                    .endPDF();
            }
        });
    });
}

cli
    .command("insert")
    .description("Inserts a specified string into the pdfs of a specified directory")
    .action(() => {
        prompt(stringToAddPrompt).then(answers => {
            console.log(answers.stringToAdd);
            processPdf(answers.pdfPath, answers.stringToAdd)
        });
    });

cli.parse(process.argv);

