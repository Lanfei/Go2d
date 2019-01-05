import Layer, {BackgroundFillMode} from './Layer';
import Image from '../media/Image';
import Ticker from '../core/Ticker';
import Event from '../event/Event';
import TouchEvent from '../event/TouchEvent';
import Rectangle from '../geom/Rectangle';
import ResourceManager, {ResourceInfo, ResourceManagerOption} from '../net/ResourceManager';

export default class Stage extends Layer {

	public static readonly NO_SCALE: string = 'noScale';
	public static readonly NO_BORDER: string = 'noBorder';
	public static readonly SHOW_ALL: string = 'showAll';
	public static readonly EXACT_FIT: string = 'exactFit';
	public static readonly FIXED_WIDE: string = 'fixedWide';
	public static readonly FIXED_NARROW: string = 'fixedNarrow';
	public static readonly FIXED_WIDTH: string = 'fixedWidth';
	public static readonly FIXED_HEIGHT: string = 'fixedHeight';

	protected $scaleMode: string;
	protected $viewportWidth: number;
	protected $viewportHeight: number;
	protected $renderBounds: Rectangle;
	protected $viewportBackgroundColor: string;
	protected $viewportBackgroundImage: Image;
	protected $viewportBackgroundPattern: CanvasPattern;
	protected $viewportBackgroundFillMode: BackgroundFillMode = 'scale';
	protected readonly $ticker: Ticker;
	protected readonly $viewportCanvas: HTMLCanvasElement;
	protected readonly $viewportContext: CanvasRenderingContext2D;
	protected readonly $boundOnWindowResize: () => void;

	public constructor(canvas?: HTMLCanvasElement) {
		super();
		this.$scaleMode = Stage.SHOW_ALL;
		this.$ticker = new Ticker(this);
		this.$viewportCanvas = canvas || document.createElement('canvas');
		this.$viewportContext = this.$viewportCanvas.getContext('2d');
		this.$boundOnWindowResize = this.$onWindowResize.bind(this);
		this.$initEvents();

		this.width = 640;
		this.height = 1136;
		this.viewportWidth = 0;
		this.viewportHeight = 0;

		if (!canvas) {
			this.$viewportCanvas.style.top = '0';
			this.$viewportCanvas.style.left = '0';
			this.$viewportCanvas.style.position = 'fixed';
			document.body.appendChild(this.$viewportCanvas);
		}
	}

	protected $initEvents(): void {
		let resizeTimer;
		let ticker = this.$ticker;
		this.$addTouchEventListeners();
		this.on(Event.ENTER_FRAME, this.$render);
		ticker.setTimeout(() => {
			this.emit(Event.ADDED_TO_STAGE, this);
		});
		window.addEventListener('resize', () => {
			ticker.clearTimeout(resizeTimer);
			resizeTimer = ticker.setTimeout(this.$boundOnWindowResize, 100);
		});
	}

	public get x(): number {
		return 0;
	}

	public set x(x: number) {
		this.$x = 0;
	}

	public get y(): number {
		return 0;
	}

	public set y(y: number) {
		this.$y = 0;
	}

	public get scaleMode(): string {
		return this.$scaleMode;
	}

	public set scaleMode(scaleMode: string) {
		if (this.scaleMode !== scaleMode) {
			this.$scaleMode = scaleMode;
			this.$resizeCanvas();
		}
	}

	public get viewportWidth(): number {
		return this.$viewportWidth ? this.$viewportWidth : this.$viewportCanvas.width / Layer.pixelRatio;
	}

	public set viewportWidth(width: number) {
		if (this.$viewportWidth !== width) {
			this.$viewportWidth = width;
			width = width || window.innerWidth;
			this.$viewportCanvas.width = width * Layer.pixelRatio;
			this.$viewportCanvas.style.width = width + 'px';
			this.$resizeCanvas();
			this.emit(Event.VIEWPORT_RESIZE);
		}
	}

	public get viewportHeight(): number {
		return this.$viewportHeight ? this.$viewportHeight : this.$viewportCanvas.height / Layer.pixelRatio;
	}

	public set viewportHeight(height: number) {
		if (this.$viewportHeight !== height) {
			this.$viewportHeight = height;
			height = height || window.innerHeight;
			this.$viewportCanvas.height = height * Layer.pixelRatio;
			this.$viewportCanvas.style.height = height + 'px';
			this.$resizeCanvas();
			this.emit(Event.VIEWPORT_RESIZE);
		}
	}

	public get viewportBackgroundColor(): string {
		return this.$viewportBackgroundColor;
	}

	public set viewportBackgroundColor(viewportBackgroundColor: string) {
		if (this.$viewportBackgroundColor !== viewportBackgroundColor) {
			this.$viewportBackgroundColor = viewportBackgroundColor;
			this.$markDirty();
		}
	}

	public get viewportBackgroundImage(): Image {
		return this.$viewportBackgroundImage;
	}

	public set viewportBackgroundImage(viewportBackgroundImage: Image) {
		if (this.$viewportBackgroundImage !== viewportBackgroundImage) {
			this.$viewportBackgroundImage = viewportBackgroundImage;
			this.$viewportBackgroundPattern = this.$getPattern(this.$viewportBackgroundImage, this.$viewportBackgroundFillMode);
			this.$markDirty();
		}
	}

	public get viewportBackgroundFillMode(): BackgroundFillMode {
		return this.$viewportBackgroundFillMode;
	}

	public set viewportBackgroundFillMode(viewportBackgroundFillMode: BackgroundFillMode) {
		if (this.$viewportBackgroundFillMode !== viewportBackgroundFillMode) {
			this.$viewportBackgroundFillMode = viewportBackgroundFillMode || 'scale';
			this.$viewportBackgroundPattern = this.$getPattern(this.$viewportBackgroundImage, this.$viewportBackgroundFillMode);
			this.$markDirty();
		}
	}

	public get ticker(): Ticker {
		return this.$ticker;
	}

	public createResourceManager(list: Array<ResourceInfo>, options?: ResourceManagerOption): ResourceManager {
		return new ResourceManager(this.$ticker, list, options);
	}

	protected $addTouchEventListeners(): void {
		let canvas = this.$viewportCanvas;
		if (canvas.ontouchstart !== undefined) {
			canvas.addEventListener('touchstart', event => {
				this.$dispatchTouches(TouchEvent.TOUCH_START, event);
				event.preventDefault();
			});
			canvas.addEventListener('touchmove', event => {
				this.$dispatchTouches(TouchEvent.TOUCH_MOVE, event);
				event.preventDefault();
			}, {passive: false});
			canvas.addEventListener('touchend', event => {
				this.$dispatchTouches(TouchEvent.TOUCH_END, event);
				this.$dispatchTouches(TouchEvent.TOUCH_TAP, event);
			});
			canvas.addEventListener('touchcancel', event => {
				this.$dispatchTouches(TouchEvent.TOUCH_CANCEL, event);
			});
		} else {
			let touching = false;
			canvas.addEventListener('mousedown', event => {
				this.$dispatchTouchEvent(TouchEvent.TOUCH_START, event);
				touching = true;
			});
			canvas.addEventListener('mousemove', event => {
				if (touching) {
					this.$dispatchTouchEvent(TouchEvent.TOUCH_MOVE, event);
				}
			});
			canvas.addEventListener('mouseup', event => {
				this.$dispatchTouchEvent(TouchEvent.TOUCH_END, event);
				touching = false;
			});
			canvas.addEventListener('click', event => {
				this.$dispatchTouchEvent(TouchEvent.TOUCH_TAP, event);
			});
			window.addEventListener('mouseout', event => {
				this.$dispatchTouchEvent(TouchEvent.TOUCH_CANCEL, event);
			});
		}
	}

	protected $dispatchTouches(type: string, event: Event): void {
		let touches = event['changedTouches'];
		for (let i = 0, l = touches.length; i < l; ++i) {
			this.$dispatchTouchEvent(type, touches[i]);
		}
	}

	protected $dispatchTouchEvent(type: string, touch: Touch | MouseEvent): void {
		if (this.$ticker.paused) {
			return;
		}
		let event = TouchEvent.create(type);
		let width = this.$canvas.width;
		let height = this.$canvas.height;
		let bounds = this.$renderBounds;
		let pixelRatio = Layer.pixelRatio;
		let viewportBounds = this.$viewportCanvas.getBoundingClientRect();
		let x = (touch.pageX - viewportBounds.left - bounds.x / pixelRatio) * width / bounds.width - this.$anchorX;
		let y = (touch.pageY - viewportBounds.top - bounds.y / pixelRatio) * height / bounds.height - this.$anchorY;
		event.targetX = event.stageX = x;
		event.targetY = event.stageY = y;
		event.identifier = touch instanceof Touch ? touch.identifier : 0;
		this.$emitTouchEvent(event);
		event.release();
	}

	protected $calculateRenderBounds(): void {
		let x = 0;
		let y = 0;
		let canvas = this.$canvas;
		let width = canvas.width;
		let height = canvas.height;
		let scaleMode = this.scaleMode;
		let aspectRatio = width / height;
		let viewportCanvas = this.$viewportCanvas;
		let viewportWidth = viewportCanvas.width;
		let viewportHeight = viewportCanvas.height;
		let viewportAspectRatio = viewportWidth / viewportHeight;
		let bounds = this.$renderBounds || Rectangle.create();
		if (scaleMode === Stage.NO_SCALE) {
		} else if (scaleMode === Stage.NO_BORDER) {
			if (aspectRatio < viewportAspectRatio) {
				width = viewportWidth;
				height = width / aspectRatio;
			} else {
				height = viewportHeight;
				width = height * aspectRatio;
			}
			x = (viewportWidth - width) / 2;
			y = (viewportHeight - height) / 2;
		} else if (scaleMode === Stage.SHOW_ALL) {
			if (aspectRatio > viewportAspectRatio) {
				width = viewportWidth;
				height = width / aspectRatio;
			} else {
				height = viewportHeight;
				width = height * aspectRatio;
			}
		} else if (scaleMode === Stage.EXACT_FIT) {
			width = viewportWidth;
			height = viewportHeight;
		} else if (scaleMode === Stage.FIXED_WIDTH) {
			width = viewportWidth;
			height = width / aspectRatio;
		} else if (scaleMode === Stage.FIXED_HEIGHT) {
			height = viewportHeight;
			width = height * aspectRatio;
		} else if (scaleMode === Stage.FIXED_WIDE) {
			if (viewportWidth > viewportHeight) {
				width = viewportWidth;
				height = width / aspectRatio;
			} else {
				height = viewportHeight;
				width = height * aspectRatio;
			}
		} else if (scaleMode === Stage.FIXED_NARROW) {
			if (viewportWidth < viewportHeight) {
				width = viewportWidth;
				height = width / aspectRatio;
			} else {
				height = viewportHeight;
				width = height * aspectRatio;
			}
		}
		if (width < viewportWidth) {
			x = (viewportWidth - width) / 2;
		}
		if (height < viewportHeight) {
			y = (viewportHeight - height) / 2;
		}
		bounds.x = x;
		bounds.y = y;
		bounds.width = width;
		bounds.height = height;
		this.$renderBounds = bounds;
	}

	protected $resizeCanvas() {
		super.$resizeCanvas();
		this.$calculateRenderBounds();
	}

	protected $render(): void {
		if (!this.$dirty) {
			return;
		}
		super.$render();
		let canvas = this.$canvas;
		let ctx = this.$viewportContext;
		let bounds = this.$renderBounds;
		let viewportCanvas = this.$viewportCanvas;
		let viewportWidth = viewportCanvas.width;
		let viewportHeight = viewportCanvas.height;
		let backgroundColor = this.$viewportBackgroundColor;
		let backgroundImage = this.$viewportBackgroundImage;
		let backgroundPattern = this.$viewportBackgroundPattern;
		let backgroundFillMode = this.$viewportBackgroundFillMode;
		ctx.clearRect(0, 0, viewportWidth, viewportHeight);
		this.$drawBackground(backgroundColor, backgroundImage, backgroundPattern, backgroundFillMode, ctx);
		ctx.drawImage(canvas, bounds.x, bounds.y, bounds.width, bounds.height);
	}

	protected $onWindowResize(): void {
		let viewportWidth = this.$viewportWidth;
		let viewportHeight = this.$viewportHeight;
		this.viewportWidth = viewportWidth;
		this.viewportHeight = viewportHeight;
		this.$viewportWidth = viewportWidth;
		this.$viewportHeight = viewportHeight;
	}

}