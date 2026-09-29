import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useUsers } from '../../application/useUsers';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

interface UsersPageProps {
  repository: IUserRepository;
}

const UsersPage: React.FC<UsersPageProps> = ({ repository }) => {
  const { users, loading, error, addUser } = useUsers(repository);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setFormError('Nombre y email son obligatorios');
      return;
    }
    setFormError(null);
    const created = await addUser({ name: name.trim(), email: email.trim() });
    if (created) {
      setName('');
      setEmail('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="floating"
            value={name}
            onIonInput={(e) => setName(String(e.detail.value ?? ''))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Email"
            labelPlacement="floating"
            type="email"
            value={email}
            onIonInput={(e) => setEmail(String(e.detail.value ?? ''))}
          />
        </IonItem>

        {(formError || error) && (
          <IonText color="danger">
            <p>{formError ?? error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={handleSubmit}>
          Guardar usuario
        </IonButton>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <IonList>
            {users.map((user) => (
              <IonItem key={user.id}>
                {user.name} — {user.email}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UsersPage;
