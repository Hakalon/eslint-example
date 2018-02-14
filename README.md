# ESLint-example

This is a simple project for eslint.
***
# Running Problems

* Error msg: Failed to load the ESLint library...

There are two possible reason, one is you don't install ESLint well, and the other is you install ESLint **globally** with **yarn**.

In the second case, I suggest you install ESLint **locally** no matter what you are using*(npm or yarn)*.

# ESLint Rules

* [linebreak-style](https://eslint.org/docs/rules/linebreak-style)  
If you want to learn more, [here is the details](https://stackoverflow.com/questions/37826449/expected-linebreaks-to-be-lf-but-found-crlf-linebreak-style-in-eslint-using).
* [no-console](https://eslint.org/docs/rules/no-console)
* [no-plusplus](https://eslint.org/docs/rules/no-plusplus)
* [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)  
Prevent reassign value to the parameters which are given by function.
* [arrow-parens](https://eslint.org/docs/rules/arrow-parens)
* [comma-dangle](https://eslint.org/docs/rules/comma-dangle)
* [object-shorthand](https://eslint.org/docs/rules/object-shorthand)  
It was how you should defind an object before ES6:  
```
var foo = {
    w: function() {},
    x: function *() {},
    [y]: function() {},
    z: z
};
```
It is how you should defind an object after ES6:  
```
var foo = {
    w() {},
    *x() {},
    [y]() {},
    z
};
```
Be noticed that when you only give a propery value, then the name of that property is the name of that parameter  
(like 'z' property) 