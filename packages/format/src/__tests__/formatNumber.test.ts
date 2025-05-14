import { formatNumber } from '@nxlibs/format';
import { describe, expect, it } from 'vitest';

describe('formatNumber', () => {
	it('能正确格式化整数并添加千分位', () => {
		expect(formatNumber(1234567)).toBe('1,234,567');
		expect(formatNumber('1234567')).toBe('1,234,567');
	});

	it('能正确格式化小数并去除尾部 0', () => {
		expect(formatNumber(1234.5)).toBe('1,234.5');
		expect(formatNumber('1234.5000')).toBe('1,234.5');
	});

	it('能关闭千分位分隔符', () => {
		expect(formatNumber(1234567, { addThousandsSeparator: false })).toBe('1234567');
	});

	it('无效输入返回 "-"', () => {
		expect(formatNumber(null)).toBe('-');
		expect(formatNumber(undefined)).toBe('-');
		expect(formatNumber('abc')).toBe('-');
		expect(formatNumber({})).toBe('-');
		expect(formatNumber([])).toBe('-');
	});

	it('能处理科学计数法字符串', () => {
		expect(formatNumber('1e3')).toBe('1,000');
	});

	it('BigNumber 构造异常时返回 "-"（非法字符串）', () => {
		// Big.js 不能解析的字符串会抛异常
		expect(formatNumber('not-a-number')).toBe('-');
		// Big.js 不能解析的超大数
		expect(formatNumber('1e1000000')).toBe('-');
	});

	it('字符串为全空格时返回 "-"', () => {
		expect(formatNumber('   ')).toBe('-');
	});

	it('去除尾部 0 但无小数点', () => {
		// 123 没有小数点，removeTrailingZeros 分支不会触发
		expect(formatNumber(123, { removeTrailingZeros: true })).toBe('123');
	});

	it('不加千分位分隔符且有小数', () => {
		expect(formatNumber(1234.5, { addThousandsSeparator: false })).toBe('1234.5');
	});

	it('空字符串时返回 "-"', () => {
		expect(formatNumber('')).toBe('-');
	});

	it('字符串为 NaN 或 Infinity 时返回 "-"', () => {
		expect(formatNumber('NaN')).toBe('-');
		expect(formatNumber('Infinity')).toBe('-');
	});
});
