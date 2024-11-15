import pool from '../db.js';

//FUNCTIONS TO GET DATA
export const getAllItems = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM item ORDER BY N ASC')
        // res.json([rows])
        // res.json({rows})  //this put the name "result at the begin, above of that just list the json "
        res.json(rows)
        // console.log(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateDisposition = async (req, res) => {
    const { id } = req.params;
    const { DISPOSICION } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE item SET DISPOSICION = ? WHERE CODIGO_PATRIMONIAL = ?',
            [DISPOSICION, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Disposition updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getItemByCodePat = async (req, res, next) => {
    try {
        const id = req.params.id
        const [row] = await pool.query("SELECT * FROM item WHERE CODIGO_PATRIMONIAL = ?", [id]); //with the [] just get an array with the components neede, without that give us more rows
        console.log(row)

        if (!row.length) return res.status(404).json({ message: 'Item not found' })

        res.json(row[0])
        // res.json({ item :  row[0].id })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getItemByCodePatAndUpdate = async (req, res, next) => {
    try {
        const id = req.params.id;

        // // Log para verificar el parámetro recibido
        // console.log('ID recibido:', id);

        // Intento de búsqueda del item
        const [rows] = await pool.query("SELECT * FROM item WHERE CODIGO_PATRIMONIAL = ?", [id]);

        // // Log para verificar si el item fue encontrado
        // console.log('Resultado de búsqueda:', rows);

        if (!rows.length) {
            console.log('Item no encontrado.');
            return res.status(404).json({ message: 'Item not found' });
        }

        // Aquí se obtiene el item
        const item = rows[0];
        const fechaRegistro = new Date(); // Fecha actual

        // // Log para verificar valores antes de actualizar
        // console.log('Preparando para actualizar item con ID:', id);
        // console.log('Fecha Registro:', fechaRegistro);

        // Intento de actualizar estado y fecha
        const [updateResult] = await pool.query(
            "UPDATE item SET ESTADO = 1, FECHA_REGISTRO = ? WHERE CODIGO_PATRIMONIAL = ?",
            [fechaRegistro, id]
        );

        // Log para verificar si la actualización fue exitosa
        // console.log('Resultado de la actualización:', updateResult);

        // // Verifica si la actualización afectó alguna fila
        // if (updateResult.affectedRows === 0) {
        //     console.log('No se actualizó ningún registro.');
        // } else {
        //     console.log('Registro actualizado correctamente.');
        // }

        // Retornar el item con sus datos actualizados
        res.json({ ...item, ESTADO: 1, FECHA_REGISTRO: fechaRegistro });
    } catch (error) {
        console.error('Error en la actualización:', error);
        return res.status(500).json(error);
    }
};

export const getItemsQtyByWorker = async (req, res, next) => {
    try {
        const trabajador  =`%${req.query.q}%`; // Parche para que la búsqueda sea parcial con el operador LIKE
        
        const [rows] = await pool.query(`
            SELECT 
                TRABAJADOR,
                DESCRIPCION,
                DEPENDENCIA,
                COUNT(*) AS CANTIDAD_ITEMS
            FROM 
                item
            WHERE 
                TRABAJADOR LIKE ?
            GROUP BY 
                TRABAJADOR,
                DESCRIPCION,
                DEPENDENCIA
            ORDER BY
                DESCRIPCION
        `, [trabajador]); // Aplicamos la búsqueda por coincidencia

        if (!rows.length) return res.status(404).json({ message: 'No se encontraron ítems para el trabajador especificado' });
        res.json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getItemsByWorker = async (req, res, next) => {
    try {
        const  trabajador  = `%${req.query.q}%`; // Parche para que la búsqueda sea parcial con el operador LIKE
        const [rows] = await pool.query( 
            `SELECT 
                *
            FROM 
                item
            WHERE 
                TRABAJADOR LIKE ?
            ORDER BY
                CODIGO_PATRIMONIAL;`, 
            [trabajador]); // Aplicamos la búsqueda por coincidencia

        if (!rows.length) return res.status(404).json({ message: 'No se encontraron ítems para el trabajador especificado' });
        res.json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getItemsQtyByDependece = async (req, res, next) => {
    try {
        const dependece = `%${req.query.q}%`; // Parche para que la búsqueda sea parcial con el operador LIKE
        const query = `
            SELECT 
                TRABAJADOR,
                DESCRIPCION,
                COUNT(*) AS CANTIDAD_ITEMS,
                DEPENDENCIA
            FROM 
                item
            WHERE 
                DEPENDENCIA LIKE ?
            GROUP BY
                TRABAJADOR,
                DESCRIPCION
            ORDER BY
                DESCRIPCION
        `;

        const [rows] = await pool.query(query, [dependece]); // Aplicamos la búsqueda por coincidencia

        if (!rows.length) return res.status(404).json({ message: 'No se encontraron ítems para la dependencia especificada' });
        res.json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getItemsByDependece = async (req, res, next) => {
    try {
        const dependece = `%${req.query.q}%`; // Parche para que la búsqueda sea parcial con el operador LIKE
        const query = `
            SELECT 
                *
            FROM 
                item
            WHERE 
                DEPENDENCIA LIKE ?
            ORDER BY 
                CODIGO_PATRIMONIAL;
        `;

        const [rows] = await pool.query(query, [dependece]); // Aplicamos la búsqueda por coincidencia

        if (!rows.length) return res.status(404).json({ message: 'No se encontraron ítems para la dependencia especificada' });
        res.json(rows);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const searchItems = async (req, res, next) => {
    try {
        const searchTerm = `%${req.query.q}%`; // Parche para que la búsqueda sea parcial con el operador LIKE

        const [rows] = await pool.query(
            `SELECT * FROM item 
             WHERE DESCRIPCION LIKE ? 
                OR TRABAJADOR LIKE ? 
                OR DEPENDENCIA LIKE ?`,
            [searchTerm, searchTerm, searchTerm]
        );

        if (!rows.length) return res.status(404).json({ message: 'No se encontraron resultados' });

        res.json(rows); // Retorna todos los resultados coincidentes
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const searchItemsByWorkerAndDescription = async (req, res, next) => {
    try {
        // Extraemos los valores de trabajador y descripcion de la consulta
        const trabajador = `%${req.query.trabajador}%`;
        const descripcion = `%${req.query.descripcion}%`;

        // Realizamos la consulta SQL con los parámetros
        const [rows] = await pool.query(`
            SELECT * FROM item WHERE TRABAJADOR LIKE ? AND DESCRIPCION LIKE ? ORDER BY DESCRIPCION
        `, [trabajador, descripcion]);

        // Validamos si hay resultados
        if (!rows.length) return res.status(404).json({ message: 'No se encontraron ítems con los criterios especificados' });
        
        res.json(rows); // Enviamos los resultados
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


