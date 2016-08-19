# Unit Tests
This app is uses [mocha](https://mochajs.org/) as its unit test framework, and relies on [chai](http://chaijs.com/) for assertion, [sinon](http://sinonjs.org/) for spies and "world" manipulation, and [enzyme](http://airbnb.io/enzyme/docs) for testing React components. The tests are lightweight enough that they can be run before each live development session.

## Structure
Because mocha will happily run all tests in a directory recursively, this directory's structure mirrors `/src/scripts`, and contains analogous files for each unit of code being tested. I find that this helps calculate coverage and identify gaps at a high level.

## Testing Components
Components are generally the easiest thing to test. With rare exception, all "components" will actually be React's "stateless" functional components, meaning that they are implicitly "pure".

Components are tested by manipulating their input properties and measuring
1. The component mounted successfully
1. Its child components mounted
1. Its dynamic behavior is appropriate in all cases

## Testing Containers
Many containers in this application act only as an abstraction layer between Redux and the presentational component they're fronting for. These are simple to test, as we need only to make sure that they render the correct component when mounted.

More complicated containers complain things like timers and API logic. [The test for the subreddit API](api/subreddit.js) illustrates more complicated testing behavior, including making mock calls to `fetch()` and overwriting the global timers to test the container's refresh interval logic.

## Testing Reducers
Redux reducers are tested by providing the action they are meant to handle and measuring the effect on reduced state. Gotchas here are things like timestamps, which can still be tested by recording the time when the test is started, recording the time when the measurement is taken, and ensuring that the action's own timestamp falls between those two.

## Testing Views
In the parlance of this application, a view is just a component which has a first-level relationship to the router. They're tested largely the same way as components, and tend to be easier since they're largely compositional rather than cultivating their own logic.
