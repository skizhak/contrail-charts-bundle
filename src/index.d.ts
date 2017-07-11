import Backbone = require('@types/backbone');

declare class _Events extends Backbone.Events {
  listeners (event: any, exists?: boolean): any
}
declare class _View extends _Events {}
declare class _Model extends _Events {}

/**
 * helper module
 */
export module helpers {
  
  export class TitleView {
    render(): void;
  }
  
  export class CompositeView {
    constructor(p: any);
    components(): any[];
    setData(data: any);
    get(id: string): any;
    getByType (type: string | string[]): any[];
    add(p: any): any;
    remove(id: any);
  }
}

/**
 * Util module
 */

export module Util {
  export function hashCode(str: string): number;
  export const bubbleShapes: { [ key: string ]: string }[];
}

/**
 * Actions module
 */

export module actions {

  /**
   *  refer to src/plugins/Events/ContrailEvents.js 
   */

  class Action extends _Events {

    _deny: boolean;
    registrars: any[]; 

    constructor(p: any);
    id(): string;
    apply(...args: any[]);
    disable(): void;
    enable(): void;
    canDo(): boolean;
    isEnabled(): boolean;
    evaluate(selection: any[]): void;
    unRegister(registrar: any);
    _execute(): void;
    _evaluate(enable: boolean);
  }

  export class Refresh extends Action {
    _execute(accessorName?: string, color?: string): void;
  }

  export class SelectColor extends Action {
    _execute(accessorName?: string, color?: string): void;
  }

  export class SelectKey extends Action {
    _execute(...args: any[]): void;
  }

  export class ToggleFreeze extends Action {
    _execute(toggle?: boolean): void;
  }

  export class ToggleHalt extends Action {
    _execute(ids?: (string | string[]), toggle?: boolean): void;
  }

  export class ToggleVisibility extends Action {
    _execute(ids?: (string | string[]), isVisible?: boolean, ...args: any[]);
  }

  export class Zoom extends Action {
    _execute(ids?: (string | string[]), ...args: any[]);
  }
}

export module models {
  export class DataModel extends _Events {

    data: any[];
    config: any;
    type: string;

    constructor(data: any[], config: any);
    parse(data: any);
    
  }

  export class DataFrame extends DataModel {
    accessors: string[];
    constructor(...args: any[]);
    getRangeFor(accessor: (string | string[]), isFull?: boolean);
    getCombinedRange(accessors: string[]): number[];
    getNearest(accessor: string, value: number): number;
    filter(key: string, range: number[]): any[];
    filterByRanges(data: any[], ranges: Object): any[];
  }

  export class SerieModel extends DataModel { }

}
