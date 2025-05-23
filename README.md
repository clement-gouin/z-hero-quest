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
2*   Variable Name, Lucide Icon, Default value (js, default to 0)
```

Part 2 (changes)
```txt
1    Number of changes (0+)
2*   Variable Name = Value change (js)
```

Part 3 (Conditional data, repeatable)
```txt
1   Condition (js)
2   Data (html)
```


## Samples

[Sample 1](https://clement-gouin.github.io/z-hero-quest/?z=AAi6ElrYg3QAsw0DEFMQxy0AZQGiShCkl0kk8yAAj7I5gA2CM2SF2aO3YUtAgcUAA0UMAgxtwAhaAINAwYLZ2KPAWDw4CDgtHs842qJDAbriAIEA4IHAYwBAsBgyAMq4AoKAswKAtJBAaAgkAIIA84FA8DgCmBgymKqg4BiOKionkJmb1SirqrS-5yDZQTC8kII8qoIUuDAGwjBJoiI36EJ8iDhearhigYEAwIq8yJjUS4uQWxXHvRn8qHPC9ACaUnGqmDorMIEcDQUq4JSOAdVw7KAUaCgPA5NBAEnAQEAPMYEFGC8yMEAHG8AwG_DvA8D9tbeMAEU7JASGFDPNAG2BYJAtHjAQBcAoqODCWASKXAEAitg9gxgNwUoO)

```txt
Welcome to the shop
1
money, coins, 10
0
money < 100
<span class=red>You don't have enough money</span>
money >= 100
<span class=amber>You can buy this sword <i icon=sword></i></span>
true
<a href="?z=AA5JI0DgMg5kQAwRScA8BoOlAoAAMtQMCggYkiQARBuAExBAIiplAE3AAxKAEBwuZAoFzCA4gwDAR0cFgTAcBgIGAIhjaAO3VTeB48szTFolMGgjGAXHrIGBgCIkOgngmKVcmCsFYPwZABg5gdglg1wQIL">Go make some money</a>
```

[Sample 2](https://clement-gouin.github.io/z-hero-quest/?z=AIXHru50UGAS68sNpBQgWyYgIGBgCIkOgngmKVcmCsFYPwZABg5gdglg1wQIL)

```txt
Making some money...
1
money, coins
1
money = money + 10
true
<a href="javascript:history.back()">Go Back</a>
```

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML
* The `.button` class make links more beautifuls (can also be `.disabled`)