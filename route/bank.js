/**
 * Route for bank.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const bank    = require("../src/bank.js");

router.get("/", (req, res) => {
    res.redirect("bank/index"); //sends the user to the index page
});

router.get("/index", (req, res) => {
    let data = {
        title: "Welcome | The Bank"
    };

    res.render("bank/pages/index", data);
});

router.get("/balance", async (req, res) => {
    let data = {
        title: "Account balance | The Bank"
    };

    data.res = await bank.showBalance();

    res.render("bank/pages/balance", data);
});
router.get("/move-to-adam", async (req, res) => {
    let data = {
        title: "Move to Adam | The Bank"
    };

    data.res = await bank.moveMoneyToAdam(1.5);

    res.render("bank/pages/move-to-adam", data);
});
router.get("/style", (req, res) => {
    res.sendFile("style.css", { root: "public/style" });
}
);

router.get("/kmom06", (req, res) => {
    res.render("bank/pages/kmom06");
}
);

module.exports = router;
