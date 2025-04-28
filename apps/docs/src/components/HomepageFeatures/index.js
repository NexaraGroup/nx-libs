import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

const FeatureList = [
	{
		title: '开箱即用',
		icon: (
			<svg
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 16V7.97C21 7.39 20.76 6.84 20.33 6.45L14.8 1.45C14.31 1 13.63 0.84 13 1.05C12.37 1.26 12 1.84 12 2.53V8L3.67 14.97C3.24 15.36 3 15.91 3 16.49V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V18"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 8L20.33 14.97"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		description: <>精心设计的API，简单易用。一致的设计风格，降低学习成本，快速上手开发。</>,
	},
	{
		title: '类型安全',
		icon: (
			<svg
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 8V16"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M8 12H16"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		description: (
			<>全面的TypeScript支持，完整的类型定义，提高代码质量，减少错误，增强开发体验。</>
		),
	},
	{
		title: '模块化设计',
		icon: (
			<svg
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M14 2V8H20"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M8 13H16"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M8 17H16"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10 9H12"
					stroke="#2563eb"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		description: (
			<>独立的包设计，按需引入，减小打包体积。支持Tree-Shaking，只引入你需要的部分。</>
		),
	},
];

function Feature({ icon, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center padding-vert--md">{icon}</div>
			<div className="padding-horiz--md">
				<h3 className="text--center">{title}</h3>
				<p className="text--center">{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
