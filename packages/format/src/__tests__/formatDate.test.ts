import { formatDate } from '@nxlibs/format';
import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
	it('能正确格式化 Date 对象', () => {
		const date = new Date('2023-01-01T12:34:56Z');
		expect(formatDate(date, { format: 'YYYY-MM-DD' })).toBe('2023-01-01');
	});

	it('能正确格式化时间戳', () => {
		// 使用本地时区的 2023-01-01 12:34:56
		const date = new Date(2023, 0, 1, 12, 34, 56); // 月份从0开始
		const timestamp = date.getTime();
		expect(formatDate(timestamp, { format: 'YYYY-MM-DD HH:mm:ss' })).toBe(
			'2023-01-01 12:34:56',
		);
	});

	it('能正确格式化时间戳字符串', () => {
		const date = new Date(2023, 0, 1, 12, 34, 56);
		const timestampStr = String(date.getTime());
		expect(formatDate(timestampStr, { format: 'YYYY-MM-DD HH:mm:ss' })).toBe(
			'2023-01-01 12:34:56',
		);
	});

	it('无效输入返回 "-"', () => {
		expect(formatDate(null)).toBe('-');
		expect(formatDate(undefined)).toBe('-');
		expect(formatDate({})).toBe('-');
		expect(formatDate([])).toBe('-');
	});

	it('无效日期字符串返回 "-"', () => {
		expect(formatDate('not-a-date')).toBe('-');
	});

	it('默认格式化为 YYYY-MM-DD HH:mm:ss', () => {
		const date = new Date('2023-01-01T12:34:56Z');
		expect(formatDate(date)).toMatch(/2023-01-01/);
	});

	it('dayjs 解析失败时返回 "-"', () => {
		// 传入非法类型但能进入 try 逻辑
		const invalidValue = Symbol('invalid');
		// @ts-expect-error
		expect(formatDate(invalidValue)).toBe('-');
	});
});
