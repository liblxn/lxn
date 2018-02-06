# lxn
`lxn` is a localization toolkit with its own simple translation format. The format itself represents a human-readable schema and is meant to be used by translators. This schema can then be converted into a binary catalog, which uses a compact representation of the schema and is ready to be used by the client libaries. To compile schemas into a binary catalogs, [`lxnc`](https://github.com/liblxn/lxnc) could be used.

## Schema Definition
The human-readable schema consists of a dictionary which contains all the translated messages for a specific language. It can be subdivided into sections in order to be able to cluster messages. To uniquely identify messages, each message has a key assigned to it. A message itself commonly contains static and variable parts. The static parts are just text in the specified language, whereas the variable parts will be replaced by a specific value during runtime.

### Messages
```
message-key:
    This is a text which can be translated
    into the desired language.
```
A message has to be preceded by its key. A key always starts at the very beginning of the line (followed by a colon) and has to be unique within the current section. Afterwards the message text can be defined, which has to be indented. It is also possible for the text to span multiple lines, as long as the indentation is kept up. Furthermore, a message text can contain blank lines.

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
A number variable takes a numeric value and transforms it to a locale-dependent string representation. Here things like the decimal separator, digits, and grouping play a role. Numeric variables do not have any options, which can be applied.

#### Percentage Variables
```
${name:percent}
```
A percentage variable takes a numeric value and transforms it to a locale-dependent string representation. Here things like the percentage format, the digits, and the decimal separator play a role. Percentage variables do not have any options, which can be applied.

#### Money Variables
```
${name:money.currency{curr}}
```
A money variable takes a numeric value and a currency and transforms it to a locale-dependent string representation. Here things like the position of the currency sign, the digits, and the grouping play a role. Money variables take the required `.currency` option, which specifies the variable name of the currency symbol.

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
A plural variable conditionally transforms to a sub-message with the help of a numeric value. The nested sub-message can contain a whole message with all its static and dynamic parts (there is no difference from a top-level message). For each Unicode plural form (`.zero`, `.one`, `.two`, `.few`, `.many`, and `.other`) there is a built-in option, where `.other` is required. It is also possible to override certain numeric values with the `.[<number>]` option.

The plural can come in two flavors: cardinal and ordinal. This can be specified by the `.cardinal` and `.ordinal` option respectively, where cardinal is the default.

During the render process, it is necessary to decide which plural rule should be applied. To do so, it will first be checked if the given number is overridden with a particular rule. In this case the corresponding sub-message will be chosen. Otherwise a locale-dependent algorithm from the [CLDR](http://cldr.unicode.org/) project is used to determine the standard plural form.

#### Select Variables
```
${name:select
    .default{case one}
    .[case one]{case-one-message}
    .[case two]{case-two-message}
}
```
A select variable takes a string value and transforms it to a specific sub-message, depending on the value. It can be seen as a dictionary with string keys and message values. All sub-messages can contain a whole message with all its static and dynamic parts. If the string value does not match any given key, a default key can be specified using the `.default` option.


### Sections
```
[[ section.name ]]
```
Messages can be subdivided into sections, which act as a kind of namespace. Sections are open, that means sections are extendible and different parts of a schema can define the whole section.

## Example
```
welcome-back:
    Welcome back, ${username}. Your last visit was ${days-gone:plural
        .zero{today}
        .one{yesterday}
        .other{${days-gone:number} days ago}
        .[7]{a week ago}
    }.

[[ money ]]
money-sent:
    You just sent ${amount:money.currency{curr}} to ${username}.
    ${gender:select.[female]{She}.[male]{He}} will receive the money the next days.
```
