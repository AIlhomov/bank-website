"use strict";

const readline = require('readline-promise').default;
const helpers = require('./src/helpers.js');
const bank = require('./src/bank.js');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function exitProgram(exitcode=0) {
    console.log("Exiting program");
    process.exit(exitcode);
}

function showMenu() {
    console.log(`
        Choose something from the menu:
        exit, quit - Exit the program
        menu, help - Show this menu
        balance - Show balance for all accounts
        move - Move money from Adam to Eva
        move <amount> <from> <to> - Move money from one account to another

    `);
}


async function main() {
    rl.setPrompt('Bank: ');
    rl.prompt();

    rl.on("close", exitProgram);

    let result;

    rl.on('line', async function (input) {
        input = input.trim().toLowerCase();
        let parts = input.split(" ");

        switch (parts[0]) {
            case "quit":
            case "exit":
                exitProgram();
                break;
            case "menu":
            case "help":
                showMenu();
                break;
            case "move":
                if (parts.length > 3) {
                    if (parts[3] === "2222") {
                        console.log("Moving from Adam to Eva amount: " + parts[1]);
                        await bank.moveMoney(parts[3], parts[2], parts[1]);
                    } else if (parts[3] === "1111") {
                        console.log("Moving from Eva to Adam amount: " + parts[1]);
                        await bank.moveMoney(parts[3], parts[2], parts[1]);
                    } else {
                        console.log("Invalid account number");
                    }
                } else {
                    await helpers.moveMoneyToEva(1.5);
                    console.log("Money moved from Adam to Eva.");
                }
                break;
            case "balance":
                console.log("Show balance: ");
                result = await helpers.showBalance();
                console.table(result);
                break;
            default:
                console.log("I dont know this command, type 'menu' to seek help.");
                break;
        }
        rl.prompt();
    });
}

main();
