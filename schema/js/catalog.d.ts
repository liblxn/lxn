// Code generated by mprotc.
// Do not edit.
import {Type} from "messagepack";

export declare var Catalog: Type<Catalog>;
export interface Catalog {
	version: number;
	locale: Locale;
	messages: Message[];
}

export declare var Symbols: Type<Symbols>;
export interface Symbols {
	decimal: string;
	group: string;
	percent: string;
	minus: string;
	inf: string;
	nan: string;
	zero: number;
}

export declare var NumberFormat: Type<NumberFormat>;
export interface NumberFormat {
	symbols: Symbols;
	positivePrefix: string;
	positiveSuffix: string;
	negativePrefix: string;
	negativeSuffix: string;
	minIntegerDigits: number;
	minFractionDigits: number;
	maxFractionDigits: number;
	primaryIntegerGrouping: number;
	secondaryIntegerGrouping: number;
	fractionGrouping: number;
}

export declare const enum PluralTag {
	Zero  = 0,
	One   = 1,
	Two   = 2,
	Few   = 3,
	Many  = 4,
	Other = 5,
}

export declare const enum Operand {
	AbsoluteValue        = 0,
	IntegerDigits        = 1,
	NumFracDigits        = 2,
	NumFracDigitsNoZeros = 3,
	FracDigits           = 4,
	FracDigitsNoZeros    = 5,
}

export declare const enum Connective {
	None        = 0,
	Conjunction = 1,
	Disjunction = 2,
}

export declare var Range: Type<Range>;
export interface Range {
	lowerBound: number;
	upperBound: number;
}

export declare var PluralRule: Type<PluralRule>;
export interface PluralRule {
	operand: Operand;
	modulo: number;
	negate: Bool;
	ranges: Range[];
	connective: Connective;
}

export declare var Plural: Type<Plural>;
export interface Plural {
	tag: PluralTag;
	rules: PluralRule[];
}

export declare var Locale: Type<Locale>;
export interface Locale {
	id: string;
	decimalFormat: NumberFormat;
	moneyFormat: NumberFormat;
	percentFormat: NumberFormat;
	cardinalPlurals: Plural[];
	ordinalPlurals: Plural[];
}

export declare var Message: Type<Message>;
export interface Message {
	section: string;
	key: string;
	text: string[];
	replacements: Replacement[];
}

export declare var Replacement: Type<Replacement>;
export interface Replacement {
	key: string;
	textPos: number;
	type: ReplacementType;
	details: ReplacementDetails;
}

export declare var ReplacementDetails: Type<ReplacementDetails>;
export type ReplacementDetails = EmptyDetails | MoneyDetails | PluralDetails | SelectDetails

export declare const enum ReplacementType {
	StringReplacement  = 1,
	NumberReplacement  = 2,
	PercentReplacement = 3,
	MoneyReplacement   = 4,
	PluralReplacement  = 5,
	SelectReplacement  = 6,
}

export declare const enum PluralType {
	Cardinal = 0,
	Ordinal  = 1,
}

export declare var EmptyDetails: Type<EmptyDetails>;
export interface EmptyDetails {
}

export declare var MoneyDetails: Type<MoneyDetails>;
export interface MoneyDetails {
	currency: string;
}

export declare var PluralDetails: Type<PluralDetails>;
export interface PluralDetails {
	type: PluralType;
	variants: {[key: PluralTag]: Message};
	custom: {[key: number]: Message};
}

export declare var SelectDetails: Type<SelectDetails>;
export interface SelectDetails {
	cases: {[key: string]: Message};
	fallback: string;
}

