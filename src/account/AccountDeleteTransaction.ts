import { TransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { CryptoService } from "../generated/CryptoService_pb_service";
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
import { CryptoDeleteTransactionBody } from "../generated/CryptoDelete_pb";
import { AccountId, AccountIdLike } from "./AccountId";

export class AccountDeleteTransaction extends TransactionBuilder {
    private _body: CryptoDeleteTransactionBody;

    public constructor() {
        super();
        const body = new CryptoDeleteTransactionBody();
        this._body = body;
        this._inner.setCryptodelete(body);
    }

    public setAccountId(accountId: AccountIdLike): this {
        this._body.setDeleteaccountid(new AccountId(accountId).toProto());
        return this;
    }

    public get _method(): UnaryMethodDefinition<Transaction, TransactionResponse> {
        return CryptoService.cryptoDelete;
    }

    public _doValidate(errors: string[]): void {
        if (!this._body.hasDeleteaccountid()) {
            errors.push("AccountDeleteTransaction requires .setAccountid()");
        }
    }
}
