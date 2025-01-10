import { Entity, Property, Cascade, Rel, ManyToMany, Collection, PrimaryKey, Unique } from "@mikro-orm/core"
import { baseEntity } from "../shared/baseEntity.entity.js"
import { Deporte } from "../Deportes/Deporte.entity.js"

@Entity()
@Unique({ properties: ['dia', 'hora_inicio', 'hora_fin'] })
export class Horario extends baseEntity {
    @PrimaryKey ({hidden: true})
    id?: number

    @Property({nullable: false, length: 12})
    dia!: string;

    @Property({nullable: false, type: 'time'})
    hora_inicio!: string;

    @Property({nullable: false, type: 'time'})
    hora_fin!: string;
    
    @ManyToMany(() => Deporte , (deporte) => deporte.horarios, {hidden:true})
    
    deporte = new  Collection<Rel<Deporte>>(this);
}

