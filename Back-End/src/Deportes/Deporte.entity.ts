import { Horario } from "../Horarios/Horario.entity.js";
import { Entity, ManyToMany, Property, Cascade, Collection,Rel} from "@mikro-orm/core";
import { baseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class Deporte extends baseEntity {

    @Property( { unique: true, nullable: false, length: 50 })
    nombre!: string;

    @ManyToMany(() => Horario, (horario) => horario.deporte, { cascade: [Cascade.PERSIST], owner: true, eager: true })
    horarios = new Collection<Rel<Horario>>(this);

    @Property()
    costo!: number;

    @Property({type: 'int'})
    cupo?: number
}
