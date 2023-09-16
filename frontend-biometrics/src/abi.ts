export type Contract = {
    address: string;
    abi: any; // XXX: type it more? or any an existing package, like 'abitype'
};

export type Deployment = {
    name: string;
    chainId: string;
    contracts: Record<string, Contract>;
};