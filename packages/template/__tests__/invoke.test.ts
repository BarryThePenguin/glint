import {
  template,
  resolve,
  invokeBlock,
  ResolveContext,
  invokeModifier,
  invokeEmit,
  resolveOrReturn,
} from '@glint/template';
import { expectTypeOf } from 'expect-type';
import TestComponent, { globals } from './test-component';
import { yieldToBlock } from '../-private/blocks';

type MyComponentSignature<T> = {
  Args: {
    name?: string;
    value: T;
  };
  Yields: {
    body?: [boolean, T];
  };
  Element: HTMLDivElement;
};

class MyComponent<T> extends TestComponent<MyComponentSignature<T>> {
  private state = { ready: false };

  private wrapperClicked(event: MouseEvent): void {
    console.log('clicked', event.x, event.y);
  }

  /**
   * ```hbs
   * {{#let this.state.ready as |isReady|}}
   *   <div {{on 'click' this.wrapperClicked}}>
   *     {{yield isReady @value to="body"}}
   *   </div>
   * {{/let}}
   * ```
   */
  public static template = template(function <T>(𝚪: ResolveContext<MyComponent<T>>) {
    invokeBlock(resolve(globals.let)({}, 𝚪.this.state.ready), {
      default(isReady) {
        invokeModifier(resolve(globals.on)({}, 'click', 𝚪.this.wrapperClicked));

        yieldToBlock(𝚪, 'body', isReady, 𝚪.args.value);

        yieldToBlock(
          𝚪,
          // @ts-expect-error: bad block
          'bad',
          isReady,
          𝚪.args.value
        );

        // @ts-expect-error: missing params
        yieldToBlock(𝚪, 'body');

        yieldToBlock(
          𝚪,
          'body',
          isReady,
          // @ts-expect-error: wrong param type
          Symbol()
        );
      },
    });
  });
}

/**
 * Instantiate `T` to `string` and verify it's threaded through:
 *
 * hbs```
 * <MyComponent @value="hi">
 *   <:body as |isReady value|>
 *     Ready? {{value}}: {{isReady}}
 *     <br>
 *     {{yield value}}
 *   </:body>
 * </MyComponent>
 */
invokeBlock(resolve(MyComponent)({ value: 'hi' }), {
  body(isReady, value) {
    expectTypeOf(isReady).toEqualTypeOf<boolean>();
    expectTypeOf(value).toEqualTypeOf<string>();

    invokeEmit(resolveOrReturn(value)({}));
    invokeEmit(resolveOrReturn(isReady)({}));
  },
});

/**
 * Instantiate `T` to `number` and verify it's threaded through:
 *
 * hbs```
 * <MyComponent @value={{123}}>
 *   <:body as |isReady value|>
 *     Ready? {{value}}: {{isReady}}
 *     {{yield value}}
 *   </:body>
 * </MyComponent>
 */
invokeBlock(resolve(MyComponent)({ value: 123 }), {
  body(isReady, value) {
    expectTypeOf(isReady).toEqualTypeOf<boolean>();
    expectTypeOf(value).toEqualTypeOf<number>();

    invokeEmit(resolveOrReturn(value)({}));
    invokeEmit(resolveOrReturn(isReady)({}));
  },
});

/**
 * Invoke the component inline, which is valid since it has no
 * required blocks.
 *
 * hbs```
 * {{MyComponent value=123}}
 * ```
 */
invokeEmit(resolve(MyComponent)({ value: 123 }));

/**
 * Constrained type parameters can be tricky, and `expect-type` doesn't
 * work well with type assertions directly against them, but we can assert
 * against a property that the constraint dictates must exist to ensure
 * that we don't break or degrade them to `unknown` or `any` when used
 * in a template.
 */
export function testConstrainedTypeParameter<T extends { foo: 'bar' }>(value: T): void {
  let result = resolveOrReturn(value)({});
  expectTypeOf(result.foo).toEqualTypeOf<'bar'>();
}
