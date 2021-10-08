/**
 * An interface representing an outgoing HTTP message.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface OutgoingHTTPMessage {
	
	/**
	 * Returns true if this HTTP message has already been sent to the opposing connected party.
	 *
	 * In the case of this message being an HTTP request, a return value of true indicates that the request has already
	 * been dispatched to the server. In the case of this message being an HTTP response, a return value of true
	 * indicates that the response has already been sent to the client.
	 *
	 * @returns {boolean} true if this HTTP message has already been sent to the opposing connected party.
	 */
	hasBeenSent(): boolean;
	
	/**
	 * Returns a numeric timestamp (in Unix time - milliseconds since Jan. 1, 1970) indicating the time at which this
	 * message was sent, or undefined if this message has not yet been sent.
	 *
	 * @returns {number} A numeric timestamp indicating the time at which this message was sent, or undefined if this
	 * message has not yet been sent.
	 * @see HTTPMessage#hasBeenSent
	 */
	timeSent(): number | undefined;
	
	/**
	 * Sends this HTTP message to the opposing connected party, returning a Promise that resolves once the message has
	 * been fully sent.
	 * 
	 * In the case of this message being an HTTP request, this method dispatches said request to the server. In the case
	 * of this message being an HTTP response, this method sends the response to the client.
	 * 
	 * @returns {Promise<any>} A Promise that resolves once the message has been fully sent.
	 */
	send(): Promise<any>;
	
}
