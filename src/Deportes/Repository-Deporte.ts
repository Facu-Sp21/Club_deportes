import { Repository } from "../shared/repository.js";
import { Deporte } from "./Clase-Deporte.js";
import { db } from "../db/connect.js";
import { ObjectId } from "mongodb";


const deportes = db.collection<Deporte>('deportes');


export class RepositoryDeporte implements Repository<Deporte> {
    public async findAll(): Promise< Deporte[] | undefined > {
        return await deportes.find().toArray();
    }

    public async findOne(item: { nombre: string; }): Promise< Deporte | undefined > {
        return await deportes.findOne(item) || undefined;
    }

    public async add(item: Deporte): Promise < Deporte | undefined > {
    item._id = (await deportes.insertOne(item)).insertedId;
    return item;
    }

    public async update(item: Deporte): Promise<Deporte | undefined> {
        const { _id, ...resto} = item;
        const id = new ObjectId(_id);

        return await deportes.findOneAndUpdate({ _id: id },{ $set: resto },{ returnDocument: 'after' }) || undefined;
    }
    

    public async delete(item: { nombre: string; }): Promise< Deporte | undefined > {

        return await deportes.findOneAndDelete({ nombre: item.nombre }) || undefined;


    }
}