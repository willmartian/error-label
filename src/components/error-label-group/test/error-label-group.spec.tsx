import { newSpecPage } from '@stencil/core/testing';
import { ErrorLabelGroup } from '../error-label-group';

describe('error-label-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ErrorLabelGroup],
      html: `<error-label-group></error-label-group>`,
    });
    expect(page.root).toEqualHtml(`
      <error-label-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </error-label-group>
    `);
  });
});
