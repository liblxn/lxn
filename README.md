# lxn
`lxn` is a localization toolkit with its own simple translation format. The format itself represents a human-readable schema and is meant to be used by translators. This schema can then be converted into a binary catalog, which uses a compact representation of the schema and is ready to be used by the client libaries. To compile schemas into a binary catalogs, [`lxnc`](https://github.com/liblxn/lxnc) can be used.

## Schema Definition
The human-readable schema consists of a dictionary, which contains all the translated messages for a specific language. It can be subdivided into sections in order to be able to cluster messages. To uniquely identify messages, each message has a key assigned to it. A message itself commonly contains static and variable parts. The static parts are just text in the specified language, whereas the variable parts will be replaced by a specific value during runtime.

### Messages
```
message-key:
    This is a text which can be translated
    into the desired language.
```
A message has to be preceded by its key. A key always starts at the very beginning of the line (followed by a colon) and has to be unique within the current section. Afterwards the message text can be defined, which has to be indented. It is also possible for the text to span multiple lines, as long as the indentation is kept up. Furthermore, a message text can contain blank lines, too.

When the text is rendered in the application, line breaks will be replaced by single spaces.

### Variables
```
${name}
${name.type}
${name:type.option{option-params}}
```
Variables can be placed within a message and represent variable parts, that will be replaced during runtime. A variable consists of a name, a type, and options. The name is used to identify the variable during the runtime replacement. The type is used to let the client libraries know how to render the variable's value and is specified in a case-insensitive manner. The following types are currently supported:
* [`string`](#string-variables)
* [`number`](#numeric-variables)
* [`percent`](#percentage-variables)
* [`money`](#money-variables)
* [`plural`](#plural-variables)
* [`select`](#select-variables)

#### String Variables
```
${name}
${name:string}
```
A string variable is a simple replacement without any magic. The given value will not be modified or transformed when rendered to the final message. This type is the default, when no type is declared. String variables do not have any options, which can be applied.

#### Numeric Variables
```
${name:number}
```
A number variable takes a numeric value and transforms it into a locale-dependent string representation. Here, things like the decimal separator, the digits, and grouping play a role. Numeric variables do not have any options, which can be applied.

#### Percentage Variables
```
${name:percent}
```
A percentage variable takes a numeric value and transforms it into a locale-dependent string representation. Here things like the percentage sign, the digits, and the decimal separator play a role. Percentage variables do not have any options, which can be applied.

#### Money Variables
```
${name:money
    .currency{curr}
}
```
A money variable takes a numeric value and a currency and transforms it into a locale-dependent string representation. Here things like the position of the currency sign, the digits, and the grouping play a role. Money variables take the required `.currency` option, which specifies the variable name of the currency symbol.

#### Plural Variables
```
${name:plural
    .ordinal
    .zero{zero-message}
    .one{one-message}
    .two{two-message}
    .few{few-message}
    .many{many-message}
    .other{other-message}
    .[7]{seven-message}
}
```
A plural variable takes a numeric value and conditionally transforms it into the corresponding sub-message. The nested sub-message can contain a whole message with all its static and dynamic parts (there is no difference from a top-level message). There are six standard plural categories: `.zero`, `.one`, `.two`, `.few`, `.many`, and `.other`. Each language has a predefined set of those plural categories, which the language is able to resolve and which should all be provided. To ensure there will always be a message to be resolved, the `.other` option is required.  With the Unicode's [Language Plural Rules](http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html) a numeric value can then be mapped to its corresponding plural category.

If a certain numeric value shall be overriden, a fixed number can be provided with the `.[<number>]` option. In the resolving process, this number will always precede the Unicode's plural rules.

A plural form can come in two flavors: cardinal and ordinal. This can be specified by the `.cardinal` and `.ordinal` option respectively, where cardinal is the default. Cardinal and ordinal plurals have a different set of rules assigned and can make a difference in the resolving step.

#### Select Variables
```
${name:select
    .default{case one}
    .[case one]{case-one-message}
    .[case two]{case-two-message}
}
```
A select variable takes a string value and transforms it into a specific sub-message, depending on the value. It can be seen as a dictionary with string keys and message values. All sub-messages can contain a whole message with all its static and dynamic parts. If the string value does not match any given key, a default key can be specified using the `.default` option.


### Sections
```
[[ section.name ]]
```
Messages can be subdivided into sections, which act as a kind of namespace. Sections are open, that means a section is extendible and different parts of a schema can define the whole section.

## Example
```
welcome-back:
    Welcome back, ${username}. Your last visit was ${days-gone:plural
        .zero{today}
        .one{yesterday}
        .other{${days-gone:number} days ago}
        .[7]{a week ago}
    }.

[[ donation ]]
money-sent:
    You just sent ${amount:money.currency{curr}} to ${username}.
    ${gender:select
        .default{other}
        .[female]{She}
        .[male]{He}
        .[other]{The other person}
    } will receive the money within the next days.
```
