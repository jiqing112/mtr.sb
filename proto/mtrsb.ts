/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "";

export enum Protocol {
  ANY = 0,
  IPV4 = 1,
  IPV6 = 2,
  UNRECOGNIZED = -1,
}

export function protocolFromJSON(object: any): Protocol {
  switch (object) {
    case 0:
    case "ANY":
      return Protocol.ANY;
    case 1:
    case "IPV4":
      return Protocol.IPV4;
    case 2:
    case "IPV6":
      return Protocol.IPV6;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Protocol.UNRECOGNIZED;
  }
}

export function protocolToJSON(object: Protocol): string {
  switch (object) {
    case Protocol.ANY:
      return "ANY";
    case Protocol.IPV4:
      return "IPV4";
    case Protocol.IPV6:
      return "IPV6";
    case Protocol.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PingRequest {
  host: string;
  protocol: Protocol;
}

export interface PingResponse {
  reply?: PingReply | undefined;
  timeout?: PingTimeout | undefined;
  summary?: PingSummary | undefined;
  error?: Error | undefined;
  lookup?: HostLookupResult | undefined;
}

export interface PingReply {
  rtt: number;
  ttl: number;
  seq: number;
  bytes: number;
}

export interface PingTimeout {
  seq: number;
}

export interface PingSummary {
  sent: number;
  received: number;
}

export interface HostLookupResult {
  ip: string;
}

export interface Error {
  message: string;
  title: string;
}

export interface VersionRequest {
}

export interface VersionResponse {
  version: string;
}

function createBasePingRequest(): PingRequest {
  return { host: "", protocol: 0 };
}

export const PingRequest = {
  encode(message: PingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.protocol !== 0) {
      writer.uint32(16).int32(message.protocol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.host = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.protocol = reader.int32() as any;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingRequest {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      protocol: isSet(object.protocol) ? protocolFromJSON(object.protocol) : 0,
    };
  },

  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.protocol !== undefined && (obj.protocol = protocolToJSON(message.protocol));
    return obj;
  },

  create<I extends Exact<DeepPartial<PingRequest>, I>>(base?: I): PingRequest {
    return PingRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingRequest>, I>>(object: I): PingRequest {
    const message = createBasePingRequest();
    message.host = object.host ?? "";
    message.protocol = object.protocol ?? 0;
    return message;
  },
};

function createBasePingResponse(): PingResponse {
  return { reply: undefined, timeout: undefined, summary: undefined, error: undefined, lookup: undefined };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reply !== undefined) {
      PingReply.encode(message.reply, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeout !== undefined) {
      PingTimeout.encode(message.timeout, writer.uint32(18).fork()).ldelim();
    }
    if (message.summary !== undefined) {
      PingSummary.encode(message.summary, writer.uint32(26).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    if (message.lookup !== undefined) {
      HostLookupResult.encode(message.lookup, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.reply = PingReply.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.timeout = PingTimeout.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.summary = PingSummary.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.lookup = HostLookupResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingResponse {
    return {
      reply: isSet(object.reply) ? PingReply.fromJSON(object.reply) : undefined,
      timeout: isSet(object.timeout) ? PingTimeout.fromJSON(object.timeout) : undefined,
      summary: isSet(object.summary) ? PingSummary.fromJSON(object.summary) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      lookup: isSet(object.lookup) ? HostLookupResult.fromJSON(object.lookup) : undefined,
    };
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.reply !== undefined && (obj.reply = message.reply ? PingReply.toJSON(message.reply) : undefined);
    message.timeout !== undefined && (obj.timeout = message.timeout ? PingTimeout.toJSON(message.timeout) : undefined);
    message.summary !== undefined && (obj.summary = message.summary ? PingSummary.toJSON(message.summary) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.lookup !== undefined && (obj.lookup = message.lookup ? HostLookupResult.toJSON(message.lookup) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<PingResponse>, I>>(base?: I): PingResponse {
    return PingResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingResponse>, I>>(object: I): PingResponse {
    const message = createBasePingResponse();
    message.reply = (object.reply !== undefined && object.reply !== null)
      ? PingReply.fromPartial(object.reply)
      : undefined;
    message.timeout = (object.timeout !== undefined && object.timeout !== null)
      ? PingTimeout.fromPartial(object.timeout)
      : undefined;
    message.summary = (object.summary !== undefined && object.summary !== null)
      ? PingSummary.fromPartial(object.summary)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.lookup = (object.lookup !== undefined && object.lookup !== null)
      ? HostLookupResult.fromPartial(object.lookup)
      : undefined;
    return message;
  },
};

function createBasePingReply(): PingReply {
  return { rtt: 0, ttl: 0, seq: 0, bytes: 0 };
}

export const PingReply = {
  encode(message: PingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rtt !== 0) {
      writer.uint32(13).float(message.rtt);
    }
    if (message.ttl !== 0) {
      writer.uint32(16).int32(message.ttl);
    }
    if (message.seq !== 0) {
      writer.uint32(24).int32(message.seq);
    }
    if (message.bytes !== 0) {
      writer.uint32(32).int32(message.bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 13) {
            break;
          }

          message.rtt = reader.float();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.ttl = reader.int32();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.seq = reader.int32();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.bytes = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingReply {
    return {
      rtt: isSet(object.rtt) ? Number(object.rtt) : 0,
      ttl: isSet(object.ttl) ? Number(object.ttl) : 0,
      seq: isSet(object.seq) ? Number(object.seq) : 0,
      bytes: isSet(object.bytes) ? Number(object.bytes) : 0,
    };
  },

  toJSON(message: PingReply): unknown {
    const obj: any = {};
    message.rtt !== undefined && (obj.rtt = message.rtt);
    message.ttl !== undefined && (obj.ttl = Math.round(message.ttl));
    message.seq !== undefined && (obj.seq = Math.round(message.seq));
    message.bytes !== undefined && (obj.bytes = Math.round(message.bytes));
    return obj;
  },

  create<I extends Exact<DeepPartial<PingReply>, I>>(base?: I): PingReply {
    return PingReply.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingReply>, I>>(object: I): PingReply {
    const message = createBasePingReply();
    message.rtt = object.rtt ?? 0;
    message.ttl = object.ttl ?? 0;
    message.seq = object.seq ?? 0;
    message.bytes = object.bytes ?? 0;
    return message;
  },
};

function createBasePingTimeout(): PingTimeout {
  return { seq: 0 };
}

export const PingTimeout = {
  encode(message: PingTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seq !== 0) {
      writer.uint32(8).int32(message.seq);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingTimeout {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.seq = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingTimeout {
    return { seq: isSet(object.seq) ? Number(object.seq) : 0 };
  },

  toJSON(message: PingTimeout): unknown {
    const obj: any = {};
    message.seq !== undefined && (obj.seq = Math.round(message.seq));
    return obj;
  },

  create<I extends Exact<DeepPartial<PingTimeout>, I>>(base?: I): PingTimeout {
    return PingTimeout.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingTimeout>, I>>(object: I): PingTimeout {
    const message = createBasePingTimeout();
    message.seq = object.seq ?? 0;
    return message;
  },
};

function createBasePingSummary(): PingSummary {
  return { sent: 0, received: 0 };
}

export const PingSummary = {
  encode(message: PingSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sent !== 0) {
      writer.uint32(8).int32(message.sent);
    }
    if (message.received !== 0) {
      writer.uint32(16).int32(message.received);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingSummary {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.sent = reader.int32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.received = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingSummary {
    return {
      sent: isSet(object.sent) ? Number(object.sent) : 0,
      received: isSet(object.received) ? Number(object.received) : 0,
    };
  },

  toJSON(message: PingSummary): unknown {
    const obj: any = {};
    message.sent !== undefined && (obj.sent = Math.round(message.sent));
    message.received !== undefined && (obj.received = Math.round(message.received));
    return obj;
  },

  create<I extends Exact<DeepPartial<PingSummary>, I>>(base?: I): PingSummary {
    return PingSummary.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingSummary>, I>>(object: I): PingSummary {
    const message = createBasePingSummary();
    message.sent = object.sent ?? 0;
    message.received = object.received ?? 0;
    return message;
  },
};

function createBaseHostLookupResult(): HostLookupResult {
  return { ip: "" };
}

export const HostLookupResult = {
  encode(message: HostLookupResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostLookupResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostLookupResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.ip = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HostLookupResult {
    return { ip: isSet(object.ip) ? String(object.ip) : "" };
  },

  toJSON(message: HostLookupResult): unknown {
    const obj: any = {};
    message.ip !== undefined && (obj.ip = message.ip);
    return obj;
  },

  create<I extends Exact<DeepPartial<HostLookupResult>, I>>(base?: I): HostLookupResult {
    return HostLookupResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HostLookupResult>, I>>(object: I): HostLookupResult {
    const message = createBaseHostLookupResult();
    message.ip = object.ip ?? "";
    return message;
  },
};

function createBaseError(): Error {
  return { message: "", title: "" };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.title = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      title: isSet(object.title) ? String(object.title) : "",
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.message = object.message ?? "";
    message.title = object.title ?? "";
    return message;
  },
};

function createBaseVersionRequest(): VersionRequest {
  return {};
}

export const VersionRequest = {
  encode(_: VersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): VersionRequest {
    return {};
  },

  toJSON(_: VersionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<VersionRequest>, I>>(base?: I): VersionRequest {
    return VersionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VersionRequest>, I>>(_: I): VersionRequest {
    const message = createBaseVersionRequest();
    return message;
  },
};

function createBaseVersionResponse(): VersionResponse {
  return { version: "" };
}

export const VersionResponse = {
  encode(message: VersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VersionResponse {
    return { version: isSet(object.version) ? String(object.version) : "" };
  },

  toJSON(message: VersionResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  create<I extends Exact<DeepPartial<VersionResponse>, I>>(base?: I): VersionResponse {
    return VersionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VersionResponse>, I>>(object: I): VersionResponse {
    const message = createBaseVersionResponse();
    message.version = object.version ?? "";
    return message;
  },
};

export interface MtrSbWorker {
  Ping(request: PingRequest): Observable<PingResponse>;
  Version(request: VersionRequest): Promise<VersionResponse>;
}

export class MtrSbWorkerClientImpl implements MtrSbWorker {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "MtrSbWorker";
    this.rpc = rpc;
    this.Ping = this.Ping.bind(this);
    this.Version = this.Version.bind(this);
  }
  Ping(request: PingRequest): Observable<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "Ping", data);
    return result.pipe(map((data) => PingResponse.decode(_m0.Reader.create(data))));
  }

  Version(request: VersionRequest): Promise<VersionResponse> {
    const data = VersionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Version", data);
    return promise.then((data) => VersionResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
