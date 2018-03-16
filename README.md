# ESLint-example

This is a simple project for eslint.

# Installation

If your IDE is VScode, then you can follow [this document](https://wcc723.github.io/tool/2017/11/09/coding-style/).

Briefly, there is a plugin you can install in VScode, and except that you also need to install eslint module in your project by npm or yarn.  

Be notice that if you are using yarn, you should install eslint module **locally** in project, or you will get an error.  
The detail of this error is mentioned on [Running Problems](#running-problems).

So after installing plugin in VScode, you can use these command to install eslint in your project.

```=bash
yarn add eslint -D
// or
npm install eslint -D
```

Then you need run eslint command to initialize your setting of eslint.
```=bash
node_modules/.bin/eslint --init
//In here, I just suppose you install eslint locally.
```

Now you should go through three questions to help you do the setting, just answer it by yourself.

If you must know, I choose Airbnb, json and no for the questions.

When you are done with the questions, eslint will automatically install two dev dependencies for you.

After the installation, you can reopen your IDE or files, then you will see the ESLint running on your Output window.

Also there is a file named eslint.js to manage your rule setting. 

# Running Problems

Below I list some problems which I was solved when I was installing ESLint module on my project.

### Error msg: Failed to load the ESLint library...

There are two possible reason, one is you don't install ESLint well, and the other is you install ESLint **globally** with **yarn**.  
In the second case, I suggest you install ESLint **locally** no matter what you are using*(npm or yarn)*.

# Rules

Below I list some ESLint rule which my code got errors based on.

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

In chinese, 請注意在宣告物件的Property時，單純給予value(值)而不給予該Property的name(名稱)，則該Property的name會以該value的變數名稱為主。