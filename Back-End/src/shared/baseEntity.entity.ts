import { PrimaryKey } from "@mikro-orm/core";

export abstract class baseEntity {
    @PrimaryKey({autoincrement: true, type: 'int', nullable: false, unique: true})
    id?: number
} 