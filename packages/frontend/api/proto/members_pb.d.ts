import * as jspb from 'google-protobuf'

import * as buf_validate_validate_pb from '../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class PingRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
  }
}

export class PingResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): PingResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
  static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingResponse;
  static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
  export type AsObject = {
    message: string,
  }
}

export class GetMemberRequest extends jspb.Message {
  getMemberName(): string;
  setMemberName(value: string): GetMemberRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMemberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMemberRequest): GetMemberRequest.AsObject;
  static serializeBinaryToWriter(message: GetMemberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMemberRequest;
  static deserializeBinaryFromReader(message: GetMemberRequest, reader: jspb.BinaryReader): GetMemberRequest;
}

export namespace GetMemberRequest {
  export type AsObject = {
    memberName: string,
  }
}

export class CategoryValue extends jspb.Message {
  getValue(): string;
  setValue(value: string): CategoryValue;

  getStatus(): string;
  setStatus(value: string): CategoryValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryValue.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryValue): CategoryValue.AsObject;
  static serializeBinaryToWriter(message: CategoryValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryValue;
  static deserializeBinaryFromReader(message: CategoryValue, reader: jspb.BinaryReader): CategoryValue;
}

export namespace CategoryValue {
  export type AsObject = {
    value: string,
    status: string,
  }
}

export class Member extends jspb.Message {
  getGenreIdentity(): string;
  setGenreIdentity(value: string): Member;

  getAge(): number;
  setAge(value: number): Member;

  getFursonaSpecies(): string;
  setFursonaSpecies(value: string): Member;

  getColor(): string;
  setColor(value: string): Member;

  getOccupation(): string;
  setOccupation(value: string): Member;

  getSexuality(): string;
  setSexuality(value: string): Member;

  getSign(): string;
  setSign(value: string): Member;

  getMemberSince(): number;
  setMemberSince(value: number): Member;

  getBirthDate(): string;
  setBirthDate(value: string): Member;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): Member;

  getName(): string;
  setName(value: string): Member;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Member.AsObject;
  static toObject(includeInstance: boolean, msg: Member): Member.AsObject;
  static serializeBinaryToWriter(message: Member, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Member;
  static deserializeBinaryFromReader(message: Member, reader: jspb.BinaryReader): Member;
}

export namespace Member {
  export type AsObject = {
    genreIdentity: string,
    age: number,
    fursonaSpecies: string,
    color: string,
    occupation: string,
    sexuality: string,
    sign: string,
    memberSince: number,
    birthDate: string,
    avatarUrl: string,
    name: string,
  }
}

export class MemberResponse extends jspb.Message {
  getGenreIdentity(): CategoryValue | undefined;
  setGenreIdentity(value?: CategoryValue): MemberResponse;
  hasGenreIdentity(): boolean;
  clearGenreIdentity(): MemberResponse;

  getAge(): CategoryValue | undefined;
  setAge(value?: CategoryValue): MemberResponse;
  hasAge(): boolean;
  clearAge(): MemberResponse;

  getFursonaSpecies(): CategoryValue | undefined;
  setFursonaSpecies(value?: CategoryValue): MemberResponse;
  hasFursonaSpecies(): boolean;
  clearFursonaSpecies(): MemberResponse;

  getColor(): CategoryValue | undefined;
  setColor(value?: CategoryValue): MemberResponse;
  hasColor(): boolean;
  clearColor(): MemberResponse;

  getOccupation(): CategoryValue | undefined;
  setOccupation(value?: CategoryValue): MemberResponse;
  hasOccupation(): boolean;
  clearOccupation(): MemberResponse;

  getSexuality(): CategoryValue | undefined;
  setSexuality(value?: CategoryValue): MemberResponse;
  hasSexuality(): boolean;
  clearSexuality(): MemberResponse;

  getSign(): CategoryValue | undefined;
  setSign(value?: CategoryValue): MemberResponse;
  hasSign(): boolean;
  clearSign(): MemberResponse;

  getMemberSince(): CategoryValue | undefined;
  setMemberSince(value?: CategoryValue): MemberResponse;
  hasMemberSince(): boolean;
  clearMemberSince(): MemberResponse;

  getBirthDate(): CategoryValue | undefined;
  setBirthDate(value?: CategoryValue): MemberResponse;
  hasBirthDate(): boolean;
  clearBirthDate(): MemberResponse;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): MemberResponse;

  getName(): string;
  setName(value: string): MemberResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MemberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MemberResponse): MemberResponse.AsObject;
  static serializeBinaryToWriter(message: MemberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MemberResponse;
  static deserializeBinaryFromReader(message: MemberResponse, reader: jspb.BinaryReader): MemberResponse;
}

export namespace MemberResponse {
  export type AsObject = {
    genreIdentity?: CategoryValue.AsObject,
    age?: CategoryValue.AsObject,
    fursonaSpecies?: CategoryValue.AsObject,
    color?: CategoryValue.AsObject,
    occupation?: CategoryValue.AsObject,
    sexuality?: CategoryValue.AsObject,
    sign?: CategoryValue.AsObject,
    memberSince?: CategoryValue.AsObject,
    birthDate?: CategoryValue.AsObject,
    avatarUrl: string,
    name: string,
  }
}

