/// <reference types="backbone"/>
/// <reference types="d3"/>

import Backbone = require('backbone');
import d3 = require('d3');

declare class _Events extends Backbone.Events {
  listeners(event: any, exists?: boolean): any
}

declare class _View extends _Events { }

declare class _Model extends _Events { }

declare class _ConfigModel extends _Model {
  constructor(p: any);

  defaults: any;
  type: string;
  margin: configModels.IMargin;
  padding: configModels.IPadding;
  duration: number;

  getValue(data: any, config?: any): any;
  getFormattedValue(data: any, config?: any): any;
  getLabel(data: any, config?: any): any;
  getAction(selector: string, type: string): any;
  hasAction(selector: string, type: string): boolean;
}

declare class _ChartView extends _View {
  selectors: any;
  events: any;
  zIndex: number;
  id: string;
  isMaster: boolean;
  svg: Object;
  container: d3.Selection<HTMLElement, any, null, undefined>;
  svgOffset: configModels.IOffset;
  padding: configModels.IPadding;
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
  plotWidth: number;

  constructor(p: any);

  setData(data: any[]): void;
  setConfig(config: any): void;
  render(content?: string): void;
  show(data: any[], config: any): void;
  hide(): void;
  setFrozen(isFrozen: boolean): void;
  setHalt(isHalted: boolean): void;
  remove(): void;
  private _initSVG(): void;
  private _insertSorted(el: HTMLElement);

  // left public on purpose, to be used when a parent 
  // container resizes
  _onResize(): void;
  private _onEvent(): void;
}

type ISelectors = { [key: string]: string };
type IEvents = { [key: string]: string };

export module configModels {

  export interface IContrailModel {
    margin: IMargin;
    padding: IPadding;
    duration: number;
    frozen: boolean;
  }

  export interface IColoredChart {
    colorScheme: string[];
  }

  export interface IOffset {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  export interface IPosition {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

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

  export interface ICrosshairConfig {
    tooltip?: string;
  }

  export interface ICrosshairConfigModel extends IComponentBaseConfigModel {
    config?: ICrosshairConfig;
  }

  export interface IFilterConfigModel extends IComponentBaseConfigModel {
    config: IEmbeddedComponentConfigModel
  }

  export interface ILegendEditableConfig {
    color?: boolean;
    chart?: boolean;
  }

  export interface ILegendConfigModel extends IComponentBaseConfigModel {
    filter?: boolean;
    placement?: string;
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

  export interface IAreaConfigModel extends IColoredChart {
    isSharedContainer: boolean,
    curve: any;
  }

  export interface IBucketConfigModel extends IContrailModel {
    isSharedContainer: boolean;
    range: number[];
    scale: IScale;
    shape: string;
  }

  export interface IGroupedBarConfigModel extends IContrailModel {
    isSharedContainer: boolean;
    barPadding: number;
  }

  export interface ILineViewConfigModel extends IContrailModel {
    isSharedContainer?: boolean;
    curve?: any;
    y: { color: string };
  }

  export interface IMapViewConfigModel extends IContrailModel, IColoredChart {
    isSharedContainer: boolean,
    projection: any,
    zoom: {
      step: number,
      extent: number[],
    },
    graticule: boolean,
    accessors: {
      longitude: string,
      latitude: string
    },
  }

  export interface IRadialBarConfigModel extends IContrailModel {
    isSharedContainer: boolean,
    radial: {
      color: string,
    },
    barPadding: number,
  }

  export interface IRadialLineConfigModel extends IContrailModel {
    isSharedContainer: boolean,
    curve: any,
    radial: {
      color: string
    }
  }

  export interface IRadialDendrogramConfigModel extends IContrailModel, IColoredChart {
    levels: any[];
    ease: any;
    duration: number;
    margin: IMargin;
    valueScale: any;
    parentSeparation: 1,
    parentSeparationThreshold: number;
    parentSeparationDepthThreshold: number;
    parentSeparationShrinkFactor: number;
    arcWidth: number;
    showArcLabels: boolean;
    drawLinks: boolean;
    drawRibbons: boolean;
    labelFlow: string,
    arcLabelLetterWidth: number;
    arcLabelXOffset: number;
    arcLabelYOffset: number;
    drillDownLevel: number;
    curve: any;
  }

  export interface ISankeyAccessor {
    accessor: string;
    level: string;
    label: string;
    color: string;
    enabled: boolean;
  }

  export interface ISankeyConfigModel extends IContrailModel, IColoredChart {
    margin: IMargin
    nodeWidth: number,
    nodePadding: number,
    levels: any[],
    duration: number,
    ease: number,
  }

  export interface IScatterPlotAccessor {
    id: string;
    x: number;
    y: number;
    area: number;
    color: string;
    accessor: string;
    data: any;
    halfWidth: number;
    halfHeight: number;
  }
  export interface IScatterPlotConfigModel extends IContrailModel, IColoredChart {
    isSharedContainer: boolean;
    shape: string;
    size: {
      range: number[],
    }
  }

  export interface IStackedBarConfigModel extends IContrailModel, IColoredChart {
    isSharedContainer: boolean;
    barPadding: number;
  }

  export interface IStandaloneModel extends IContrailModel {
    isSharedContainer: boolean;
    width: number;
    height: number;
  }

  export interface ITimelineConfigModel extends IContrailModel {
    isSharedContainer: boolean;
    height: number;
    brushHandleHeight: number;
    brushHandleScaleX: number;
    brushHandleScaleY: number;
    selectionScale: string | IScale;
    selection: any[],
  }
}

/**
 * helper module
 */
export module helpers {

  export class TitleView {
    render(): void;
  }

  export class CompositeChart {
    components: any[];

    constructor(p: any);
    setData(data: any): void;
    get(id: string): any;
    getByType(type: string | string[]): any[];
    add(p: any): any;
    remove(id: any): void;
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

    private _deny: boolean;
    registrars: any[];

    constructor(p: any);
    id(): string;
    apply(...args: any[]): void;
    disable(): void;
    enable(): void;
    canDo(): boolean;
    isEnabled(): boolean;
    evaluate(selection: any[]): void;
    unRegister(registrar: any): void;
    protected _execute(): void;
    private _evaluate(enable: boolean);
  }

  export class Refresh extends Action {
    protected _execute(accessorName?: string, color?: string): void;
  }

  export class SelectColor extends Action {
    protected _execute(accessorName?: string, color?: string): void;
  }

  export class SelectKey extends Action {
    protected _execute(...args: any[]): void;
  }

  export class ToggleFreeze extends Action {
    protected _execute(toggle?: boolean): void;
  }

  export class ToggleHalt extends Action {
    protected _execute(ids?: (string | string[]), toggle?: boolean): void;
  }

  export class ToggleVisibility extends Action {
    protected _execute(ids?: (string | string[]), isVisible?: boolean, ...args: any[]): void;
  }

  export class Zoom extends Action {
    protected _execute(ids?: (string | string[]), ...args: any[]): void;
  }
}

export module models {
  export class DataModel extends _Events {
    data: any[];
    config: any;
    type: string;

    constructor(data: any[], config: any);
    parse(data: any): any;
  }

  export class DataFrame extends DataModel {
    accessors: string[];
    constructor(...args: any[]);
    getRangeFor(accessor: (string | string[]), isFull?: boolean): number[];
    getCombinedRange(accessors: string[]): number[];
    getNearest(accessor: string, value: number): number;
    filter(key: string, range: number[]): any[];
    filterByRanges(data: any[], ranges: Object): any[];
  }

  export class SerieModel extends DataModel { }

}

/**
 * Components module
 */
export module components {
  /**
   * AreaView
   */
  export class AreaConfigModel extends _ConfigModel {
    defaults: configModels.IAreaConfigModel
    yAccessors: configModels.ILinearAccessor[];
    xScale: string | configModels.IScale;
    yScale: string | configModels.IScale;

    set(...args: any[]): void;
    getOuterWidth(model: any, width: number): number;
    calculateScales(model: any): number[];
    getColor(accessorName: string): string | configModels.IColor;
  }

  export class AreaView extends _ChartView {
    static Config: AreaConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents
    getScreenX(datum: any): any;
    calculateScales(): void;
    render(): void;
    private _onMousemove(d: configModels.ILinearAccessor, el: HTMLElement);
    private _onMouseout(d: configModels.ILinearAccessor, el: HTMLElement);
  }

  /**
   * AxisView
   */
  export class AxisConfigModel extends _ConfigModel {
    static getDirection(position: string): string;
    static getLocation(position: string): string;
    static defaultPosition(name: string): string;

    defaults: configModels.ILinearAxis | configModels.IRadialAxis;

    name: string;
    baseName: string;
    scale: string | configModels.IScale;
    formatter: string | configModels.IFormatter;
    position: string;
    isHorizontal: boolean;
    location: string;
    side: number;
    tickCoords: any;
    tickValues: any;
    labels: string[];
  }

  export class AxisView extends _ChartView {
    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    render(): void;
    private _renderLabel(): void;
  }

  /** 
   * BrushView 
  */
  export class BrushConfigModel extends _ConfigModel {
    selection: number[];
    handleHeight: null;
    handleCenter: null;
    extent: null;
  }

  export class BrushView extends _ChartView {
    tagName: string;
    zIndex: number;
    selectors: ISelectors;

    render(): void;
    show(selection: number[]): void;
    hide(): void;
    private _onSelection(): void;
  }

  /**
   * BucketView
   */

  class ClusterAction extends actions.Action { }
  class Cluster {
    x(getX: (...args: any[]) => any): Cluster;
    y(getY: (...args: any[]) => any): Cluster;
    data(data: any): Cluster;
    overlapping(): any[];
    buckets(): any[];
    private _collisionDetection(p: any): void;
  }

  export class BucketConfigModel extends _ConfigModel {
    defaults: configModels.IBucketConfigModel;
    scale: configModels.IScale;
  }
  export class BucketView extends _ChartView {
    static Config: BucketConfigModel;
    static isMaster: boolean;
    static Actions: {
      ToggleVisibility: actions.ToggleVisibility,
      ClusterAction: ClusterAction
    }

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents;

    render(): void;
    private _cluster(data: any): any[];
    private _getId(bucket: any): number;
    private _getSize(bucket: any): number;

    private _onMouseover(d: any, el: HTMLElement, event: Event): void;
    private _onMouseout(d: any, el: HTMLElement, event?: Event): void;
    private _onClickNode(d: any, el: HTMLElement, event?: Event): void;
    private _onBackgroundClick(): void;

  }

  /**
   * ColorPicker
   */
  export class ColorPickerConfigModel extends _ConfigModel {
    defaults: configModels.IColorPickerConfigModel;
    data: any[];
  }
  export class ColorPickerView extends _ChartView {
    static Config: ColorPickerConfigModel;
    static Actions: {
      ToggleVisibility: actions.ToggleVisibility
    };

    events: { [key: string]: string };
    render(): void;
    open(d: any, el: HTMLElement): void;
    close(): void;
    private _onSelectColor(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * ControlPanel
   */
  export class ControlPanelConfigModel extends _ConfigModel {
    default: configModels.IControlPanelConfigModel;
    update: string[];
    set(key: string, value: any, options: any): void;
  }
  export class ControlPanelView extends _ChartView {
    static Config: ControlPanelConfigModel;
    static Actions: {
      ToggleHalt: actions.ToggleHalt
    };

    selectors: ISelectors;
    events: IEvents;

    render(): void;
    setHalt(isHalted: boolean): void;
    addMenuItem(config: configModels.IMenuItem): void;
    removeMenuItem(id: string): void;
    enableMenuItem(id: string): void;
    disableMenuItem(id: string): void;
    open(config: any): void;
    private _onMenuItemClick(d: any, el: HTMLElement): void;
  }

  /**
   * CrosshairView
   */
  export class CrosshairConfigModel extends _ConfigModel {
    defaults: configModels.ICrosshairConfigModel;
  }
  export class CrosshairView extends _ChartView {
    static Config: CrosshairConfigModel;
    static Actions: { ToggleVisibility: actions.ToggleVisibility };
    static isMaster: boolean;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;

    render(): void;
    hide(): void;
    _onResize(): void;
  }

  /**
   * FilterView
   */
  export class FilterConfigModel extends _ConfigModel {
    data: any[];
  }
  export class FilterView extends _ChartView {
    static Model: models.DataFrame;

    selectors: ISelectors;
    events: IEvents;

    render(): void;
    private _onItemClick(d: any, el: HTMLElement): void;
  }

  /**
   * GroupedBarView
   */
  export class GroupedBarConfigModel extends _ConfigModel {
    defaults: configModels.IGroupedBarConfigModel;
    yAccessors: configModels.ILinearAccessor[];
    xScale: string | configModels.IScale;
    yScale: string | configModels.IScale;

    set(...args: any[]): void;
    getOuterWidth(model: any, width: number): number;
    calculateScales(model: any): void;
    getColor(accessorName: string, data: any): string | configModels.IColor;
  }
  export class GroupedBarView extends _ChartView {
    static Config: GroupedBarConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents;
    bandWidth: number;
    padding: configModels.IPadding;

    getScreenX(datum: any, yAccessor: configModels.ILinearAccessor): any;
    getScreenY(datum: any, yAccessor: configModels.ILinearAccessor): any;
    calculateScales(): void;
    render(): void;
    private _prepareData(): any[];
    private _onMousemove(d: any, el: HTMLElement, event?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, event?: Event): void;
  }

  /**
   * LegendView
   */
  export class LegendConfigModel extends _ConfigModel { }
  export class LegendView extends _ChartView {
    static Config: LegendConfigModel;
    static Actions: {
      ToggleVisibility: actions.ToggleVisibility
    };
    static isMaster: boolean;

    render(): void;
  }

  /**
   * LegendPanelView
   */
  export class LegendPanelConfigModel extends _ConfigModel {
    defaults: configModels.ILegendConfigModel;
  }
  export class LegendPanelView extends _ChartView {
    static Config: LegendPanelConfigModel;
    static Actions: { ToggleVisibility: actions.ToggleVisibility };
    static isMaster: boolean;

    selectors: ISelectors
    events: IEvents;

    render(): void;
    private _prepareData(): any;
    private _toggleKey(d: any, el: HTMLElement): void;
    private _setEditState(): void;
    private _toggleEditMode(d: any, el: HTMLElement): void;
    private _addChartTypes(keyAxis: string): void;
    private _toggleSelector(d: any, el: HTMLElement): void;
    private _selectColor(d: any, el: HTMLElement): void;
    private _selectChartType(d: any, el: HTMLElement): void;
  }

  /**
   * LineView
   */
  export class LineConfigModel extends _ConfigModel {
    defaults: configModels.ILineViewConfigModel;
    xScale: string | configModels.IScale;
    yScale: string | configModels.IScale;

    calculateScales(model: any): void;
    getColor(): string | configModels.IColor;
    setColor(accessorName: string, color: string): void;
  }
  export class LineView extends _ChartView {
    static Config: LineConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents;

    getScreenX(datum: any): number;
    getScreenX(datum: any, yAccessor: string): number;

    calculateScales(): void;
    render(): void;

    private _interpolate(data: any, key: string): any;
    private _onMouseover(d: any, el: HTMLElement): void;
    private _onMouseout(d: any, el: HTMLElement): void;
  }

  /**
   * MapView
   */
  export class MapConfigModel extends _ConfigModel {
    defaults: configModels.IMapViewConfigModel;
    zoom: any;

    project(serie: any): any;
  }

  export class MapView extends _ChartView {
    static Config: MapConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    selectors: ISelectors;
    events: IEvents;
    height: number;
    width: number;

    render(): void;
    zoom(): void;
    arc(source: number[], target: number[], bend: number): string;
    private _renderLayout(): void;
    private _renderGraticule(): void;
    private _renderData(): void;
    private _fit(path: any, projection: any, feature: any, rect: any): void;

    private _onZoom(d?: any, el?: HTMLElement, e?: Event): void;
    private _onMousemove(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * MessageView
   */
  class ClearMessage extends actions.Action { }
  class SendMessage extends actions.Action { }
  export class MessageView extends _ChartView {
    static Actions: { SendMessage: SendMessage, ClearMessage: ClearMessage };
    static isMaster: boolean;

    selectors: { [key: string]: any };

    render(): void;
    _onResize(): void;
  }

  /**
   * PieView
   */
  export class PieConfigModel extends _ConfigModel {
    default: configModels.IPieConfigModel;
    innerRadius: number;

    set(...args: any[]): void;
    getColor(data: any, accessor: configModels.IRadialAccessor): string;
  }
  export class PieView extends _ChartView {
    static Config: PieConfigModel;
    static Model: models.SerieModel;

    tagName: string;
    selectors: ISelectors;
    events: IEvents;

    render(): void;
    private _showLegend(): void;
    private _onMouseover(d: any, el: HTMLElement, event: Event): void;
    private _onMousemove(d: any, el: HTMLElement, event: Event): void;
    private _onMouseout(d: any, el: HTMLElement, event?: Event): void;
    private _onClickNode(d: any, el: HTMLElement, event?: Event): void;
  }

  /**
   * RadialAxisView
   */
  export class RadialAxisConfigModel extends _ConfigModel {
    static getDirection(position: string): string;
    static getLocation(position: string): string;
    static defaultPosition(name: string): string;

    defaults: configModels.IRadialAxis;
    name: string;
    baseName: string;
    scale: string | configModels.IScale;
    formatter: string | configModels.IFormatter;
    position: string;
    direction: string;
    isHorizontal: boolean;
    location: string;
    side: number;
    tickCoords: any;
    tickValues: any;
    labels: (string | configModels.IFormatter)[];
  }
  export class RadialAxisView extends _ChartView {
    static Config: RadialAxisConfigModel;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    height: number;
    radius: number;

    render(): void;
  }

  /**
   * RadialBarView
   */
  export class RadialBarConfigModel extends _ConfigModel {
    defaults: configModels.IRadialBarConfigModel;
    angularScale: any;
    radialScale: any;
    radialradialAccessors: configModels.IRadialAccessor[];

    calculateScales(model: any, width?: number, height?: number): void;
    getColor(accessor: configModels.IRadialAccessor, data: any): string;
    setColor(accessorName?: string, color?: (string | configModels.IColor)): void;
  }
  export class RadialBarView extends _ChartView {
    static Config: RadialBarConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    height: number;
    radius: number;
    bandWidth: number;

    render(): void;
    private _createRadialBarPath(d: any);
    private _createEnterRadialBarPath(d: any);
    private _prepareData(): any[];
    private _onMouseover(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * RadialLineView
   */
  export class RadialLineConfigModel extends _ConfigModel {
    defaults: configModels.IRadialLineConfigModel;
    angularScale: any;
    radialScale: any;

    calculateScales(model: any, width?: number, height?: number): void;
    getColor(): string;
    setColor(accessorName?: string, color?: (string | configModels.IColor)): void;
  }
  export class RadialLineView extends _ChartView {
    static Config: RadialLineConfigModel;
    static Model: models.DataFrame;

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    height: number;
    radius: number;

    render(): void;
    private _interpolate(data: any, key: string): any;
    private _onMouseover(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, e?: Event): void;
  }


  /**
   * RadialDendrogramView
   */
  export class RadialDendrogramConfigModel extends _ConfigModel {
    defaults: configModels.IRadialDendrogramConfigModel;
    legendData: any[];
    legendConfig: any;

    getColor(key: string): string;
    setColor(key: string, color: string): void;
    setKey(key: string, isEnabled: boolean): void;
  }
  export class RadialDendrogramView extends _ChartView {
    static Config: configModels.IRadialDendrogramConfigModel;
    static Model: models.SerieModel;
    static Actions: { SelectColor: actions.SelectColor, SelectKey: actions.SelectKey };

    tagName: string;
    selectors: ISelectors;
    events: IEvents;
    height: number;

    render(): void;
    private _calculateDimensions(): void;
    private _prepareRootNode(): void;
    private _prepareHierarchyRootNode(): void;
    private _prepareLinks(): void;
    private _prepareCluster(): void;
    private _prepareCircles(): void;
    private _prepareAngleRanges(): void;
    private _prepareRibbons(): void;
    private _prepareArcs(): void;
    private _prepareHierarchy(): void;
    private _render(): void;
    private _showLegend(): void;
    private _onConfigModelChange(): void;
    private _onMousemove(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, e?: Event): void;
    private _onClickNode(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * SankeyView 
   */
  export class SankeyConfigModel extends _ConfigModel {
    defaults: configModels.ISankeyConfigModel;
    set(...args: any[]): void;
    getColor(data: any, accessor: any): void;
    getAccessors(): configModels.ISankeyAccessor[];
  }
  export class SankeyView extends _ChartView {
    static Config: SankeyConfigModel;
    static Model: models.SerieModel;

    tagName: string;
    selectors: ISelectors;
    events: IEvents;

    render(): void;
    remove(): void;
    private _prepareLayout(): void;
    private _render(): void;
    private _onMouseoverLink(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseoutLink(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * ScatterPlotView
   */
  export class ScatterPlotConfigModel extends _ConfigModel {
    defaults: configModels.IScatterPlotConfigModel;
    xScale: string | configModels.IScale;
    yScale: string | configModels.IScale;
    sizeScale: string | configModels.IScale;

    set(...args: any[]): void;
    getOuterWidth(model: any, width: number): number;
    calculateScales(model: any, width: number, height: number): void;
    getColor(accessorName: string, data: any): string;
    setColor(): void;
  }
  export class ScatterPlotView extends _ChartView {
    static Config: ScatterPlotConfigModel;
    static Model: models.DataFrame;
    static Actions: { ClusterAction: ClusterAction, Zoom: actions.Zoom };

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents;
    isWaiting: boolean;

    render(): void;
    cluster(overlapping: any): void;
    zoom(ranges: any): void;
    prepareData(): configModels.IScatterPlotAccessor[];
    private _cluster(): any;
    private _onMouseover(d: any, el: HTMLElement, e?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, e?: Event): void;
  }

  /**
   * StackedBarView
   */
  export class StackedBarConfigModel extends _ConfigModel {
    defaults: configModels.IStackedBarConfigModel;
    yAccessors: configModels.ILinearAccessor[];
    accessors: configModels.ILinearAccessor[];
    xScale: string | configModels.IScale;
    yScale: string | configModels.IScale;

    set(...args: any[]): void;
    getOuterWidth(model: any, width: number): number;
    calculateScales(model: any): void;
    getColor(accessorName: string, data: any): string;
    setColor(): void;
    setKey(): void;
  }
  export class StackedBarView extends _ChartView {
    static Config: StackedBarConfigModel;
    static Model: models.DataFrame;
    static Actions: { SelectColor: actions.SelectColor, SelectKey: actions.SelectKey };

    tagName: string;
    zIndex: number;
    selectors: ISelectors;
    events: IEvents;
    bandWidth: number;
    padding: configModels.IPadding;

    getScreenX(datum: any): number;
    getScreenX(datum: any, yAccessor: configModels.ILinearAccessor): number;
    calculateScales(): void;
    render(): void;
    private _prepareData(): any[];
    private _onMousemove(d: any, el: HTMLElement, event?: Event): void;
    private _onMouseout(d: any, el: HTMLElement, event?: Event): void;
  }

  /**
   * StandaloneView
   */
  export class StandaloneModel extends _ConfigModel {
    defaults: configModels.IStandaloneModel;
  }
  export class StandaloneView extends _ChartView {
    static Config: StandaloneModel;

    tagName: string;

    render(): void;
  }

  /**
   * TimelineView
   */
  export class TimelineConfigModel extends _ConfigModel {
    defaults: configModels.ITimelineConfigModel;
    selectionRange(): number[];
  }
  export class TimelineView extends _ChartView {
    static Config: TimelineConfigModel;
    static Model: models.DataFrame;
    static Actions: { Zoom: actions.Zoom };

    tagName: string;
    selectors: ISelectors;
    width: number;

    render(): void;
    zoom(ranges: any): void;
    private _onSelection(range: number[]);
    _onResize(): void;
  }

  /**
   * TooltipView
   */
  export class TooltipConfigModel extends _ConfigModel {
    default: configModels.ITooltipConfig;
    clip: any;
    stickyMargin: configModels.IMargin;
    position: configModels.IPosition;
    height: number;
  }
  export class TooltipView extends _ChartView {
    static Config: TooltipConfigModel;
    static Actions: { ToggleVisibility: actions.ToggleVisibility };
    static isMaster: boolean;

    width: number;
    height: number;

    render(): void;
    hide(): void;
    place(point: configModels.IPosition, placement: string): void;
    private _loadTemplate(data: any);
  }
}

/**
 * Composite module
 */
export module composites {

  /**
   * Composite View
   */
  export class CompositeView extends _ChartView {

    composite: helpers.CompositeChart;

    setData(data: any[]): void;
    setConfig(config: configModels.ICompositeViewConfigModel): void;
    render(): void;
    remove(): void;
    _onResize(): void;
  }

  /**
   * Composite Y View
   */
  class SelectChartType extends actions.Action {
    constructor(p: any);
    protected _execute(...args: any[]): void;
  }

  export class CompositeYView extends _ChartView {
    static Config: CompositeYConfigModel;
    static Model: models.DataFrame;
    static Actions: {
      SelectColor: actions.SelectColor,
      SelectKey: actions.SelectKey
      SelectChartType: SelectChartType
      Zoom: actions.Zoom
      ClusterAction: components.ClusterAction
    }

    tagName: string;
    selectors: ISelectors;

    constructor(...args: any[]);
    zoom(ranges?: { [key: string]: number[] }): void;
    cluster(overlapping?: any): void;
    private _renderClip(): void;
    private _renderAxes(): void;
    private _updateComponents(p?: any): void;
    private _updateComponent(child: configModels.ILinearAccessor, config: any): void;
    private _initCrosshair(): void;
    private _toggleCrosshair(point?: number[]): void;
    private _showLegend(): void;
    private _cluster(): void;
    private _onMousemove(d: any, el: HTMLElement, e: Event): void;
  }
  export class CompositeYConfigModel extends _ConfigModel {

    defaults: configModels.ICompositeYConfigModel;
    yAccessors: string[];
    accessors: configModels.ILinearAccessor[]
    children: { [key: string]: configModels.ILinearAccessor }
    xScale: string | configModels.IScale;
    margin: configModels.IMargin;
    activeAxes: configModels.ILinearAxis | configModels.ILinearAxis[]
    update: string | string[];

    set(...args: any[]);
    getComponentType(accessors: configModels.ILinearAccessor | configModels.ILinearAccessor[]): string;
    getAxisName(accessors: configModels.ILinearAccessor | configModels.ILinearAccessor[]): string;
    getAxisAccessors(name: string, filterActive?: boolean): configModels.ILinearAccessor[];
    getAxisConfig(name: string): configModels.ILinearAxis;
    calculateScales(model: any): configModels.IScale[];
    getColor(accessorName: string): string | configModels.IColor;
    setColor(accessorName: string, color: string | configModels.IColor): void;
    setKey(accessorName: string, isEnabled: boolean): void;
    setChartType(accessorName: string, type: string): void;
    syncScales(direction: string, scale: any, ticksAmount: string);
    isMultiAccessor(type: string): boolean;
  }

  /**
   * Composite Radial View
   */
  export class CompositeRadialView extends _ChartView {
    static Config: CompositeRadialConfigModel;
    static Model: models.DataFrame;
    static Actions: {
      SelectColor: actions.SelectColor,
      SelectKey: actions.SelectKey
    };

    tagName: string;
    selectors: ISelectors;
    height: number;

    render(): void;
    remove(): void;
    private _renderAxes(): void;
    private _updateComponents(p: any): void;
    private _showLegend(): void;

  }
  export class CompositeRadialConfigModel extends _ConfigModel {
    defaults: configModels.ICompositeRadialConfigModel;
    activeAccessors: configModels.IRadialAccessor[];
    accessors: configModels.IRadialAccessor[];
    children: { [key: string]: configModels.IRadialAccessor };
    activeAngularAxes: configModels.IRadialAxis[];
    activeRadialAxes: configModels.IRadialAxis[];

    set(...args: any[]): void;
    getComponentType(accessor: configModels.IRadialAccessor): string;
    getAccessorKey(accessor: configModels.IRadialAccessor): string;
    getAngularAxisName(accessor: configModels.IRadialAccessor): string;
    getRadialAxisName(accessor: configModels.IRadialAccessor): string;
    getOtherAxisName(position: string, accessor: configModels.IRadialAccessor): string;
    getAxisAccessors(name: string): configModels.IRadialAccessor[]
    getAxisConfig(name: string): any[];
    calculateScales(model: any, width: number, height: number): void;
    getColor(accessor: configModels.IRadialAccessor): string | configModels.IColor;
    setColor(accessorName: string, color?: string | configModels.IColor): void;
    setKey(accessorName: string, isEnabled?: boolean): void;
    isMultiAccessor(type: string): boolean;

  }

  /**
   * Navigation View
   */
  export class NavigationConfigModel extends _ConfigModel {
    defaults: configModels.INavigationConfigModel;
    getSelectionRange(xRange: number | number[]): number[];
  }
  export class NavigationView extends _ChartView {
    static Config: NavigationConfigModel;
    static Model: models.DataFrame;
    static Actions: {
      Zoom: actions.Zoom
    };

    constructor(...args: any[]);
    render(): void;
    remove(): void;
    zoom(): void;
    private _onSelection(range: number | number[]);
    _onResize(): void;
    private _update(): void;
  }

}