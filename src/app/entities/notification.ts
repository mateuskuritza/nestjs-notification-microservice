import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
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

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

// Essa classe e suas propriedades não precisam ser iguais ao banco de dados,
// essa classe pode por exemplo ter propriedades e métodos que alteram mais de uma tabela no banco
