import { pool } from "../db/connect-mysql.js";
import { Horario } from "../Horarios/Clase-Horario.js";
export class RepositoryDeporte {
    async findAll() {
        const [deportes] = await pool.query('SELECT * FROM deportes ');
        for (const deporte of deportes) {
            const [horarios] = await pool.query('SELECT * FROM horarios WHERE deporte = ?', [deporte.id_deporte]);
            deporte.horario = horarios.map((horario) => new Horario(horario.id_horario, horario.dia, horario.hora_inicio, horario.hora_fin));
        }
        return deportes;
    }
    async findOne(item) {
        const [deportes] = await pool.query('SELECT * FROM deportes WHERE nombre = ?', [item.nombre]);
        if (deportes.length === 0) {
            return undefined;
        }
        const deporte = deportes[0];
        const [horarios] = await pool.query('SELECT * FROM horarios WHERE deporte = ?', [deporte.id_deporte]);
        deporte.horario = horarios.map((horario) => new Horario(horario.id_horario, horario.dia, horario.hora_inicio, horario.hora_fin));
        return deporte;
    }
    async add(item) {
        const { id_deporte, horario, ...itemRow } = item;
        const [result] = await pool.query('INSERT INTO deportes SET ?', [itemRow]);
        item.id_deporte = result.insertId;
        const horariosActualizados = [];
        for (const horario of item.horario) {
            const [result] = await pool.query('INSERT INTO horarios SET ?', { deporte: item.id_deporte, ...horario });
            horario.id_horario = result.insertId;
            horariosActualizados.push(horario);
        }
        item.horario = horariosActualizados;
        return item;
    }
    async update(item) {
        const { id_deporte, horario, ...itemRow } = item;
        const [result] = await pool.query('UPDATE deportes SET ? WHERE id_deporte = ?', [itemRow, id_deporte]);
        if (result.affectedRows === 0) {
            return undefined;
        }
        await pool.query('DELETE FROM horarios WHERE deporte = ?', [id_deporte]);
        for (const horario of item.horario) {
            await pool.query('INSERT INTO horarios SET ?', { deporte: id_deporte, ...horario });
        }
        return item;
    }
    async delete(item) {
        const [deporteEliminado] = await pool.query('SELECT * FROM deportes WHERE nombre = ?', [item.nombre]); // traigo el deporte
        if (deporteEliminado.length === 0) {
            return undefined;
        }
        const [horariosEliminados] = await pool.query('SELECT dia, hora_inicio, hora_fin FROM horarios WHERE deporte = ?', [deporteEliminado[0].id_deporte]); //traigo los horarios del deporte
        deporteEliminado[0].horario = [...horariosEliminados]; // los agrego al deporte
        await pool.query('DELETE FROM deportes WHERE nombre = ?', [item.nombre]); // elimino el deporte
        return deporteEliminado[0];
    }
}
//# sourceMappingURL=Repository-Deporte.js.map