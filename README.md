# trov-reddit-client
This is a Reddit client written for Trōv JS code test.

## Features
From a product perspective, this project is a minimal client for a small part of the Reddit API. It exists primarily to demonstrate a modern webapp architecture, build system, and test suite. In other words: It's inadvisable to try and replace reddit.com with this app. :)

### Application Features
* View posts on any subreddit
* Refreshes data automatically once per minute
* Does not rely on any Reddit API libraries

### Architectural Features
* Isomorphic code stack
* Server side rendering
* Client side routing
* State is rehydrated on client
* CSS generated from SASS
* Hot-reloading
* Code bundling
* Fully ES2015
* One-directional data flow
* Fully managed page state
* Unit tests for all views and data models
* Code linting

## Architecture
This code repository is intended to be a browsable guidebook, and every major directory has a README.md like this one which should explain some of what goes on inside.

### [Isomorphic Code Stack](src/scripts)
See [src/scripts](src/scripts)

### Display Logic
This project uses React for all views, from `<html>` down. It uses `react-helmet` to manage the document head, `react-router` to manage client-side routing and facilitate server-side rendering, and `react-redux` as a simple bridge to the application state store.

### Data Flow
All application state is managed by Redux. Application state is collected from various reducing functions and then brought into React containers by Redux's `connect()` method. The only place that programmatically access the store is the router. This is done because the selected subreddit and current route are kept in sync - navigation to "/r/news" will cause `subreddit.selected` to become `news`.

### Code Bundling
This project uses webpack for code bundling. It offers a variety of loaders for different file types, and produces a single JavaScript bundle containing the entirety of the app.

### Live Reload
This project makes use of the webpack `dev` and `hot` middlewares to serve new content directly into the browser without a refresh or a server restart. You can see this in action by doing something like opening the app in your browser, then opening [main.scss](src/styles/main.scss) in an editor and adding `* { color: red }` or something else very dramatic. When the file is saved, you'll see the effect of the new styles immediately.

### ES2015
This project uses Babel to polyfill a complete ES2015 environment in both Node and the browser. Increasingly, browsers are supporting more and more of this code natively, but writing ES2015 now and pulling out polyfilling later is a lot easier than writing ES5 code now and then updating it later.

### [Styles](src/styles)
See [src/styles](src/styles)

### [Tests](test)
See [test](test)


## Why use a reactive approach?
I chose a reactive approach for two reasons:

1. Simplicity

  It's very simple to write a reactive app with "correct" behavior for a live data source. In the case of the subreddit view, for instance, each post summary is rendered into a keyed `<div>`. When new posts are fetched, the inner HTML of each summary is mutated, but their attachment to the DOM remains.

  This is a sharp contrast to how something like this might have been accomplished in the past, with a tool like jQuery. A jQuery approach might have seen the application removing the DOM nodes associated with the old posts, and appending new ones based on the new information. Aside from thrashing the DOM for no good reason and causing a ton of extra painting, it would wreak havok on the scrollbar as the DOM was temporarily "emptied out" to make room for the incoming posts.

2. Boilerplate

  A huge amount of the stack I've used in this project comes from my existing isomorphic react boilerplate, which I've developed for use in my own greenfield projects. Even though many aspects of this stack are overkill for the job at hand (server side rendering, SASS partials, et al.), it was an overall shorter process to start from my boilerplate.

  That said, none of the features are in any way undesirable, and the final output bundle is not significantly different in size from something that had been written without benefit of existing infrastructure.

  If you load this project up in git, you can see the approximate point of divergence with my base stack (tagged as `Boilerplate`).

## Getting Started
This section will briefly cover setting up and running the application. If you have an existing node environment, chances are that it will just work.

### Requirements
* Node 4.x
* npm 3.x

### Starting Development Mode
Run `npm install` to install all application dependencies, then run `npm start` to run all tests and start the live development environment.

### Scripts
The relevant scripts in this project are all controled via npm's script interfaces.

#### `npm start`
Run all tests, then start live development mode

#### `npm test`
Run all tests (linting and unit testing)

#### `npm run eslint`
Runs `eslint`. Checks code for linting errors, code execution errors, and stylistic abberations.

#### `npm run mocha`
Runs `mocha`. Performs unit tests on all views, components, containers, and data architecture.

#### `npm run develop`
Runs `node ./webserver`. Starts the live development environment while bypassing all tests.
