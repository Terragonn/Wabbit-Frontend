/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Resolver, ResolverInterface } from "../Resolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "taskTreasury_",
        type: "address",
      },
      {
        internalType: "address",
        name: "depositReceiver_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ethAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "marginLong_",
        type: "address",
      },
      {
        internalType: "address",
        name: "converter_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "checkLiquidate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkReset",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "converter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositReceiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ethAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "executeLiquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "executeReset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "marginLong",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "converter_",
        type: "address",
      },
    ],
    name: "setConverter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositReceiver_",
        type: "address",
      },
    ],
    name: "setDepositReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ethAddress_",
        type: "address",
      },
    ],
    name: "setEthAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marginLong_",
        type: "address",
      },
    ],
    name: "setMarginLong",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "taskTreasury_",
        type: "address",
      },
    ],
    name: "setTaskTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620015073803806200150783398101604081905262000034916200010f565b6200003f33620000a2565b600180546001600160a01b03199081166001600160a01b039788161790915560028054821695871695909517909455600380548516938616939093179092556005805484169185169190911790556004805490921692169190911790556200017f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200010a57600080fd5b919050565b600080600080600060a086880312156200012857600080fd5b6200013386620000f2565b94506200014360208701620000f2565b93506200015360408701620000f2565b92506200016360608701620000f2565b91506200017360808701620000f2565b90509295509295909350565b611378806200018f6000396000f3fe6080604052600436106101025760003560e01c80638da5cb5b11610095578063b19337a411610064578063b19337a414610298578063bd38837b146102b8578063e60a3213146102d8578063f2fde38b146102f8578063fc8c08511461031857600080fd5b80638da5cb5b1461022557806395b7b581146102435780639b0da5d514610263578063ae8cb7631461028357600080fd5b806358b27216116100d157806358b27216146101ad578063715018a6146101d05780637e0b09b1146101e557806386f041ba1461020557600080fd5b806323fac15e1461010e5780632b5d5e761461013057806341398b15146101505780635509708c1461018d57600080fd5b3661010957005b600080fd5b34801561011a57600080fd5b5061012e610129366004610fe5565b610338565b005b34801561013c57600080fd5b5061012e61014b366004610fe5565b61038d565b34801561015c57600080fd5b50600354610170906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561019957600080fd5b5061012e6101a8366004610fe5565b6103d9565b3480156101b957600080fd5b506101c2610475565b60405161018492919061105a565b3480156101dc57600080fd5b5061012e610672565b3480156101f157600080fd5b5061012e610200366004610fe5565b6106a8565b34801561021157600080fd5b50600554610170906001600160a01b031681565b34801561023157600080fd5b506000546001600160a01b0316610170565b34801561024f57600080fd5b5061012e61025e366004610fe5565b6106de565b34801561026f57600080fd5b5061012e61027e366004610fe5565b61072a565b34801561028f57600080fd5b506101c2610776565b3480156102a457600080fd5b5061012e6102b3366004610fe5565b6108f3565b3480156102c457600080fd5b50600454610170906001600160a01b031681565b3480156102e457600080fd5b50600154610170906001600160a01b031681565b34801561030457600080fd5b5061012e610313366004610fe5565b61093f565b34801561032457600080fd5b50600254610170906001600160a01b031681565b6000546001600160a01b0316331461036b5760405162461bcd60e51b815260040161036290611075565b60405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146103b75760405162461bcd60e51b815260040161036290611075565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6005546040516365189a7b60e11b81526001600160a01b038381166004830152600092839291169063ca3134f6906024015b600060405180830381600087803b15801561042557600080fd5b505af1158015610439573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104619190810190611189565b9150915061046f82826109da565b50505050565b600060606000600560009054906101000a90046001600160a01b03166001600160a01b0316636847e50b6040518163ffffffff1660e01b815260040160006040518083038186803b1580156104c957600080fd5b505afa1580156104dd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105059190810190611244565b905060005b81518110156106565760055482516001600160a01b039091169063ffec70af9084908490811061053c5761053c611279565b60200260200101516040518263ffffffff1660e01b815260040161056f91906001600160a01b0391909116815260200190565b60206040518083038186803b15801561058757600080fd5b505afa15801561059b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bf919061128f565b15610644576001637e0b09b160e01b8383815181106105e0576105e0611279565b602002602001015160405160240161060791906001600160a01b0391909116815260200190565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152909590945092505050565b8061064e816112c7565b91505061050a565b5060006040518060200160405280600081525092509250509091565b6000546001600160a01b0316331461069c5760405162461bcd60e51b815260040161036290611075565b6106a66000610bd8565b565b600554604051638ac5d4a360e01b81526001600160a01b0383811660048301526000928392911690638ac5d4a39060240161040b565b6000546001600160a01b031633146107085760405162461bcd60e51b815260040161036290611075565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146107545760405162461bcd60e51b815260040161036290611075565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b600060606000600560009054906101000a90046001600160a01b03166001600160a01b0316636847e50b6040518163ffffffff1660e01b815260040160006040518083038186803b1580156107ca57600080fd5b505afa1580156107de573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108069190810190611244565b905060005b81518110156106565760055482516001600160a01b0390911690632dbaacdc9084908490811061083d5761083d611279565b60200260200101516040518263ffffffff1660e01b815260040161087091906001600160a01b0391909116815260200190565b60206040518083038186803b15801561088857600080fd5b505afa15801561089c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c0919061128f565b156108e1576001635509708c60e01b8383815181106105e0576105e0611279565b806108eb816112c7565b91505061080b565b6000546001600160a01b0316331461091d5760405162461bcd60e51b815260040161036290611075565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146109695760405162461bcd60e51b815260040161036290611075565b6001600160a01b0381166109ce5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610362565b6109d781610bd8565b50565b600080805b8451811015610b5a5760008482815181106109fc576109fc611279565b60200260200101511115610b48576004548451610a69916001600160a01b031690869084908110610a2f57610a2f611279565b6020026020010151878481518110610a4957610a49611279565b60200260200101516001600160a01b0316610c289092919063ffffffff16565b60045485516000916001600160a01b03169063fcf5ee8d90889085908110610a9357610a93611279565b6020026020010151878581518110610aad57610aad611279565b60200260200101516040518363ffffffff1660e01b8152600401610ae69291906001600160a01b03929092168252602082015260400190565b602060405180830381600087803b158015610b0057600080fd5b505af1158015610b14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3891906112e2565b9050610b448382610d73565b9250505b80610b52816112c7565b9150506109df565b5060015460025460035460405163c1461d5760e01b81526001600160a01b03928316600482015290821660248201526044810184905291169063c1461d579083906064016000604051808303818588803b158015610bb757600080fd5b505af1158015610bcb573d6000803e3d6000fd5b5093979650505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b801580610cb15750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e9060440160206040518083038186803b158015610c7757600080fd5b505afa158015610c8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610caf91906112e2565b155b610d1c5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b6064820152608401610362565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663095ea7b360e01b179052610d6e908490610d86565b505050565b6000610d7f82846112fb565b9392505050565b6000610ddb826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610e589092919063ffffffff16565b805190915015610d6e5780806020019051810190610df9919061128f565b610d6e5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610362565b6060610e678484600085610e6f565b949350505050565b606082471015610ed05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610362565b843b610f1e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610362565b600080866001600160a01b03168587604051610f3a9190611313565b60006040518083038185875af1925050503d8060008114610f77576040519150601f19603f3d011682016040523d82523d6000602084013e610f7c565b606091505b5091509150610f8c828286610f97565b979650505050505050565b60608315610fa6575081610d7f565b825115610fb65782518084602001fd5b8160405162461bcd60e51b8152600401610362919061132f565b6001600160a01b03811681146109d757600080fd5b600060208284031215610ff757600080fd5b8135610d7f81610fd0565b60005b8381101561101d578181015183820152602001611005565b8381111561046f5750506000910152565b60008151808452611046816020860160208601611002565b601f01601f19169290920160200192915050565b8215158152604060208201526000610e67604083018461102e565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156110e9576110e96110aa565b604052919050565b600067ffffffffffffffff82111561110b5761110b6110aa565b5060051b60200190565b600082601f83011261112657600080fd5b8151602061113b611136836110f1565b6110c0565b82815260059290921b8401810191818101908684111561115a57600080fd5b8286015b8481101561117e57805161117181610fd0565b835291830191830161115e565b509695505050505050565b6000806040838503121561119c57600080fd5b825167ffffffffffffffff808211156111b457600080fd5b6111c086838701611115565b93506020915081850151818111156111d757600080fd5b85019050601f810186136111ea57600080fd5b80516111f8611136826110f1565b81815260059190911b8201830190838101908883111561121757600080fd5b928401925b828410156112355783518252928401929084019061121c565b80955050505050509250929050565b60006020828403121561125657600080fd5b815167ffffffffffffffff81111561126d57600080fd5b610e6784828501611115565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156112a157600080fd5b81518015158114610d7f57600080fd5b634e487b7160e01b600052601160045260246000fd5b60006000198214156112db576112db6112b1565b5060010190565b6000602082840312156112f457600080fd5b5051919050565b6000821982111561130e5761130e6112b1565b500190565b60008251611325818460208701611002565b9190910192915050565b602081526000610d7f602083018461102e56fea26469706673582212201b232c4e559b07ba3365bd1f1eb51686914368587fb7acc755364586b20cfc9f64736f6c63430008090033";

type ResolverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ResolverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Resolver__factory extends ContractFactory {
  constructor(...args: ResolverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Resolver";
  }

  deploy(
    taskTreasury_: string,
    depositReceiver_: string,
    ethAddress_: string,
    marginLong_: string,
    converter_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Resolver> {
    return super.deploy(
      taskTreasury_,
      depositReceiver_,
      ethAddress_,
      marginLong_,
      converter_,
      overrides || {}
    ) as Promise<Resolver>;
  }
  getDeployTransaction(
    taskTreasury_: string,
    depositReceiver_: string,
    ethAddress_: string,
    marginLong_: string,
    converter_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      taskTreasury_,
      depositReceiver_,
      ethAddress_,
      marginLong_,
      converter_,
      overrides || {}
    );
  }
  attach(address: string): Resolver {
    return super.attach(address) as Resolver;
  }
  connect(signer: Signer): Resolver__factory {
    return super.connect(signer) as Resolver__factory;
  }
  static readonly contractName: "Resolver";
  public readonly contractName: "Resolver";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ResolverInterface {
    return new utils.Interface(_abi) as ResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Resolver {
    return new Contract(address, _abi, signerOrProvider) as Resolver;
  }
}
