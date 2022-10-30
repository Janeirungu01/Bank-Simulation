var balances = { Wanjiru: 0, Juma: 0, Linda: 0 };

init();
populateTable();

function init() {
    var clientDropdowns = document.getElementsByClassName("client_name");
    let clients = Object.keys(balances);
    let clientOptions = "";
    clients.map((client) => {
        clientOptions += ` <option value='${client}'>${client}</option>`;
    });

    for (element of clientDropdowns) {
        element.innerHTML = element.innerHTML + clientOptions;
    }
}

function deposit(amount, name) {
    var selectedClient =
        name || document.getElementById("deposit_client_name").value;
    var depositAmount = amount || document.getElementById("deposit_amount").value;
    if (!selectedClient) {
        //If you have not selected a client
        alert("Select a client first to deposit!");
        return 0;
    } else {
        if (!depositAmount) {
            alert("Please enter an amount to deposit");
            return 0;
        } else {
            balances = {
                ...balances,
                [selectedClient]: parseFloat(depositAmount) + parseFloat(balances[selectedClient]),
            };
            populateTable();
        }
    }
}

function withdraw(amount, name) {
    var selectedClient =
        name || document.getElementById("withdrawal_client_name").value;
    var withdrawalAmount =
        amount || document.getElementById("withdrawal_amount").value;
    if (!selectedClient) {
        //If you have not selected a client
        alert("Select a client first to withdraw from!");
        return 0;
    } else {
        if (!withdrawalAmount) {
            alert("Please enter an amount to withdraw");
            return 0;
        } else {
            let availableBalance = balances[selectedClient];
            if (availableBalance < withdrawalAmount) {
                alert(`Insufficient balance to withdraw ${withdrawalAmount} !`);
                return 0;
            } else {
                balances = {
                    ...balances,
                    [selectedClient]: availableBalance - withdrawalAmount,
                };
                populateTable();
            }
        }
    }
}

function transfer(amount, fromName, toName) {
    var fromClient =
        fromName || document.getElementById("from_client_name").value;
    var toClient = toName || document.getElementById("to_client_name").value;
    var transferAmount = parseFloat(
        amount || document.getElementById("transfer_amount").value
    );
    if (!fromClient) {
        //If you have not selected a client
        alert("Select a client first to send from!");
        return 0;
    }

    if (!toClient) {
        //If you have not selected a client
        alert("Select a client to send to!");
        return 0;
    }
    if (!transferAmount) {
        alert("Please enter an amount to transfer");
        return 0;
    } else {
        console.log(balances[fromClient]);
        console.log(balances[toClient]);
        console.log(transferAmount);
        let availableBalance = balances[fromClient];
        if (parseFloat(availableBalance) < parseFloat(transferAmount)) {
            alert(`Insufficient balance to transfer ${transferAmount} !`);
            return 0;
        }
        balances = {
            ...balances,
            [fromClient]: balances[fromClient] - transferAmount,
            [toClient]: balances[toClient] + transferAmount,
        };
        populateTable();
    }
}

function executeTransactions() {
    var lines = document.getElementById("transactions").value.split("\n");
    for (var j = 0; j < lines.length; j++) {
        console.log("Line " + j + " is " + lines[j]);
        let transDetails = lines[j].split(":");
        if (transDetails[0] == "DEPOSIT") {
            deposit(transDetails[2], transDetails[1]);
        }
        if (transDetails == "WITHDRAW") {
            withdraw(transDetails[2], transDetails[1]);
        }
        if (transDetails == "TRANSFER") {
            transfer(transDetails[3], transDetails[1], transDetails[2]);
        }

        console.log(transDetails);
    }
}

function populateTable() {
    let balancesTableBody = document
        .getElementById("balancesTable")
        .getElementsByTagName("tbody");

    let balancesTableBodyContent = "";

    Object.entries(balances).map((record) => {
        console.log(record);
        balancesTableBodyContent += `<tr><td>${record[0]}</td><td>${record[1]}</td></tr>`;
    });
    for (element of balancesTableBody) {
        element.innerHTML = balancesTableBodyContent;
    }
}