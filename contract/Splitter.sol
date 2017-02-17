pragma solidity ^0.4.2;
import "ConvertLib.sol";
contract Splitter {

  address public owner;
  address  to;
  address  to2;
  uint value2;
  mapping (address => uint) balances;
  event Transfer(address indexed _from, address indexed _to, uint256 _value);


  function Splitter() {
    owner = msg.sender;
    balances[tx.origin] = 10000;
    balances[to] = 0;
    balances[to2] = 0;
  }

  function transfer(address to, address to2, uint value) returns(bool success) {
  if (balances[msg.sender] < value) return false;
  balances[msg.sender] -= value;
  value2 = value/2;
  balances[to] += value2;
  balances[to2] += value2;
  Transfer(msg.sender, to, value2);
  Transfer(msg.sender, to2, value2);
  return true;
  }

  function getBalance(address user) constant returns(uint balance) {
  return balances[user];
  }

}
