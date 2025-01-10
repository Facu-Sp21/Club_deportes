var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { baseEntity } from "../shared/baseEntity.entity.js";
import { Deporte } from "../Deportes/Deporte-Entity.js";
Entity();
export class Horario extends baseEntity {
}
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Horario.prototype, "dia", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Horario.prototype, "hora_inicio", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Horario.prototype, "hora_fin", void 0);
__decorate([
    ManyToOne(() => Deporte, { nullable: false }),
    __metadata("design:type", Number)
], Horario.prototype, "deporte", void 0);
//# sourceMappingURL=Clase-Horario.js.map