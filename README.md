# [Z] Hero Quest
*Here to slay dragons*

> Part of the [Z-Apps](https://github.com/clement-gouin/z-app)

### [Tool link](https://clement-gouin.github.io/z-hero-quest/)

## Data format

Format is made line by line

Header (1-3 line):
```txt
1    Header (html, <h1> on plain text, can include javascript with {{expr}})
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
2   Data (html, can include javascript with {{expr}})
```


## Samples

[Sample 1 (shop)](https://clement-gouin.github.io/z-hero-quest/?z=AgwQEhEhS4EEAWwktREgB4VFg3LBRQdsxORVigOUQUxagC7wOExTJcPyDcP3JcBDJCUlIIQi4R9lj1X9qWhUasikIAmeNcgixM8ilzaA9AIoRGhdlI2lGjPzBUpRlifRJQVvSK3ILhFsO-ChyljlImkxkLogbYEAGokL6n6McekbAEEhLYODmx0XuR-BEaMqZSOTh0C5O5ZIJimxd62oofGBUBK0k9BMVi9lLAG6McGjTAwwZI1DWwdJArpx8hD1HAYfcHWUOmjZAgplL6EWcdZIl4Gcn2Bb5ipBYYRYFRUXEhCsj2TLwRgT8MFoglwnpBxkiOFWjlvoROm91XahhkKXOqZIuB6gFQkjlA-j_oSqjzAHpwCpbOUKZfYRe4Q5SiMFeDWMKJAtBC1TiARcnhYbdTNE2oBCgCaOiAGqEK4ERVC0D5izYbOGIofsmOBDqDFwasj_MWqkGDVwg9lfQlh0XaGIYT9Si4Pai6ROqmKoMUjiRGkGJBCyHeAPgQJ2BRpiUiKJJ8SYIaWKiHLUBzB-zXezTuJWOwWWxCmxEG5GW7MWnANqyIufNqZsYoI6GXkPN6GA04wZtvMWG0sOjMo4u-JizA8cMt_MJ1bcCISiAhDNH1HOYiidBMFMiKdcGCrJNp31ZG0Ig9nzKgdRAc6BC0ov8nGpQ9oOWUDA2lSexKaBAqHWKBC_hAPqdJAg5yTE1I1zFQcjzgaGATuAFFoOIcm9TRGAs6yvOdsGTnmVCA6mIRFqs2xGDY-DUGKXGz7GyZuBMoIXwRzYg7ZQdaOlQ0QaUjsDApAgt1I7MHMMHr9skAQDAYMNGRHmIN6MUAHdaOAsCAGTnQFMmkS-DdAjWA4PuLLAcmn5AAA2QozYOFwUCGa20uQzmTRAO-M5BQEHBwdKmuxbm2aK2XEAQFCmAQYAmUTA8AA5AQFAsGA7cHKMcXGAwYMoaGmGdXZAEDAIYFAFAQcAghNAgxapBgFAUFgGBTUAEEAZ8CA-BQezAAE7QFeyUVZZlSCREkF-lxQ4pkMiNUMhdiHKBwVnZkeZIzcT5VAKAAe13vBPdiuLJEA8D1RPgx1dCAK3BwIjU06wrzDfAyVHCsCRYozEAxJT0VAGBgIA8CgBjIw0K1QAcY4x2KPPA8F5JbeMAE0YkaJANPNAeCgYHAFjHjAQBcAoqODCWASKXAEAitg9gxgNwUoO)

```txt
Welcome to the shop
1
money, coins, 10
0
money < 100
<span class="button disabled"><i icon=sword></i> Buy the sword (100 <i icon=coins></i>)</span>
money >= 100
<a class=button href="?z=AElAU4Kwm6mGP5cFSBAmEo5sLBsoBrkTNxYFC2chDNywSDASyBqaOCYQBAE2SEsuWYF5iGW8DACMBQ-liQuFmh45jg4pyCAgxMA5XIDAwBAsBArAkJ7AAGtAgEzIBinEpJymDCGq5JGoQl5Ywh-aKREXAY4AAzWICANCcdboJmIhCDeJdAM7BAHUwS1Qcu8dZLASuTV0dRbAQOA1Jdp1TAGCQWAI4qFF8IYfPbWTBQmZdBAxcgajAYdFQSTAWCa6BoMB4EI5OwZAvA7A2DMG0EAWCMfAjwCwD"><i icon=sword></i> Buy the sword (100 <i icon=coins></i>)</span>
true
<a class=button href="?z=AQgAMoBcEHGhAANsEHAfVQrwbzs4w6cYkCJJdj-xYyfmwbEy1CJ85YDekGBtgRcsajLA0yBAQgJx70NAgxKAICApCzfQQjYt0iDGkCDMgxGAEHNYAOV84gJtSVQ0oGA0y2SpQjUryMdM80WSJhoUBDKAIEA04JS3BADC0BN_xyMAwjB0RGZ95ZiWJN5JlNdiohP6LAKBEgGNAkJWItACFkCAeAADH5QcBA2aeDwSZz6JoWPDyJ5FgYjBQgGBw0YAAWgJAMhuCYpJAhTAGBATgTPAcJdAeC4JZ5oZKwWg9AnBEAMHYHwSg1ghgsAfAjwCwD"><i icon=arrow-big-right></i> Go make some money</a>
```

[Sample 2 (make some money)](https://clement-gouin.github.io/z-hero-quest/?z=AQgAMoBcEHGhAANsEHAfVQrwbzs4w6cYkCJJdj-xYyfmwbEy1CJ85YDekGBtgRcsajLA0yBAQgJx70NAgxKAICApCzfQQjYt0iDGkCDMgxGAEHNYAOV84gJtSVQ0oGA0y2SpQjUryMdM80WSJhoUBDKAIEA04JS3BADC0BN_xyMAwjB0RGZ95ZiWJN5JlNdiohP6LAKBEgGNAkJWItACFkCAeAADH5QcBA2aeDwSZz6JoWPDyJ5FgYjBQgGBw0YAAWgJAMhuCYpJAhTAGBATgTPAcJdAeC4JZ5oZKwWg9AnBEAMHYHwSg1ghgsAfAjwCwD)

```txt
<h1>Making some money...</h1><br>You made 10 <i icon=coins></i><br><br>{{Math.max(100 - money, 0)}} <i icon=coins></i> remaining before the sword !
1
money, coins
1
money = money + 10
true
<a class=button href="javascript:location=document.referrer"><i icon=arrow-left></i> Go Back</a>
```

[Sample 3 (buy the sword)](https://clement-gouin.github.io/z-hero-quest/?z=AElAU4Kwm6mGP5cFSBAmEo5sLBsoBrkTNxYFC2chDNywSDASyBqaOCYQBAE2SEsuWYF5iGW8DACMBQ-liQuFmh45jg4pyCAgxMA5XIDAwBAsBArAkJ7AAGtAgEzIBinEpJymDCGq5JGoQl5Ywh-aKREXAY4AAzWICANCcdboJmIhCDeJdAM7BAHUwS1Qcu8dZLASuTV0dRbAQOA1Jdp1TAGCQWAI4qFF8IYfPbWTBQmZdBAxcgajAYdFQSTAWCa6BoMB4EI5OwZAvA7A2DMG0EAWCMfAjwCwD)

```txt
<h1><i icon=sword></i> You bought the sword</h1><br>Maybe you'll slay some dragon next...<br><br><img src="https://images.unsplash.com/photo-1717568008314-ac8a706c382c?w=640" /><br>
1
money, coins, 10
1
money = Math.max(0, money - 100)
```

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML
* The `.button` class make links more beautifuls (can also be `.disabled` or colored `amber-300`)