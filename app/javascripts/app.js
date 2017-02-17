var accounts;
var account;

var receiverbalanceb;
var receiverbalancec;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var splitter = Splitter.deployed();

  splitter.getBalance.call(account, {from: account}).then(function(value) {
    //show alice balance
    var balance_element = document.getElementById("balance");
  //  balance_element.innerHTML = web3.eth.getBalance(account.valueOf());
    balance_element.innerHTML = value.valueOf();
    var account_element = document.getElementById("account");
    account_element.innerHTML = account.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var splitter = Splitter.deployed();
  var receiveradrb = document.getElementById("receiveradrb").value;
  var receiveradrc = document.getElementById("receiveradrc").value;
  var amount = parseInt(document.getElementById("amount").value);

//  setStatus(receiveradrb);
  setStatus("please wait for splitting money to your friend");

  splitter.transfer(receiveradrb, receiveradrc, amount, {from: account, gaslimit:21000, gasPrice:20000000000}).then(function() {
        refreshBalance(); // show alice balance
        setStatus("amount");
      //show current balance of Bob
       splitter.getBalance(receiveradrb, {from: receiveradrb}).then(function(receiverbalanceb) {
          var balance_element = document.getElementById("receiverbalanceb");
          balance_element.innerHTML = receiverbalanceb.valueOf();
          setStatus("done transfer to bob and carol");
        }).catch(function(e) {
           console.log(e);
           setStatus("Error check balance of bob.");
        });
      splitter.getBalance(receiveradrc, {from: receiveradrc}).then(function(receiveradrc) {
          var balance_element = document.getElementById("receiverbalancec");
          balance_element.innerHTML = receiveradrc.valueOf();
          setStatus("Transaction to Carol complete!");
        }).catch(function(e) {
          console.log(e);
          setStatus("Error check balance of carol.");
        });
  }).catch(function(e) {
     console.log(e);
     setStatus("Error sending coins to bob or carol");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    refreshBalance();

  });
}
