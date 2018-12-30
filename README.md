# Prerequisites
- Node.js installed

# Getting started

- You can use defaults for coordinates and fontsize by pressing the enter key.

1. `npm install -g insert-text-pdf` : It's vital that you use the `-g` flag as it's a tool to be used in the command line.
2. Open a shell (Powershell/cmd/bash etc)
3. `insert-text-pdf insert` : This is the actual command for inserting strings into the PDFs of a directory
4. Press enter and a text editor will pop up, type the string you want to insert into the pdfs in this editor, save it and then close the editor
5. Paste in the absolute path to the directory with the target PDFs
6. Enter a x coordinate to place the text at, this defaults to the middle of the page.
7. Enter a y coordinate to place the text at, this defaults to the top of the page.
8. Enter a font size for the text, this defaults to 10.
9. The processed PDFs can be found in a subdirectory inside the target directory called "parsed"
10. Profit, maybe?


# Commands

`insert-text-pdf insert` : This command inserts a string of text specified by the user into all of the PDFs of a given directory (also specified by the user)
 - Editor: Type the string you want to insert into the PDFs in this editor, save then close it. (Can be multiline)
 - Path: Type/Paste the absolute path to the directory that contains the target PDFs