import { QueryBuilder } from "../QueryBuilder";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { FileGetContentsQuery } from "../generated/FileGetContents_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { Response } from "../generated/Response_pb";
import { FileService } from "../generated/FileService_pb_service";
import { FileId, FileIdLike } from "../file/FileId";

export type FileContents = {
    fileId: FileIdLike;
    contents: Uint8Array | string;
}

export class FileContentsQuery extends QueryBuilder<FileContents> {
    private readonly _builder: FileGetContentsQuery;

    public constructor() {
        const header = new QueryHeader();
        super(header);
        this._builder = new FileGetContentsQuery();
        this._builder.setHeader(header);
        this._inner.setFilegetcontents(this._builder);
    }

    public setFileId(fileId: FileIdLike): this {
        this._builder.setFileid(new FileId(fileId).toProto());
        return this;
    }

    protected _doValidate(errors: string[]): void {
        if (!this._builder.hasFileid()) {
            errors.push(".setFileId() required");
        }
    }

    protected get _method(): grpc.UnaryMethodDefinition<Query, Response> {
        return FileService.getFileContent;
    }

    protected _mapResponse(response: Response): FileContents {
        const fileConents = response.getFilegetcontents()!.getFilecontents()!;

        return {
            fileId: FileId.fromProto(fileConents.getFileid()!),
            contents: fileConents.getContents()
        };
    }
}
