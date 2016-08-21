# angular2-component-outlet (modified with templateUrl)

```
$ npm install --save angular2-component-outlet
```

`ComponentOutlet` is a directive to create dynamic component.

Example: 

```ts
@Component({
  selector: 'my-app',
  template: `
    <div *componentOutlet="templateUrlVar; context: self; selector:'my-component'"></div>
  `,
  directives: [ComponentOutlet]
})
export class AppComponent {
  self = this;

  templateUrlVar = 'path/to/your/htmlFile.html';
}
```

Result: 

```html
<my-app>
    <my-component>
        <div>
             HTML file's content
        </div>
    </my-component>
</my-app>
```
