import {
  Component,
  ComponentMetadata,
  Compiler,
  Directive,
  Input,
  ViewContainerRef,
  ReflectiveInjector
} from '@angular/core';

/**
 * ComponentOutlet is a directive to create dynamic component.
 * 
 * Example: 
 * 
 * ```ts
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div *componentOutlet="templateUrlVar; context: self; selector:'my-component'"></div>
 *   `,
 *   directives: [ComponentOutlet]
 * })
 * export class AppComponent {
 *   self = this;
 *   templateUrlVar = 'path/to/your/htmlFile.html';
 * }
 * ```
 * 
 * Result: 
 * 
 * ```html
 * <my-component>
 *    <div>
 *      HTML content
 *    </div>
 * </my-component>
 * ```
 * 
 */
@Directive({
  selector: '[componentOutlet]',
})
export class ComponentOutlet {
  @Input('componentOutlet') private templateUrl: string;
  @Input('componentOutletSelector') private selector: string;
  @Input('componentOutletContext') private context: Object;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  private _createDynamicComponent() {
    this.context = this.context || {};

    const metadata = new ComponentMetadata({
      selector: this.selector,
      templateUrl: this.templateUrl,
    });

    const cmpClass = class _ { };
    cmpClass.prototype = this.context;
    return Component(metadata)(cmpClass);
  }

  ngOnChanges() {
    if (!this.templateUrl) return;
    this.compiler.compileComponentAsync(this._createDynamicComponent())
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.vcRef.clear();
        this.vcRef.createComponent(factory, 0, injector);
      });
  }
}
