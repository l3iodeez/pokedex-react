# Pokedex: An Introduction to the React Router 

**Gotta Fetch 'em All**

In this project, we'll write an app to manage your `Pokemon` and their
`Toy`s. We've already setup migrations/models/controllers/views for you to
start with in a skeleton that we will email to you at the beginning of
the day.  **Set things up with a `bundle install`, then `rake db:setup` (this is equivalent to `rake
db:create db:migrate db:seed`)**.

Take a look at the schema, the routes file, and the jbuilder views to get yourself oriented. Navigate
to the api routes to see the json that's sent up.

**Note the `defaults: {format: :json}`**. This means that HTTP
requests that Rails handles for the `pokemon` resource should be
assumed to be asking for a JSON response instead of HTML. When we
render a template, instead of looking for `template.html.erb`, Rails
will look for `template.json.jbuilder`.

**Also**: the root url `localhost:3000` will be the home of
our JS application. We have provided this controller and view
for you.

## Phase 1: Flux Structure

Update your Gemfile as you did yesterday:

```rb
gem 'react-rails', '1.3.0'
gem 'flux-rails-assets'
```

Structure your app's `assets/javascripts` directory. You should have actions,
components, constants, dispatcher, stores, and util folders as before. Also create
a `pokedex.js.jsx` file.

Add to your `application.js`:

```
//= require flux
//= require eventemitter
//= require react
```

Finally, create the dispatcher file.
 
## Phase 2: Pokemon Index

### `ApiUtil`

We'd like to render a list of pokemon. Let's start by setting up a way to fetch
them from the back end. Make an `api_util.js` file inside your util folder. 
Inside this file, we'll make ajax requests that fetch information served by our 
rails controllers, and on success call a front end action creator.

Create a window.ApiUtil object. Give it a fetchAllPokemons attribute that is a 
function. The function should make an ajax request with url `api/pokemon` and
a success callback. The success callback will be passed the fetched pokemons.
For now, print the pokemons to the console and test that everything is working.

Once you can print the pokemons, change the success callback to instead pass them to
`ApiActions.receiveAllPokemons`, which we have yet to write. `receiveAllPokemons`
will dispatch actions to our stores. 

### `ApiActions` and `PokemonConstants` 

Now let's write that action dispatcher. Create a file `api_actions.js`
in the actions folder. In a `window.ApiActions.receiveAllPokemons` function, call
`AppDispatcher.dispatch` and pass it an object with a property `actionType` whose
value is PokemonConstants.POKEMONS_RECEIVED, and
a property `pokemons` that passes along the argument to the function.

In the constants folder, create a `pokemon_constants.js` file that defines 
`window.PokemonConstants.POKEMONS_RECEIVED` to be the string "POKEMONS_RECEIVED".

### `PokemonStore`

We need a way to keep track of the pokemons on the front end. In
`stores/pokemon.js`, create `window.PokemonStore`. Remember to use `EventEmitter.prototype`.
The file should have a local variable `_pokemons` that's initially set to an empty
array. The `all` function of the pokemon store should return a copy of `_pokemons`.
In the file, we also want a `resetPokemons` function that sets `_pokemons` equal
to its argument. Good. Now we're able to keep track of the pokemons that we've 
fetched.

We want to call `resetPokemons` when `PokemonConstants.POKEMONS_RECEIVED` is
dispatched. Make it so.

Check that calling `ApiUtil.fetchAllPokemons` and `PokemonStore.all` in the browser
works as expected.

### React Components

#### PokemonsIndex

Make a react component `window.PokemonsIndex` in `components/pokemons/index.js.jsx` to 
display the pokemons we've fetched. The state of 
`PokemonsIndex` should keep track of all the `pokemons` in the store. `getInitialState`
will start us out right, but we also need to set the state whenever the store changes.

To do the latter we need to add a change listener to our store. On the store, write a function
`addPokemonsIndexChangeListener` that takes a callback. It should call `this.on`
and pass it POKEMONS_INDEX_CHANGE_EVENT and the callback. Add the variable
POKEMONS_INDEX_SHANGE_EVENT to the file containing the store. You can give it
whatever value you'd like.

`PokemonStore` should emit a POKEMONS_INDEX_CHANGE_EVENT event when it registers 
a `PokemonConstants.POKEMON_RECEIVED` dispatcher action.

Next, register an event listener with the pokemon index component. Write an
`_onChange` function on `PokemonsIndex` that sets the state, and in the `componentDidMount` 
function add `_onChange` to the callbacks for the store's listener. Make sure
to remove it in `componentWillUnmount`. You'll need another store function for this,
too.

We're almost done. The only thing left is to fetch the pokemons when the component
mounts. On success, that fetch will call `ApiActions.receiveAllPokemons`, which will 
dispatch an action. That action will cause the store to reset its pokemon and emit an
event. The event will trigger the store's listener, which will reset the 
state of our pokemon index. 

For now, to test that the `PokemonsIndex` component is working, just have render return a 
div containing `this.state.pokemons`. In `pokedex.js.jsx` on document ready, render a
`PokemonsIndex` component into the DOM element with id `pokedex` that we've provided. 
It will overlap the background for now, but you should be able to see the info.

Now that that's working, let's change `PokemonsIndex.render` to render an unordered
list of `PokemonIndexItem` components. Each index item should be passed a `pokemon` prop,
and a unique key.

#### PokemonIndexItem

Create this class in a different file. It just need a render method for now. Give
the pokemon list items a class name of "poke-list-item" so the css file we've
provided can do its magic. Each list item should show its name and poke type.

Make sure this works. The list is still overlapping the background. We're about 
to fix that.

## Phase 3: Router

We would like to be able to render different elements depending on our url.
Eventually we want to be able to click on an item in our pokemon index and see
a detailed view of that pokemon. We'll use the react router to render a root
component that will in turn render our index and detail components. Then, by
navigating to different urls, we'll be able to change which pokemon detail is
displayed. 

### Getting the React Router

We'll start by refactoring the logic we already have. The react router doesn't
come with react; we'll need to get it. Include [the react router][react-router-source] 
in your `vendor/assets/javascripts` folder and `require` it in `application.js`
Now we have access to the global `ReactRouter`.

In `pokedex.js.jsx`, create a router and a route:

```js
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
```

Instead of rendering a `PokemonIndex`, render the router. It should have a single
route with path "/" the renders a component `Root` into the div with id `pokedex`. 

Now we have to write the `Root` component. This should render a single div, that
for now just contains one div containing a `PokemonsIndex`
component. We want access to the route's params inside of `PokemonsIndex`, so pass
it a prop `params={this.props.params}`. The div immediately containing the index 
should have a class "pokemon-index", for styling purposes. With the styling, you 
should now be able to see the index clearly.

## Phase 4: Pokemon Detail

We will soon write a `PokemonDetail` component to display more info about individual
pokemons. First add a route to the react router.
It should be nested under the existing route, and have path "pokemon/:pokemonId".
It should also render `Root`. Change `Root` to render a ".pokemon-detail" div after 
".pokemon-index", containing a `PokemonDetail` component.

`PokemonDetail` needs to have pokemon info. Right now it only has `this.props.params.pokemonId`.
Write a `getStateFromStore` function on the component that returns an object with a 
pokemon property. You'll need to write a `find` function on the pokemon store to return a pokemon
given an id. `find` should take an integer argument. In `PokemonDetail`, `this.props.params.pokemonId` 
is stored as a string. Deal with this discrepency. Set the initial state of the component to `this.getStateFromStore()`.
In render, return a div containing a "div.detail" that shows the properties of the pokemon.

There will be no pokemon when there is no `pokemonId` - that is, before the fetch of
pokemons comes back - so first check if `this.state.pokemon`
is defined and return an empty div if it isn't.

## Phase 5: OnClick

We want to be able to click on a pokemon index item and navigate to that pokemon's
url. `PokemonIndexItem` will need an `onClick` property of its rendered `li` to
call a `showDetail` function. In order to navigate to a different url in this 
function, we'll add the mixin `ReactRouter.History`. Then we can use `this.history.pushState`
to navigate to the appropriate url. 

You should now be able to click on different pokemon and see the url change.
The pokemon detail, however, is still blank. That's because the 
component doesn't update when its `this.props.params` change... unless we tell it
to. Add a `componentWillReceiveProps` function to the detail. This is passed
the new props. In it, call an ApiUtil function (that we haven't written yet) to 
fetch the appropriate pokemon.
Using the flux pattern, we're going to set it up so that the fetch will cause the 
component's state to change. Fetching a pokemon individually from the back end when 
we navigate to its url will also allow us to get its toys, which we don't have access
to when we fetch all the pokemons together.

Write the fetch for a single pokemon, and also modify actions, constants, and the 
store appropriately. You'll need
an ajax request to fetch a single pokemon. This should call a `receiveSinglePokemon`
action, which should dispatch an action that triggers the store to reset the
information of a single pokemon. You might want to write a function in the file
with the store to do this. The store should also emit a `POKEMON_DETAIL_CHANGE_EVENT`,
and allow listeners for such an event to be registered with itself. In `PokemonDetail`,
register a listener that resets state.

Now, if we fetch a single pokemon when the detail mounts and when its props change, the pokemon in state
should be updated appropriately. Make sure you can explain to your partner how this
works.

You should now be able to refresh the page and still see a pokemon detail view.

## Phase 6: Toys

The pokemon detail should render a `ToysIndex` component. A toys index will have
toys passed in as a property, and should render a `ToyIndexItem` for each toy.
The index's toys will be undefined before an individual pokemon is fetched, so 
account for that in render. 

Index items should have a toy as a property, and render a "li.toy-list-item"
with its name, happiness, and price.

When we click on a toy index item, we'd like to see its detail. Give the index
item class an onClick that navigates to a "/pokemon/:pokemonId/toys/:toyId" url.
The router should register this nested route and render `Root`. Add a "div.toy-detail" 
containing a `ToyDetail` component to the div rendered by `Root`.

I wrote the following functions for the toy detail:
  * getStateFromStore
    - When might you not have access to a pokemon, and its toys? What simple 
      checks can you do to not cause errors in those situations?
  * \_onChange
  * getInitialState
  * componentDidMount
    - We already have a way to register a listener for a fetch of a pokemon
    - Since we're always rendering a pokemon detail whenever we render a toy
      detail, we don't need to fetch a pokemon here
  * componentWillUnmount
  * componentWillReceiveProps
  * render
    - Return a "div.detail"

## Phase 8: PokemonForm

We'd like to be able to create new pokemon. Let's make a `PokemonForm` component. 
This will be rendered above the pokemon index in the same div. `PokemonForm`
should render a form with a class name "new-pokemon".

We want the form to have controlled inputs. The easiest way to do this is with
the mixin `React.addons.LinkedStateMixin`. In each of the files in
`config/environments`, add the line `config.react.addons = true # defaults to false`
so that we have access to the mixin. Now we can add a `valueLink` attribute to the inputs we
want to control: `valueLink={this.linkState("name")}`, for example, where "name"
is part of the component's state. This replaces the need to reset state in an 
`onChange` handler.

Write an `onSubmit` that calls a function `ApiUtil.createPokemon`.

## Bonus: Reassigning Toys

Add a `select` to the toy detail that has an option for each pokemon. Choosing a
different pokemon should change the ownership of the toy.

[react-router-source]: https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.0-rc1/ReactRouter.min.js

