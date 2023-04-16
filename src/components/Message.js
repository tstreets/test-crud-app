import React from 'react';
import MessageStyles from '../styles/Message.module.css';

/**
 * @typedef {Object} MessageProps
 * @prop {'error' | 'success' | 'info'} type
 */

/**
 *
 * @param {MessageProps} param0
 * @returns
 */
export default function Message({ children, type }) {
	function getMessageClass() {
		switch (type) {
			case 'error':
				return MessageStyles.error;
			case 'info':
				return MessageStyles.info;
			case 'success':
				return MessageStyles.success;
			default:
				return MessageStyles.default;
		}
	}

	const messageClasses = [MessageStyles.message];
	messageClasses.push(getMessageClass());

	return (
		<div className={messageClasses.join(' ')}>
			<p>{children}</p>
		</div>
	);
}
