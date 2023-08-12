//------ REGEX PATTERENS FOR VALIDATION ------//
export const NUMBER_ONLY: RegExp = /[^0-9]*/g;
export const NUMBER_FLOAT: RegExp = /^\d*\.?\d{0,5}$/g;
//------ PAGE PER LIMIT -----//
export const PAGE_PER_LIMIT: number = 7;

export const EMAIL_REGEX: RegExp = /^(?=.{12,150}$)^[a-zA-Z0-9]+(\.?[a-zA-Z0-9])*@[a-zA-Z0-9]+\.([a-zA-Z]{2,3}|[a-zA-Z]{2}\.[a-zA-Z]{2,3})$/;
export const PAN_NO_REGEX: RegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const GSTIN_REGEX: RegExp = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
export const CIN_REGEX: RegExp = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
export const IFSC_CODE_REGEX: RegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const BANK_ACCOUNT_NO_REGEX: RegExp = /^[0-9]{9,18}$/;
export const PINCODE_REGEX: RegExp = /^[0-9]{1,6}$/;