import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cubeOutline, peopleOutline, personOutline } from 'ionicons/icons';

import { container } from './infrastructure/container';
import UsersPage from './presentation/users/UsersPage';
import ProductsPage from './presentation/products/ProductsPage';
import PersonsPage from './presentation/persons/PersonsPage';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/users">
            <UsersPage repository={container.userRepository} />
          </Route>
          <Route exact path="/products">
            <ProductsPage repository={container.productRepository} />
          </Route>
          <Route exact path="/persons">
            <PersonsPage repository={container.personRepository} />
          </Route>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="users" href="/users">
            <IonIcon icon={personOutline} />
            <IonLabel>Users</IonLabel>
          </IonTabButton>
          <IonTabButton tab="products" href="/products">
            <IonIcon icon={cubeOutline} />
            <IonLabel>Products</IonLabel>
          </IonTabButton>
          <IonTabButton tab="persons" href="/persons">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Persons</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
