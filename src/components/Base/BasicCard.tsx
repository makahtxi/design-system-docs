import React from 'react';

const BasicCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
	return (
		<div
			style={{
				border: '1px solid #ccc',
				borderRadius: '8px',
				padding: '20px',
				background: 'white',
				maxWidth: '300px',
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
			}}
		>
			<h3 style={{ margin: '0 0 10px' }}>{title}</h3>
			<div style={{ fontSize: '0.9rem', color: '#666' }}>{children}</div>
		</div>
	);
};

export default BasicCard;
