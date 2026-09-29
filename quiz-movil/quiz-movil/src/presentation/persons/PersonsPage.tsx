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
import { usePersons } from '../../application/usePersons';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

interface PersonsPageProps {
  repository: IPersonRepository;
}

const PersonsPage: React.FC<PersonsPageProps> = ({ repository }) => {
  const { persons, loading, error, addPerson } = usePersons(repository);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const parsedAge = Number(age);
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      age.trim() === '' ||
      !Number.isInteger(parsedAge) ||
      parsedAge < 0
    ) {
      setFormError('Nombre, apellido y una edad válida son obligatorios');
      return;
    }
    setFormError(null);
    const created = await addPerson({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: parsedAge,
    });
    if (created) {
      setFirstName('');
      setLastName('');
      setAge('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Persons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="floating"
            value={firstName}
            onIonInput={(e) => setFirstName(String(e.detail.value ?? ''))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Apellido"
            labelPlacement="floating"
            value={lastName}
            onIonInput={(e) => setLastName(String(e.detail.value ?? ''))}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Edad"
            labelPlacement="floating"
            type="number"
            value={age}
            onIonInput={(e) => setAge(String(e.detail.value ?? ''))}
          />
        </IonItem>

        {(formError || error) && (
          <IonText color="danger">
            <p>{formError ?? error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={handleSubmit}>
          Guardar persona
        </IonButton>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <IonList>
            {persons.map((person) => (
              <IonItem key={person.id}>
                {person.firstName} {person.lastName} — {person.age} años
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PersonsPage;
