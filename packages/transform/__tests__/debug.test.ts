import ts from 'typescript';
import { describe, test, expect } from 'vitest';
import { rewriteModule } from '../src';
import { stripIndent } from 'common-tags';
import { GlintEnvironment } from '@glint/config/lib/environment';

describe('Debug utilities', () => {
  describe('TransformedModule#toDebugString', () => {
    test('companion template', () => {
      let script = {
        filename: 'test.ts',
        contents: stripIndent`
          import Component from '@ember/component';

          export default class MyComponent extends Component {
            private message = 'hi';
          }
        `,
      };

      let template = {
        filename: 'test.hbs',
        contents: stripIndent`
          {{#each (array "world" "planet" "universe") as |target index|}}
            #{{add index 1}}: {{this.message}}, {{target}}!
          {{/each}}
        `,
      };

      let transformedModule = rewriteModule(
        ts,
        { script, template },
        GlintEnvironment.load('ember-loose')
      );

      expect(transformedModule?.toDebugString()).toMatchInlineSnapshot(`
        "TransformedModule

        | Mapping: Template
        |  hbs(0:123):   {{#each (array \\"world\\" \\"planet\\" \\"universe\\") as |target index|}}\\\\n  #{{add index 1}}: {{this.message}}, {{target}}!\\\\n{{/each}}
        |  ts(131:708):  ({} as typeof import(\\"@glint/environment-ember-loose/-private/dsl\\")).templateForBackingValue(this, function(𝚪, χ: typeof import(\\"@glint/environment-ember-loose/-private/dsl\\")) {\\\\n  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(χ.Globals[\\"each\\"])({}, [\\"world\\", \\"planet\\", \\"universe\\"]));\\\\n    {\\\\n      const [target, index] = 𝛄.blockParams[\\"default\\"];\\\\n      χ.emitContent(χ.resolve(χ.Globals[\\"add\\"])({}, index, 1));\\\\n      χ.emitContent(χ.resolveOrReturn(𝚪.this.message)({}));\\\\n      χ.emitContent(χ.resolveOrReturn(target)({}));\\\\n    }\\\\n    χ.Globals[\\"each\\"];\\\\n  }\\\\n  𝚪; χ;\\\\n}) as unknown
        |
        | | Mapping: BlockStatement
        | |  hbs(0:123):   {{#each (array \\"world\\" \\"planet\\" \\"universe\\") as |target index|}}\\\\n  #{{add index 1}}: {{this.message}}, {{target}}!\\\\n{{/each}}
        | |  ts(310:685):  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(χ.Globals[\\"each\\"])({}, [\\"world\\", \\"planet\\", \\"universe\\"]));\\\\n    {\\\\n      const [target, index] = 𝛄.blockParams[\\"default\\"];\\\\n      χ.emitContent(χ.resolve(χ.Globals[\\"add\\"])({}, index, 1));\\\\n      χ.emitContent(χ.resolveOrReturn(𝚪.this.message)({}));\\\\n      χ.emitContent(χ.resolveOrReturn(target)({}));\\\\n    }\\\\n    χ.Globals[\\"each\\"];\\\\n  }
        | |
        | | | Mapping: PathExpression
        | | |  hbs(3:7):     each
        | | |  ts(355:372):  χ.Globals[\\"each\\"]
        | | |
        | | | | Mapping: Identifier
        | | | |  hbs(3:7):     each
        | | | |  ts(366:370):  each
        | | | |
        | | |
        | | | Mapping: SubExpression
        | | |  hbs(8:43):    (array \\"world\\" \\"planet\\" \\"universe\\")
        | | |  ts(378:409):  [\\"world\\", \\"planet\\", \\"universe\\"]
        | | |
        | | | | Mapping: StringLiteral
        | | | |  hbs(15:22):   \\"world\\"
        | | | |  ts(379:386):  \\"world\\"
        | | | |
        | | | | Mapping: StringLiteral
        | | | |  hbs(23:31):   \\"planet\\"
        | | | |  ts(388:396):  \\"planet\\"
        | | | |
        | | | | Mapping: StringLiteral
        | | | |  hbs(32:42):   \\"universe\\"
        | | | |  ts(398:408):  \\"universe\\"
        | | | |
        | | |
        | | | Mapping: Identifier
        | | |  hbs(48:54):   target
        | | |  ts(432:438):  target
        | | |
        | | | Mapping: Identifier
        | | |  hbs(55:60):   index
        | | |  ts(440:445):  index
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(67:82):   {{add index 1}}
        | | |  ts(476:538):  χ.emitContent(χ.resolve(χ.Globals[\\"add\\"])({}, index, 1))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(69:72):   add
        | | | |  ts(506:522):  χ.Globals[\\"add\\"]
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(69:72):   add
        | | | | |  ts(517:520):  add
        | | | | |
        | | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(73:78):   index
        | | | |  ts(528:533):  index
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(73:78):   index
        | | | | |  ts(528:533):  index
        | | | | |
        | | | |
        | | | | Mapping: NumberLiteral
        | | | |  hbs(79:80):   1
        | | | |  ts(535:536):  1
        | | | |
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(84:100):  {{this.message}}
        | | |  ts(540:599):  χ.emitContent(χ.resolveOrReturn(𝚪.this.message)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(86:98):   this.message
        | | | |  ts(578:593):  𝚪.this.message
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(86:90):   this
        | | | | |  ts(581:585):  this
        | | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(91:98):   message
        | | | | |  ts(586:593):  message
        | | | | |
        | | | |
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(102:112): {{target}}
        | | |  ts(601:651):  χ.emitContent(χ.resolveOrReturn(target)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(104:110): target
        | | | |  ts(639:645):  target
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(104:110): target
        | | | | |  ts(639:645):  target
        | | | | |
        | | | |
        | | |
        | | | Mapping: Identifier
        | | |  hbs(117:121): each
        | | |  ts(674:678):  each
        | | |
        | |
        |"
      `);
    });

    test('inline template', () => {
      let script = {
        filename: 'test.ts',
        contents: stripIndent`
          import Component, { hbs } from '@glimmerx/component';

          export default class MyComponent extends Component {
            private bar = 'hi';

            static template = hbs\`
              <HelperComponent @foo={{this.bar}} />
            \`;
          }

          class HelperComponent extends Component<{ Args: { foo: string } }> {
            static template = hbs\`
              <p ...attributes>
                Hello, {{@foo}}!

                {{! @glint-expect-error: no @bar arg }}
                {{@bar}}
              </p>
            \`;
          }
        `,
      };

      let transformedModule = rewriteModule(ts, { script }, GlintEnvironment.load('glimmerx'));

      expect(transformedModule?.toDebugString()).toMatchInlineSnapshot(`
        "TransformedModule

        | Mapping: Template
        |  hbs(151:201): hbs\`\\\\n    <HelperComponent @foo={{this.bar}} />\\\\n  \`
        |  ts(151:451):  ({} as typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")).templateForBackingValue(this, function(𝚪, χ: typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")) {\\\\n  hbs;\\\\n  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(HelperComponent)({ foo: 𝚪.this.bar }));\\\\n    𝛄;\\\\n  }\\\\n  𝚪; χ;\\\\n}) as unknown
        |
        | | Mapping: ElementNode
        | |  hbs(160:197): <HelperComponent @foo={{this.bar}} />
        | |  ts(331:429):  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(HelperComponent)({ foo: 𝚪.this.bar }));\\\\n    𝛄;\\\\n  }
        | |
        | | | Mapping: Identifier
        | | |  hbs(161:176): HelperComponent
        | | |  ts(376:391):  HelperComponent
        | | |
        | | | Mapping: AttrNode
        | | |  hbs(177:194): @foo={{this.bar}}
        | | |  ts(395:411):  foo: 𝚪.this.bar
        | | |
        | | | | Mapping: Identifier
        | | | |  hbs(178:181): foo
        | | | |  ts(395:398):  foo
        | | | |
        | | | | Mapping: MustacheStatement
        | | | |  hbs(182:194): {{this.bar}}
        | | | |  ts(400:411):  𝚪.this.bar
        | | | |
        | | | | | Mapping: PathExpression
        | | | | |  hbs(184:192): this.bar
        | | | | |  ts(400:411):  𝚪.this.bar
        | | | | |
        | | | | | | Mapping: Identifier
        | | | | | |  hbs(184:188): this
        | | | | | |  ts(403:407):  this
        | | | | | |
        | | | | | | Mapping: Identifier
        | | | | | |  hbs(189:192): bar
        | | | | | |  ts(408:411):  bar
        | | | | | |
        | | | | |
        | | | |
        | | |
        | |
        |

        | Mapping: Template
        |  hbs(295:419): hbs\`\\\\n    <p ...attributes>\\\\n      Hello, {{@foo}}!\\\\n\\\\n      {{! @glint-expect-error: no @bar arg }}\\\\n      {{@bar}}\\\\n    </p>\\\\n  \`
        |  ts(545:950):  ({} as typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")).templateForBackingValue(this, function(𝚪, χ: typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")) {\\\\n  hbs;\\\\n  {\\\\n    const 𝛄 = χ.emitElement(\\"p\\");\\\\n    χ.applySplattributes(𝚪.element, 𝛄.element);\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}));\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}));\\\\n  }\\\\n  𝚪; χ;\\\\n}) as unknown
        |
        | | Mapping: ElementNode
        | |  hbs(304:415): <p ...attributes>\\\\n      Hello, {{@foo}}!\\\\n\\\\n      {{! @glint-expect-error: no @bar arg }}\\\\n      {{@bar}}\\\\n    </p>
        | |  ts(725:928):  {\\\\n    const 𝛄 = χ.emitElement(\\"p\\");\\\\n    χ.applySplattributes(𝚪.element, 𝛄.element);\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}));\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}));\\\\n  }
        | |
        | | | Mapping: AttrNode
        | | |  hbs(307:320): ...attributes
        | | |  ts(764:813):  χ.applySplattributes(𝚪.element, 𝛄.element);
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(335:343): {{@foo}}
        | | |  ts(814:867):  χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(337:341): @foo
        | | | |  ts(850:861):  𝚪.args.foo
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(338:341): foo
        | | | | |  ts(858:861):  foo
        | | | | |
        | | | |
        | | |
        | | | Mapping: MustacheCommentStatement
        | | |  hbs(352:391): {{! @glint-expect-error: no @bar arg }}
        | | |  ts(869:869):
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(398:406): {{@bar}}
        | | |  ts(869:922):  χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(400:404): @bar
        | | | |  ts(905:916):  𝚪.args.bar
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(401:404): bar
        | | | | |  ts(913:916):  bar
        | | | | |
        | | | |
        | | |
        | |
        |"
      `);
    });

    test('Windows line endings', () => {
      let script = {
        filename: 'test.ts',
        contents: stripIndent`
          import Component, { hbs } from '@glimmerx/component';

          export default class MyComponent extends Component {
            private bar = 'hi';

            static template = hbs\`
              <HelperComponent @foo={{this.bar}} />
            \`;
          }

          class HelperComponent extends Component<{ Args: { foo: string } }> {
            static template = hbs\`
              <p ...attributes>
                Hello, {{@foo}}!

                {{! @glint-expect-error: no @bar arg }}
                {{@bar}}
              </p>
            \`;
          }
        `.replace(/\n/g, '\r\n'),
      };

      let transformedModule = rewriteModule(ts, { script }, GlintEnvironment.load('glimmerx'));

      expect(transformedModule?.toDebugString()).toMatchInlineSnapshot(`
        "TransformedModule

        | Mapping: Template
        |  hbs(156:208): hbs\`\\\\r\\\\n    <HelperComponent @foo={{this.bar}} />\\\\r\\\\n  \`
        |  ts(156:456):  ({} as typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")).templateForBackingValue(this, function(𝚪, χ: typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")) {\\\\n  hbs;\\\\n  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(HelperComponent)({ foo: 𝚪.this.bar }));\\\\n    𝛄;\\\\n  }\\\\n  𝚪; χ;\\\\n}) as unknown
        |
        | | Mapping: ElementNode
        | |  hbs(166:203): <HelperComponent @foo={{this.bar}} />
        | |  ts(336:434):  {\\\\n    const 𝛄 = χ.emitComponent(χ.resolve(HelperComponent)({ foo: 𝚪.this.bar }));\\\\n    𝛄;\\\\n  }
        | |
        | | | Mapping: Identifier
        | | |  hbs(167:182): HelperComponent
        | | |  ts(381:396):  HelperComponent
        | | |
        | | | Mapping: AttrNode
        | | |  hbs(183:200): @foo={{this.bar}}
        | | |  ts(400:416):  foo: 𝚪.this.bar
        | | |
        | | | | Mapping: Identifier
        | | | |  hbs(184:187): foo
        | | | |  ts(400:403):  foo
        | | | |
        | | | | Mapping: MustacheStatement
        | | | |  hbs(188:200): {{this.bar}}
        | | | |  ts(405:416):  𝚪.this.bar
        | | | |
        | | | | | Mapping: PathExpression
        | | | | |  hbs(190:198): this.bar
        | | | | |  ts(405:416):  𝚪.this.bar
        | | | | |
        | | | | | | Mapping: Identifier
        | | | | | |  hbs(190:194): this
        | | | | | |  ts(408:412):  this
        | | | | | |
        | | | | | | Mapping: Identifier
        | | | | | |  hbs(195:198): bar
        | | | | | |  ts(413:416):  bar
        | | | | | |
        | | | | |
        | | | |
        | | |
        | |
        |

        | Mapping: Template
        |  hbs(306:437): hbs\`\\\\r\\\\n    <p ...attributes>\\\\r\\\\n      Hello, {{@foo}}!\\\\r\\\\n\\\\r\\\\n      {{! @glint-expect-error: no @bar arg }}\\\\r\\\\n      {{@bar}}\\\\r\\\\n    </p>\\\\r\\\\n  \`
        |  ts(554:959):  ({} as typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")).templateForBackingValue(this, function(𝚪, χ: typeof import(\\"@glint/environment-glimmerx/-private/dsl\\")) {\\\\n  hbs;\\\\n  {\\\\n    const 𝛄 = χ.emitElement(\\"p\\");\\\\n    χ.applySplattributes(𝚪.element, 𝛄.element);\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}));\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}));\\\\n  }\\\\n  𝚪; χ;\\\\n}) as unknown
        |
        | | Mapping: ElementNode
        | |  hbs(316:432): <p ...attributes>\\\\r\\\\n      Hello, {{@foo}}!\\\\r\\\\n\\\\r\\\\n      {{! @glint-expect-error: no @bar arg }}\\\\r\\\\n      {{@bar}}\\\\r\\\\n    </p>
        | |  ts(734:937):  {\\\\n    const 𝛄 = χ.emitElement(\\"p\\");\\\\n    χ.applySplattributes(𝚪.element, 𝛄.element);\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}));\\\\n    χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}));\\\\n  }
        | |
        | | | Mapping: AttrNode
        | | |  hbs(319:332): ...attributes
        | | |  ts(773:822):  χ.applySplattributes(𝚪.element, 𝛄.element);
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(348:356): {{@foo}}
        | | |  ts(823:876):  χ.emitContent(χ.resolveOrReturn(𝚪.args.foo)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(350:354): @foo
        | | | |  ts(859:870):  𝚪.args.foo
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(351:354): foo
        | | | | |  ts(867:870):  foo
        | | | | |
        | | | |
        | | |
        | | | Mapping: MustacheCommentStatement
        | | |  hbs(367:406): {{! @glint-expect-error: no @bar arg }}
        | | |  ts(878:878):
        | | |
        | | | Mapping: MustacheStatement
        | | |  hbs(414:422): {{@bar}}
        | | |  ts(878:931):  χ.emitContent(χ.resolveOrReturn(𝚪.args.bar)({}))
        | | |
        | | | | Mapping: PathExpression
        | | | |  hbs(416:420): @bar
        | | | |  ts(914:925):  𝚪.args.bar
        | | | |
        | | | | | Mapping: Identifier
        | | | | |  hbs(417:420): bar
        | | | | |  ts(922:925):  bar
        | | | | |
        | | | |
        | | |
        | |
        |"
      `);
    });
  });
});
