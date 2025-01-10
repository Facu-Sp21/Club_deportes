var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToMany, Collection, PrimaryKey, Unique } from "@mikro-orm/core";
import { baseEntity } from "../shared/baseEntity.entity.js";
import { Deporte } from "../Deportes/Deporte.entity.js";
export let Horario = class Horario extends baseEntity {
    constructor() {
        super(...arguments);
        this.deporte = new Collection(this);
    }
};
__decorate([
    PrimaryKey({ hidden: true }),
    __metadata("design:type", Number)
], Horario.prototype, "id", void 0);
__decorate([
    Property({ nullable: false, length: 12 }),
    __metadata("design:type", String)
], Horario.prototype, "dia", void 0);
__decorate([
    Property({ nullable: false, type: 'time' }),
    __metadata("design:type", String)
], Horario.prototype, "hora_inicio", void 0);
__decorate([
    Property({ nullable: false, type: 'time' }),
    __metadata("design:type", String)
], Horario.prototype, "hora_fin", void 0);
__decorate([
    ManyToMany(() => Deporte, (deporte) => deporte.horarios, { hidden: true }),
    __metadata("design:type", Object)
], Horario.prototype, "deporte", void 0);
Horario = __decorate([
    Entity(),
    Unique({ properties: ['dia', 'hora_inicio', 'hora_fin'] })
], Horario);
//# sourceMappingURL=Horario.entity.js.map