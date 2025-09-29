import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { VcfHotlineSessionEntity } from './vcf-hotline-session.entity';

export enum VcfMessageType {
  USER_MESSAGE = 'user_message',
  EXPERT_MESSAGE = 'expert_message',
  SYSTEM_MESSAGE = 'system_message',
  CODE_SNIPPET = 'code_snippet',
  FILE_ATTACHMENT = 'file_attachment',
  SOLUTION = 'solution',
}

@Entity({ tableName: 'vcf_hotline_messages' })
export class VcfHotlineMessageEntity extends BaseEntity {
  @ManyToOne(() => VcfHotlineSessionEntity, { nullable: false })
  session!: VcfHotlineSessionEntity;

  @ManyToOne(() => User, { nullable: false })
  sender!: User;

  @Enum(() => VcfMessageType)
  type: VcfMessageType = VcfMessageType.USER_MESSAGE;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'text' })
  codeSnippet?: string;

  @Property()
  programmingLanguage?: string;

  @Property({ type: 'array' })
  attachments: string[] = [];

  @Property()
  isEdited: boolean = false;

  @Property()
  editedAt?: Date;

  @Property()
  readAt?: Date;

  @Property()
  isExpertSolution: boolean = false;

  @Property()
  solutionAccepted: boolean = false;

  @Property()
  solutionAcceptedAt?: Date;
}