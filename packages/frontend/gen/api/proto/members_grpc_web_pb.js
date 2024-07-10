/**
 * @fileoverview gRPC-Web generated client stub for members_service
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v0.0.0
// source: api/proto/members.proto


/* eslint-disable */
// @ts-nocheck


goog.provide('proto.members_service.MembersServiceClient');
goog.provide('proto.members_service.MembersServicePromiseClient');

goog.require('grpc.web.MethodDescriptor');
goog.require('grpc.web.MethodType');
goog.require('grpc.web.GrpcWebClientBase');
goog.require('grpc.web.AbstractClientBase');
goog.require('grpc.web.ClientReadableStream');
goog.require('grpc.web.RpcError');
goog.require('proto.members_service.Empty');
goog.require('proto.members_service.GetMembersRequest');
goog.require('proto.members_service.Member');
goog.require('proto.members_service.MembersResponse');

goog.requireType('grpc.web.ClientOptions');



goog.scope(function() {

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.members_service.MembersServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.members_service.MembersServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.members_service.GetMembersRequest,
 *   !proto.members_service.MembersResponse>}
 */
const methodDescriptor_MembersService_GetMembers = new grpc.web.MethodDescriptor(
  '/members_service.MembersService/GetMembers',
  grpc.web.MethodType.UNARY,
  proto.members_service.GetMembersRequest,
  proto.members_service.MembersResponse,
  /**
   * @param {!proto.members_service.GetMembersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.members_service.MembersResponse.deserializeBinary
);


/**
 * @param {!proto.members_service.GetMembersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.members_service.MembersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.members_service.MembersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.members_service.MembersServiceClient.prototype.getMembers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/members_service.MembersService/GetMembers',
      request,
      metadata || {},
      methodDescriptor_MembersService_GetMembers,
      callback);
};


/**
 * @param {!proto.members_service.GetMembersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.members_service.MembersResponse>}
 *     Promise that resolves to the response
 */
proto.members_service.MembersServicePromiseClient.prototype.getMembers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/members_service.MembersService/GetMembers',
      request,
      metadata || {},
      methodDescriptor_MembersService_GetMembers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.members_service.Member,
 *   !proto.members_service.Empty>}
 */
const methodDescriptor_MembersService_CreateMember = new grpc.web.MethodDescriptor(
  '/members_service.MembersService/CreateMember',
  grpc.web.MethodType.UNARY,
  proto.members_service.Member,
  proto.members_service.Empty,
  /**
   * @param {!proto.members_service.Member} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.members_service.Empty.deserializeBinary
);


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.members_service.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.members_service.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.members_service.MembersServiceClient.prototype.createMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/members_service.MembersService/CreateMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_CreateMember,
      callback);
};


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.members_service.Empty>}
 *     Promise that resolves to the response
 */
proto.members_service.MembersServicePromiseClient.prototype.createMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/members_service.MembersService/CreateMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_CreateMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.members_service.Member,
 *   !proto.members_service.Empty>}
 */
const methodDescriptor_MembersService_UpdateMember = new grpc.web.MethodDescriptor(
  '/members_service.MembersService/UpdateMember',
  grpc.web.MethodType.UNARY,
  proto.members_service.Member,
  proto.members_service.Empty,
  /**
   * @param {!proto.members_service.Member} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.members_service.Empty.deserializeBinary
);


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.members_service.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.members_service.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.members_service.MembersServiceClient.prototype.updateMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/members_service.MembersService/UpdateMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_UpdateMember,
      callback);
};


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.members_service.Empty>}
 *     Promise that resolves to the response
 */
proto.members_service.MembersServicePromiseClient.prototype.updateMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/members_service.MembersService/UpdateMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_UpdateMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.members_service.Member,
 *   !proto.members_service.Empty>}
 */
const methodDescriptor_MembersService_DeleteMember = new grpc.web.MethodDescriptor(
  '/members_service.MembersService/DeleteMember',
  grpc.web.MethodType.UNARY,
  proto.members_service.Member,
  proto.members_service.Empty,
  /**
   * @param {!proto.members_service.Member} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.members_service.Empty.deserializeBinary
);


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.members_service.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.members_service.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.members_service.MembersServiceClient.prototype.deleteMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/members_service.MembersService/DeleteMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_DeleteMember,
      callback);
};


/**
 * @param {!proto.members_service.Member} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.members_service.Empty>}
 *     Promise that resolves to the response
 */
proto.members_service.MembersServicePromiseClient.prototype.deleteMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/members_service.MembersService/DeleteMember',
      request,
      metadata || {},
      methodDescriptor_MembersService_DeleteMember);
};


}); // goog.scope
