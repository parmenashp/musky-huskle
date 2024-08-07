// source: api/proto/members.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.members_service.MemberResponse');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.members_service.CategoryValue');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.members_service.MemberResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.members_service.MemberResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.members_service.MemberResponse.displayName = 'proto.members_service.MemberResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.members_service.MemberResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.members_service.MemberResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.members_service.MemberResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.members_service.MemberResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    genreIdentity: (f = msg.getGenreIdentity()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    age: (f = msg.getAge()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    fursonaSpecies: (f = msg.getFursonaSpecies()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    color: (f = msg.getColor()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    occupation: (f = msg.getOccupation()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    sexuality: (f = msg.getSexuality()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    sign: (f = msg.getSign()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    memberSince: (f = msg.getMemberSince()) && proto.members_service.CategoryValue.toObject(includeInstance, f),
    avatarUrl: jspb.Message.getFieldWithDefault(msg, 9, ""),
    name: jspb.Message.getFieldWithDefault(msg, 10, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.members_service.MemberResponse}
 */
proto.members_service.MemberResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.members_service.MemberResponse;
  return proto.members_service.MemberResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.members_service.MemberResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.members_service.MemberResponse}
 */
proto.members_service.MemberResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setGenreIdentity(value);
      break;
    case 2:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setAge(value);
      break;
    case 3:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setFursonaSpecies(value);
      break;
    case 4:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setColor(value);
      break;
    case 5:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setOccupation(value);
      break;
    case 6:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setSexuality(value);
      break;
    case 7:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setSign(value);
      break;
    case 8:
      var value = new proto.members_service.CategoryValue;
      reader.readMessage(value,proto.members_service.CategoryValue.deserializeBinaryFromReader);
      msg.setMemberSince(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setAvatarUrl(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.members_service.MemberResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.members_service.MemberResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.members_service.MemberResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.members_service.MemberResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGenreIdentity();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getAge();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getFursonaSpecies();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getColor();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getOccupation();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getSexuality();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getSign();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getMemberSince();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.members_service.CategoryValue.serializeBinaryToWriter
    );
  }
  f = message.getAvatarUrl();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
};


/**
 * optional CategoryValue genre_identity = 1;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getGenreIdentity = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 1));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setGenreIdentity = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearGenreIdentity = function() {
  return this.setGenreIdentity(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasGenreIdentity = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CategoryValue age = 2;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getAge = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 2));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setAge = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearAge = function() {
  return this.setAge(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasAge = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional CategoryValue fursona_species = 3;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getFursonaSpecies = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 3));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setFursonaSpecies = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearFursonaSpecies = function() {
  return this.setFursonaSpecies(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasFursonaSpecies = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional CategoryValue color = 4;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getColor = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 4));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setColor = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearColor = function() {
  return this.setColor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasColor = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional CategoryValue occupation = 5;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getOccupation = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 5));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setOccupation = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearOccupation = function() {
  return this.setOccupation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasOccupation = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional CategoryValue sexuality = 6;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getSexuality = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 6));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setSexuality = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearSexuality = function() {
  return this.setSexuality(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasSexuality = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional CategoryValue sign = 7;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getSign = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 7));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setSign = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearSign = function() {
  return this.setSign(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasSign = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional CategoryValue member_since = 8;
 * @return {?proto.members_service.CategoryValue}
 */
proto.members_service.MemberResponse.prototype.getMemberSince = function() {
  return /** @type{?proto.members_service.CategoryValue} */ (
    jspb.Message.getWrapperField(this, proto.members_service.CategoryValue, 8));
};


/**
 * @param {?proto.members_service.CategoryValue|undefined} value
 * @return {!proto.members_service.MemberResponse} returns this
*/
proto.members_service.MemberResponse.prototype.setMemberSince = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.clearMemberSince = function() {
  return this.setMemberSince(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.members_service.MemberResponse.prototype.hasMemberSince = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional string avatar_url = 9;
 * @return {string}
 */
proto.members_service.MemberResponse.prototype.getAvatarUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.setAvatarUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string name = 10;
 * @return {string}
 */
proto.members_service.MemberResponse.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.members_service.MemberResponse} returns this
 */
proto.members_service.MemberResponse.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


