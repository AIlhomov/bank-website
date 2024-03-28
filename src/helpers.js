"use strict";

const mysql  = require("promise-mysql");
const config = require("../config/db/bank.json");

const bank = require("./bank.js");

module.exports = {
    showBalance: showBalance,
    moveMoneyToEva: moveMoneyToEva
};

async function showBalance() {
    const db = await mysql.createConnection(config);
    let sql = `
        SELECT * FROM account;
    `;
    let res = await db.query(sql);

    return res;
}
async function moveMoneyToEva(balance) {
    return bank.moveMoney(2222, 1111, balance);
}


