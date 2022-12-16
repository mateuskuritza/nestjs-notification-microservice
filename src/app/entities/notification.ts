import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public get content() {
    return this.props.content;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get category() {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
}

// Essa classe e suas propriedades não precisam ser iguais ao banco de dados,
// essa classe pode por exemplo ter propriedades e métodos que alteram mais de uma tabela no banco
