declare interface ICheck {
  id: string;
  priority: number;
  description: string;
  answer?: string;
  isDisabled?: boolean
}
