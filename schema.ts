import { Static, Type } from '@sinclair/typebox'

const Todo = Type.Object({
  title: Type.String(),
  describe: Type.String(),
});
export type TodoType = Static<typeof Todo>;

const User = Type.Object({
  name: Type.String(),
  password: Type.String()
});
export type UserType = Static<typeof User>;