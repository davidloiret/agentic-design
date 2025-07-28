import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/libs/base-entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ nullable: true, unique: true })
  supabaseId?: string; // Link to Supabase auth user

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    supabaseId?: string,
  ) {
    super();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.supabaseId = supabaseId;
  }
}