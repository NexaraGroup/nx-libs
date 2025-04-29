/* eslint-disable */
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
/* eslint-enable */

import clsx from 'clsx';
import React from 'react';

import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
	return (
		<header className={styles.heroBanner}>
			<div className="container">
				<div className={styles.heroContent}>
					<div className={styles.heroLeft}>
						<h1 className={styles.heroTitle}>NX Utils</h1>
						<p className={styles.heroTagline}>轻松管理和开发大型前端项目</p>
						<p className={styles.heroDescription}>
							nx-utils 是一套轻量级工具集，旨在改善使用 Nx
							开发大型应用时的体验。提供了自动化API客户端生成、
							多环境变量管理以及构建优化等多种功能。
						</p>
						<div className={styles.heroButtons}>
							<a className={styles.buttonPrimary} href="/docs/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className={styles.buttonIcon}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
									/>
								</svg>
								快速开始
							</a>
						</div>
					</div>
					<div className={styles.heroRight}>
						<div className={styles.terminalContainer}>
							<div className={styles.terminalHeader}>
								<div className={styles.terminalDots}>
									<span
										className={clsx(styles.terminalDot, styles.dotRed)}
									></span>
									<span
										className={clsx(styles.terminalDot, styles.dotYellow)}
									></span>
									<span
										className={clsx(styles.terminalDot, styles.dotGreen)}
									></span>
								</div>
								<div className={styles.terminalTitle}>terminal</div>
							</div>
							<div className={styles.terminalBody}>
								<div className={styles.codeSample}>
									<div className={styles.codeLine}>
										<span className={styles.keyword}>import</span> {'{'}{' '}
										formatNumber, formatDate {'}'}{' '}
										<span className={styles.keyword}>from</span>{' '}
										<span className={styles.string}>'@nx-utils/format'</span>;
									</div>
									<br />
									<div className={styles.codeLine}>
										<span className={styles.comment}>// 格式化数字</span>
									</div>
									<div className={styles.codeLine}>
										formatNumber(1234.5600);{' '}
										<span className={styles.comment}>// "1,234.56"</span>
									</div>
									<div className={styles.codeLine}>
										formatNumber(1234.5600, {'{'} removeTrailingZeros: false{' '}
										{'}'});{' '}
										<span className={styles.comment}>// "1,234.5600"</span>
									</div>
									<br />
									<div className={styles.codeLine}>
										<span className={styles.comment}>// 格式化日期</span>
									</div>
									<div className={styles.codeLine}>
										formatDate(
										<span className={styles.keyword}>'1672531200000'</span>
										<span className={styles.string}></span>
										);{' '}
										<span className={styles.comment}>
											// "2023-01-01 00:00:00"
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function PackageSection() {
	const packages = [
		{
			name: '@nx-utils/format',
			description: '数字和日期格式化工具',
			link: '/docs/packages/format',
		},
		{
			name: '@nx-utils/typescript-config',
			description: '共享 TypeScript 配置',
			link: '/docs/packages/typescript-config',
		},
		{
			name: '@nx-utils/eslint-config',
			description: '共享 ESLint 配置',
			link: '/docs/packages/eslint-config',
		},
		{
			name: '@nx-utils/prettier-config',
			description: '共享 Prettier 配置',
			link: '/docs/packages/prettier-config',
		},
	];

	return (
		<section className={styles.packagesSection}>
			<div className="container">
				<h2 className="text--center margin-bottom--xl">包概览</h2>
				<div className="row">
					{packages.map((pkg, idx) => (
						<div key={idx} className="col col--6 margin-bottom--lg">
							<div className={styles.packageCard}>
								<h3>{pkg.name}</h3>
								<p>{pkg.description}</p>
								<a className={styles.packageLink} href={pkg.link}>
									查看文档 →
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	return (
		<Layout
			title="轻松管理和开发大型前端项目"
			description="nx-utils 是一套轻量级工具集，旨在改善使用 Nx 开发大型应用时的体验"
		>
			<Head>
				<meta property="og:title" content="NX Utils - 轻松管理和开发大型前端项目" />
				<meta
					property="og:description"
					content="nx-utils 是一套轻量级工具集，旨在改善使用 Nx 开发大型应用时的体验"
				/>
			</Head>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
				<PackageSection />
			</main>
		</Layout>
	);
}
