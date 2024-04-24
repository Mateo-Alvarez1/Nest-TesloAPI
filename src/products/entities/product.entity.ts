// Dato de referencia , generalmente no se deberia eliminar un producto de la base de datos
// si se puede pasar un producto a activo o inactivo , pero eliminar no es recomendado por temas
// de integridad referencial , puede ser que ya tengamos un producto cargado en una factura o demas
// y no contar con ese producto puede afectar la integridad de los datos y tener detalles huerfanos
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  decription: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(
    // Especificamos el tipo de retorno
    () => ProductImage,
    // La manera en la que product-image se relaciona con mi tabla
    (productImage) => productImage.product,
    { cascade: true, eager: true },
  )
  images?: ProductImage[];

  @BeforeInsert()
  checksLugsInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkLugsUdpate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
