This is our take on the mediator pattern.

It creates a centralised place for us to organise events.

This mediator allows for subscribers to register / deregister their own events.


An example use case: window resize, need to change heights of navigation.

Within the topics directory, create your topics.

Topics should have a name, an addEventListener and removeEventListener.


Within your directives...

You can use the mediator.subscribe which takes the name of the event, the function that will execute when its event is read, and the context.
Example
var resizeEvent = mediator.subscribe('windowResize', resetHeight, this);

To remove the listener (so that there is no memory leaks)
You can specify it when the scope gets $destroy. This happens when the scope is no longer needed and is garbage collected.
Example
scope.$on('$destroy', function() {
  mediator.unsubscribe(resizeEvent);
});





