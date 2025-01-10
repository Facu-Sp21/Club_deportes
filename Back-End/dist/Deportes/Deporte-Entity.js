var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Horario } from "../Horarios/Horario-Entity.js";
import { Entity, OneToMany, Property, Cascade, Collection } from "@mikro-orm/core";
import { baseEntity } from "../shared/baseEntity.entity.js";
export let Deporte = class Deporte extends baseEntity {
    constructor() {
        super(...arguments);
        this.horarios = new Collection(this);
    }
};
__decorate([
    Property({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Deporte.prototype, "nombre", void 0);
__decorate([
    OneToMany(() => Horario, (horario) => horario.deporte, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Deporte.prototype, "horarios", void 0);
__decorate([
    Property({}),
    __metadata("design:type", Number)
], Deporte.prototype, "costo", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Deporte.prototype, "cupo", void 0);
Deporte = __decorate([
    Entity()
], Deporte);
//# sourceMappingURL=Deporte-Entity.js.map