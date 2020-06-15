import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		&copy; { props.year } All Rights Reserved. This is the { props.name } built with { props.desc }. 
		Design is by{' '}
		<a
			href="http://www.webkom.co"
			target="_blank"
			rel="noopener noreferrer"
			className="sidebar__link"
		>
			www.webkom.co
		</a>
		{'. '} Implemented by {' '}
		<a
			href="https://www.simpleprogramming.com.au"
			target="_blank"
			rel="noopener noreferrer"
			className="sidebar__link"
		>
			Simple Programming
		</a>
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2020",
    name: "CovidVault Dashboard",
    desc: "Bootstrap 4, React 16 (latest) & NPM"
};

export { FooterText };
