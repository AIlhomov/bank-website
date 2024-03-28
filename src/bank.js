/**
 * A module exporting functions to access the bank database.
 */
"use strict";

module.exports = {
    showBalance: showBalance,
    moveMoneyToAdam: moveMoneyToAdam,
    moveMoney: moveMoney //Used for helpers.js (DRY CODE)
};

const mysql  = require("promise-mysql");
const config = require("../config/db/bank.json");
let db;

/**
 * Main function.
 * @async
 * @returns void
 */
(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

/**
 * Show all entries in the account table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showBalance() {
    return findAllInTable("account");
}
/**
 *
 * @param {float} amount
 * @returns {RowDataPacket} Resultset from the query.
 */
async function moveMoneyToAdam(amount) {
    return moveMoney(1111, 2222, amount);
}

/**
 * Show all entries in the selected table.
 *
 * @async
 * @param {string} table A valid table name.
 *
 * @returns {RowDataPacket} Resultset from the query.
 */
async function findAllInTable(table) {
    let sql = `SELECT * FROM ??;`;
    let res;

    res = await db.query(sql, [table]);
    console.info(`SQL: ${sql} (${table}) got ${res.length} rows.`);

    return res;
}
/**
 *
 * @param {int} fromAccount
 * @param {int} toAccount
 * @param {float} amount
 * @returns {RowDataPacket} Resultset from the query.
 */
async function moveMoney(fromAccount, toAccount, amount) {
    let sql = `START TRANSACTION;

    UPDATE account
    SET
        balance = balance + ?
    WHERE
        id = ?;
    
    UPDATE account
    SET
        balance = balance - ?
    WHERE
        id = ?;
    
    COMMIT;`;
    let res;

    res = await db.query(sql, [amount, fromAccount, amount, toAccount]);
    console.info(`SQL: ${sql} (${fromAccount}, ${toAccount}, 
        ${amount}) affected ${res.affectedRows} rows.`);
    return res;
}
