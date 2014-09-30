# pileple-skeleton

Skeleton based on Pileple stack!!!


## Dependencies

You need to have `npm`, `grunt-cli` and `bower` installed.

And you need `livereload` if you want to develop easily.


### Install npm

If your are on a debian-based OS, you can try:

```shell
(root) apt-get/aptitude install npm nodejs
```


### Install grunt-cli and bower

When `npm` is installed:

```shell
(root) npm install -g grunt-cli bower
```


### Install livereload

It's a plug-in for your browser which auto-reload when grunt successfully compile something on-the-fly:

- Firefox: https://addons.mozilla.org/fr/firefox/addon/livereload/
- Chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei


## What is the environment?

Folder tree:
- `app`: contains the whole application
- `app/js`: contains the JavaScript application based on Backbone + Marionette
- `app/locales`: contains the locales (i18n)
- `app/static`: contains the static website to help in development
- `app/style`: contains the LESS style
- `app/template`: contains the Jade with Handlebars templates
- `dist/`: The minimized build of the application
- `.tmp/`: The temporary directory for development or temporary building file

The environment is based around the tool `grunt`.
All the configuration is inside `Gruntfile.js`
Grunt Works with rules, it is a tool similar to make but oriented JavaScript environment.
We can separate the grunt rules of this project into three parts:

- Tests: ```grunt test```

  1. Launch JSHint tool into the whole project.
  2. :soon: Unit Tests...


- Development: ```grunt serve```

  1. Build the application on debug mode with static file (demo website) into `.tmp` directory.

  2. Start the server with livereload and open your browser.

  3. Watch for modification in the application, style, locales or static files and rebuilt what is necessary.


- Build: ```grunt build```

  Build the application with everything compress into `dist` directory.


The default rule ```grunt``` launches test and build.


## Setup the environment

```shell
(user) npm install
(user) bower install
```


## How to build

```shell
(user) grunt build
```


## How to dev

Run grunt with compilation on-the-fly:

```shell
(user) grunt serve
```
