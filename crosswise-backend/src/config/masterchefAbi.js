const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "crss",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_crssPerBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      }
    ],
    "name": "ChangeReferer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lpAmount",
        "type": "uint256"
      }
    ],
    "name": "CompoundAccumulated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "msgSender",
        "type": "address"
      }
    ],
    "name": "DeenlistToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EmergencyWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      }
    ],
    "name": "HarvestAccumulated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "msgSender",
        "type": "address"
      }
    ],
    "name": "ListToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      }
    ],
    "name": "MassCompoundRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      }
    ],
    "name": "MassHarvestRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      }
    ],
    "name": "MassStakeRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum SessionType",
        "name": "_sessionType",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "develop",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "buyback",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "liquidity",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "treasury",
            "type": "uint32"
          }
        ],
        "indexed": false,
        "internalType": "struct FeeRates",
        "name": "_feeRates",
        "type": "tuple"
      }
    ],
    "name": "SetFeeRates",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "develop",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyback",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "liquidity",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "treasury",
            "type": "address"
          }
        ],
        "indexed": false,
        "internalType": "struct FeeStores",
        "name": "_feeStores",
        "type": "tuple"
      }
    ],
    "name": "SetFeeStores",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "migrator",
        "type": "address"
      }
    ],
    "name": "SetMigrator",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum NodeType",
        "name": "nodeType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "node",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "msgSender",
        "type": "address"
      }
    ],
    "name": "SetNode",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "referralCommissionRate",
        "type": "uint256"
      }
    ],
    "name": "SetReferralCommissionRate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousTreasury",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newTreeausery",
        "type": "address"
      }
    ],
    "name": "SetTreasuryAddress",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_trustedForwarder",
        "type": "address"
      }
    ],
    "name": "SetTrustedForwarder",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "crssReferral",
        "type": "address"
      }
    ],
    "name": "SetcrssReferral",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "StakeAccumulated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum CollectOption",
        "name": "option",
        "type": "uint8"
      }
    ],
    "name": "SwitchCollectOption",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "crssAmount",
        "type": "uint256"
      }
    ],
    "name": "VestAccumulated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawVest",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_depositFeeRate",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalAllocPoint",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newCycle",
        "type": "uint256"
      }
    ],
    "name": "changePatrolCycle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      }
    ],
    "name": "changeReferrer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "delistToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "deposited",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "enlistToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "farmParams",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalAllocPoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "crssPerBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "bonusMultiplier",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum SessionType",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "feeRates",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "develop",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "buyback",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "liquidity",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "treasury",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeStores",
    "outputs": [
      {
        "internalType": "address",
        "name": "develop",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyback",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "liquidity",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
      }
    ],
    "name": "getMultiplier",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "getPairQuick",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getSubPooledCrss",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "toVest",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "toAccumulate",
            "type": "uint256"
          }
        ],
        "internalType": "struct SubPooledCrss",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "collectOption",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deposit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "accRewards",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalVest",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalMatureVest",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pendingCrss",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "rewardPayroll",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lpBalance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "crssBalance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalAccRewards",
            "type": "uint256"
          }
        ],
        "internalType": "struct UserState",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getVestList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "principal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "withdrawn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct VestChunk[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "harvestAccumulated",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "harvested",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pair",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "informOfPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastPatrolRound",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massCompoundRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massHarvestRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "rewards",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massStakeRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "rewards",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "migrate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "migrator",
    "outputs": [
      {
        "internalType": "contract IMigratorChef",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextNode",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pairs",
    "outputs": [
      {
        "internalType": "address",
        "name": "token0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "patrolCycle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "periodicPatrol",
    "outputs": [
      {
        "internalType": "bool",
        "name": "done",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "poolInfo",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "lpToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastRewardBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accCrssPerShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "depositFeeRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "sumAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Comp",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "PreComp",
            "type": "tuple"
          }
        ],
        "internalType": "struct Struct_OnOff",
        "name": "OnOff",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "sumAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Comp",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "PreComp",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Vest",
            "type": "tuple"
          }
        ],
        "internalType": "struct Struct_OnOn",
        "name": "OnOn",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "sumAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Vest",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Accum",
            "type": "tuple"
          }
        ],
        "internalType": "struct Struct_OffOn",
        "name": "OffOn",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "sumAmount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "bulk",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accPerShare",
                "type": "uint256"
              }
            ],
            "internalType": "struct SubPool",
            "name": "Accum",
            "type": "tuple"
          }
        ],
        "internalType": "struct Struct_OffOff",
        "name": "OffOff",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "prevNode",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_depositFeeRate",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalAllocPoint",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_crssReferral",
        "type": "address"
      }
    ],
    "name": "setCrssReferral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_referralCommissionRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nonVestBurnRate",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_stakeholders",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_compoundFeeRate",
        "type": "uint256"
      }
    ],
    "name": "setFeeParams",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum SessionType",
        "name": "_sessionType",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "develop",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "buyback",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "liquidity",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "treasury",
            "type": "uint32"
          }
        ],
        "internalType": "struct FeeRates",
        "name": "_feeRates",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "setFeeRates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "develop",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyback",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "liquidity",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "treasury",
            "type": "address"
          }
        ],
        "internalType": "struct FeeStores",
        "name": "_feeStores",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "setFeeStores",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IMigratorChef",
        "name": "_migrator",
        "type": "address"
      }
    ],
    "name": "setMigrator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum NodeType",
        "name": "nodeType",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "node",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "setNode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_referralCommissionRate",
        "type": "uint256"
      }
    ],
    "name": "setReferralCommissionRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_trustedForwarder",
        "type": "address"
      }
    ],
    "name": "setTrustedForwarder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "stakeAccumulated",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "staked",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "enum CollectOption",
        "name": "newOption",
        "type": "uint8"
      }
    ],
    "name": "switchCollectOption",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "trustedForwarder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "multiplierNumber",
        "type": "uint256"
      }
    ],
    "name": "updateMultiplier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "debt1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "debt2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accumulated",
        "type": "uint256"
      },
      {
        "internalType": "enum CollectOption",
        "name": "collectOption",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }
    ],
    "name": "vestAccumulated",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "vested",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_prevNode",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_nextNode",
        "type": "address"
      }
    ],
    "name": "wire",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "withdrawn",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawVest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "withdrawn",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

module.exports = abi