import { Repository } from "../shared/repository.js";
import { Deporte } from "./Clase-Deporte.js";
import { pool } from "../db/connect-mysql.js";
import { Horario } from "../Horarios/Clase-Horario.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class RepositoryDeporte implements Repository<Deporte> {
    public async findAll(): Promise< Deporte[] | undefined > {

        const [deportes] = await pool.query('SELECT * FROM deportes ');

        for (const deporte of deportes as Deporte[]) {
            const [horarios] = await pool.query<RowDataPacket[]>('SELECT * FROM horarios WHERE deporte = ?', [deporte.id_deporte]);
            deporte.horario = horarios.map ((horario) => new Horario(horario.id_horario, horario.dia, horario.hora_inicio, horario.hora_fin));
        }

        return deportes as Deporte[];
    }

    public async findOne(item: { nombre: string; }): Promise< Deporte | undefined > {
        const [deportes] = await pool.query<RowDataPacket[]>('SELECT * FROM deportes WHERE nombre = ?', [item.nombre]);
        if (deportes.length === 0 ){
            return undefined
        }

        const deporte = deportes[0];
        const [horarios] = await pool.query<RowDataPacket[]>('SELECT * FROM horarios WHERE deporte = ?', [deporte.id_deporte]);
        deporte.horario = horarios.map ((horario) => new Horario(horario.id_horario, horario.dia, horario.hora_inicio, horario.hora_fin));

        return deporte as Deporte;
    }

    public async add(item: Deporte): Promise < Deporte | undefined > {
        const {id_deporte, horario , ...itemRow} = item;
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO deportes SET ?', [itemRow]);
        item.id_deporte = result.insertId;

        const horariosActualizados =[]; 

        for (const horario of item.horario) {
            const [result] = await pool.query<ResultSetHeader>('INSERT INTO horarios SET ?', {deporte: item.id_deporte, ...horario});
            horario.id_horario = result.insertId;
            horariosActualizados.push(horario);
        }
        item.horario = horariosActualizados;
        return item;
    }

    public async update(item: Deporte): Promise<Deporte | undefined> {
        const { id_deporte,horario,...itemRow } = item;
  
        const [result] = await pool.query<ResultSetHeader>('UPDATE deportes SET ? WHERE id_deporte = ?', [itemRow, id_deporte]);        
        if (result.affectedRows === 0) {
            return undefined;
        }

        await pool.query('DELETE FROM horarios WHERE deporte = ?', [id_deporte]);

        for (const horario of item.horario) {
            await pool.query<ResultSetHeader>('INSERT INTO horarios SET ?', {deporte: id_deporte, ...horario});
        }
        return item;
}

    public async delete(item: { nombre: string; }): Promise< Deporte | undefined > {

        const [deporteEliminado] = await pool.query<RowDataPacket[]>('SELECT * FROM deportes WHERE nombre = ?', [item.nombre]);// traigo el deporte
        
        if (deporteEliminado.length === 0) {
            return undefined
        }

        const [horariosEliminados] = await pool.query<RowDataPacket[]>('SELECT dia, hora_inicio, hora_fin FROM horarios WHERE deporte = ?', [deporteEliminado[0].id_deporte]);//traigo los horarios del deporte
        deporteEliminado[0].horario = [...horariosEliminados];// los agrego al deporte

        await pool.query('DELETE FROM deportes WHERE nombre = ?', [item.nombre]);// elimino el deporte

        return deporteEliminado[0] as Deporte;
 
    }
}