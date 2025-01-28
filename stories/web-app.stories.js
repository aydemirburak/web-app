import { html } from 'lit';
import '../src/web-app.js';

export default {
  title: 'WebApp',
  component: 'web-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <web-app
      style="--web-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </web-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
