const DENOM = [
    { name: 'ONE HUNDRED', val: 100.00 },
    { name: 'TWENTY', val: 20.00 },
    { name: 'TEN', val: 10.00 },
    { name: 'FIVE', val: 5.00 },
    { name: 'ONE', val: 1.00 },
    { name: 'QUARTER', val: 0.25 },
    { name: 'DIME', val: 0.10 },
    { name: 'NICKEL', val: 0.05 },
    { name: 'PENNY', val: 0.01 }
];

const STATUS = { open: "OPEN", insufficient: "INSUFFICIENT_FUNDS", close: "CLOSED" }

function checkCashRegister(price, cash, cid) {
    // Here is your change, ma'am.
    let output = { status: '', change: [] };

    const totalCashInDrawer = cid.reduce((total, currency) => currency[1] + total, 0);
    const changesNeedTobeReturn = cash - price;


    let checkTransactionStatus = transactionStatus(totalCashInDrawer, changesNeedTobeReturn);
    console.log(checkTransactionStatus)

    switch (checkTransactionStatus) {
        case 'OPEN':
            insufOrOpenStatus(output, changesNeedTobeReturn, cid);
            break;
        case 'INSUFFICIENT_FUNDS':
            insufficientStatus(output);
            break;
        case 'CLOSED':
            closeStatus(output, cid);
            break;
    }

    return output;
}

//Return Transaction status
//open, close, insufficient
function transactionStatus(totalCashInDrawer, changesNeedTobeReturn) {

    if (totalCashInDrawer === changesNeedTobeReturn) {
        return STATUS.close
    }

    if (totalCashInDrawer < changesNeedTobeReturn) {
        return STATUS.insufficient;
    }

    return STATUS.open;
}

//output status to be display
//according to transaction status
function closeStatus(output, totalCashInDrawer) {
    output.status = STATUS.close;
    output.change = totalCashInDrawer;
    return output;
}

function insufficientStatus(output) {
    output.status = STATUS.insufficient;
    output.change = [];
    return output;
}

function insufOrOpenStatus(output, changesNeedTobeReturn, totalCashInDrawer) {
    output.change = variationInChanges(changesNeedTobeReturn, totalCashInDrawer)
    if (output.change[1] > 0) {
        output.status = STATUS.insufficient;
        output.change = [];
        return output
    } else {
        output.status = STATUS.open;
        return output.change;
    }
}




function variationInChanges(change, totalCashInDrawer) {
    let change_arr = []
    let cashInRegister = {};

    //converting totalCashInDrawer to object  from array
    for (let denomination of totalCashInDrawer) {
        cashInRegister[denomination[0]] = denomination[1]
    }

    DENOM.forEach((curr) => {
        let value = 0;
        //keep looping untill cash in drawer exhaust
        while (cashInRegister[curr.name] > 0 && change >= curr.val) {
            change -= curr.val;
            cashInRegister[curr.name] -= curr.val;
            value += curr.val;

            // Round change to the nearest hundreth deals with precision errors
            change = Math.round(change * 100) / 100;

        }
        // Add this denomination to the output only if any was used.
        if (value > 0) {
            change_arr.push([curr.name, value]);
        }
    });

    if (change_arr.length < 1 || change > 0) {
        change_arr.push(change)
    }
    return change_arr;

}





/*const currencyDictionary = {
    };
*/
console.log(
    //checkCashRegister(19.5, 20, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ])
    //checkCashRegister(19.5, 20, [ ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0] ])
    //checkCashRegister(3.26, 100, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ])
);