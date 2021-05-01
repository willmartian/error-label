import { newSpecPage } from '@stencil/core/testing';
import { ErrorLabel } from '../error-label';

describe('error-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ErrorLabel],
      html: `<error-label></error-label>`,
    });
    expect(page.root).toEqualHtml(`
      <error-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </error-label>
    `);
  });
});
