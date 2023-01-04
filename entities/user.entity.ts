import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  // 関連先で紐付けされるプロパティを指定する
  // Todo でどのように User と紐づいているか
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}