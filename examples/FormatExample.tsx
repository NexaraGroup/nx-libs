import { formatDate, formatNumber } from '@nx-utils/format';
import React, { useState } from 'react';

interface NumberFormattingProps {
	initialValue?: number;
}

export const NumberFormatting: React.FC<NumberFormattingProps> = ({
	initialValue = 12345.6789,
}) => {
	const [value, setValue] = useState<string>(initialValue.toString());
	const [removeTrailingZeros, setRemoveTrailingZeros] = useState<boolean>(true);
	const [addThousandsSeparator, setAddThousandsSeparator] = useState<boolean>(true);

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const formattedValue = formatNumber(value, {
		removeTrailingZeros,
		addThousandsSeparator,
	});

	return (
		<div className="number-formatting">
			<h3>数字格式化示例</h3>
			<div className="form-group">
				<label>
					输入数值：
					<input
						type="text"
						value={value}
						onChange={handleValueChange}
						placeholder="输入数字"
					/>
				</label>
			</div>
			<div className="form-group">
				<label>
					<input
						type="checkbox"
						checked={removeTrailingZeros}
						onChange={() => setRemoveTrailingZeros(!removeTrailingZeros)}
					/>
					去除尾部的0
				</label>
			</div>
			<div className="form-group">
				<label>
					<input
						type="checkbox"
						checked={addThousandsSeparator}
						onChange={() => setAddThousandsSeparator(!addThousandsSeparator)}
					/>
					添加千分位分隔符
				</label>
			</div>
			<div className="result">
				<strong>格式化结果：</strong> {formattedValue}
			</div>
		</div>
	);
};

interface DateFormattingProps {
	initialDate?: Date;
}

export const DateFormatting: React.FC<DateFormattingProps> = ({ initialDate = new Date() }) => {
	const [date, setDate] = useState<string>(initialDate.toISOString().slice(0, 16));
	const [format, setFormat] = useState<string>('YYYY-MM-DD HH:mm:ss');

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(e.target.value);
	};

	const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormat(e.target.value);
	};

	const formattedDate = formatDate(new Date(date), { format });

	return (
		<div className="date-formatting">
			<h3>日期格式化示例</h3>
			<div className="form-group">
				<label>
					选择日期：
					<input type="datetime-local" value={date} onChange={handleDateChange} />
				</label>
			</div>
			<div className="form-group">
				<label>
					格式化模板：
					<input
						type="text"
						value={format}
						onChange={handleFormatChange}
						placeholder="YYYY-MM-DD HH:mm:ss"
					/>
				</label>
			</div>
			<div className="common-formats">
				<button onClick={() => setFormat('YYYY-MM-DD')}>年-月-日</button>
				<button onClick={() => setFormat('YYYY年MM月DD日')}>中文日期</button>
				<button onClick={() => setFormat('MM/DD/YYYY')}>美式日期</button>
				<button onClick={() => setFormat('HH:mm:ss')}>时间</button>
			</div>
			<div className="result">
				<strong>格式化结果：</strong> {formattedDate}
			</div>
		</div>
	);
};

const FormatExample: React.FC = () => {
	return (
		<div className="format-example">
			<h2>@nx-utils/format 使用示例</h2>

			<div className="format-section">
				<NumberFormatting />
			</div>

			<div className="format-section">
				<DateFormatting />
			</div>

			<div className="code-examples">
				<h3>代码示例</h3>
				<pre>
					{`
// 数字格式化
import { formatNumber } from '@nx-utils/format';

// 基本使用
formatNumber(1234.5600);       // "1,234.56"
formatNumber('1234.5600');     // "1,234.56"

// 自定义选项
formatNumber(1234.5600, { 
  removeTrailingZeros: false 
}); // "1,234.5600"

// 日期格式化
import { formatDate } from '@nx-utils/format';

// 基本使用
formatDate(new Date());           // "2023-06-15 14:30:25"

// 自定义格式
formatDate(new Date(), { 
  format: 'YYYY年MM月DD日' 
}); // "2023年01月01日"
          `}
				</pre>
			</div>
		</div>
	);
};

export default FormatExample;
