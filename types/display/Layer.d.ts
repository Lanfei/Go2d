import Stage from './Stage';
import Image from '../media/Image';
import Ticker from '../core/Ticker';
import Matrix from '../geom/Matrix';
import Rectangle from '../geom/Rectangle';
import TouchEvent from '../event/TouchEvent';
import EventEmitter from '../event/EventEmitter';
export default class Layer extends EventEmitter {
    static pixelRatio: number;
    name: string;
    tag: string;
    touchable: boolean;
    protected $x: number;
    protected $y: number;
    protected $width: number;
    protected $height: number;
    protected $anchorX: number;
    protected $anchorY: number;
    protected $skewX: number;
    protected $skewY: number;
    protected $scaleX: number;
    protected $scaleY: number;
    protected $rotation: number;
    protected $alpha: number;
    protected $visible: boolean;
    protected $backgroundColor: string;
    protected $backgroundImage: Image;
    protected $backgroundPattern: CanvasPattern;
    protected $backgroundFillMode: BackgroundFillMode;
    protected $dirty: boolean;
    protected $stage: Stage;
    protected $parent: Layer;
    protected readonly $children: Array<Layer>;
    protected readonly $touches: Array<boolean>;
    protected readonly $canvas: HTMLCanvasElement;
    protected readonly $context: CanvasRenderingContext2D;
    constructor();
    width: number;
    height: number;
    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    skewX: number;
    skewY: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    alpha: number;
    backgroundColor: string;
    backgroundImage: Image;
    backgroundFillMode: BackgroundFillMode;
    visible: boolean;
    readonly dirty: boolean;
    readonly stage: Stage;
    readonly parent: Layer;
    readonly children: Array<Layer>;
    readonly ticker: Ticker;
    readonly canvas: HTMLCanvasElement;
    addChild(child: Layer): this;
    addChildAt(child: Layer, index: number): this;
    replaceChild(oldChild: Layer, newChild: Layer): this;
    getChildByName(name: any): Layer;
    getChildrenByTag(tag: any): Array<Layer>;
    getChildAt(index: any): Layer;
    getChildIndex(child: any): number;
    swapChildren(child1: any, child2: any): this;
    swapChildrenAt(index1: any, index2: any): this;
    setChildIndex(child: Layer, index: number): this;
    removeChild(child: Layer): this;
    removeChildAt(index: number): this;
    removeChildrenByName(name: string): this;
    removeChildrenByTag(tag: any): this;
    removeAllChildren(): this;
    removeSelf(): this;
    protected $getTransform(): Matrix;
    protected $resizeCanvas(): void;
    protected $getChildBounds(child: Layer): Rectangle;
    protected $getContentBounds(): Rectangle;
    protected $emitTouchEvent(event: TouchEvent): boolean;
    protected $getPattern(image: any, fillMode: any): CanvasPattern;
    protected $drawBackground(color: string, image: Image, pattern: CanvasPattern, fillMode: BackgroundFillMode, context?: CanvasRenderingContext2D): void;
    protected $drawChild(child: Layer): void;
    protected $render(): void;
    on(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener?: (...args: any[]) => void): this;
    protected $onAdded(parent: Layer): void;
    protected $onRemoved(): void;
    protected $onAddedToStage(stage: Stage): void;
    protected $onRemovedFromStage(stage: Stage): void;
    protected $markDirty(): void;
    protected $markParentDirty(): void;
}
export declare type BackgroundFillMode = 'scale' | 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
