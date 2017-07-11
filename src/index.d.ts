import Backbone = require('@types/backbone');

declare class _Events extends Backbone.Events {
  listeners(event: any, exists?: boolean): any
}
declare class _View extends _Events { }
declare class _Model extends _Events { }

export module configModels {
  export interface IMargin {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    label?: number;
  }

  export interface IPadding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  export interface IColor {
    (colors: any): string;
  }

  export interface IFormatter {
    (value: string | number): string;
  }

  export interface IScale {
    (value: number): number;
  }

  export interface ISize {
    accessor: string;
  }

  export interface ISerie {
    getValue?: (data: any) => string | number;
    getLabel?: (data: any) => string;
    valueFormatter?: IFormatter;
  }

  export interface ITemplate {
    (): string;
  }

  export interface IComponentBaseConfigModel {
    id?: string;
    type?: string;
    duration?: number;
    frozen?: boolean;
    enabled?: boolean;
    disabled?: boolean;
    legend?: string;
    colorScheme?: string[] | IColor;
    colorScale?: (d?: any) => string;
    tooltip?: string;
    action?: { [_eventName: string]: (...args: any[]) => void }
  }

  export interface IStyleConfigModel {
    height?: number;
    width?: number;
    margin?: IMargin;
    padding?: IPadding;
  }


  export interface IEmbeddedComponentConfigModel {
    sourceComponent: string;
    embedded: boolean;
  }

  export interface IMenuItem {
    id: string;
    component?: string;
  }

  export interface ILinearAxis {
    scale?: string | IScale;
    label?: string;
    formatter?: string | IFormatter;
    labelFormatter?: string | IFormatter;
    ticks?: number;
    position?: string;
    domain?: number[];
  }

  export interface ILinearAccessor {
    accessor: string;
    labelFormatter?: string | IFormatter;
    valueFormatter?: string | IFormatter;
    chart?: string;
    axis?: string;
    tooltip?: string;
    disabled?: boolean;
    enabled?: boolean;
    color?: string | IColor
  }

  export interface IRadialAccessor {
    chart?: string;
    labelFormatter?: string | IFormatter;
    valueFormatter?: string | IFormatter;
    angular?: string;
    radial?: string;
    angularAxis?: string;
    color: string | IColor;
    barPadding?: number
  }

  export interface IRadialAxis {
    scale?: string;
    label?: string;
    range?: number[];
    removeLastAngularTick?: boolean;
    ticks?: number;
  }

  export interface IColorPickerConfigModel extends IComponentBaseConfigModel {
    config: IEmbeddedComponentConfigModel
  }

  export interface ICompositeRadialConfig extends IComponentBaseConfigModel, IStyleConfigModel {
    accessors?: IRadialAccessor[];
    axes?: IRadialAxis[];
  }

  export interface ICompositeRadialConfigModel extends IComponentBaseConfigModel, IStyleConfigModel {
    config?: ICompositeRadialConfig
  }

  export interface ICompositeViewConfigModel extends IComponentBaseConfigModel, IStyleConfigModel {
    template?: string | ITemplate;
    components?: (IControlPanelConfigModel | ICompositeYConfigModel
      | IColorPickerConfigModel | IFilterConfigModel
      | ICompositeRadialConfigModel | INavigationConfigModel
      | ITooltipConfigModel | IPieConfigModel)[];
  }

  export interface ICompositeYConfig extends IComponentBaseConfigModel, IStyleConfigModel {
    chartTypes?: { [axis: string]: string[] };
    plot?: { [key: string]: ILinearAccessor | ILinearAccessor[] };
    axes?: { [key: string]: ILinearAxis }
  }

  export interface ICompositeYConfigModel extends IComponentBaseConfigModel, IStyleConfigModel {
    // type: 'CompositeY';
    config: ICompositeYConfig;
  }

  export interface IControlPanelConfigModel extends IComponentBaseConfigModel {
    config?: IMenuItem[];
  }

  export interface ICrossairConfig {
    tooltip?: string;
  }

  export interface ICrossairConfigModel extends IComponentBaseConfigModel {
    config?: ICrossairConfig;
  }

  export interface IFilterConfigModel extends IComponentBaseConfigModel {
    config: IEmbeddedComponentConfigModel
  }

  export interface ILegendEditableConfig {
    color?: boolean;
    chart?: boolean;
  }

  export interface ILegendConfigModel extends IComponentBaseConfigModel {
    config?: { [key: string]: ILegendEditableConfig }
  }

  export interface IMessageConfig { }

  export interface IMessageConfigModel extends IComponentBaseConfigModel {
    config?: IMessageConfig;
  }

  export interface INavigationConfigModel extends ICompositeYConfigModel {
    update?: string[];
    selection?: number[];
  }

  export interface IPieModel {
    formatter: string | IFormatter;
  }

  export interface IPieConfig extends IComponentBaseConfigModel, IStyleConfigModel {
    radius?: number;
    serie?: ISerie;
  }

  export interface IPieConfigModel extends IComponentBaseConfigModel, IStyleConfigModel {
    model?: IPieModel;
    config?: IPieConfig;
  }

  export interface ITooltipConfig {
    title: { accessor: string };
    dataConfig: (ILinearAccessor | IRadialAccessor)[];
  }

  export interface ITooltipConfigModel extends IComponentBaseConfigModel {
    config: ITooltipConfig;
  }
}

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
    getByType(type: string | string[]): any[];
    add(p: any): any;
    remove(id: any);
  }
}

/**
 * Util module
 */

export module Util {
  export function hashCode(str: string): number;
  export const bubbleShapes: { [key: string]: string }[];
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