'use strict';

describe('Mediator service : ', function() {
  var mediatorService = null;
  var eventListener;

  beforeEach(module('mediator'));
  beforeEach(inject(function(mediator) {
    mediatorService = mediator;

    eventListener = function eventListener() {
      return 'hello';
    };

  }));

  it('should register an event listener', function(){
    var resizeEvent = mediatorService.subscribe('windowResize', eventListener, this);
    var guid = resizeEvent.guid;
    var subs;

    expect(guid).toBeDefined();
    subs = mediatorService.getSubscribers('windowResize');
    expect(subs.length).toBeGreaterThan(0);
    expect(subs[0].guid).toMatch(guid);

    mediatorService.unsubscribe(resizeEvent);
  });

  it('should remove an event listener', function(){

    var resizeEvent = mediatorService.subscribe('windowResize', eventListener, this);
    var guid = resizeEvent.guid;
    var subs;
    var numSubs;
    var newSubs;

    expect(guid).toBeDefined();
    subs = mediatorService.getSubscribers('windowResize');
    expect(subs.length).toBeGreaterThan(0);
    numSubs = subs.length;

    mediatorService.unsubscribe(resizeEvent);
    newSubs = mediatorService.getSubscribers('windowResize');
    expect(newSubs.length).toBeLessThan(numSubs);

  });



});
