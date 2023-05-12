/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Empty } from "../google/protobuf/empty";

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

export interface TracerouteRequest {
  host: string;
  protocol: Protocol;
}

export interface TracerouteResponse {
  reply?: TracerouteReply | undefined;
  timeout?: PingTimeout | undefined;
  error?: Error | undefined;
  completed?: Empty | undefined;
  lookup?: HostLookupResult | undefined;
}

export interface TracerouteReply {
  seq: number;
  ip: string;
  rtt: number;
}

export interface MtrRequest {
  host: string;
  protocol: Protocol;
}

export interface MtrResponse {
  pos: number;
  lookup?: HostLookupResult | undefined;
  host?: MtrHostLine | undefined;
  transmit?: MtrTransmitLine | undefined;
  ping?: MtrPingLine | undefined;
  dns?: MtrDnsLine | undefined;
  error?: Error | undefined;
}

export interface MtrHostLine {
  ip: string;
}

export interface MtrTransmitLine {
  seqnum: number;
}

export interface MtrPingLine {
  rtt: number;
  seqnum: number;
}

export interface MtrDnsLine {
  hostname: string;
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

function createBaseTracerouteRequest(): TracerouteRequest {
  return { host: "", protocol: 0 };
}

export const TracerouteRequest = {
  encode(message: TracerouteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.protocol !== 0) {
      writer.uint32(16).int32(message.protocol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TracerouteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTracerouteRequest();
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

  fromJSON(object: any): TracerouteRequest {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      protocol: isSet(object.protocol) ? protocolFromJSON(object.protocol) : 0,
    };
  },

  toJSON(message: TracerouteRequest): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.protocol !== undefined && (obj.protocol = protocolToJSON(message.protocol));
    return obj;
  },

  create<I extends Exact<DeepPartial<TracerouteRequest>, I>>(base?: I): TracerouteRequest {
    return TracerouteRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TracerouteRequest>, I>>(object: I): TracerouteRequest {
    const message = createBaseTracerouteRequest();
    message.host = object.host ?? "";
    message.protocol = object.protocol ?? 0;
    return message;
  },
};

function createBaseTracerouteResponse(): TracerouteResponse {
  return { reply: undefined, timeout: undefined, error: undefined, completed: undefined, lookup: undefined };
}

export const TracerouteResponse = {
  encode(message: TracerouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reply !== undefined) {
      TracerouteReply.encode(message.reply, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeout !== undefined) {
      PingTimeout.encode(message.timeout, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    if (message.completed !== undefined) {
      Empty.encode(message.completed, writer.uint32(34).fork()).ldelim();
    }
    if (message.lookup !== undefined) {
      HostLookupResult.encode(message.lookup, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TracerouteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTracerouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.reply = TracerouteReply.decode(reader, reader.uint32());
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

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.completed = Empty.decode(reader, reader.uint32());
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

  fromJSON(object: any): TracerouteResponse {
    return {
      reply: isSet(object.reply) ? TracerouteReply.fromJSON(object.reply) : undefined,
      timeout: isSet(object.timeout) ? PingTimeout.fromJSON(object.timeout) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      completed: isSet(object.completed) ? Empty.fromJSON(object.completed) : undefined,
      lookup: isSet(object.lookup) ? HostLookupResult.fromJSON(object.lookup) : undefined,
    };
  },

  toJSON(message: TracerouteResponse): unknown {
    const obj: any = {};
    message.reply !== undefined && (obj.reply = message.reply ? TracerouteReply.toJSON(message.reply) : undefined);
    message.timeout !== undefined && (obj.timeout = message.timeout ? PingTimeout.toJSON(message.timeout) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.completed !== undefined &&
      (obj.completed = message.completed ? Empty.toJSON(message.completed) : undefined);
    message.lookup !== undefined && (obj.lookup = message.lookup ? HostLookupResult.toJSON(message.lookup) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<TracerouteResponse>, I>>(base?: I): TracerouteResponse {
    return TracerouteResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TracerouteResponse>, I>>(object: I): TracerouteResponse {
    const message = createBaseTracerouteResponse();
    message.reply = (object.reply !== undefined && object.reply !== null)
      ? TracerouteReply.fromPartial(object.reply)
      : undefined;
    message.timeout = (object.timeout !== undefined && object.timeout !== null)
      ? PingTimeout.fromPartial(object.timeout)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.completed = (object.completed !== undefined && object.completed !== null)
      ? Empty.fromPartial(object.completed)
      : undefined;
    message.lookup = (object.lookup !== undefined && object.lookup !== null)
      ? HostLookupResult.fromPartial(object.lookup)
      : undefined;
    return message;
  },
};

function createBaseTracerouteReply(): TracerouteReply {
  return { seq: 0, ip: "", rtt: 0 };
}

export const TracerouteReply = {
  encode(message: TracerouteReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seq !== 0) {
      writer.uint32(8).int32(message.seq);
    }
    if (message.ip !== "") {
      writer.uint32(18).string(message.ip);
    }
    if (message.rtt !== 0) {
      writer.uint32(29).float(message.rtt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TracerouteReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTracerouteReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.seq = reader.int32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 3:
          if (tag != 29) {
            break;
          }

          message.rtt = reader.float();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TracerouteReply {
    return {
      seq: isSet(object.seq) ? Number(object.seq) : 0,
      ip: isSet(object.ip) ? String(object.ip) : "",
      rtt: isSet(object.rtt) ? Number(object.rtt) : 0,
    };
  },

  toJSON(message: TracerouteReply): unknown {
    const obj: any = {};
    message.seq !== undefined && (obj.seq = Math.round(message.seq));
    message.ip !== undefined && (obj.ip = message.ip);
    message.rtt !== undefined && (obj.rtt = message.rtt);
    return obj;
  },

  create<I extends Exact<DeepPartial<TracerouteReply>, I>>(base?: I): TracerouteReply {
    return TracerouteReply.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TracerouteReply>, I>>(object: I): TracerouteReply {
    const message = createBaseTracerouteReply();
    message.seq = object.seq ?? 0;
    message.ip = object.ip ?? "";
    message.rtt = object.rtt ?? 0;
    return message;
  },
};

function createBaseMtrRequest(): MtrRequest {
  return { host: "", protocol: 0 };
}

export const MtrRequest = {
  encode(message: MtrRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== "") {
      writer.uint32(10).string(message.host);
    }
    if (message.protocol !== 0) {
      writer.uint32(16).int32(message.protocol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrRequest();
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

  fromJSON(object: any): MtrRequest {
    return {
      host: isSet(object.host) ? String(object.host) : "",
      protocol: isSet(object.protocol) ? protocolFromJSON(object.protocol) : 0,
    };
  },

  toJSON(message: MtrRequest): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.protocol !== undefined && (obj.protocol = protocolToJSON(message.protocol));
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrRequest>, I>>(base?: I): MtrRequest {
    return MtrRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrRequest>, I>>(object: I): MtrRequest {
    const message = createBaseMtrRequest();
    message.host = object.host ?? "";
    message.protocol = object.protocol ?? 0;
    return message;
  },
};

function createBaseMtrResponse(): MtrResponse {
  return {
    pos: 0,
    lookup: undefined,
    host: undefined,
    transmit: undefined,
    ping: undefined,
    dns: undefined,
    error: undefined,
  };
}

export const MtrResponse = {
  encode(message: MtrResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pos !== 0) {
      writer.uint32(8).uint32(message.pos);
    }
    if (message.lookup !== undefined) {
      HostLookupResult.encode(message.lookup, writer.uint32(18).fork()).ldelim();
    }
    if (message.host !== undefined) {
      MtrHostLine.encode(message.host, writer.uint32(26).fork()).ldelim();
    }
    if (message.transmit !== undefined) {
      MtrTransmitLine.encode(message.transmit, writer.uint32(34).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      MtrPingLine.encode(message.ping, writer.uint32(42).fork()).ldelim();
    }
    if (message.dns !== undefined) {
      MtrDnsLine.encode(message.dns, writer.uint32(50).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.pos = reader.uint32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.lookup = HostLookupResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.host = MtrHostLine.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.transmit = MtrTransmitLine.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.ping = MtrPingLine.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.dns = MtrDnsLine.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MtrResponse {
    return {
      pos: isSet(object.pos) ? Number(object.pos) : 0,
      lookup: isSet(object.lookup) ? HostLookupResult.fromJSON(object.lookup) : undefined,
      host: isSet(object.host) ? MtrHostLine.fromJSON(object.host) : undefined,
      transmit: isSet(object.transmit) ? MtrTransmitLine.fromJSON(object.transmit) : undefined,
      ping: isSet(object.ping) ? MtrPingLine.fromJSON(object.ping) : undefined,
      dns: isSet(object.dns) ? MtrDnsLine.fromJSON(object.dns) : undefined,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: MtrResponse): unknown {
    const obj: any = {};
    message.pos !== undefined && (obj.pos = Math.round(message.pos));
    message.lookup !== undefined && (obj.lookup = message.lookup ? HostLookupResult.toJSON(message.lookup) : undefined);
    message.host !== undefined && (obj.host = message.host ? MtrHostLine.toJSON(message.host) : undefined);
    message.transmit !== undefined &&
      (obj.transmit = message.transmit ? MtrTransmitLine.toJSON(message.transmit) : undefined);
    message.ping !== undefined && (obj.ping = message.ping ? MtrPingLine.toJSON(message.ping) : undefined);
    message.dns !== undefined && (obj.dns = message.dns ? MtrDnsLine.toJSON(message.dns) : undefined);
    message.error !== undefined && (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrResponse>, I>>(base?: I): MtrResponse {
    return MtrResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrResponse>, I>>(object: I): MtrResponse {
    const message = createBaseMtrResponse();
    message.pos = object.pos ?? 0;
    message.lookup = (object.lookup !== undefined && object.lookup !== null)
      ? HostLookupResult.fromPartial(object.lookup)
      : undefined;
    message.host = (object.host !== undefined && object.host !== null)
      ? MtrHostLine.fromPartial(object.host)
      : undefined;
    message.transmit = (object.transmit !== undefined && object.transmit !== null)
      ? MtrTransmitLine.fromPartial(object.transmit)
      : undefined;
    message.ping = (object.ping !== undefined && object.ping !== null)
      ? MtrPingLine.fromPartial(object.ping)
      : undefined;
    message.dns = (object.dns !== undefined && object.dns !== null) ? MtrDnsLine.fromPartial(object.dns) : undefined;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    return message;
  },
};

function createBaseMtrHostLine(): MtrHostLine {
  return { ip: "" };
}

export const MtrHostLine = {
  encode(message: MtrHostLine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrHostLine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrHostLine();
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

  fromJSON(object: any): MtrHostLine {
    return { ip: isSet(object.ip) ? String(object.ip) : "" };
  },

  toJSON(message: MtrHostLine): unknown {
    const obj: any = {};
    message.ip !== undefined && (obj.ip = message.ip);
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrHostLine>, I>>(base?: I): MtrHostLine {
    return MtrHostLine.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrHostLine>, I>>(object: I): MtrHostLine {
    const message = createBaseMtrHostLine();
    message.ip = object.ip ?? "";
    return message;
  },
};

function createBaseMtrTransmitLine(): MtrTransmitLine {
  return { seqnum: 0 };
}

export const MtrTransmitLine = {
  encode(message: MtrTransmitLine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seqnum !== 0) {
      writer.uint32(8).uint32(message.seqnum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrTransmitLine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrTransmitLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.seqnum = reader.uint32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MtrTransmitLine {
    return { seqnum: isSet(object.seqnum) ? Number(object.seqnum) : 0 };
  },

  toJSON(message: MtrTransmitLine): unknown {
    const obj: any = {};
    message.seqnum !== undefined && (obj.seqnum = Math.round(message.seqnum));
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrTransmitLine>, I>>(base?: I): MtrTransmitLine {
    return MtrTransmitLine.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrTransmitLine>, I>>(object: I): MtrTransmitLine {
    const message = createBaseMtrTransmitLine();
    message.seqnum = object.seqnum ?? 0;
    return message;
  },
};

function createBaseMtrPingLine(): MtrPingLine {
  return { rtt: 0, seqnum: 0 };
}

export const MtrPingLine = {
  encode(message: MtrPingLine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rtt !== 0) {
      writer.uint32(13).float(message.rtt);
    }
    if (message.seqnum !== 0) {
      writer.uint32(16).uint32(message.seqnum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrPingLine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrPingLine();
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

          message.seqnum = reader.uint32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MtrPingLine {
    return {
      rtt: isSet(object.rtt) ? Number(object.rtt) : 0,
      seqnum: isSet(object.seqnum) ? Number(object.seqnum) : 0,
    };
  },

  toJSON(message: MtrPingLine): unknown {
    const obj: any = {};
    message.rtt !== undefined && (obj.rtt = message.rtt);
    message.seqnum !== undefined && (obj.seqnum = Math.round(message.seqnum));
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrPingLine>, I>>(base?: I): MtrPingLine {
    return MtrPingLine.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrPingLine>, I>>(object: I): MtrPingLine {
    const message = createBaseMtrPingLine();
    message.rtt = object.rtt ?? 0;
    message.seqnum = object.seqnum ?? 0;
    return message;
  },
};

function createBaseMtrDnsLine(): MtrDnsLine {
  return { hostname: "" };
}

export const MtrDnsLine = {
  encode(message: MtrDnsLine, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostname !== "") {
      writer.uint32(10).string(message.hostname);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MtrDnsLine {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMtrDnsLine();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hostname = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MtrDnsLine {
    return { hostname: isSet(object.hostname) ? String(object.hostname) : "" };
  },

  toJSON(message: MtrDnsLine): unknown {
    const obj: any = {};
    message.hostname !== undefined && (obj.hostname = message.hostname);
    return obj;
  },

  create<I extends Exact<DeepPartial<MtrDnsLine>, I>>(base?: I): MtrDnsLine {
    return MtrDnsLine.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MtrDnsLine>, I>>(object: I): MtrDnsLine {
    const message = createBaseMtrDnsLine();
    message.hostname = object.hostname ?? "";
    return message;
  },
};

export interface MtrSbWorker {
  Ping(request: PingRequest): Observable<PingResponse>;
  Version(request: VersionRequest): Promise<VersionResponse>;
  Traceroute(request: TracerouteRequest): Observable<TracerouteResponse>;
  Mtr(request: MtrRequest): Observable<MtrResponse>;
}

export class MtrSbWorkerClientImpl implements MtrSbWorker {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "MtrSbWorker";
    this.rpc = rpc;
    this.Ping = this.Ping.bind(this);
    this.Version = this.Version.bind(this);
    this.Traceroute = this.Traceroute.bind(this);
    this.Mtr = this.Mtr.bind(this);
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

  Traceroute(request: TracerouteRequest): Observable<TracerouteResponse> {
    const data = TracerouteRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "Traceroute", data);
    return result.pipe(map((data) => TracerouteResponse.decode(_m0.Reader.create(data))));
  }

  Mtr(request: MtrRequest): Observable<MtrResponse> {
    const data = MtrRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "Mtr", data);
    return result.pipe(map((data) => MtrResponse.decode(_m0.Reader.create(data))));
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
