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
import { useProducts } from '../../application/useProducts';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

interface ProductsPageProps {
  repository: IProductRepository;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ repository }) => {
  const { products, loading, error, addProduct } = useProducts(repository);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const parsedPrice = Number(price);
    if (!name.trim() || price.trim() === '' || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setFormError('Nombre y un precio válido son obligatorios');
      return;
    }
    setFormError(null);
    const created = await addProduct({ name: name.trim(), price: parsedPrice });
    if (created) {
      setName('');
      setPrice('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
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
            label="Precio"
            labelPlacement="floating"
            type="number"
            value={price}
            onIonInput={(e) => setPrice(String(e.detail.value ?? ''))}
          />
        </IonItem>

        {(formError || error) && (
          <IonText color="danger">
            <p>{formError ?? error}</p>
          </IonText>
        )}

        <IonButton expand="block" onClick={handleSubmit}>
          Guardar producto
        </IonButton>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <IonList>
            {products.map((product) => (
              <IonItem key={product.id}>
                {product.name} — ${product.price}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
