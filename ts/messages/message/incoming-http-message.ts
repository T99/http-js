/**
 * An interface representing an incoming HTTP message.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface IncomingHTTPMessage {
	
	/**
	 * Returns a numeric timestamp (in Unix time - milliseconds since Jan. 1, 1970) indicating the time at which this
	 * message was received.
	 * 
	 * @returns {number} A numeric timestamp indicating the time at which this message was received.
	 */
	timeReceived(): number;
	
}
