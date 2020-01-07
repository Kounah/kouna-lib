/**
 * Instance manipulations that are acceptable in the response. Defined in RFC 3229
 * @typedef {'a-im'} HTTPAIMHeader */
/**
 * The media type/types acceptable
 * @typedef {'accept'} HTTPAcceptHeader */
/**
 * The charset acceptable
 * @typedef {'accept-charset'} HTTPAcceptCharsetHeader */
/**
 * List of acceptable encodings
 * @typedef {'accept-encoding'} HTTPAcceptEncodingHeader */
/**
 * List of acceptable languages
 * @typedef {'accept-language'} HTTPAcceptLanguageHeader */
/**
 * Request a past version of the resource prior to the datetime passed
 * @typedef {'accept-datetime'} HTTPAcceptDatetimeHeader */
/**
 * Used in a CORS request
 * @typedef {'access-control-request-method'} HTTPAccessControlRequestMethodHeader */
/**
 * Used in a CORS request
 * @typedef {'access-control-request-headers'} HTTPAccessControlRequestHeadersHeader */
/**
 * HTTP basic authentication credentials
 * @typedef {'authorization'} HTTPAuthorizationHeader */
/**
 * Set the caching rules
 * @typedef {'cache-control'} HTTPCacheControlHeader */
/**
 * Control options for the current connection. Accepts keep-alive and close. Deprecated in HTTP/2
 * @typedef {'connection'} HTTPConnectionHeader */
/**
 * The length of the request body in bytes
 * @typedef {'content-length'} HTTPContentLengthHeader */
/**
 * The content type of the body of the request (used in POST and PUT requests).
 * @typedef {'content-type'} HTTPContentTypeHeader */
/**
 * See more on Cookies
 * @typedef {'cookie'} HTTPCookieHeader */
/**
 * The date and time that the request was sent
 * @typedef {'date'} HTTPDateHeader */
/**
 * It’s typically used when sending a large request body. We expect the server to return back a 100 Continue HTTP status  if it can handle the request, or 417 Expectation Failed if not
 * @typedef {'expect'} HTTPExpectHeader */
/**
 * Disclose original information of a client connecting to a web server through an HTTP proxy. Used for testing purposes only, as it discloses privacy sensitive information
 * @typedef {'forwarded'} HTTPForwardedHeader */
/**
 * The email address of the user making the request. Meant to be used, for example, to indicate a contact email for bots.
 * @typedef {'from'} HTTPFromHeader */
/**
 * The domain name of the server (used to determined the server with virtual hosting), and the TCP port number on which the server is listening. If the port is omitted, 80 is assumed. This is a mandatory HTTP request header
 * @typedef {'host'} HTTPHostHeader */
/**
 * Given one (or more) ETags, the server should only send back the response if the current resource matches one of those ETags. Mainly used in PUT methods to update a resource only if it has not been modified since the user last updated it
 * @typedef {'if-match'} HTTPIfMatchHeader */
/**
 * Allows to return a 304 Not Modified response header if the content is unchanged since that date
 * @typedef {'if-modified-since'} HTTPIfModifiedSinceHeader */
/**
 * Allows a 304 Not Modified response header to be returned if content is unchanged. Opposite of If-Match.
 * @typedef {'if-none-match'} HTTPIfNoneMatchHeader */
/**
 * Used to resume downloads, returns a partial if the condition is matched (ETag or date) or the full resource if not. See more
 * @typedef {'if-range'} HTTPIfRangeHeader */
/**
 * Only send the response if the entity has not been modified since the specified time
 * @typedef {'if-unmodified-since'} HTTPIfUnmodifiedSinceHeader */
/**
 * Limit the number of times the message can be forwarded through proxies or gateways
 * @typedef {'max-forwards'} HTTPMaxForwardsHeader */
/**
 * Send the current domain to perform a CORS request, used in an OPTIONS HTTP request (to ask the server for Access-Control- response headers)
 * @typedef {'origin'} HTTPOriginHeader */
/**
 * Used for backwards compatibility with HTTP/1.0 caches
 * @typedef {'pragma'} HTTPPragmaHeader */
/**
 * Authorization credentials for connecting to a proxy
 * @typedef {'proxy-authorization'} HTTPProxyAuthorizationHeader */
/**
 * Request only a specific part of a resource
 * @typedef {'range'} HTTPRangeHeader */
/**
 * The address of the previous web page from which a link to the currently requested page was followed.
 * @typedef {'referer'} HTTPRefererHeader */
/**
 * Specify the encodings the client can accept. Accepted values: compress, deflate, gzip, trailers. Only trailers is supported in HTTP/2
 * @typedef {'te'} HTTPTEHeader */
/**
 * The string that identifies the user agent
 * @typedef {'user-agent'} HTTPUserAgentHeader */
/**
 * Ask the server to upgrade to another protocol. Deprecated in HTTP/2
 * @typedef {'upgrade'} HTTPUpgradeHeader */
/**
 * Informs the server of proxies through which the request was sent
 * @typedef {'via'} HTTPViaHeader */
/**
 * A general warning about possible problems with the status of the message. Accepts a special range of values.
 * @typedef {'warning'} HTTPWarningHeader */
/**
 * If enabled, asks servers to not track the user
 * @typedef {'dnt'} HTTPDntHeader */
/**
 * Identifies XHR requests
 * @typedef {'x-requested-with'} HTTPXRequestedWithHeader */
/**
 * Used to prevent CSRF
 * @typedef {'x-csrf-token'} HTTPXCSRFTokenHeader */

/**@typedef {(HTTPAIMHeader
 | HTTPAcceptHeader
 | HTTPAcceptCharsetHeader
 | HTTPAcceptEncodingHeader
 | HTTPAcceptLanguageHeader
 | HTTPAcceptDatetimeHeader
 | HTTPAccessControlRequestMethodHeader
 | HTTPAccessControlRequestHeadersHeader
 | HTTPAuthorizationHeader
 | HTTPCacheControlHeader
 | HTTPConnectionHeader
 | HTTPContentLengthHeader
 | HTTPContentTypeHeader
 | HTTPCookieHeader
 | HTTPDateHeader
 | HTTPExpectHeader
 | HTTPForwardedHeader
 | HTTPFromHeader
 | HTTPHostHeader
 | HTTPIfMatchHeader
 | HTTPIfModifiedSinceHeader
 | HTTPIfNoneMatchHeader
 | HTTPIfRangeHeader
 | HTTPIfUnmodifiedSinceHeader
 | HTTPMaxForwardsHeader
 | HTTPOriginHeader
 | HTTPPragmaHeader
 | HTTPProxyAuthorizationHeader
 | HTTPRangeHeader
 | HTTPRefererHeader
 | HTTPTEHeader
 | HTTPUserAgentHeader
 | HTTPUpgradeHeader
 | HTTPViaHeader
 | HTTPWarningHeader
 | HTTPDntHeader
 | HTTPXRequestedWithHeader
 | HTTPXCSRFTokenHeader)} HTTPHeader */

/**@typedef {Map.<HTTPHeader, string>} HTTPHeaderMap */
/**@typedef {Object} HTTPHeaderObject
 * @prop {string} a-im
 * @prop {string} accept
 * @prop {string} accept-charset
 * @prop {string} accept-encoding
 * @prop {string} accept-language
 * @prop {string} accept-datetime
 * @prop {string} access-control-request-method
 * @prop {string} access-control-request-headers
 * @prop {string} authorization
 * @prop {string} cache-control
 * @prop {string} connection
 * @prop {string} content-length
 * @prop {string} content-type
 * @prop {string} cookie
 * @prop {string} date
 * @prop {string} expect
 * @prop {string} forwarded
 * @prop {string} from
 * @prop {string} host
 * @prop {string} if-match
 * @prop {string} if-modified-since
 * @prop {string} if-none-match
 * @prop {string} if-range
 * @prop {string} if-unmodified-since
 * @prop {string} max-forwards
 * @prop {string} origin
 * @prop {string} pragma
 * @prop {string} proxy-authorization
 * @prop {string} range
 * @prop {string} referer
 * @prop {string} te
 * @prop {string} user-agent
 * @prop {string} upgrade
 * @prop {string} via
 * @prop {string} warning
 * @prop {string} dnt
 * @prop {string} x-requested-with
 * @prop {string} x-csrf-token
 */

module.exports = {
  /**@type {string}
   * @description Instance manipulations that are acceptable in the response. Defined in RFC 3229 */
  'a-im': '',
  /**@type {string}
   * @description The media type/types acceptable */
  'accept': '',
  /**@type {string}
   * @description The charset acceptable */
  'accept-charset': '',
  /**@type {string}
   * @description List of acceptable encodings */
  'accept-encoding': '',
  /**@type {string}
   * @description List of acceptable languages */
  'accept-language': '',
  /**@type {string}
   * @description Request a past version of the resource prior to the datetime passed */
  'accept-datetime': '',
  /**@type {string}
   * @description Used in a CORS request */
  'access-control-request-method': '',
  /**@type {string}
   * @description Used in a CORS request */
  'access-control-request-headers': '',
  /**@type {string}
   * @description HTTP basic authentication credentials */
  'authorization': '',
  /**@type {string}
   * @description Set the caching rules */
  'cache-control': '',
  /**@type {string}
   * @description Control options for the current connection. Accepts keep-alive and close. Deprecated in HTTP/2 */
  'connection': '',
  /**@type {string}
   * @description The length of the request body in bytes */
  'content-length': '',
  /**@type {string}
   * @description The content type of the body of the request (used in POST and PUT requests). */
  'content-type': '',
  /**@type {string}
   * @description See more on Cookies */
  'cookie': '',
  /**@type {string}
   * @description The date and time that the request was sent */
  'date': '',
  /**@type {string}
   * @description It’s typically used when sending a large request body. We expect the server to return back a 100 Continue HTTP status  if it can handle the request, or 417 Expectation Failed if not */
  'expect': '',
  /**@type {string}
   * @description Disclose original information of a client connecting to a web server through an HTTP proxy. Used for testing purposes only, as it discloses privacy sensitive information */
  'forwarded': '',
  /**@type {string}
   * @description The email address of the user making the request. Meant to be used, for example, to indicate a contact email for bots. */
  'from': '',
  /**@type {string}
   * @description The domain name of the server (used to determined the server with virtual hosting), and the TCP port number on which the server is listening. If the port is omitted, 80 is assumed. This is a mandatory HTTP request header */
  'host': '',
  /**@type {string}
   * @description Given one (or more) ETags, the server should only send back the response if the current resource matches one of those ETags. Mainly used in PUT methods to update a resource only if it has not been modified since the user last updated it */
  'if-match': '',
  /**@type {string}
   * @description Allows to return a 304 Not Modified response header if the content is unchanged since that date */
  'if-modified-since': '',
  /**@type {string}
   * @description Allows a 304 Not Modified response header to be returned if content is unchanged. Opposite of If-Match. */
  'if-none-match': '',
  /**@type {string}
   * @description Used to resume downloads, returns a partial if the condition is matched (ETag or date) or the full resource if not. See more */
  'if-range': '',
  /**@type {string}
   * @description Only send the response if the entity has not been modified since the specified time */
  'if-unmodified-since': '',
  /**@type {string}
   * @description Limit the number of times the message can be forwarded through proxies or gateways */
  'max-forwards': '',
  /**@type {string}
   * @description Send the current domain to perform a CORS request, used in an OPTIONS HTTP request (to ask the server for Access-Control- response headers) */
  'origin': '',
  /**@type {string}
   * @description Used for backwards compatibility with HTTP/1.0 caches */
  'pragma': '',
  /**@type {string}
   * @description Authorization credentials for connecting to a proxy */
  'proxy-authorization': '',
  /**@type {string}
   * @description Request only a specific part of a resource */
  'range': '',
  /**@type {string}
   * @description The address of the previous web page from which a link to the currently requested page was followed. */
  'referer': '',
  /**@type {string}
   * @description Specify the encodings the client can accept. Accepted values: compress, deflate, gzip, trailers. Only trailers is supported in HTTP/2 */
  'te': '',
  /**@type {string}
   * @description The string that identifies the user agent */
  'user-agent': '',
  /**@type {string}
   * @description Ask the server to upgrade to another protocol. Deprecated in HTTP/2 */
  'upgrade': '',
  /**@type {string}
   * @description Informs the server of proxies through which the request was sent */
  'via': '',
  /**@type {string}
   * @description A general warning about possible problems with the status of the message. Accepts a special range of values. */
  'warning': '',
  /**@type {string}
   * @description If enabled, asks servers to not track the user */
  'dnt': '',
  /**@type {string}
   * @description Identifies XHR requests */
  'x-requested-with': '',
  /**@type {string}
   * @description Used to prevent CSRF */
  'x-csrf-token': ''
};