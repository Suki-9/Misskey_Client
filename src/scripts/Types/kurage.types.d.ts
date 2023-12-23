type OptionalArgBranch<T, U, E> = undefined extends T ? U : E;

type Rename<T, Key1 extends keyof T, Key2 extends string> = Omit<
  T,
  Key1
> & { [key in Key2]: T[Key1] }

type LoginUser = {
  token: string;
  avatarURL: string;
  host: string;
  userName: string;
};

type ModifiedNotification = {
  id: string;
  user: User;
  type: Mi_NotificationType;
  text?: string | null;
  note?: Vnode;
  reaction?: Mi_Reaction;
};
