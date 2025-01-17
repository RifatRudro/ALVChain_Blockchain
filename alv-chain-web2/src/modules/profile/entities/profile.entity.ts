import { User } from "@/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  mobile?: string;

  @Column()
  address?: string;

  @Column()
  user_id!: number;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  createdAt?: Date;

  @Column({
    type: "timestamp",
    default: new Date(),
  })
  updatedAt?: Date;

  //relationship
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  User?: User;
}
