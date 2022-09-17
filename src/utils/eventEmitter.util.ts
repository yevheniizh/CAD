interface IEmitterEvents {
  [eventName: string]: Function[];
}

type TEmitterEventsKeys = keyof IEmitterEvents;
type TEmitterEvents = IEmitterEvents[TEmitterEventsKeys][number];

export default class EventEmitter {
  events: IEmitterEvents = {};

  subscribe( eventName: TEmitterEventsKeys, callback: TEmitterEvents ) {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }
  
  unsubscribe( eventName: TEmitterEventsKeys, callback: TEmitterEvents ) {
    this.events[eventName] = this.events[eventName].filter( eventCallback => callback !== eventCallback );
  }
  
  emit( eventName: TEmitterEventsKeys, args?: any[] ) {
    const event = this.events[eventName];
    event && event.forEach( callback => callback.call( null, args ) );
  }
}
