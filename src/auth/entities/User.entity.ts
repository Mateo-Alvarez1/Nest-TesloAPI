import { Product } from '../../products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  email: string;
  @Column('text', {
    nullable: false,
  })
  password: string;
  @Column('text', {
    nullable: false,
    select: false,
  })
  fullName: string;
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    nullable: false,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  cheksFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  cheksFieldsBeforeUpdate() {
    this.cheksFieldsBeforeInsert();
  }
}
