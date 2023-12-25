import { type FormInstance, message } from 'antd';
import { type AxiosResponse } from 'axios';
import type { Moment } from 'moment';
import moment from 'moment';
import * as XLSX from 'xlsx';

const reg =
	/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const charMap: any = {
	a: '[aàáâãăăạảấầẩẫậắằẳẵặ]',
	e: '[eèéẹẻẽêềềểễệế]',
	i: '[iìíĩỉị]',
	o: '[oòóọỏõôốồổỗộơớờởỡợ]',
	u: '[uùúũụủưứừửữự]',
	y: '[yỳỵỷỹý]',
	d: '[dđ]',
	' ': ' ',
};

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
	if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
		return true;
	}
	return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
	const { NODE_ENV } = process.env;
	if (NODE_ENV === 'development') {
		return true;
	}
	return isAntDesignPro();
};

export function toHexa(str: string) {
	// render rgb color from a string
	if (!str) return '';
	const maxBase = 1000000007;
	const base = 16777216;
	let sum = 1;
	for (let i = 0; i < str.length; i += 1) {
		sum = (sum * str.charCodeAt(i)) % maxBase;
	}
	sum %= base;
	// return `#${sum.toString(16)}`;
	const colors = [
		'rgba(26, 94, 18, 0.7)',
		'rgba(84, 106, 47, 0.7)',
		'rgba(107, 143, 36, 0.7)',
		'rgba(45, 77, 0, 0.7)',
		'rgba(0, 100, 0, 0.7)',
		'rgba(47, 79, 79, 0.7)',
		'rgba(0, 128, 128, 0.7)',
		'rgba(0, 139, 139, 0.7)',
		'rgba(100, 149, 237, 0.7)',
	];
	return colors[sum % colors.length];
}

function render(value: string) {
	// phục vụ hàm toRegex bên dưới
	let result = '';
	[...value].forEach((char: any) => (result += charMap[char] || char));
	return result;
}

export function Format(str: string) {
	// xóa hết dấu + đưa về chữ thường
	if (!str) return '';
	return str
		.toString()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/đ/g, 'd');
}

export function toRegex(value: any) {
	if (!value) return undefined;
	// convert từ string sang dạng regex.
	return { $regex: `.*${render(Format(value))}.*`, $options: 'i' };
}

export function Object2Regex(obj: Record<string, any>) {
	// convert từ string sang dạng regex.
	return Object.keys(obj).map((key) => ({
		[key]: { $regex: `.*${render(Format(obj[key]))}.*`, $options: 'i' },
	}));
}

export function isValue(val: string | number | any[]) {
	// check xem nếu bị undefined, null, xâu rỗng -> false
	if (!val && val !== 0) return false; // undefined, null
	if (val && Array.isArray(val) && val?.length === 0) return false; // ""
	return true;
}

export function trim(str: string) {
	// nếu là moment thì cho sang string
	if (moment.isMoment(str)) return str?.toISOString() ?? '';
	// xóa tất cả dấu cách thừa
	if (typeof str === 'string') return str.replace(/[ ]{2,}/g, ' ').trim();
	return str;
}

export function currencyFormat(num?: number) {
	if (!num) return '0';
	return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ?? '0';
}

export function formatPhoneNumber(num: any) {
	let phone = num.replace(/\D/g, '');
	const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
	if (match) {
		phone = `${match[1]}${match[2] ? ' ' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
	}
	return phone;
}

export function chuanHoaTen(ten: any) {
	return trim(ten)
		.split(' ')
		.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1))
		.join(' ');
}

/**
 * Lấy tên file từ đường dẫn
 * @param {any} url:string Đường dẫn
 * @returns {any} Tên file
 */
export function getNameFile(url: string): string {
	if (typeof url !== 'string') return 'Đường dẫn không đúng';
	return decodeURI(url.split('/')?.at(-1) ?? '');
}

export function renderFileListUrl(url: string) {
	if (!url) return { fileList: [] };
	return {
		fileList: [
			{
				name: getNameFile(url),
				url,
				status: 'done',
				size: 0,
				type: 'img/png',
				remote: true,
			},
		],
	};
}

export function renderFileListUrlWithName(url: string, fileName?: string) {
	if (!url) return { fileList: [] };
	return {
		fileList: [
			{
				name: fileName || getNameFile(url),
				remote: true,
				url,
				status: 'done',
				size: 0,
				type: 'img/png',
			},
		],
	};
}

export function renderFileList(arr: string[]) {
	if (!arr || !Array.isArray(arr)) return { fileList: [] };
	return {
		fileList: arr.map((url, index) => ({
			remote: true, // file đã có trên server, ko phải là upload file mới
			name: getNameFile(url) || `File ${index + 1}`,
			url,
			status: 'done',
			size: 0,
			type: 'img/png',
		})),
	};
}

export const checkFileSize = (arrFile: any[], fileSize?: number) => {
	let check = true;
	const size = fileSize ?? 8;
	arrFile
		?.filter((item) => item?.remote !== true)
		?.forEach((item) => {
			if (item?.size / 1024 / 1024 > size) {
				check = false;
				message.error(`file ${item?.name} có dung lượng > ${size}Mb`);
			}
		});
	return check;
};

export const convert4NumberScoreToAlphabet = (score: string | number): string => {
	const scoreValue = Number(score);
	if (scoreValue === 4) return 'A+';
	else if (scoreValue >= 3.7) return 'A';
	else if (scoreValue >= 3.5) return 'B+';
	else if (scoreValue >= 3) return 'B';
	else if (scoreValue >= 2.5) return 'C+';
	else if (scoreValue >= 2) return 'C';
	else if (scoreValue >= 1.5) return 'D+';
	else if (scoreValue >= 1) return 'D';
	else if (scoreValue >= 0) return 'F';
	else return '';
};

/**
 * Convert điểm hệ 10 sang hệ 4 và dạng chữ
 * @param  {string|number} score Điểm hệ 10
 * @returns [điểm dạng chữ, điểm hệ 4]
 */
export const convertNumberScoreToAlphabet = (score: string | number): [string, string] => {
	if (!score) return ['', ''];
	const scoreValue = Math.round(Number(score) * 10) / 10;
	let numberScore = -1;
	if (scoreValue >= 9.0 && scoreValue <= 10) numberScore = 4;
	else if (scoreValue >= 8.5) numberScore = 3.7;
	else if (scoreValue >= 8.0) numberScore = 3.5;
	else if (scoreValue >= 7.0) numberScore = 3;
	else if (scoreValue >= 6.5) numberScore = 2.5;
	else if (scoreValue >= 5.5) numberScore = 2;
	else if (scoreValue >= 5.0) numberScore = 1.5;
	else if (scoreValue >= 4.0) numberScore = 1;
	else if (scoreValue >= 0) numberScore = 0;

	return [convert4NumberScoreToAlphabet(numberScore), numberScore.toString()];
};

export const buildFormData = (payload: any) => {
	const form = new FormData();
	Object.keys(payload).map((key) => {
		if (isValue(payload[key])) {
			if (Array.isArray(payload[key])) {
				for (let i = 0; i < payload[key].length; i += 1) {
					form.append(key, payload[key][i]);
				}
				return;
			}
			form.set(key, trim(payload[key]));
		}
	});
	return form;
};

export const makeId = (length: number) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

export const range = (start: number, end: number) => {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
};

export const disabledRangeTime = (current: Moment, type: 'start' | 'end', hour: string, minute: string) => {
	return current && current.format('DDMMYYYY') === moment().format('DDMMYYYY')
		? {
				disabledHours: () => range(0, Number(hour)),
				disabledMinutes: () => range(0, hour === current.format('HH') ? Number(minute) : 0),
				disabledSeconds: () => [55, 56],
		  }
		: {};
};

export const tienVietNam = (number: number) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export const b64toBlob = (b64Data?: string, contentType = '', sliceSize = 512) => {
	if (!b64Data) return undefined;
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
};


export const downloadFileFromBlod = (data: Blob) => {
  const csvURL = window.URL.createObjectURL(data);
  const tempLink = document.createElement('a');
  tempLink.href = csvURL;
  tempLink.setAttribute('download', 'filename.csv');
  tempLink.click();
};
export const blobToBase64 = (file: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const ellipse = (text: string | any[], length: number = 20) => {
	let s = '';
	if (text?.length < length) return text;
	for (let i = 0; i < length; i++) {
		s += text[i];
	}
	s += '...';
	return s;
};

export const removeHtmlTags = (html: string) =>
	html
		?.replace(/<\/?[^>]+(>|$)/g, '')
		?.replace(/&nbsp;/g, '')
		?.trim();

/**
 * Chuyển HTML Entities thành text
 * @returns {any}
 */
export const decodeHtmlEntities = (str: string): string => {
	if (str && typeof str === 'string') {
		const element = document.createElement('div');
		// strip script/html tags
		let s = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
		s = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
		element.innerHTML = s;
		s = element.textContent || '';
		element.textContent = '';
		return s;
	}
	return '';
};

/**
 * Number to currency format
 * @param number value
 */
export const inputFormat = (value?: number): string => `${value}`.replace(/(?=(\d{3})+(?!\d))\B/g, ',');

/**
 * Input value to number
 * @param string value
 */
export const inputParse = (value?: string): number => +(value?.replace(/\₫\s?|(,*)[^\d]/g, '') ?? 0);

/**
 * Chuẩn hóa Object trước khi lưu
 * trim string
 */
export const chuanHoaObject = (obj: any) => {
	if (!obj) return obj; // undefined or null
	if (typeof obj !== 'object') return trim(obj);
	Object.keys(obj).forEach((key) => (obj[key] = chuanHoaObject(obj[key])));
	return obj;
};

/**
 * Tạo và tài về file dữ liệu Excel
 * @param data Mảng của mảng dữ liệu. Ví dụ: [ ["Mã", "Tên"] , ["M01", "T01"] , ["M02", "T02"] ]
 * @param fileName File name bao gồm cả .xlsx
 * @param sheetName Mặc định Sheet1
 */
export const genExcelFile = (data: (string | number | null | undefined)[][], fileName: string, sheetName?: string) => {
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.aoa_to_sheet(data);
	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1');

	XLSX.writeFile(workbook, fileName || 'Danh sách.xlsx');
};

/**
 * Clear values of component in Form
 * @param form
 */
export const resetFieldsForm = (form: FormInstance<any>, formDefaultValues?: Record<string, any>) => {
	const values = form.getFieldsValue();
	Object.keys(values).map((k) => (values[k] = undefined));
	form.setFieldsValue({ ...values, ...(formDefaultValues ?? {}) });
	form.setFields(form.getFieldsError().map((item) => ({ name: item.name, errors: undefined, warnings: undefined })));
};

/**
 * Get file name from response's header
 * @param response Response from Export API
 * @returns
 */
export const getFilenameHeader = (response: AxiosResponse<any>) => {
	const token = String(response.headers['content-disposition'])
		.split(';')
		.find((a) => a.startsWith('filename='));
	if (!token) {
		return 'Tài liệu';
	} else {
		return decodeURIComponent(token.substring(10).slice(0, -1));
	}
};

/**
 * So sánh họ tên tiếng Việt
 * @param a
 * @param b
 * @returns
 */
export const compareFullname = (a: any, b: any): number => {
	if (typeof a !== 'string' || typeof b !== 'string') return 0;
	const tenA = a.split(' ').pop()?.toLocaleLowerCase() ?? '';
	const tenB = b.split(' ').pop()?.toLocaleLowerCase() ?? '';
	const compareTen = tenA.localeCompare(tenB);

	return compareTen === 0 ? a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()) : compareTen;
};
