# Clever Visual Studio Code

<img src="https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/icon-small.png" style="width: 120px; float: left; margin: 20px">

**Clever vscode** was initially a personnal project to provide some missing features to the editor. Especially __Sublime Text__ one, my former love.

After sharing it with almost all my friends they motivate me to push it for cummunity.

Suggestions, PR or ideas for embed macros are very welcome.

Think about [rating and review](https://marketplace.visualstudio.com/items?itemName=davidbabel.Clever).
<br/><br/><br/>

## Features

Here are all the awesome current features of __Clever__ (you can browse behaviour gifs below):

- 🚀🚀🚀  [fast block select](#fast-block-select)
- 💡 [maximise (toggle) the current editor](#toggle-maximise-current-editor)
- ⚙️ [advanced macros system](#advanced-macros)
  - [Add fragment macro example](#add-fragment-macro-example)
  - [Sublime Text file navigation macro example](#sublime-text-file-navigation-example)
  - [Rebind any key to another](#rebind-any-key-to-another)
- 🚀🚀 [quick switch between string quotes **'** → **"** → **`**](#quick-quotes-switch)
- 🚀 [toggle endline with **","** or **";"** or **":"**](#toggle-endline)
- 🚀 [insert incremental number or letter via multi cursor](#insert-incremental-numbers-or-letters)
- 🚀 [fast cursor navigation / selection](#fast-cursor-navigation)
- 🚀 [shortcut commands to](#shortcuts) :
  - [insert curly braces](#insert-curly-braces)
  - [insert arrow function](#insert-arrow-function)
  - [insert template string var](#insert-template-string-var)
- ⚙️⚙️ [an advanced guide to improve vscode by config](#create-the-best-editor)
- and more to come ...
- and i'm aware of your ideas ([submit yours](#contribs))

Every feature comes with keybinding suggestions. On install, this extension does not set any keybinding to prevent issues with different countries keyboard compatibility and allow you to only use the keybindings you need.

So you have to set it manually in your `keybindings.json`. We are developpers, we made the `json` version ;)

## Fast block select

_Demo_

__Note__ that this is a single same shortcut allowing this result :

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/block-clever.gif)

_Binding suggestion:_

```json
{
  "key": "ctrl+r",
  "mac": "cmd+r",
  "command": "clever.blockSelect.cleverSelect",
  "when": "editorTextFocus"
}
```

If needed, the following commands are also provided :

```js
clever.blockSelect.quotes;          // " " , ' ' , ` `
clever.blockSelect.parenthesis;     // ( )
clever.blockSelect.squareBrackets;  // [ ]
clever.blockSelect.curlyBrackets;   // { }
clever.blockSelect.angleBrackets;   // <AngleBracket>  </AngleBracket>
clever.blockSelect.inTag;           // <> inTag </>
```

I recommand you to bind them to something like `cmd+k '` or `cmd+k (` etc ... It's very handy and may not create binding conflicts.

## Toggle maximise current editor

_Demo_

__Note:__ this is especially helpfull on a side comparaison during commit diff

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/toggle-maximize.gif)

_Binding suggestion:_

```json
{
  "key": "shift+ctrl+enter",
  "mac": "shift+cmd+enter",
  "command": "clever.maximize.toggleWithSidebar",
  "when": "editorTextFocus"
}
```

If needed, the following command is also provided :

```js
clever.maximize.toggleWithoutSidebar
```


## Advanced macros

The Macro feature allows you to execute a list of vscode commands or any extensions commands, including "clever vscode" ones.

It also provides two helpers commands (see examples below for API):

- a `wait` helper to be able to manage async commands (especially extension ones which may miss to await callbacks).
- a `type` helper to insert text, like a "programmatic snippet".

Each macro is a "config / keybinding" combo. The wanted macro got a name, and an array of commands :

### Add fragment macro example

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/macro-fragment.gif)

_Configs_

```js
{
  "clever.macros": {
    "exampleAddFragment": [ // macro name to remember in bindings
      "type:<>\n\n</>",     // type command with text param
      "cursorUp"            // 2nd command
    ],
    "betterAddFragment": [
      "type:<>\n$1\n</>"    // type also support snippet syntax
    ]
    // "otherMacro": [/* commands list */]
    // ...
  }
}
```

_Binding suggestion:_

```json
{
  "key": "whatever you want",
  "command": "clever.macros.betterAddFragment",
  "when": "editorTextFocus"
}
```

__Note:__ to find every commands available, browse it in the shortcut palette `cmd+k cmd+s`

### Sublime Text file navigation macro example

Another example, this macro allow to fastOpen a file without loosing focus from the file explorer (sublime text style).

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/macro-quickopen.gif)

This workflow is amazing, it allows you to not use your mouse to open quickly multiple files. Check the [advanced config guide](#create-the-best-editor) to create a enhanced navigation system into vscode.

_Configs_

```js
{
  "clever.macros": {
    "fastOpenFile": [
      "list.select",                   // open current hover file
      "wait:20",                       // wait for 20ms before next (default 50ms)
      "workbench.action.focusSideBar"  // send focus back to the file explorer
    ],
    "openAndKeepFile": [
      "list.select",                   // open current hover file
      "workbench.action.files.save",   // this will keep the file open
      "wait:20",                       // wait for 20ms before next (default 50ms)
      "workbench.action.focusSideBar"  // send focus back to the file explorer
    ],
    "openFile": [
      "list.select",                   // open current hover file
      "workbench.action.files.save",   // this will keep the file open
    ]
  }
}
```

_Binding suggestion:_

__Note:__ to be able to map "enter" here you have to unbind it first. (see the [advanced config guide](#create-the-best-editor) to do so)

```js
{
  "key": "right",
  "command": "clever.macros.fastOpenFile",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
},
{
  // note : "enter" must be unbind first
  "key": "enter",
  "command": "clever.macros.openAndKeepFile",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
},
{
  "key": "left",
  "command": "clever.macros.openFile",
  "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
}
```

### Rebind any key to another

The following will insert a `b` when you type a `j`. It works with any key, especially special characters.

_Configs_

```js
{
  "clever.macros": {
    "b": ["type:b"]
  }
}
```

_Binding example:_

```json
{
  "key": "j",
  "command": "clever.macros.b",
  "when": "editorTextFocus"
}
```

## Quick quotes switch

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/quote-switch.gif)

_Binding suggestion:_

```json
{
  "key": "ctrl+`",
  "mac": "cmd+`",
  "command": "clever.string.nextQuotes",
  "when": "editorTextFocus"
}
```

## Toggle endline

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/toggle-endline.gif)

_Binding suggestion:_

```json
({
  "key": "ctrl+;",
  "mac": "cmd+;",
  "command": "clever.toggleEnd.semicolon",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+:",
  "mac": "cmd+:",
  "command": "clever.toggleEnd.colon",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+[Comma]",
  "mac": "cmd+[Comma]",
  "command": "clever.toggleEnd.comma",
  "when": "editorTextFocus"
})
```

## Insert incremental numbers or letters

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/multipaste.gif)

_Binding suggestion:_

```json
({
  "key": "shift+ctrl+0",
  "mac": "shift+cmd+0",
  "command": "clever.multipast.0toN",
  "when": "editorTextFocus"
},
{
  "key": "shift+ctrl+1",
  "mac": "shift+cmd+1",
  "command": "clever.multipast.1toN",
  "when": "editorTextFocus"
},
{
  "key": "shift+ctrl+a",
  "mac": "shift+cmd+a",
  "command": "clever.multipast.atoN",
  "when": "editorTextFocus"
},
{
  "key": "shift+alt+ctrl+a",
  "mac": "shift+alt+cmd+a",
  "command": "clever.multipast.AtoN",
  "when": "editorTextFocus"
})
```

## Fast cursor navigation

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/block-select.gif)

_Configs_

```js
// Clever: number of lines of small jumps
"clever.fastJump.small.linesToJump": 5,
// Clever: number of lines of large jumps
"clever.fastJump.large.linesToJump": 10
```

_Binding suggestion:_

```json
({
  "key": "ctrl+up",
  "mac": "cmd+up",
  "command": "clever.fastJump.small.up",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+down",
  "mac": "cmd+down",
  "command": "clever.fastJump.small.down",
  "when": "editorTextFocus"
},
{
  "key": "shift+ctrl+up",
  "mac": "shift+cmd+up",
  "command": "clever.fastJump.small.selectUp",
  "when": "editorTextFocus"
},
{
  "key": "shift+ctrl+down",
  "mac": "shift+cmd+down",
  "command": "clever.fastJump.small.selectDown",
  "when": "editorTextFocus"
},
{
  "key": "alt+ctrl+pageup",
  "mac": "alt+cmd+pageup",
  "command": "clever.fastJump.big.up",
  "when": "editorTextFocus"
},
{
  "key": "alt+ctrl+pagedown",
  "mac": "alt+cmd+pagedown",
  "command": "clever.fastJump.big.down",
  "when": "editorTextFocus"
},
{
  "key": "shift+alt+ctrl+pageup",
  "mac": "shift+alt+cmd+pageup",
  "command": "clever.fastJump.big.selectUp",
  "when": "editorTextFocus"
},
{
  "key": "shift+alt+ctrl+pagedown",
  "mac": "shift+alt+cmd+pagedown",
  "command": "clever.fastJump.big.selectDown",
  "when": "editorTextFocus"
})
```

## Shortcuts

Clever also provide some usefull shortcuts out of the box.

### Insert curly braces

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/fast-curly.gif)

_Binding suggestion:_

```json
{
  "key": "ctrl+{",
  "mac": "cmd+{",
  "command": "clever.fastInsert.curly",
  "when": "editorTextFocus"
}
```

### Insert arrow function

_Demo_ (not related to intellisense, this is a keyboard shortcut)

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/fast-arrow.gif)

_Binding suggestion:_

```json
{
  "key": "ctrl+=",
  "mac": "cmd+=",
  "command": "clever.fastInsert.arrowFunction",
  "when": "editorTextFocus"
}
```

### Insert template string var

_Demo_

![](https://raw.githubusercontent.com/DavidBabel/clever-vscode/master/images/examples/template-var.gif)

_Binding suggestion:_

```json
{
  "key": "ctrl+$",
  "mac": "cmd+$",
  "command": "clever.string.insertTemplateVar",
  "when": "editorTextFocus"
}
```

## Create the best editor

Here is a complete guide to custom your editor the right way.

This does not need any extension, only modify the editor `settings.json` and `keybindings.json` the right way.

// WIP

Take a look at https://vscodecandothat.com/. You will learn a lot a things, for sure.

## Contribs

If you want to help, find a bug or just correct an english mistake please [create an issue](https://github.com/DavidBabel/clever-vscode/issues).

## Inspirations & credits

- document parser by Vilic : https://github.com/vilic/vscode-es-quotes
- selecting library by dbankier https://github.com/dbankier/vscode-quick-select

## Why embed other libraries

For me, the features provided by the embed library are from far, the big miss in vscode base commands. I had to modify some of it to add new awesome features.

Also, as i said in introduction, i made this library for myself initially, and include them to be sure they will never disapear or stop to be maintained with a possible incompatible vscode version.

## License

MIT. Copyright (c) David Babel.

**Donations:** If you like this package, want it to be maintained and use it to makes millions, you can buy me [a coffee](https://www.paypal.me/devilhunter/2) ☕ or [a beer](https://www.paypal.me/devilhunter/4) 🍺.
