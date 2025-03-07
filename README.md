# [Z] Hero Quest
*Here to slay dragons*

> Part of the [Z-Apps](https://github.com/clement-gouin/z-app)

### [Tool link](https://clement-gouin.github.io/z-hero-quest/)

## Data format

Format is made line by line

Header (1-3 line):
```txt
1    Header (html, <h1> on plain text)
2?   Namespace (optional, "default" by default)
3?   Hue, Saturation (optional, "180, 30%" by default)
```

Part 1 (variables)
```txt
1    Number of variables shown (0+)
2*   Lucide Icon, Variable Name, Default Value (numeric)
```

Part 2 (changes)
```txt
1    Number of changes (0+)
2*   Value change (numeric), Variable Name
```

Part 3 (Conditional data, repeatable)
```txt
1   Condition (JS eval of variables)
2   Data (html)
```


## Samples

[Sample 1](https://clement-gouin.github.io/z-hero-quest/?z=AAi6ElrYg3QAsw0DEFMQxy0AZQGiShCkl0kk8yAAj7I5gA2CM2SF2aO3YUtAgcUAA0UMAgxtwAhaAINAwYLZ2KPAWDw4CDgtHs842qJDAbriAIEA4IHAYwBAsBgyAMq4AoKAswKAtJBAaAgkAIIA84FA8DgCmBgymKqg4BiOKionkJmb1SirqrS-5yDZQTC8kII8qoIUuDAGwjBJoiI36EJ8iDhearhigYEAwIq8yJjUS4uQWxXHvRn8qHPC9ACaUnGqmDorMIEcDQUq4JSOAdVw7KAUaCgPA5NBAEnAQEAPMYEFGC8yMEAHG8AwG_DvA8D9tbeMAEU7JASGFDPNAG2BYJAtHjAQBcAoqODCWASKXAEAitg9gxgNwUoO)

```txt
Welcome to the shop
1
coins, money, 10
0
money < 100
<span class=red>You don't have enough money</span>
money >= 100
<span class=amber>You can buy this sword <i icon=sword></i></span>
true
<a href="?z=AIXHru50UGAS68sNpBQgWyYgIGBgCIkOgngmKVcmCsFYPwZABg5gdglg1wQIL">Go make some money</a>
```

[Sample 2](https://clement-gouin.github.io/z-hero-quest/?z=AIXHru50UGAS68sNpBQgWyYgIGBgCIkOgngmKVcmCsFYPwZABg5gdglg1wQIL)

```txt
Making some money...
1
coins, money, 10
1
10, money
```

## Use this template

<!-- TODO: 6. remove this part -->

> Every task is indicated with a TODO

1. [x] Rename app in [README.md](./README.md) and [index.html](./index.html)
2. [x] Change app hue and saturation in [style.css](./style.css)
3. [x] Change data format in [README.md](./README.md) and [main.js](./main.js)
4. [x] Change sample in [README.md](./README.md) and [main.js](./main.js)
5. [x] Implement your custom logic in [main.js](./main.js) and [index.html](./index.html)
6. [ ] Remove this part and all TODO

## Apps using this template

* [This repository](https://github.com/clement-gouin/z-app)
* [Treasure-Finder](https://github.com/clement-gouin/z-treasure-finder)
* [On-The-Quizz](https://github.com/clement-gouin/z-on-the-quizz)
* [Cross-Roads](https://github.com/clement-gouin/z-on-the-quizz)
* [Dice-Roller](https://github.com/clement-gouin/z-cross-roads)

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML