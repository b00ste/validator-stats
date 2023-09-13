export type Validator = {
  balance: string;
  index: string;
  status: string;
  validator: {
    activation_eligibility_epoch: string;
    activation_epoch: string;
    effective_balance: string;
    exit_epoch: string;
    pubkey: string;
    slashed: boolean;
    withdrawable_epoch: string;
    withdrawal_credentials: string;
  };
};

export type ValidatorList = {
  data: Validator[];
  execution_optimistic: boolean;
  finalized: boolean;
};
