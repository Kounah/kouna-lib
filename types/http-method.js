/**
 * The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
 * @typedef {'GET'} HTTPGetMethod */
/**
 * The HEAD method asks for a response identical to that of a GET request, but without the response body.
 * @typedef {'HEAD'} HTTPHeadMethod */
/**
 * The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
 * @typedef {'POST'} HTTPPostMethod */
/**
 *  The PUT method replaces all current representations of the target resource with the request payload. 
 * @typedef {'PUT'} HTTPPutMethod */
/**
 * The DELETE method deletes the specified resource.
 * @typedef {'DELETE'} HTTPDeleteMethod */
/**
 *  The CONNECT method establishes a tunnel to the server identified by the target resource. 
 * @typedef {'CONNECT'} HTTPConnectMethod */
/**
 * The OPTIONS method is used to describe the communication options for the target resource.
 * @typedef {'OPTIONS'} HTTPOptionsMethod */
/**
 *  The TRACE method performs a message loop-back test along the path to the target resource. 
 * @typedef {'TRACE'} HTTPTraceMethod */
/**
 * The PATCH method is used to apply partial modifications to a resource.
 * @typedef {'PATCH'} HTTPPatchMethod */

/**@typedef {(HTTPGetMethod
 | HTTPHeadMethod
 | HTTPPostMethod
 | HTTPPutMethod
 | HTTPDeleteMethod
 | HTTPConnectMethod
 | HTTPOptionsMethod
 | HTTPTraceMethod
 | HTTPPatchMethod)} HTTPMethod */

module.exports = {
  /**@type {string}
   * @description The GET method requests a representation of the specified resource. Requests using GET should only retrieve data. */
  'get': 'GET',
  /**@type {string}
   * @description The HEAD method asks for a response identical to that of a GET request, but without the response body. */
  'head': 'HEAD',
  /**@type {string}
   * @description The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server. */
  'post': 'POST',
  /**@type {string}
   * @description 
   The PUT method replaces all current representations of the target resource with the request payload.
    */
  'put': 'PUT',
  /**@type {string}
   * @description The DELETE method deletes the specified resource. */
  'delete': 'DELETE',
  /**@type {string}
   * @description 
   The CONNECT method establishes a tunnel to the server identified by the target resource.
    */
  'connect': 'CONNECT',
  /**@type {string}
   * @description The OPTIONS method is used to describe the communication options for the target resource. */
  'options': 'OPTIONS',
  /**@type {string}
   * @description 
   The TRACE method performs a message loop-back test along the path to the target resource.
    */
  'trace': 'TRACE',
  /**@type {string}
   * @description The PATCH method is used to apply partial modifications to a resource. */
  'patch': 'PATCH'
};