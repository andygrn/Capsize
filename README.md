
# Capsize

Upside-down CSS. An odd experiment.

### CSS

```css
selector{
	property: value;
	property: value;
}

selector, selector{
	property: value;
}

selector{
	property: value;
}
```

### Capsize

```css
property{
	selector: value;
	selector, selector: value;
}

property{
	selector: value;
	selector: value;
	selector: value;
}
```

It (theoretically) supports everything normal CSS does, including pseudo-elements and comments.

Be aware that there's no validation; malformed code will produce strange results or errors.

### Advantages

- All your font/border/margin/etc. rules in one place
- Smaller files (in most cases)
- Easy to scan
- Only type property names once

### Disadvantages

- Can get messy
- Probably breaks syntax highlighting
- Multiple selectors work a bit differently


## Usage

```javascript
var css = Capsize.parse( string );
```


## Example

This string...

```css
border{
	*: 0 none;
	img: 2px solid #666;
	.class: 2px dashed #f0f;
}

margin{
	body: 20px;
	p, ul, ol, blockquote: 10px;
	h1: 20px 0;
	#id: 36px 0 0 24px;
}

padding{
	.class: 10px;
	#id: 20px;
}

font-family{
	body: Arial, Helvetica, sans-serif;
}

font-size{
	body: 16px;
	h1: 48px;
	#id: 24px;
}

font-weight{
	h1: bold;
}

color{
	body: #333;
	.element[href^='http://']: #d40aff;
	li a: #c2cef4;
}

letter-spacing{
	h1: -0.07em;
}

background-color{
	#id: rgba(0,0,0,0.5);
}
/*
background-image{
	body: url(images/bg1.png);
}
*/
```

becomes this CSS...

```css
*{border:0 none}img{border:2px solid #666}.class{border:2px dashed #f0f;padding:10px}body{margin:20px;font-family:Arial, Helvetica, sans-serif;font-size:16px;color:#333}p{margin:10px}ul{margin:10px}ol{margin:10px}blockquote{margin:10px}h1{margin:20px 0;font-size:48px;font-weight:bold;letter-spacing:-0.07em}#id{margin:36px 0 0 24px;padding:20px;font-size:24px;background-color:rgba(0,0,0,0.5)}.element[href^='http{color://']}li a{color:#c2cef4}
```
