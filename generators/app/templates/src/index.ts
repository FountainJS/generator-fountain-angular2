import 'reflect-metadata';

import { bootstrap } from 'angular2/bootstrap';

<% if (modules === 'webpack') { -%>
import './index.scss';

<% } -%>
<% if (modules === 'systemjs' && js === 'typescript') { -%>
import { Hello } from './hello';
<% } else { -%>
import { Hello } from './app/hello';
<% } -%>

bootstrap(Hello);
